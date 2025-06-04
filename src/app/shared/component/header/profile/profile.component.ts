import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from 'firebase/storage';
import { AuthService } from 'src/app/auth/service/auth.keycloak.service';
import { Userprofile } from 'src/app/shared/data/data/users/user-profile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class ProfileComponent {
  public myprofile = new Userprofile();
  public name: string = '';
  public email: string = '';
  public avatarUrl: string = 'assets/images/user/user.png';

  private uid: string | undefined;

  private storage = getStorage();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .loadUserProfile()
      .then((profile) => {
        this.uid = profile.id!;
        this.name = profile.firstName! + ' ' + profile.lastName;
        this.email = profile.email!;
        this.getAvatar();
      })
      .catch((error) => {
        console.error('Error loading user profile:', error);
      });
  }

  getAvatar(): void {
    const storeRef = storageRef(this.storage, `avatars/${this.uid}/avatar.jpg`);
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

  logOut() {
    localStorage.clear();
    this.authService.logout('/landing');
  }
}
