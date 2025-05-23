import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-rating',
  templateUrl: './number-rating.component.html',
  styleUrls: ['./number-rating.component.scss'],
})
export class NumberRatingComponent {
  @Input() scorelabel: string = '';
  @Input() ratingLegend: string[] = [];
  @Output() hover = new EventEmitter<number>();

  public faRate = 0;

  get rating() {
    return this.faRate;
  }

  onChange(event: any) {
    this.hover.emit(event);
  }
}
