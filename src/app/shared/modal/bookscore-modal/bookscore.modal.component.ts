import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NumberRatingComponent } from '@app/shared/widget/number-rating/number-rating.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { legendData, RatingTuple } from '../../../models/ratings';

@Component({
  selector: 'app-modal-bookscore',
  templateUrl: './bookscore.modal.component.html',
  styleUrls: ['./bookscore.modal.component.scss'],
})
export class ModalBookscoreComponent {
  @ViewChild('personalRating') personalRatingView!: NumberRatingComponent;
  @ViewChild('ratingPrediction') ratingPredictionView!: NumberRatingComponent;

  @Input() maxAmount: number = 100;
  @Output() rating = new EventEmitter<RatingTuple>();

  validate: boolean = false;

  ratingsLegend: string[] = [];
  ratingDescription: string = '';
  bet: number = 50;

  constructor(private modal: NgbActiveModal) {
    for (const item of legendData) {
      this.ratingsLegend.push(item.designation + ' - ' + item.description);
    }
  }

  onHover(event: number): void {
    this.ratingDescription = this.ratingsLegend[event];
  }

  onBetChange(event: any): void {
    this.bet = event.target.value;
    if (this.bet < 0) {
      this.bet = 0;
    } else if (this.bet > this.maxAmount) {
      this.bet = this.maxAmount;
    }
  }

  increment() {
    this.bet += 1;
    if (this.bet >= 100) {
      this.bet = 100;
    }
  }

  decrement() {
    this.bet -= 1;
    if (this.bet < 0) {
      this.bet = 0;
    }
  }

  public submit() {
    this.validate = !this.validate;
    console.log('personal rating:', this.personalRatingView.rating);
    console.log('predicted rating:', this.ratingPredictionView.rating);
    var result = {
      projId: '',
      personalRating: this.personalRatingView.rating,
      predictedRating: this.ratingPredictionView.rating,
      bet: this.bet,
    };
    this.modal.close(result);
    this.modal.dismiss();
  }
}
