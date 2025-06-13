import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-centered-modal',
  templateUrl: './centered-modal.component.html',
  styleUrls: ['./centered-modal.component.scss']
})
export class CenteredModalComponent {

  constructor(private modalService: NgbModal) { }

  centeredModal(centeredModalContent: TemplateRef<NgbModal>){
    const modalRef = this.modalService.open(centeredModalContent, { centered: true });
  }
  
}
