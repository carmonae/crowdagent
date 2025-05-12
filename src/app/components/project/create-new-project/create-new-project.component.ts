import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { getDatabase, ref, set } from 'firebase/database';

import { GenreTypes } from 'src/app/models/genreTypes-enum';
import { ProjectStatus } from 'src/app/models/projectStatus';
import { Readership } from 'src/app/models/readership-enum';
import { SizeTypes } from 'src/app/models/sizeTypes-enum';
import { UserprojectDefault, UserprojectI } from 'src/app/models/user-project';
import { Usertitle } from 'src/app/models/user-titles';
import { WritingType } from 'src/app/models/writingType-enum';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-create-new-project',
    templateUrl: './create-new-project.component.html',
    styleUrls: ['./create-new-project.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        UploadFileComponent
    ]
})
export class CreateNewProjectComponent implements OnInit {

  @Input()
  set aproject(project: UserprojectI) {
    this.project = project
  }

  private db = getDatabase()

  public project: UserprojectI = UserprojectDefault;
  public count: number = 0
  public abstract: string = ''
  public uploadedFiles: File[] = [];

  public maxAbstractLength = 1500

  public readershipTypesEnum = Object.values(Readership)
  public writingTypesEnum = Object.values(WritingType)
  public sizeTypesEnum = Object.values(SizeTypes)
  public genreTypesEnum = Object.values(GenreTypes)

  private path = { path: 'manuscripts/', filename: 'manuscript.pdf' }
  private uid: string | undefined

  lifeCycle = {
    Created: ['Published', 'Archived'],
    Published: ['Parked', 'Archived'],
    Parked: ['Published', 'Archived'],
    Archived: []
  }

  constructor(
    private authService: AuthService,
    private uploadService: FileUploadService,
    private router: Router) {


    const temp = this.router.getCurrentNavigation()?.extras.state
    if (temp) {

      var state: UserprojectI = UserprojectDefault
      state = JSON.parse(JSON.stringify(temp))

      this.project = state

      if (this.project.fileUid === undefined) {
        this.project.fileUid = uuid()
      }
    }
    else {
      this.project = UserprojectDefault
      this.project.projectUid = uuid()
      this.project.fileUid = uuid()
    }


    this.uid = authService.getUid()
    this.path.path = `manuscripts/${this.uid}/`
    this.count = this.project.abstract.length
  }

  ngOnInit(): void {


  }

  xngOnInit(): void {
  }

  onAbstractChange(event: any) {
    if (this.project.abstract.length > this.maxAbstractLength) {
      this.project.abstract = this.project.abstract.substring(0, this.maxAbstractLength)
      event.target.value = this.project.abstract
    }
    this.count = this.project.abstract.length

  }

  onFilesUploaded(files: File[]) {

    console.log('file selected:', files)
    if (files.length > 1) {
      console.log('Error: only one file allowed!')
    }
    else if (files.length == 1) {
      this.uploadedFiles = files
    }

  }

  onChangeStatus(item: string): void {
    this.project.status = item as ProjectStatus
  }

  onAddProject() {

    console.log(this.project)

    // upload the manuscript if one added and get the url as a reference
    if (this.uploadedFiles.length == 1) {
      this.path.filename = `manuscript.${this.uid}.${this.project.fileUid}.pdf`
      this.project.fileName = this.uploadedFiles[0].name

      var _this = this;
      this.uploadService.pushFileToStorage(this.uploadedFiles[0], this.path)
        .subscribe({
          next(url) {
            console.log('got url:', url)
            _this.project.url = url
            _this.project.manuscriptPath = _this.path.path + _this.path.filename
            _this.project.dateCreated = new Date()
            _this.saveProject()
          },
          error(msg) {
            console.log(msg)
          },
          complete() {
            console.log('Push finished')
          }
        });
    }
    else {
      this.saveProject()
    }

    this.done()
  }

  saveProject(): void {
    // upload the manuscript and get the url as a reference, and save the project
    const projectRef = ref(this.db, `users/project/${this.uid}/${this.project.projectUid}`)
    set(projectRef, this.project);

    const newTitle = new Usertitle(this.project, this.uid)
    console.log(this.project, newTitle)
    const titleRef = ref(this.db, `titles/${this.project.projectUid}`)

    set(titleRef, newTitle);

  }

  onCancelAdd() {
    this.done()
  }

  done() {
    this.router.navigateByUrl('projects/project-list')

  }
}

