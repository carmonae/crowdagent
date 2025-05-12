import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class AddCategoryComponent {

  @Output() tag: EventEmitter<string> = new EventEmitter<string>()
  public newTag: string = ''


  constructor(public activeModal: NgbActiveModal) { }

  saveTag(tag: string): void {
    this.tag.emit(tag)
    console.log(tag)
    this.close()
  }

  close(): void {
    this.activeModal.close()
  }
}
