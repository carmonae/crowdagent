import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { Pique, PiqueI, PiqueLevel } from '@app/models/pique-model';
import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import { SafePipe } from '@app/shared/pipes/safe.pipe';
import { PiquesService } from '@app/shared/services/piques.service';
import { UserService } from '@app/shared/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getDatabase, ref, set } from 'firebase/database';
import { DetailsComponent } from '../details/details.component';
import { TagProjectComponent } from '../modal/tag-project/tag-project.component';

@Component({
  selector: 'app-all-contact',
  templateUrl: './all-contact.component.html',
  styleUrls: ['./all-contact.component.scss'],
  standalone: true,
  imports: [CommonModule, DetailsComponent, SafePipe, FeatherIconsComponent],
})
export class AllContactComponent implements OnInit, OnChanges {
  @Input() user: string | undefined;
  @Input() sideMenuRef: any;
  @Input() currentView: string = '';
  @Output() selectedata!: PiqueI;

  private db = getDatabase();
  private uid: string | undefined;

  public allTitles: PiqueI[] = [];
  public filteredTitles: PiqueI[] = [];

  public amountLeft: number = 0;

  public thispage: number = 1;
  public nextpage: number = this.thispage + 1;
  public pageafternext: number = this.nextpage + 1;
  public currentPage: number = 1;
  public lastpage: number = 1;
  public maxItems = 4;
  public nextItem = 0;

  constructor(
    private authService: AuthService,
    private piqueService: PiquesService,
    private userService: UserService,
    public modalService: NgbModal
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    var _this = this;
    this.piqueService.getPiques(this.user!).subscribe({
      next(piques) {
        console.log('got piques:', piques);
        _this.allTitles = piques;
        _this.filteredTitles = _this.allTitles;
        _this.lastpage = Math.ceil(
          _this.filteredTitles.length / _this.maxItems
        );
        _this.selectedata = new Pique(_this.filteredTitles[0]);
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getPiques finished');
      },
    });

    this.userService.getUserPiques(this.uid!).subscribe({
      next(piques) {
        console.log('got piques:', piques);
        _this.amountLeft = piques.amountLeft;
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('got amount of piques left for user', _this.amountLeft);
      },
    });
  }

  ngOnChanges(property: SimpleChanges): void {
    console.log('all-contact received change of view', this.currentView);
    this.filterTitles();
  }

  filterTitles(): void {
    if (this.currentView.toLowerCase() == 'all') {
      this.filteredTitles = this.allTitles;
    } else {
      this.filteredTitles = this.allTitles.filter((title) => {
        let found: boolean = false;
        if (title.tags !== undefined) {
          found =
            title.tags.find(
              (tag) =>
                tag['tag'].toLowerCase() == this.currentView.toLowerCase()
            ) != undefined;
        }
        return found;
      });
    }
    this.gotoPage(1);
  }

  getBookCover(data: any): string {
    if (data.coverurl) {
      return data.coverurl;
    } else {
      return 'assets/image/blankBookCover.jpg';
    }
  }

  getDataForDetails(id: string | undefined) {
    const getselectedData = this.allTitles.filter((data) => {
      return data.projectUid === id;
    });

    this.selectedata = getselectedData[0];
    console.log(id, this.selectedata);
  }

  gotoPage(page: number): void {
    this.lastpage = Math.ceil(this.filteredTitles.length / this.maxItems);
    if (page > this.currentPage && page > this.pageafternext) {
      this.thispage += 1;
      this.nextpage = this.thispage + 1;
      this.pageafternext = this.nextpage + 1;
    } else if (page < this.currentPage && page < this.thispage) {
      this.thispage -= 1;
      this.nextpage = this.thispage + 1;
      this.pageafternext = this.nextpage + 1;
    }
    this.currentPage = page;
    this.nextItem = (this.currentPage - 1) * this.maxItems;
  }

  contextMenu(event: Event, id: string | undefined): void {
    event.preventDefault();
    this.getDataForDetails(id);

    const getSelectedData = this.allTitles.filter((data) => {
      return data.projectUid === id;
    });

    const modalRef = this.modalService.open(TagProjectComponent);
    modalRef.componentInstance.possibleTags = this.sideMenuRef.userDefinedViews;
    modalRef.componentInstance.currentlySelectedTags = this.selectedata.tags
      ? this.selectedata.tags
      : [];
    modalRef.componentInstance.newTags.subscribe((tagList: any) => {
      console.log(tagList);
      this.selectedata.tags = tagList;
      this.storeTags(id);
    });

    console.log('Context Menu', event, getSelectedData);
  }

  storeTags(projectId: string | undefined) {
    if (projectId) {
      const tagsRef = ref(this.db, `piques/${this.uid}/${projectId}`);
      set(tagsRef, this.selectedata);
    }
  }

  checkOrCircle(data: PiqueI, segment: string): string {
    const requestedLevel =
      PiqueLevel[segment.toUpperCase() as keyof typeof PiqueLevel];
    const actualLevel =
      PiqueLevel[data.level.toUpperCase() as keyof typeof PiqueLevel];
    let result: string = actualLevel < requestedLevel ? 'circle' : 'check';
    return result;
  }

  badgeColor(data: PiqueI, segment: string): string {
    const requestedLevel =
      PiqueLevel[segment.toUpperCase() as keyof typeof PiqueLevel];
    const actualLevel =
      PiqueLevel[data.level.toUpperCase() as keyof typeof PiqueLevel];
    let result: string = actualLevel < requestedLevel ? 'warning' : 'primary';
    return result;
  }
}
//TODO: fix width the title, toc, synopsis, manuscript buttons
