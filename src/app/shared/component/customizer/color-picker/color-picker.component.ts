import { Component } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  public primary: string = localStorage.getItem('--theme-default') || '#33BFBF';
  public secondary: string = localStorage.getItem('--theme-secondary') || '#FF6150';
  public MIXLayout: string = 'default';

  constructor(public layout: LayoutService) {
    var primary = localStorage.getItem('--theme-default');
    var secondary = localStorage.getItem('--theme-secondary');

    layout.config.color.primary = primary || '#33BFBF';
    layout.config.color.secondary = secondary || 'FF6150';

    document.documentElement.style.setProperty('--theme-default', primary);
    document.documentElement.style.setProperty('--theme-secondary', secondary);
  }

  applyColor() {
    document.documentElement.style.setProperty('--theme-default', this.primary);
    document.documentElement.style.setProperty(
      '--theme-secondary',
      this.secondary
    );
    localStorage.setItem('--theme-default', this.primary);
    localStorage.setItem('--theme-secondary', this.secondary);
    this.layout.config.color.primary = this.primary;
    this.layout.config.color.secondary = this.secondary;

    window.location.reload();
  }



  customizeMixLayout(val: string) {
    this.MIXLayout = val;
    this.layout.config.settings.layout_version = val;
    document.body?.classList.remove('light-only', 'dark-sidebar', 'dark-only');
    if (val === 'default') {
      document.body?.classList.add('light-only');
    } else if (val === 'dark-sidebar') {
      document.body?.classList.add('dark-sidebar');
    } else {
      document.body?.classList.add('dark-only');
    }
  }
}
