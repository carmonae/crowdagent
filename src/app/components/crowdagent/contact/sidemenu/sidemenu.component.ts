import { Component, Input } from '@angular/core';
import * as Data from '../../../../shared/data/data/sidemenu'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryComponent } from '../modal/add-category/add-category.component';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {

  @Input() username: string | undefined
  @Input() email: string | undefined
  public contactSidemenu = Data.ContactSidemenu
  public open: boolean = false;

  constructor(private modalService: NgbModal) { }

  openMenu() {
    this.open = !this.open
  }

  openAddTag() {
    this.modalService.open(AddCategoryComponent)
  }
}
