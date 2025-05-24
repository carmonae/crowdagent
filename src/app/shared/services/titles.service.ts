import { Injectable } from '@angular/core';
import { child, get, getDatabase, ref, remove } from 'firebase/database';
import { Observable } from 'rxjs';

import { UsertitlesI } from 'src/app/models/user-titles';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TitlesService {
  private db = getDatabase();
  private dbRef: any;
  private uid: string | undefined;
  private firepath: string = '';
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `titles`;

    console.log(`TitleService querying for ${this.firepath}`);
    this.dbRef = ref(this.db);
  }

  ngOnInit() {}

  getTitles(): Observable<UsertitlesI[]> {
    console.log(`Get Titles Method.`);
    var titles: UsertitlesI[] = [];
    var path = '';

    path = this.firepath;

    var _this = this;
    const observable = new Observable<UsertitlesI[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          var userTitles: UsertitlesI[] = [];
          if (snapshot.exists()) {
            titles = snapshot.exportVal();
            for (var p in titles) {
              userTitles.push(titles[p]);
            }
            subscriber.next(userTitles);
          } else {
            subscriber.next([]);
            console.log('No data available');
          }
          subscriber.complete();
        })
        .catch((error) => {
          console.error(error);
          subscriber.error(error);
        });
    });
    return observable;
  }

  remove(projectId: string): void {
    const titleRef = ref(this.db, `titles/${projectId}`);
    remove(titleRef);
  }
}
