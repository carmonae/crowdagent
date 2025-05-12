import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SvgIconComponent {

  @Input("icon") public icon: any;

  constructor(public layoutService: LayoutService){}

  getSvgType() {
    return document.getElementsByClassName("page-sub-header")[0].getAttribute("icon") == "stroke-svg";
  }
}
