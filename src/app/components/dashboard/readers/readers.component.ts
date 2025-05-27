import { Component } from '@angular/core';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { CurrentBalanceComponent } from '../current-balance/current-balance.component';
import { ProfileGrettingComponent } from '../profile-gretting/profile-gretting.component';
@Component({
  selector: 'app-readers',
  templateUrl: './readers.component.html',
  styleUrls: ['./readers.component.scss'],
  standalone: true,
  imports: [ProfileGrettingComponent, CurrentBalanceComponent],
})
export class ReadersComponent {
  constructor(private authService: AuthService) {}
}
