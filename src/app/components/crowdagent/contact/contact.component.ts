import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TagI } from 'src/app/models/tag-interface';
import { AuthService } from 'src/app/services/auth.service';
import { AllContactComponent } from './all-contact/all-contact.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SidemenuComponent,
        AllContactComponent
    ]
})
export class ContactComponent implements OnInit {

  @ViewChild(SidemenuComponent) sideMenuRef!: SidemenuComponent;

  public userId: string | undefined;
  public username: string | undefined;
  public email: string | undefined;
  public currentView: string = ''
  public tags: TagI[] = []

  constructor(private authService: AuthService) {
    this.userId = authService.getUid();
    this.username = authService.getFullName();
    this.email = authService.getEmail();
  }

  ngOnInit(): void {
  }

  changeView(tag: string): void {
    this.currentView = tag
    console.log("contact.component received a change view event:", this.currentView)
  }
}
