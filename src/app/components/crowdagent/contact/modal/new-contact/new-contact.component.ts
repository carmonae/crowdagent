import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AllcontactData, addContact } from 'src/app/shared/data/data/contacts/all-contact';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent {

  public validate = false;
  public allcontactData = AllcontactData;
  public data : any;

  constructor(public activeModal: NgbActiveModal) {}


  ngOnInit(): void {
  }

  myForm = new FormGroup( {
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email : new FormControl('', [Validators.email,Validators.required]),
    mobile : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    img : new FormControl('assets/images/user/2.png'),
 })

 add(){
  this.data = this.myForm.value;
  this.allcontactData.push(this.data);
  this.activeModal.dismiss();
 }
  public submit() {
    this.validate = !this.validate;
  }

  get firstName(){
    return this.myForm.get('firstName');
  }

  get lastName(){
    return this.myForm.get('lastName');
  }

  get email(){
    return this.myForm.get('email');
  }

  get mobile(){
    return this.myForm.get('mobile');
  }
}
