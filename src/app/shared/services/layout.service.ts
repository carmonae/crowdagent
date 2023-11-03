import { Injectable } from '@angular/core';

interface config {
  settings: setting,
  color : colors
}

interface setting {
  layout: string;
  layout_type: string;
  layout_version: string;
  sidebar_type: string;
  icon: string
}

interface colors {
  primary : string | null;
  secondary : string | null;
}
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public customizer : string = '';
  public config  = {
    settings: {
      layout: '',
      layout_type: 'ltr',
      layout_version: 'light-only',
      sidebar_type: 'material-icon',
      icon: "stroke-svg",
    },
    color: {
      primary: '#33BFBF',
      secondary: '#ff6150',
    },
  };

  constructor() {
    if (this.config.settings.layout_type == 'box-layout') {
      document.body.classList.add('box-layout');
    }
    document
      .getElementsByTagName('html')[0]
      .setAttribute('dir', this.config.settings.layout_type);

    document.documentElement.style.setProperty(
      '--theme-default',
      this.config.color.primary
    );
    document.documentElement.style.setProperty(
      '--theme-secondary',
      this.config.color.secondary
    );
  }
}
