import numpy as np
import matplotlib.pyplot as plt

# Set random seed for reproducibility
np.random.seed(42)

# Simulate ratings for different distributions (1-5 scale)
n_reviews = 1000  # Number of reviews per distribution

# Flat distribution: Equal probability for each rating
flat_ratings = np.random.choice([1, 2, 3, 4, 5], size=n_reviews, p=[0.2, 0.2, 0.2, 0.2, 0.2])

# Spiked distribution: Mostly around 4 stars
spiked_ratings = np.random.choice([1, 2, 3, 4, 5], size=n_reviews, p=[0.05, 0.05, 0.1, 0.7, 0.1])

# Normal distribution: Centered around 3 stars
normal_ratings = np.clip(np.round(np.random.normal(loc=3, scale=0.8, size=n_reviews)), 1, 5)

# Skewed distribution (left-skewed): More high ratings
skewed_ratings = np.clip(np.round(np.random.gamma(shape=2, scale=1, size=n_reviews)), 1, 5)

# Multi-modal distribution: Peaks at 1 and 5 stars
multi_modal_ratings = np.concatenate([
    np.random.choice([1, 2], size=n_reviews//2, p=[0.8, 0.2]),
    np.random.choice([4, 5], size=n_reviews//2, p=[0.2, 0.8])
])

# List of distributions and their names
distributions = [
    (flat_ratings, "Flat"),
    (spiked_ratings, "Spiked"),
    (normal_ratings, "Normal"),
    (skewed_ratings, "Left-Skewed"),
    (multi_modal_ratings, "Multi-Modal")
]

# Create a 2x3 subplot grid (last subplot will be empty)
fig, axes = plt.subplots(2, 3, figsize=(15, 8))
axes = axes.flatten()

# Plot histograms for each distribution
for i, (ratings, name) in enumerate(distributions):
    # Calculate mean rating
    mean_rating = np.mean(ratings)
    
    # Plot histogram
    axes[i].hist(ratings, bins=[0.5, 1.5, 2.5, 3.5, 4.5, 5.5], edgecolor='black', alpha=0.7)
    axes[i].axvline(mean_rating, color='red', linestyle='--', label=f'Mean: {mean_rating:.2f}')
    axes[i].set_title(f"{name} Distribution")
    axes[i].set_xlabel("Rating (1-5)")
    axes[i].set_ylabel("Frequency")
    axes[i].set_xticks([1, 2, 3, 4, 5])
    axes[i].legend()
    axes[i].grid(True, alpha=0.3)

# Remove the empty subplot
axes[-1].axis('off')

# Adjust layout
plt.tight_layout()

# Save the plot
plt.savefig('book_ratings_distributions.png')