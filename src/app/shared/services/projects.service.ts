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
          subscriber.complete();
        })
        .catch((error) => {
          console.error(error);
          subscriber.error(error);
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

  incrementTitleScoreI(uid: string, puid: string): void {
    console.log(`Increment Impression Score Method.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, path), { scoreI: increment(1) });
  }

  incrementTitleScoreT(uid: string, puid: string): void {
    console.log(`Increment Title Score Method.`);
    var path = `${this.firepath}/${uid}/${puid}`;
    update(ref(this.db, path), { scoreT: increment(1) });
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
    console.log(`Increment Manuscript Score Method.`);
    var path = `${this.firepath}/${uid}/${puid}/ratings`;
    push(ref(this.db, path), {
      readerId: uid,
      scoreM: increment(score1),
      scoreM2: increment(score2),
      bet: increment(bet),
      timestamp: Date(),
    });
  }
}
