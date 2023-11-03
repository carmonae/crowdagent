import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  public userId: string | undefined;
  public username: string | undefined;
  public email: string | undefined;

  constructor(private authService: AuthService) {
    this.userId = authService.getUid();
    this.username = authService.getFullName();
    this.email = authService.getEmail();
  }
}
