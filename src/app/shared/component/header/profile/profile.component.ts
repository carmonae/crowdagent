import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Userprofile } from 'src/app/shared/data/data/users/user-profile';
import { getDatabase, ref, child, set, get, push, update } from 'firebase/database'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public myprofile = new Userprofile()
  public name: string;
  public email: string;

  private db = getDatabase()
  private uid: string | undefined;

  constructor(private router: Router, private authService: AuthService) {
    // Get the uuid of the account from the authentication service
    this.uid = this.authService.getUid();
    this.name = this.authService.getFullName();
    this.email = this.authService.getEmail();

  }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.clear();
    this.authService.logout()
  }
}
