import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { PiqueI } from '@app/models/pique-model';
import { RatingTuple } from '@app/models/ratings';
import { PiquesService } from '@app/shared/services/piques.service';
import { ProjectsService } from '@app/shared/services/projects.service';
import {
  BookRewardService,
  ReaderSubmission,
  RewardResult,
} from '@app/shared/services/reward.service';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss'],
  standalone: true,
  imports: [RouterLink, DecimalPipe],
})
export class CurrentBalanceComponent {
  public totalPiques: number = 0;
  public piquesThisWeek: number = 0;
  public nBooks: number = 0;
  public averagePiques: number = 0;
  public maxPiques: number = 0;

  public uid: string | undefined;
  public piqueListData: PiqueI[] = [];
  public ratings: RatingTuple[] = [];
  public reward: RewardResult = { readerId: '', reward: 0, score: 0 };

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService,
    private piqueService: PiquesService
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    var _this = this;
    this.piqueService.getPiques(this.uid!).subscribe({
      next(piques) {
        console.log('currentBalance.got piques', piques);
        _this.piqueListData = piques;
        _this.getChartData();
      },
      error(msg) {
        console.log('error:', msg);
      },
      complete() {
        _this.nBooks = _this.piqueListData.length;
      },
    });
  }

  getChartData(): void {
    console.log('getChartData:', this.piqueListData);

    let rewardService = new BookRewardService();

    //TODO: remove BookReward test
    this.test();

    var _this = this;
    for (let pique of this.piqueListData) {
      console.log('getting reward for title:', pique);
      this.projectsService
        .getProjects(pique.userUid, pique.projectUid)
        .subscribe({
          next(books) {
            console.log('book details:', books);
            let ratings = books[0].ratings;
            console.log('book ratings:', ratings);
            for (let id in ratings) {
              console.log('rating id:', id);
              _this.ratings.push({
                projId: '',
                readerId: ratings[id].readerId,
                personalRating: ratings[id].scoreM,
                predictedRating: ratings[id].scoreM2,
                bet: ratings[id].bet,
              });
            }
            console.log('ratingTuples', _this.ratings);
          },
          error(msg) {
            console.log('error: ', msg);
          },
          complete() {
            for (let reward of rewardService.calculateRewards(_this.ratings)) {
              if (reward.readerId == _this.uid) {
                console.log('reward:', reward.reward);
                _this.reward.reward += reward.reward;
                _this.maxPiques = Math.max(
                  _this.reward.reward,
                  _this.maxPiques
                );
              }
            }
            console.log('total reward=', _this.reward);
            _this.totalPiques = _this.reward.reward;
            _this.averagePiques = _this.totalPiques / _this.nBooks;
          },
        });
    }
  }

  test(): void {
    // Configuration constants
    const MIN_CONTRIBUTION = 2;
    const MAX_CONTRIBUTION = 4;
    const MIN_RATING = 1;
    const MAX_RATING = 20;
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
}
