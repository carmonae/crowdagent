import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../services/layout.service';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { QuickOptionComponent } from './quick-option/quick-option.component';
@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ColorPickerComponent,
    QuickOptionComponent,
  ],
})
export class CustomizerComponent {
  constructor(
    private modalService: NgbModal,
    public layoutService: LayoutService
  ) {}

  Customizer(val: string) {
    this.layoutService.customizer = val;
  }

  openModal(popup: any) {
    this.modalService.open(popup, {
      backdropClass: 'dark-modal',
      centered: true,
    });
  }
  copyText(data: any) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(data);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
