import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() label: string = 'Content'
  @Output() fileUploadEvent = new EventEmitter<File[]>();

  files: File[] = [];

  onSelect(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
    this.fileUploadEvent.emit(this.files)
  }

  constructor() { }

  ngOnInit(): void {

  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
