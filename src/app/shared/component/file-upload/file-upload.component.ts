import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploadService } from '../../services/file-upload.service';
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [NgxDropzoneModule],
})
export class FileUploadComponent {
  @Input() public path: any;
  allFiles: File[] = [];
  private url: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private fileService: FileUploadService
  ) {}

  ngOnInit() {
    console.log(this.path);
  }

  droppedFiles(files: File[]): void {
    this.allFiles = files;
    const filesAmount = files.length;

    for (let i = 0; i < filesAmount; i++) {
      const file = files[i];
      this.fileService.pushFileToStorage(file, this.path);
    }
  }

  uploadFile(): void {
    const fileList = this.allFiles;
    if (fileList) {
      console.log('FileUpload -> files', fileList);

      var _this = this;
      this.path.filename = 'avatar.jpg';
      this.fileService.pushFileToStorage(fileList[0], this.path).subscribe({
        next(url) {
          _this.url = url;
        },
        error(msg) {
          console.log(msg);
        },
        complete() {
          _this.activeModal.close(_this.url);
          _this.activeModal.dismiss();
        },
      });
    }
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    if (this.allFiles.length >= 1) {
      alert('No more files please!');
    } else {
      this.allFiles.push(...event.addedFiles);
    }
  }

  onRemove(event: File) {
    this.allFiles.splice(this.allFiles.indexOf(event), 1);
  }
}
