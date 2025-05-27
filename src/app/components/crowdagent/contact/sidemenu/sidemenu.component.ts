import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getDatabase, ref, set } from 'firebase/database';
import { UserTagsService } from 'src/app/shared/services/user-tags-service.service';
import { TagI } from '../../../../models/tag-interface';
import { AddCategoryComponent } from '../modal/add-category/add-category.component';

//TODO: delete an existing view

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SidemenuComponent implements OnInit {
  @Input() username: string | undefined;
  @Input() email: string | undefined;

  @Output() tags: EventEmitter<TagI[]> = new EventEmitter<TagI[]>();
  @Output() currentViewEvent: EventEmitter<string> = new EventEmitter<string>();

  public open: boolean = false;

  public permanentViews = [
    { tag: 'All' },
    { tag: 'Recent' },
    { tag: 'Closed' },
  ];

  public userDefinedViews: TagI[] = [];
  public currentView: string = 'All';

  private db = getDatabase();
  private uid: string | undefined;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private tagsService: UserTagsService
  ) {
    this.uid = authService.getUid();
  }
  ngOnInit(): void {
    const _this = this;
    this.tagsService.getTags(this.uid!).subscribe({
      next(tags) {
        console.log('got tags:', tags);
        _this.userDefinedViews = tags;
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('sidemenu.getTags finished');
      },
    });
  }

  openMenu() {
    this.open = !this.open;
  }

  openAddTag() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.tag.subscribe((newTag: any) => {
      this.userDefinedViews.push({ tag: newTag });
      this.storeTags();
    });
  }

  openRemoveTag() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.tag.subscribe((discardedTag: any) => {
      this.removeTag(discardedTag);
    });
  }

  getTags() {
    const tagsRef = ref(this.db, `users/account/${this.uid}/tags`);
  }

  storeTags() {
    const tagsRef = ref(this.db, `users/account/${this.uid}/tags`);
    set(tagsRef, this.userDefinedViews);
    this.tags.emit(this.userDefinedViews);
  }

  //TODO remove tags from titles
  removeTag(tag: string): void {
    this.userDefinedViews = this.userDefinedViews.filter(
      (item: TagI) => item.tag !== tag
    );
    this.storeTags();
  }

  changeView(tag: string): void {
    this.currentView = tag;
    this.currentViewEvent.emit(this.currentView);
    console.log(this.currentView);
  }
}
