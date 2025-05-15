import { Component, Input, OnInit } from '@angular/core';


import { AuthService } from 'src/app/auth/service/auth.keycloak.service';

import { CommonModule } from '@angular/common';
import { Userprofile } from '@app/models/user-profile';
import { PhonePipe } from '@app/shared/pipes/phone.pipe';
import { KeycloakProfile } from 'keycloak-js';


export interface ExtendedKeycloakProfile extends KeycloakProfile {
  attributes?: {[key: string]: string};
}

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
    standalone: true,
    imports: [CommonModule, PhonePipe]
})
export class MyProfileComponent implements OnInit {

  @Input() myprofile!:Userprofile;

  //public myprofile = new Userprofile()

  private profilePromise!: Promise<KeycloakProfile>;

  constructor(
    private authService: AuthService,
    ) {

  };


  ngOnInit(): void {
    this.getProfile()
    console.log('myprofile:',this.myprofile);
    //console.log('profile:', this.profile)
  }

  getProfile(): void{

    this.profilePromise = this.authService.loadUserProfile();    
    this.profilePromise.then((profile) => {
      this.myprofile.uid = profile.id!;
      this.myprofile.firstname = profile.firstName!;
      this.myprofile.lastname = profile.lastName!;
      this.myprofile.email = profile.email!;
      this.myprofile.phone = (profile as ExtendedKeycloakProfile).attributes?.['phone'][0]!;
    }).catch((error) => {
      console.error('Error loading user profile:', error);
    });

  }

}