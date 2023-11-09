import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
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
