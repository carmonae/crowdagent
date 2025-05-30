import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-theme-mode',
  templateUrl: './theme-mode.component.html',
  styleUrls: ['./theme-mode.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ],
})
export class ThemeModeComponent {

  public dark: boolean = this.layout.config.settings.layout_version == 'dark-only' ? true : false;

constructor(public layout: LayoutService) {}

layoutToggle() {
  this.dark = !this.dark;
  this.dark
    ? document.body.classList.add('dark-only')
    : document.body.classList.remove('dark-only');
  this.layout.config.settings.layout_version = this.dark
    ? 'dark-only'
    : 'light-only';
    
}

ngOnInit(): void {}

}
