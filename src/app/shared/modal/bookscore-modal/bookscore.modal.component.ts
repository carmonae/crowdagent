import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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

  @Output() rating = new EventEmitter<RatingTuple>();

  validate: boolean = false;

  ratingsLegend: string[] = [];
  ratingDescription: string = '';

  constructor(private modal: NgbActiveModal) {
    for (const item of legendData) {
      this.ratingsLegend.push(item.designation + ' - ' + item.description);
    }
  }

  onHover(event: number): void {
    this.ratingDescription = this.ratingsLegend[event];
  }

  public submit() {
    this.validate = !this.validate;
    console.log('personal rating:', this.personalRatingView.rating);
    console.log('predicted rating:', this.ratingPredictionView.rating);
    var result = {
      projId: '',
      personalRating: this.personalRatingView.rating,
      predictedRating: this.ratingPredictionView.rating,
    };
    this.modal.close(result);
    this.modal.dismiss();
  }
}
