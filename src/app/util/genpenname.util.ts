// src/app/my-api.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratePenName {
  private readonly apiUrl = 'https://blog.reedsy.com/pen-name-generator'; // Base API URL

  constructor(private http: HttpClient) {}

  getPenName(
    letter: string,
    gender: string,
    origin: string
  ): Observable<string> {
    const params = new HttpParams()
      .set('letter', letter)
      .set('gender', gender)
      .set('origin', origin);

    return this.http.get(this.apiUrl, { params, responseType: 'text' });
  }
}
