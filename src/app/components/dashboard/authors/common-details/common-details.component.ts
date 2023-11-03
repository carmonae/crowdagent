import { Component, Input } from '@angular/core';
import { commonDetails } from 'src/app/shared/data/data/default-dashboard/default-dashboard';

@Component({
  selector: 'app-common-details',
  templateUrl: './common-details.component.html',
  styleUrls: ['./common-details.component.scss']
})
export class CommonDetailsComponent {

  @Input()
  data!: commonDetails;
  public isOpen = false;

  openMenu(i: number) {
    if (this.data.id === i) {
      this.isOpen = !this.isOpen;
    }
  }

}
