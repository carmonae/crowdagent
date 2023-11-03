import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Allbookmark } from '../data/data/main-bookmark/all-bookmark';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainBookmarkService {

  bookmarkData : Allbookmark[] 

  constructor(private http : HttpClient) { }

  bookmark() : Observable<any> {
    return this.http.get('shared/data/data/main-bookmark/all-bookmark').pipe(
      map((res) => {
        return res
      })
    )
  }

  public getbookmark(id : number): Observable<Allbookmark> {
    return this.bookmark().pipe(
      map((items) => {
        return items.find((item : Allbookmark) => {
          return item.id === id
        })
      })
    )
  }
}
