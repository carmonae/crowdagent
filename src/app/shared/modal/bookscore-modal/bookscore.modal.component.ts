import { Component } from '@angular/core';
import { legendData } from '../../../models/ratings';

@Component({
  selector: 'app-modal-bookscore',
  templateUrl: './bookscore.modal.component.html',
  styleUrls: ['./bookscore.modal.component.scss'],
})
export class ModalBookscoreComponent {
  validate: boolean = false;

  ratingsLegend: string[] = [];

  constructor() {
    for (const item of legendData) {
      console.log(item);
      this.ratingsLegend.push(item.designation + '-' + item.description);
    }
  }
  public submit() {
    this.validate = !this.validate;
  }
}
