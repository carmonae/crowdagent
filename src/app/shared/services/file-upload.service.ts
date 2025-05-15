import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //private storage = getStorage(getApp());
  private storage = getStorage();

  constructor() { }

  pushFileToStorage(file: File, data: any): Observable<string> {

    const filePath = `${data.path}/${data.filename}`;
    const storageRef = ref(this.storage, filePath)
    const uploadTask = uploadBytesResumable(storageRef, file);

    const observable = new Observable<string>((subscriber) => {

      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
        (error) => {
          // Handle unsuccessful uploads
          console.log('error')
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            subscriber.next(downloadURL)
            subscriber.complete()
          });

        }
      );
    })

    return observable
  }

  /*
    private saveFileData(fileUpload: FileUpload): void {
      this.db.list(this.basePath).push(fileUpload);
    }
  
    getFiles(numberItems: number): FirebaseList<FileUpload> {
      return this.db.list(this.basePath, ref =>
        ref.limitToLast(numberItems));
    }
  
    deleteFile(fileUpload: FileUpload): void {
      this.deleteFileDatabase(fileUpload.key)
        .then(() => {
          this.deleteFileStorage(fileUpload.name);
        })
        .catch(error => console.log(error));
    }
  
    private deleteFileDatabase(key: string): Promise<void> {
      return this.db.list(this.basePath).remove(key);
    }
  
    private deleteFileStorage(name: string): void {
      const storageRef = this.storage.ref(this.basePath);
      storageRef.child(name).delete();
    }
    */
}