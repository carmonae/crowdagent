import { Injectable } from '@angular/core';
import { child, get, getDatabase, ref } from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { PiqueI } from '@app/models/pique-model';

@Injectable({
  providedIn: 'root'
})
export class PiquesService {

  private db = getDatabase()
  private dbRef: any;
  private uid: string | undefined
  private firepath: string = ''
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `piques`

    console.log(`PiquesService querying for ${this.firepath}`)
    this.dbRef = ref(this.db);

  }

  ngOnInit() {
  }

  getPiques(userId: string): Observable<PiqueI[]> {
    console.log(`Get Piques Method.`)
    var titles: PiqueI[] = []
    var path = userId

    path = `${this.firepath}/${userId}`

    var _this = this
    const observable = new Observable<PiqueI[]>((subscriber) => {
      get(child(_this.dbRef, path)).then((snapshot) => {
        var userTitles: PiqueI[] = []
        if (snapshot.exists()) {
          titles = snapshot.val()

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

