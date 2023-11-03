import { Injectable } from '@angular/core';
import { getDatabase, ref, child, set, get, push, update } from 'firebase/database'
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/service/auth.service';
import { Usertitle, UsertitlesI } from 'src/app/models/user-titles'

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  private db = getDatabase()
  private dbRef: any;
  private uid: string | undefined
  private firepath: string = ''
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `titles`

    console.log(`TitleService querying for ${this.firepath}`)
    this.dbRef = ref(this.db);

  }

  ngOnInit() {
  }

  getTitles(): Observable<UsertitlesI[]> {
    console.log(`Get Titles Method.`)
    var titles: UsertitlesI[] = []
    var path = ''

    path = this.firepath

    var _this = this
    const observable = new Observable<UsertitlesI[]>((subscriber) => {
      get(child(_this.dbRef, path)).then((snapshot) => {
        var userTitles: UsertitlesI[] = []
        if (snapshot.exists()) {
          titles = snapshot.exportVal()
          for (var p in titles) {
            userTitles.push(titles[p])
          }
          subscriber.next(userTitles)
        }
        else {
          subscriber.next([])
          console.log("No data available");
        }
        subscriber.complete()
      }).catch((error) => {
        console.error(error);
        subscriber.error(error)
      });
    })
    return observable
  }
}

