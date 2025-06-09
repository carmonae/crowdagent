import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from 'firebase/storage';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { Userprofile } from '@app/models/user-profile';
import { FileUploadComponent } from '@app/shared/component/file-upload/file-upload.component';

import { Router } from '@angular/router';
import {
  FictionSubtypes,
  NonFictionSubtypes,
} from '@app/models/genreTypes-enum';
import { UserDetails } from 'src/app/models/user-details';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
})
export class EditProfileComponent implements OnInit {
  @Input() myprofile!: Userprofile;

  private db = getDatabase();
  private storage = getStorage();

  private myuid: string | undefined;
  protected mydetails = new UserDetails();
  public avatarUrl = 'assets/images/user/user.png';

  protected roles = [
    'Guest',
    'Author',
    'Reader',
    'PiQuer',
    'Freelancer',
    'Agent',
  ];
  protected countries = [
    'United States',
    'Canada',
    'Mexico',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Netherlands',
    'Sweden',
    'Norway',
    'Finland',
    'Denmark',
    'Iceland',
    'Ireland',
    'Belgium',
    'Switzerland',
    'Austria',
    'Poland',
    'Czech Republic',
  ];
  protected states = [
    'None',
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
  ];
  detailsForm!: FormGroup;

  public genreTypesEnum: any;
  public selectedGenres: string[] = [];

  constructor(
    private authService: AuthService,
    private modal: NgbModal,
    private router: Router
  ) {
    this.detailsForm = new FormGroup({
      penName: new FormControl(''),
      role: new FormControl(''),
      slogan: new FormControl(''),
      genre: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zip: new FormControl(''),
      about: new FormControl(''),
      website: new FormControl(''),
      twitter: new FormControl(''),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      linkedin: new FormControl(''),
      youtube: new FormControl(''),
      tiktok: new FormControl(''),
      github: new FormControl(''),
    });
  }

  ngOnInit(): void {
    console.log('uid=', this.myprofile.uid);
    this.readUserDetails();
    this.getAvatar();
    this.generateGenreList();
  }

  generateGenreList(): void {
    this.genreTypesEnum = [
      ...Object.values(FictionSubtypes),
      ...Object.values(NonFictionSubtypes),
    ];
  }

  onGenreChange(event: any) {}

  readUserDetails(): void {
    const dbRef = ref(getDatabase());
    const url = `users/account/${this.myprofile.uid}/details`;
    console.log('url:', url);
    get(child(dbRef, url))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.mydetails = snapshot.val();
          console.log('User details:', this.mydetails);
          this.detailsForm.patchValue({
            penName: this.mydetails.penName,
            role: this.mydetails.role,
            slogan: this.mydetails.slogan,
            genre: this.mydetails.genre,
            address: this.mydetails.address,
            city: this.mydetails.city,
            state: this.mydetails.state,
            country: this.mydetails.country,
            zip: this.mydetails.zip,
            about: this.mydetails.about,
            website: this.mydetails.website,
            twitter: this.mydetails.twitter,
            facebook: this.mydetails.facebook,
            instagram: this.mydetails.instagram,
            linkedin: this.mydetails.linkedin,
            youtube: this.mydetails.youtube,
            tiktok: this.mydetails.tiktok,
            github: this.mydetails.github,
          });
        } else {
          console.log('No user details found');
        }
      })
      .catch((error) => {
        console.error('Error reading user details:', error);
      });
  }

  getAvatar(): void {
    const storeRef = storageRef(
      this.storage,
      `avatars/${this.myprofile.uid}/avatar.jpg`
    );
    // Get the download URL
    getDownloadURL(storeRef)
      .then((url) => {
        this.avatarUrl = url;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            console.log('document doesnt exist.');
            break;
          case 'storage/unauthorized':
            console.log('User doesnt have permission to access the object');
            break;
          case 'storage/canceled':
            console.log('User canceled the upload');
            break;

          case 'storage/unknown':
            console.log('Unknown error occurred, inspect the server response');
            break;
        }
      });
  }

  onRoleSelectType(event: any): void {
    console.log(event);
    this.mydetails.role = event.srcElement.innerText;
  }

  onChangePicture(): void {
    console.log('Change Picture');

    const path = {
      path: 'avatars/' + this.myprofile.uid,
    };

    const modalRef = this.modal.open(FileUploadComponent);
    modalRef.componentInstance.path = path;
    modalRef.result
      .then((url) => {
        this.avatarUrl = url;
      })
      .catch((error) => {
        console.error('Error uploading avatar', error);
      });
  }

  onSubmit(form: NgForm): void {
    console.log(form);
    const usersRef = ref(
      this.db,
      'users/account/' + this.myprofile.uid + '/details'
    );
    if (this.myprofile.uid == undefined) {
      this.myprofile.uid = this.myprofile.uid!;
      const pushRef = set(usersRef, form);
    } else {
      update(usersRef, form);
    }
    this.router.navigate(['dashboard']);
  }
}
//TODO: allow multiple roles
//TODO: align avatar and change button
