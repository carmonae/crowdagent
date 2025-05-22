import { Injectable } from '@angular/core';
import {
  child,
  get,
  getDatabase,
  increment,
  ref,
  update,
} from 'firebase/database';
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

  setTitleScoreM(puid: string, newscore: number): void {
    console.log(`Set Title Score Method.`);
    var path = this.firepath + '/' + puid;
    var _this = this;
    const observable = new Observable<UsertitlesI[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          if (snapshot.exists()) {
            var title: UsertitlesI = snapshot.val();
            var score = newscore;
            update(ref(this.db, path), { scoreT: score });
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  incrementTitleScoreT(puid: string): void {
    console.log(`Increment Title Score Method.`);
    var path = this.firepath + '/' + puid;
    update(ref(this.db, path), { scoreT: increment(1) });
  }

  incrementTitleScoreA(puid: string): void {
    console.log(`Increment Abstract Score Method.`);
    var path = this.firepath + '/' + puid;
    update(ref(this.db, path), { scoreA: increment(1) });
  }

  incrementTitleScoreM(puid: string, score: number): void {
    console.log(`Increment Manuscript Score Method.`);
    var path = this.firepath + '/' + puid;
    update(ref(this.db, path), { scoreM: increment(score) });
  }
}
