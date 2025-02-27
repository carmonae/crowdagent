import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/service/auth.firebase.service'

@Component({
  selector: 'app-profile-gretting',
  templateUrl: './profile-gretting.component.html',
  styleUrls: ['./profile-gretting.component.scss']
})
export class ProfileGrettingComponent implements OnInit {
  firstName = '?'

  constructor(private authService: AuthService) {
    this.firstName = this.authService.getFullName()
  }

  ngOnInit() {
  }
}