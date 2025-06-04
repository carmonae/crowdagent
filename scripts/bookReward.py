import firebase_admin
from firebase_admin import credentials, db
import logging
from typing import List, Dict, Optional
import sys

# Configuration constants
MIN_CONTRIBUTION = 2.0
MAX_CONTRIBUTION = 4.0
MIN_RATING = 1
MAX_RATING = 20
MIN_SUBMISSIONS = 1000  # Minimum number of submissions required
DATABASE_PATH = "/readers"  # Firebase Realtime Database path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

class ReaderSubmission:
    def __init__(self, reader_id: str, rating: int, contribution: float):
        self.reader_id = reader_id
        self.rating = rating
        self.contribution = contribution

class RewardResult:
    def __init__(self, reader_id: str, score: float, reward: float):
        self.reader_id = reader_id
        self.score = score
        self.reward = reward

class BookRewardService:
    def __init__(self):
        pass

    def validate_submission(self, submission: ReaderSubmission) -> None:
        """Validates a single reader submission."""
        if not isinstance(submission.rating, int) or submission.rating < MIN_RATING or submission.rating > MAX_RATING:
            raise ValueError(
                f"Invalid rating for reader {submission.reader_id}: must be an integer between {MIN_RATING} and {MAX_RATING}"
            )
        if submission.contribution < MIN_CONTRIBUTION or submission.contribution > MAX_CONTRIBUTION:
            raise ValueError(
                f"Invalid contribution for reader {submission.reader_id}: must be between ${MIN_CONTRIBUTION} and ${MAX_CONTRIBUTION}"
            )

    def calculate_true_distribution(self, submissions: List[ReaderSubmission]) -> List[float]:
        """Calculates the true probability distribution t_i from submissions."""
        counts = [0] * (MAX_RATING + 1)  # Index 0 unused
        for submission in submissions:
            counts[submission.rating] += 1
        total_submissions = len(submissions)
        return [count / total_submissions if i >= MIN_RATING and i <= MAX_RATING else 0 for i, count in enumerate(counts)]

    def calculate_quadratic_score(self, rating: int, true_distribution: List[float]) -> float:
        """Calculates the quadratic score: S = 1 - Σ(p_i - t_i)^2."""
        predicted = [0.0] * (MAX_RATING + 1)
        predicted[rating] = 1.0  # 100% probability for chosen rating
        sum_squared_diff = sum((predicted[i] - true_distribution[i]) ** 2 for i in range(MIN_RATING, MAX_RATING + 1))
        return 1 - sum_squared_diff

    def calculate_total_pool(self, submissions: List[ReaderSubmission]) -> float:
        """Calculates the total pool size from contributions."""
        return sum(s.contribution for s in submissions)

    def calculate_rewards(self, submissions: List[ReaderSubmission]) -> List[RewardResult]:
        """Calculates rewards for all readers."""
        if len(submissions) < MIN_SUBMISSIONS:
            raise ValueError(f"Insufficient submissions: {len(submissions)} < {MIN_SUBMISSIONS}")

        # Validate all submissions
        for submission in submissions:
            self.validate_submission(submission)

        # Calculate true distribution
        true_distribution = self.calculate_true_distribution(submissions)

        # Calculate total pool
        total_pool = self.calculate_total_pool(submissions)

        # Calculate scores
        results = [
            RewardResult(
                reader_id=s.reader_id,
                score=self.calculate_quadratic_score(s.rating, true_distribution),
                reward=0.0  # Placeholder
            )
            for s in submissions
        ]

        # Calculate sum of positive scores
        total_score_sum = sum(max(0, r.score) for r in results)

        # Calculate rewards with confidence multiplier
        for result in results:
            submission = next(s for s in submissions if s.reader_id == result.reader_id)
            multiplier = submission.contribution / MIN_CONTRIBUTION
            if result.score > 0 and total_score_sum > 0:
                result.reward = (result.score / total_score_sum) * total_pool * multiplier
            else:
                result.reward = 0.0  # No reward for negative or zero scores

        return results

    def get_average_rating(self, submissions: List[ReaderSubmission]) -> float:
        """Calculates the average rating for reporting."""
        return sum(s.rating for s in submissions) / len(submissions) if submissions else 0.0

def initialize_firebase(credentials_path: str, database_url: str) -> None:
    """Initializes the Firebase Admin SDK."""
    try:
        cred = credentials.Certificate(credentials_path)
        firebase_admin.initialize_app(cred, {
            'databaseURL': database_url
        })
        logger.info("Firebase initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Firebase: {e}")
        raise

def fetch_submissions(database_path: str = DATABASE_PATH) -> List[ReaderSubmission]:
    """Fetches reader submissions from Firebase."""
    try:
        ref = db.reference(database_path)
        data = ref.get()
        if not data:
            raise ValueError("No data found in Firebase at path: " + database_path)

        submissions = []
        for reader_id, reader_data in data.items():
            try:
                rating = int(reader_data.get('rating', 0))
                contribution = float(reader_data.get('contribution', 0.0))
                submissions.append(ReaderSubmission(reader_id, rating, contribution))
            except (ValueError, TypeError) as e:
                logger.warning(f"Skipping invalid reader {reader_id}: {e}")
        logger.info(f"Fetched {len(submissions)} valid submissions")
        return submissions
    except Exception as e:
        logger.error(f"Error fetching submissions: {e}")
        raise

def update_rewards(results: List[RewardResult], database_path: str = DATABASE_PATH) -> None:
    """Updates reader records in Firebase with scores and rewards."""
    try:
        ref = db.reference(database_path)
        for result in results:
            try:
                ref.child(result.reader_id).update({
                    'score': result.score,
                    'reward': result.reward
                })
                logger.debug(f"Updated reader {result.reader_id}: score={result.score}, reward={result.reward}")
            except Exception as e:
                logger.warning(f"Failed to update reader {result.reader_id}: {e}")
        logger.info(f"Updated {len(results)} reader records")
    except Exception as e:
        logger.error(f"Error updating rewards: {e}")
        raise

def main():
    # Configuration (update with your Firebase details)
    CREDENTIALS_PATH = "serviceAccountKey.json"  # Path to Firebase service account key
    DATABASE_URL = "https://your-project-id.firebaseio.com"  # Firebase Realtime Database URL

    try:
        # Initialize Firebase
        initialize_firebase(CREDENTIALS_PATH, DATABASE_URL)

        # Fetch submissions
        submissions = fetch_submissions()

        # Calculate rewards
        service = BookRewardService()
        rewards = service.calculate_rewards(submissions)

        # Update Firebase
        update_rewards(rewards)

        # Log summary
        avg_rating = service.get_average_rating(submissions)
        total_pool = service.calculate_total_pool(submissions)
        logger.info(f"Batch process completed. Average Rating: {avg_rating:.2f}, Total Pool: ${total_pool:.2f}")

    except Exception as e:
        logger.error(f"Batch process failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()