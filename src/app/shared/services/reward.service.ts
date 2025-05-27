// Types for clarity and type safety
interface ReaderSubmission {
  readerId: string; // Unique identifier for the reader
  personalRating: number; // Reader's personal rating and contribution
  predictedRating: number; // Rating from 1 to 20
  bet: number; // Contribution amount in piques (2 to 4)
}

interface RewardResult {
  readerId: string;
  score: number; // Quadratic score (-1 to 1)
  reward: number; // Final reward in $
}

// Configuration constants
const MIN_CONTRIBUTION = 2;
const MAX_CONTRIBUTION = 4;
const MIN_RATING = 1;
const MAX_RATING = 20;

class BookRewardService {
  /**
   * Validates a single reader submission
   * @throws Error if rating or contribution is invalid
   */
  private validateSubmission(submission: ReaderSubmission): void {
    if (
      !Number.isInteger(submission.predictedRating) ||
      submission.predictedRating < MIN_RATING ||
      submission.predictedRating > MAX_RATING
    ) {
      throw new Error(
        `Invalid rating for reader ${submission.readerId}: must be an integer between ${MIN_RATING} and ${MAX_RATING}`
      );
    }
    if (
      submission.bet < MIN_CONTRIBUTION ||
      submission.bet > MAX_CONTRIBUTION
    ) {
      throw new Error(
        `Invalid contribution for reader ${submission.readerId}: must be between $${MIN_CONTRIBUTION} and $${MAX_CONTRIBUTION}`
      );
    }
  }

  /**
   * Calculates the true probability distribution t_i from submissions
   */
  private calculateTrueDistribution(submissions: ReaderSubmission[]): number[] {
    const counts = new Array(MAX_RATING + 1).fill(0); // Index 0 unused
    for (const submission of submissions) {
      counts[submission.predictedRating]++;
    }
    // Convert counts to probabilities (t_i)
    const totalSubmissions = submissions.length;
    return counts.map((count, index) =>
      index >= MIN_RATING && index <= MAX_RATING ? count / totalSubmissions : 0
    );
  }

  /**
   * Calculates the quadratic score for a reader's rating
   * S = 1 - Σ(p_i - t_i)^2
   */
  private calculateQuadraticScore(
    rating: number,
    trueDistribution: number[]
  ): number {
    const predicted = new Array(MAX_RATING + 1).fill(0);
    predicted[rating] = 1; // 100% probability for chosen rating
    let sumSquaredDiff = 0;
    for (let i = MIN_RATING; i <= MAX_RATING; i++) {
      const diff = predicted[i] - trueDistribution[i];
      sumSquaredDiff += diff * diff;
    }
    return 1 - sumSquaredDiff;
  }

  /**
   * Calculates the total pool size from contributions
   */
  private calculateTotalPool(submissions: ReaderSubmission[]): number {
    return submissions.reduce((sum, s) => sum + s.bet, 0);
  }

  /**
   * Main method to calculate rewards for all readers
   * @throws Error if submissions are invalid or empty
   */
  public calculateRewards(submissions: ReaderSubmission[]): RewardResult[] {
    if (submissions.length === 0) {
      throw new Error('No submissions provided');
    }

    // Validate all submissions
    for (const submission of submissions) {
      this.validateSubmission(submission);
    }

    // Calculate true distribution (t_i)
    const trueDistribution = this.calculateTrueDistribution(submissions);

    // Calculate total pool
    const totalPool = this.calculateTotalPool(submissions);

    // Calculate scores for all readers
    const results: RewardResult[] = submissions.map((submission) => ({
      readerId: submission.readerId,
      score: this.calculateQuadraticScore(
        submission.predictedRating,
        trueDistribution
      ),
      reward: 0, // Placeholder
    }));

    // Calculate sum of scores (only positive scores contribute to reward)
    const totalScoreSum = results.reduce(
      (sum, result) => sum + Math.max(0, result.score),
      0
    );

    // Calculate rewards with confidence multiplier
    for (const result of results) {
      const submission = submissions.find(
        (s) => s.readerId === result.readerId
      )!;
      const multiplier = submission.bet / MIN_CONTRIBUTION;
      if (result.score > 0 && totalScoreSum > 0) {
        result.reward = (result.score / totalScoreSum) * totalPool * multiplier;
      } else {
        result.reward = 0; // No reward for negative or zero scores
      }
    }

    return results;
  }

  /**
   * Utility to get the average rating (optional, for reporting)
   */
  public getAverageRating(submissions: ReaderSubmission[]): number {
    if (submissions.length === 0) return 0;
    const sum = submissions.reduce((sum, s) => sum + s.predictedRating, 0);
    return sum / submissions.length;
  }
}

// Example usage
async function main() {
  // Simulated submissions (for testing)
  const submissions: ReaderSubmission[] = [
    { readerId: '1', predictedRating: 12, personalRating: 12, bet: 4 },
    { readerId: '2', predictedRating: 10, personalRating: 10, bet: 3 },
    { readerId: '3', predictedRating: 7, personalRating: 7, bet: 2 },
    // Add more submissions (e.g., 1000 readers)
    // For brevity, simulate 1000 readers with normal distribution
    ...Array.from({ length: 997 }, (_, i) => {
      // Simulate normal distribution centered at 12
      const rating = Math.min(
        MAX_RATING,
        Math.max(MIN_RATING, Math.round(12 + Math.random() * 6 - 3))
      );
      const bet = Math.random() > 0.7 ? 4 : Math.random() > 0.4 ? 3 : 2;
      return {
        readerId: `sim${i + 4}`,
        personalRating: rating,
        predictedRating: rating,
        bet: bet,
      };
    }),
  ];

  try {
    const service = new BookRewardService();
    const rewards = service.calculateRewards(submissions);
    console.log('Rewards:', rewards.slice(0, 3)); // Show first 3 for brevity
    console.log('Average Rating:', service.getAverageRating(submissions));
    console.log(
      'Total Pool:',
      submissions.reduce((sum, s) => sum + s.bet, 0)
    );
  } catch (error) {
    // Handle errors gracefully
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
}
