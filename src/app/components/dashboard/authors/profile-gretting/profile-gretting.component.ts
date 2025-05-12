import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/service/auth.firebase.service';

@Component({
    selector: 'app-profile-gretting',
    templateUrl: './profile-gretting.component.html',
    styleUrls: ['./profile-gretting.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class ProfileGrettingComponent implements OnInit {
  firstName = '?'

  constructor(private authService: AuthService) {
    this.firstName = this.authService.getFullName()
  }

  ngOnInit() {
  }
}