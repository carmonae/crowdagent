import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { Userprofile } from '@app/models/user-profile';
import { KeycloakProfile } from 'keycloak-js';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

export interface ExtendedKeycloakProfile extends KeycloakProfile {
    attributes?: {[key: string]: string};
  }
  
@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    standalone: true,
    imports: [CommonModule, MyProfileComponent, EditProfileComponent]
})
export class UserEditComponent {

  private profilePromise!: Promise<KeycloakProfile>;
  public myprofile = new Userprofile()
  public isReady = false;


  constructor(
    private authService: AuthService,
    ) {

  };

  ngOnInit(): void {
    this.getProfile()
    console.log(this.myprofile);
  }

  getProfile(): void{

    this.profilePromise = this.authService.loadUserProfile();    
    this.profilePromise.then((profile) => {
      this.myprofile.uid = profile.id!;
      this.myprofile.firstname = profile.firstName!;
      this.myprofile.lastname = profile.lastName!;
      this.myprofile.email = profile.email!;
      this.myprofile.phone = (profile as ExtendedKeycloakProfile).attributes?.['phone'][0]!;
      this.isReady = true;
    }).catch((error) => {
      console.error('Error loading user profile:', error);
    });

  }

}
