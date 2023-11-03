import { Component, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
//import * as Data from '../../../../shared/data/data/contacts/all-contact';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintComponent } from './print/print.component';
import { PiqueI } from 'src/app/models/pique-model';
const Swal = require('sweetalert2')

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public editContact: boolean = false;
  public editMoreDetails: boolean = false;
  public open: boolean = false;

  @Input() selectedata!: PiqueI;

  @ViewChild("printModal")
  PrintModal!: PrintComponent;


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  editMoreDetail() {
    const myElement = document.getElementById("edit-information") as HTMLElement;
    myElement.style.color = "white"
  }

  editMoreDetail1() {
    const myElement1 = document.getElementById("edit-information") as HTMLElement;
    myElement1.style.color = "#33BFBF"
  }

  deleteContact() {
    Swal.fire({
      text: 'This contact will be deleted from your Personal Contacts and from the chat list too.',
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#EFEFEE !important',
      confirmButtonColor: 'var(--theme-default)',
    }).then((result: { isConfirmed: boolean; isDenied: boolean; }) => {
      if (result.isConfirmed) {
      } else {
        Swal.fire('', 'Your contact is safe!')
      }
    })
  }

  openHistory() {
    this.open = !this.open;
  }


}
