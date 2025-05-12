import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PiqueI } from 'src/app/models/pique-model';
import { UserprojectDefault, UserprojectI } from 'src/app/models/user-project';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { PdfModalComponent } from '../modal/pdf-modal/pdf-modal.component';
import { PrintComponent } from './print/print.component';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class DetailsComponent implements OnInit {


  @Input() selectedata!: PiqueI;

  @ViewChild("printModal")
  PrintModal!: PrintComponent;

  public open: boolean = false;
  public project: UserprojectI = UserprojectDefault;

  public abstractEnabled = true;
  public tocEnabled = false;
  public manuscriptEnabled = false;

  constructor(
    private modal: NgbModal,
    private projService: ProjectsService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getAbstract()

  }

  getAbstract(): void {
    var _this = this
    this.projService.getProjects(this.selectedata.userUid, this.selectedata.projectUid)
      .subscribe({
        next(projects) {
          console.log('got projects:', projects)
          if (projects.length > 0) {
            _this.project = projects[0]
          }
          const modal = _this.modal.open(PdfModalComponent, { size: 'md' })
          modal.componentInstance.title = _this.project.title;
          modal.componentInstance.content = _this.project.abstract
        },
        error(msg) {
          console.log(msg)
        },
        complete() {
          console.log('getProjects finished')
        }
      });

  }

  piques(thumbsUp: boolean) {
    if (thumbsUp) {
      console.log('user piqued')
      this.tocEnabled = true
    }
    else {
      console.log('user unpiqued')
      this.tocEnabled = false

    }
  }

  close(): void {
    this.modal.dismissAll();
  }

}
