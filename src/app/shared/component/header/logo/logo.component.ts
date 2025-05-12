import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';
import { VerticalNavService } from 'src/app/shared/services/vertical-nav.service';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class LogoComponent {

  constructor(public navService: VerticalNavService, public navServices: NavService) { }

  openMenu() {
    this.navService.isDisplay = !this.navService.isDisplay;
  }
}