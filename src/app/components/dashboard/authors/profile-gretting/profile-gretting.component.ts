import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../auth/service/auth.keycloak.service';

@Component({
    selector: 'app-profile-gretting',
    templateUrl: './profile-gretting.component.html',
    styleUrls: ['./profile-gretting.component.scss'],
    standalone: true,
    imports: []
})
export class ProfileGrettingComponent implements OnInit {
  firstName = '?'
  dayPart = '?'

  nInDraft = 0
  nInReview = 0
  nInPublished = 0
  nInArchived = 0
  nInDeleted = 0

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.firstName = this.authService.getFirstName()
    const hour = new Date().getHours()
    if (hour < 12) {
      this.dayPart = 'morning'
    }
    else if (hour < 18) {
      this.dayPart = 'afternoon'
    }
    else {
      this.dayPart = 'evening'
    }
  }
}