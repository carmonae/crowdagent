import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../../services/auth.service'

import { Userprofile } from '../../../../shared/data/data/users/user-profile'
import { getDatabase, ref, child, set, get, push, update } from 'firebase/database'
import { FileUploadComponent } from 'src/app/shared/component/file-upload/file-upload.component';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public myprofile = new Userprofile()

  private db = getDatabase()
  private uid: string | undefined;
  private name: string;
  private email: string;

  checkoutForm = this.formBuilder.group({
    email: '',
    password: '',
    url: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modal: NgbModal) {

    // Get the uuid of the account from the authentication service
    this.uid = this.authService.getUid();
    this.name = this.authService.getFullName();
    this.email = this.authService.getEmail();

    console.log('Database: ' + this.db.app.name)
    console.log('uid:' + this.uid)
    console.log(authService.getLoggedUser())

  };

  ngOnInit(): void {

    this.getUserProfile()

    this.myprofile.name = this.name
    this.myprofile.email = this.email

    console.log(this.myprofile);
  }

  getUserProfile() {

    const dbRef = ref(this.db);
    get(child(dbRef, `users/account/${this.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.exportVal())
        this.myprofile.occupation = snapshot.val()['occupation']
        this.myprofile.type = snapshot.val()['type']
        this.myprofile.bio = snapshot.val()['bio'];
        this.myprofile.password = snapshot.val()['password']
        this.myprofile.url = snapshot.val()['url']
        this.myprofile.uid = snapshot.val()['uid']
      }
      else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  onSelectType(event: any): void {
    console.log(event)
    this.myprofile.type = event.srcElement.innerText
  }

  onChangePicture(): void {
    console.log('Change Picture')

    const path = {
      path: 'avatars/' + this.uid,
      fileArchetype: 'avatar'
    }

    const modalRef = this.modal.open(FileUploadComponent);
    modalRef.componentInstance.path = path

  }

  onSubmit(form: NgForm): void {

    console.log(this.myprofile)
    const usersRef = ref(this.db, 'users/account/' + this.uid)
    if (this.myprofile.uid == undefined) {
      this.myprofile.uid = this.uid
      const pushRef = set(usersRef, this.myprofile);
    }
    else {
      update(usersRef, this.myprofile);
    }
  }
}