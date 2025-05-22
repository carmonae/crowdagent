import { Injectable } from '@angular/core';
import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { PiqueI } from '@app/models/pique-model';

@Injectable({
  providedIn: 'root',
})
export class PiquesService {
  private db = getDatabase();
  private dbRef: any;
  private uid: string | undefined;
  private firepath: string = '';
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `piques`;

    console.log(`PiquesService querying for ${this.firepath}`);
    this.dbRef = ref(this.db);
  }

  ngOnInit() {}

  getPiques(userId: string): Observable<PiqueI[]> {
    console.log(`Get Piques Method.`);
    var titles: PiqueI[] = [];
    var path = userId;

    path = `${this.firepath}/${userId}`;

    var _this = this;
    const observable = new Observable<PiqueI[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          var userTitles: PiqueI[] = [];
          if (snapshot.exists()) {
            titles = snapshot.val();

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

  addPique(uid: string, pique: PiqueI): void {
    console.log(`Add Pique Method.`);
    var titles: PiqueI[] = [];
    var path = `${this.firepath}/${uid}/${pique.projectUid}`;
    const piquesRef = ref(this.db, path);
    set(piquesRef, pique);
  }

  removePique(pique: PiqueI): Observable<PiqueI[]> {
    console.log(`Remove Pique Method.`);
    var titles: PiqueI[] = [];
    var path = this.firepath;

    path = `${this.firepath}/${this.uid}`;

    var _this = this;
    const observable = new Observable<PiqueI[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          if (snapshot.exists()) {
            titles = snapshot.val();
            titles.splice(titles.indexOf(pique), 1);
            subscriber.next(titles);
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
  getPiquesById(userId: string, projId: string): Observable<PiqueI[]> {
    console.log(`Get Piques By Id Method.`);
    var titles: PiqueI[] = [];

    var path = `${this.firepath}/${userId}/${projId}`;

    var _this = this;
    const observable = new Observable<PiqueI[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          if (snapshot.exists()) {
            titles = snapshot.val();
            subscriber.next(titles);
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

  updateLevel(userId: string, projId: string, level: string): void {
    var path = `${this.firepath}/${userId}/${projId}`;
    update(ref(this.db, path), { level: level });
  }
}
