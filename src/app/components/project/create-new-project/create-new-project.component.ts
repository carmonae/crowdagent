import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { getDatabase, ref, set } from 'firebase/database';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import {
  FictionSubtypes,
  GenreTypes,
  NonFictionSubtypes,
} from '@app/models/genreTypes-enum';
import { ProjectStatus } from '@app/models/projectStatus';
import { Readership } from '@app/models/readership-enum';
import { SizeTypes } from '@app/models/sizeTypes-enum';
import { UserprojectDefault, UserprojectI } from '@app/models/user-project';
import { Usertitle } from '@app/models/user-titles';
import { WritingType } from '@app/models/writingType-enum';
import { CrowdAgentService } from '@app/shared/services/crowdagent.service';
import { FileUploadService } from '@app/shared/services/file-upload.service';
import { ProjectsService } from '@app/shared/services/projects.service';
import { GeneratePenName } from '@app/util/genpenname.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { UploadFileComponent } from './upload-file/upload-file.component';
interface FileCollection<File> {
  [key: string]: File;
}

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, UploadFileComponent],
})
export class CreateNewProjectComponent implements OnInit {
  @ViewChild('uploadModalContent') uploadModalContent!: TemplateRef<NgbModal>;
  private db = getDatabase();

  public project: UserprojectI = UserprojectDefault;
  public count: number = 0;
  public abstract: string = '';

  public uploadedFiles: FileCollection<File> = {};
  public isUploading: boolean = false;
  public maxAbstractLength = 1500;

  public readershipTypesEnum = Object.values(Readership);
  public writingTypesEnum = Object.values(WritingType);
  public sizeTypesEnum = Object.values(SizeTypes);
  public genreTypesEnum = Object.values(GenreTypes);
  public subgenreTypesEnum: any = Object.values(NonFictionSubtypes);

  private path = { path: 'manuscripts/', filename: 'manuscript.pdf' };
  private uid: string | undefined;
  private editing: boolean = false;

  lifeCycle = {
    Draft: ['Published', 'Archived'],
    Published: ['Parked', 'Archived'],
    Parked: ['Published', 'Archived'],
    Archived: [],
  };

  constructor(
    private authService: AuthService,
    private uploadService: FileUploadService,
    private router: Router,
    private penNameService: GeneratePenName,
    private modalService: NgbModal,
    private crowdAgentService: CrowdAgentService,
    private projectService: ProjectsService
  ) {
    this.uid = this.authService.getUid();
  }

  ngOnInit(): void {
    const temp = history.state;
    if (temp.projectUid) {
      var state: UserprojectI = UserprojectDefault;
      state = JSON.parse(JSON.stringify(temp));

      this.project = state;
      this.editing = true;
    } else {
      this.project = UserprojectDefault;
      this.project.projectUid = uuid();
      this.project.penname = 'Mark Twain';
      this.project.dateCreated = new Date().toISOString();
      this.editing = false;
      this.onGetPenName();
    }

    this.path.path = `project/documents/${this.uid}/${this.project.projectUid}`;
    this.count = this.project.abstract.length;
  }

  onGetPenName(): void {
    let _this = this;
    this.penNameService.getPenName('e', 'male', 'English').subscribe({
      next(penname) {
        _this.project.penname = penname;
        console.log('pen name:', _this.project.penname);
      },
      error(err: any) {
        console.log(err);
      },
      complete() {},
    });
  }

  onAbstractChange(event: any) {
    if (this.project.abstract.length > this.maxAbstractLength) {
      this.project.abstract = this.project.abstract.substring(
        0,
        this.maxAbstractLength
      );
      event.target.value = this.project.abstract;
    }
    this.count = this.project.abstract.length;
  }

  onGenreChange(event: any) {
    let genre = event.target.value;
    if (genre == 'Non-Fiction') {
      this.subgenreTypesEnum = Object.values(NonFictionSubtypes);
      this.project.subgenre = NonFictionSubtypes.PHILOSOPHY.valueOf();
    } else {
      this.subgenreTypesEnum = Object.values(FictionSubtypes);
      this.project.subgenre = FictionSubtypes.ADVENTURE.valueOf();
    }
  }

  onFilesUploaded(files: File[], type: string) {
    console.log('file selected:', files);
    if (files.length > 1) {
      console.log('Error: only one file allowed!');
    } else if (files.length == 1) {
      this.uploadedFiles[type] = files[0];
    }
  }

  onChangeStatus(item: string): void {
    this.project.status = item as ProjectStatus;
  }

  onAddProject() {
    console.log(this.project);

    if (!this.editing) {
      this.project.dateCreated = new Date().toISOString();
    }
    var _this = this;

    this.path.filename = `${this.uid}.${this.project.projectUid}.`;

    // upload the documents get the url as a reference
    const coverSubscription: Observable<string> =
      this.uploadService.pushFileToStorage(
        this.uploadedFiles['cover'],
        this.path + 'cover'
      );

    const tocSubscription: Observable<string> =
      this.uploadService.pushFileToStorage(
        this.uploadedFiles['toc'],
        this.path + 'toc'
      );

    const synopsisSubscription: Observable<string> =
      this.uploadService.pushFileToStorage(
        this.uploadedFiles['synopsis'],
        this.path + 'synopsis'
      );

    const chaptersSubscription: Observable<string> =
      this.uploadService.pushFileToStorage(
        this.uploadedFiles['chapters'],
        this.path + 'chapters'
      );

    this.isUploading = true;
    const modalRef = this.modalService.open(this.uploadModalContent, {
      centered: true,
      backdrop: 'static',
    });

    forkJoin([
      coverSubscription,
      tocSubscription,
      synopsisSubscription,
      chaptersSubscription,
    ]).subscribe({
      next: ([coverResults, tocResults, synopsisResults, chaptersResults]) => {
        console.log(
          'upload results',
          coverResults,
          tocResults,
          synopsisResults,
          chaptersResults
        );
        _this.project.coverurl = coverResults;
        _this.project.tocurl = tocResults;
        _this.project.abstracturl = synopsisResults;
        _this.project.samplechaptersurl = chaptersResults;
      },
      error: (err) => {
        console.log('Error during upload', err);
      },
      complete: () => {
        _this.isUploading = false;
        modalRef.dismiss();
        _this.done();
      },
    });

    // Increment number of book stats
    // If this is the first time user creates a project
    // we count them as new author
    if (!this.editing) {
      this.crowdAgentService.incrementBooks();
    }
  }

  saveProject(): void {
    // upload the manuscript and get the url as a reference, and save the project
    const projectRef = ref(
      this.db,
      `users/project/${this.uid}/${this.project.projectUid}`
    );
    set(projectRef, this.project);

    if (this.project.status === ProjectStatus.PUBLISHED) {
      const newTitle = new Usertitle(this.project, this.uid);
      console.log(this.project, newTitle);
      const titleRef = ref(this.db, `titles/${this.project.projectUid}`);
      set(titleRef, newTitle);
    }
  }

  onCancelAdd() {
    this.done();
  }

  done() {
    this.saveProject();
    this.router.navigateByUrl('projects/project-list', { state: this.project });
  }
}
