import { Component, Input } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.scss'],
  standalone: true,
  imports: [],
})
export class FeatherIconsComponent {

  @Input('icon') public icon: string | undefined;
  @Input() class: string | undefined;

  constructor() { }

  ngAfterViewInit() {
    feather.replace();
  }
}
