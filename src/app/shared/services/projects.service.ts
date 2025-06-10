import { Injectable, OnInit } from '@angular/core';
import {
  child,
  get,
  getDatabase,
  increment,
  push,
  ref,
  update,
} from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { RatingTuple } from '@app/models/ratings';
import { UserprojectI } from '@app/models/user-project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService implements OnInit {
  private db = getDatabase();
  private dbRef: any;
  private uid: string | undefined;
  private firepath: string = '';
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `users/project/`;

    console.log(`ProjectsService querying for ${this.firepath}`);
    this.dbRef = ref(this.db);
  }

  ngOnInit() {}

  getProjects(
    uid: string | undefined,
    pid: string = '*',
    query: string = ''
  ): Observable<UserprojectI[]> {
    console.log(`Get Projects Method. uid=${uid}, pid=${pid}`);
    var projects: UserprojectI[] = [];
    var path = '';

    if (pid === '*') {
      path = `${this.firepath}/${uid}`;
    } else {
      path = `${this.firepath}/${uid}/${pid}`;
    }

    var _this = this;
    const observable = new Observable<UserprojectI[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          if (pid == '*') {
            var userProjects: any[] = [];
            if (snapshot.exists()) {
              snapshot.forEach((childSnapshot) => {
                userProjects.push(childSnapshot.val());
              });

              subscriber.next(userProjects);
            } else {
              subscriber.next([]);
              console.log('No data available');
            }
          } else {
            var userProject: any = {};
            if (snapshot.exists()) {
              subscriber.next([snapshot.val()]);
            } else {
              subscriber.next();
              console.log('No data avail');
            }
          }
        })
        .catch((error) => {
          console.error(error);
          subscriber.error(error);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
    return observable;
  }

  getProjectRatings(
    uid: string | undefined,
    pid: string
  ): Observable<RatingTuple[]> {
    console.log(`Get Projects Method. uid=${uid}, pid=${pid}`);
    var projects: UserprojectI[] = [];
    var path = '';

    path = `${this.firepath}/${uid}/${pid}`;

    var _this = this;
    const observable = new Observable<RatingTuple[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          var userProject: any = {};
          if (snapshot.exists()) {
            userProject = snapshot.val();

            let ratings = userProject.ratings;
            let results: RatingTuple[] = [];
            console.log('book ratings:', ratings);
            for (let id in ratings) {
              console.log('rating id:', id);
              results.push({
                projId: '',
                readerId: ratings[id].readerId,
                personalRating: ratings[id].scoreM,
                predictedRating: ratings[id].scoreM2,
                bet: ratings[id].bet,
                timestamp: ratings[id].timestamp,
              });
            }
            subscriber.next(results);
          } else {
            subscriber.next();
            console.log('No data avail');
          }
        })
        .catch((error) => {
          console.error(error);
          subscriber.error(error);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
    return observable;
  }

  /*
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
  */
  setPublishingDate(uid: string, puid: string) {
    console.log(`Set Publishing date.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDay());
    var endDate = new Date();
    endDate.setMonth(today.getMonth() + 3);
    update(ref(this.db, path), {
      datePublish: today,
      dateEnd: endDate,
    });
  }

  incrementTitleScoreI(uid: string, puid: string): void {
    console.log(`Increment Impression Score Method.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, path), { scoreI: increment(1) });
  }

  incrementTitleScoreT(uid: string, puid: string, inc: number): void {
    console.log(`Increment Title Score Method.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, path), { scoreT: increment(inc) });
  }

  incrementTitleScoreA(uid: string, puid: string): void {
    console.log(`Increment Abstract Score Method.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, path), { scoreA: increment(1) });
  }

  incrementTitleScoreC(uid: string, puid: string): void {
    console.log(`Increment TOC Score Method.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, path), { scoreC: increment(1) });
  }

  incrementTitleCountM(uid: string, puid: string): void {
    console.log(`Increment Abstract Count Method.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, path), { countM: increment(1) });
  }

  incrementTitleScoreM(
    uid: string,
    puid: string,
    score1: number,
    score2: number,
    bet: number
  ): void {
    console.log(`Add Manuscript Rating Record.`);
    var path = `${this.firepath}/${uid}/${puid}/ratings`;
    push(ref(this.db, path), {
      readerId: uid,
      scoreM: increment(score1),
      scoreM2: increment(score2),
      bet: increment(bet),
      timestamp: Date(),
    });
    var scoreTotalsPath = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, scoreTotalsPath), {
      scoreM: increment(score1),
      scoreM2: increment(score2),
    });
  }
}
