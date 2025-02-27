import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pdf-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrls: ['./pdf-modal.component.scss']
})
export class PdfModalComponent {
  @Input() title: string = '';
  @Input() content: string = ''

  constructor(private modal: NgbModal) { }

  close() {
    this.modal.dismissAll();
  }

}
