import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  getData(url: string): Observable<string | undefined | ArrayBuffer> {
    return this.httpClient
      .get(url, { responseType: 'blob' })
      .pipe(switchMap((response) => this.readFile(response)));
  }

  private readFile(blob: Blob): Observable<string> {
    return new Observable((obs) => {
      const reader = new FileReader();

      reader.onerror = (err) => obs.error(err);
      reader.onabort = (err) => obs.error(err);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          obs.next(reader.result);
        } else {
          obs.next(undefined);
        }
      };
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }
}
