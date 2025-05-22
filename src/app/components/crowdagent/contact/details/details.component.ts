import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@app/auth//service/auth.keycloak.service';
import { ModalBookscoreComponent } from '@app/shared/modal/bookscore-modal/bookscore.modal.component';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';
import { PiquesService } from '@app/shared/services/piques.service';
import { ScriptService } from '@app/shared/services/script.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PiqueI } from 'src/app/models/pique-model';
import { UserprojectDefault, UserprojectI } from 'src/app/models/user-project';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { PrintComponent } from './print/print.component';

enum levelOpen {
  title = 1,
  toc = 2,
  abstract = 3,
  manuscipt = 4,
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [CommonModule, TruncatePipe, NgbModule],
})
export class DetailsComponent implements OnInit {
  @Input() selectedata!: PiqueI;

  @ViewChild('printModal')
  PrintModal!: PrintComponent;

  private uid: string | undefined;

  public open: boolean = false;
  public project: UserprojectI = UserprojectDefault;

  public tocEnabled: boolean = true;
  public abstractEnabled: boolean = false;
  public manuscriptEnabled: boolean = false;

  public active = 1;

  public showScore: boolean = false;

  constructor(
    private authService: AuthService,
    private modal: NgbModal,
    private projService: ProjectsService,
    private piqueService: PiquesService,
    private scriptService: ScriptService
  ) {}

  ngOnInit(): void {
    this.uid = this.authService.getUid();
  }

  ngOnChanges(changes: SimpleChanges) {
    let key = this.selectedata.level as keyof typeof levelOpen;
    this.active = levelOpen[key];
  }

  getAbstract(): void {
    var _this = this;
    this.projService
      .getProjects(this.selectedata.userUid, this.selectedata.projectUid)
      .subscribe({
        next(projects) {
          console.log('got projects:', projects);
          if (projects.length > 0) {
            _this.project = projects[0];
          }
        },
        error(msg) {
          console.log(msg);
        },
        complete() {
          console.log('getProjects finished');
        },
      });
  }

  piques(thumbsUp: boolean) {
    if (thumbsUp) {
      console.log('title piqued');
      if (this.active == 3) {
        this.modal.open(ModalBookscoreComponent);
      }
      if (this.active == 2) {
        this.manuscriptEnabled = true;
        this.active = 3;
        this.piqueService.updateLevel(
          this.uid!,
          this.selectedata.projectUid!,
          'abstract'
        );
      } else if (this.active == 1) {
        this.abstractEnabled = true;
        this.active = 2;
        this.piqueService.updateLevel(
          this.uid!,
          this.selectedata.projectUid!,
          'toc'
        );
      }
    } else {
      console.log('title unpiqued');
      if (this.active == 2) {
        this.manuscriptEnabled = false;
        this.abstractEnabled = false;
        this.piqueService.updateLevel(
          this.uid!,
          this.selectedata.projectUid!,
          'toc'
        );
      } else if (this.active == 1) {
        this.manuscriptEnabled = false;
        this.abstractEnabled = false;
        this.piqueService.updateLevel(
          this.uid!,
          this.selectedata.projectUid!,
          'title'
        );
      }
    }
    console.log('active tab = ', this.active);
  }

  close(): void {
    this.modal.dismissAll();
  }
}
