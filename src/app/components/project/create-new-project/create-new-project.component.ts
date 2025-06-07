import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { getDatabase, ref, set } from 'firebase/database';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { GenreTypes } from '@app/models/genreTypes-enum';
import { ProjectStatus } from '@app/models/projectStatus';
import { Readership } from '@app/models/readership-enum';
import { SizeTypes } from '@app/models/sizeTypes-enum';
import { UserprojectDefault, UserprojectI } from '@app/models/user-project';
import { Usertitle } from '@app/models/user-titles';
import { WritingType } from '@app/models/writingType-enum';
import { FileUploadService } from '@app/shared/services/file-upload.service';
import { GeneratePenName } from '@app/util/genpenname.util';
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
  private db = getDatabase();

  public project: UserprojectI = UserprojectDefault;
  public count: number = 0;
  public abstract: string = '';

  public uploadedFiles: FileCollection<File> = {};

  public maxAbstractLength = 1500;

  public readershipTypesEnum = Object.values(Readership);
  public writingTypesEnum = Object.values(WritingType);
  public sizeTypesEnum = Object.values(SizeTypes);
  public genreTypesEnum = Object.values(GenreTypes);

  private path = { path: 'manuscripts/', filename: 'manuscript.pdf' };
  private uid: string | undefined;

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
    private penNameService: GeneratePenName
  ) {
    this.uid = this.authService.getUid();
  }

  ngOnInit(): void {
    const temp = this.router.getCurrentNavigation()?.extras.state;

    if (temp) {
      var state: UserprojectI = UserprojectDefault;
      state = JSON.parse(JSON.stringify(temp));

      this.project = state;
    } else {
      this.project = UserprojectDefault;
      this.project.projectUid = uuid();
      this.project.penname = 'Mark Twain';
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

    // upload the document if one added and get the url as a reference
    this.project.dateCreated = new Date();
    var urls: string[] = [];
    var _this = this;
    for (const key in this.uploadedFiles) {
      const fileuid = uuid();
      this.path.filename = `${this.uid}.${this.project.projectUid}.${key}`;

      this.uploadService
        .pushFileToStorage(this.uploadedFiles[key], this.path)
        .subscribe({
          next(url) {
            console.log('got url:', url);
            urls.push(url);
          },
          error(msg) {
            console.log(msg);
          },
          complete() {
            console.log('Push finished', urls);
            _this.project.coverurl = urls[0];
            _this.project.abstracturl = urls[1];
            _this.project.tocurl = urls[2];
            _this.project.samplechaptersurl = urls[3];
            _this.saveProject();
          },
        });
    }
    this.done();
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
    this.router.navigateByUrl('projects/project-list');
  }
}
