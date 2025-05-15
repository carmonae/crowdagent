import { Injectable, OnInit } from '@angular/core';
import { child, get, getDatabase, ref } from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { UserprojectI } from '@app/models/user-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService implements OnInit {

  private db = getDatabase()
  private dbRef: any;
  private uid: string | undefined
  private firepath: string = ''
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `users/project/`

    console.log(`ProjectsService querying for ${this.firepath}`)
    this.dbRef = ref(this.db);

  }

  ngOnInit() {
  }

  getProjects(uid: string | undefined, pid: string = '*'): Observable<UserprojectI[]> {
    console.log(`Get Projects Method. uid=${uid}, pid=${pid}`)
    var projects: UserprojectI[] = []
    var path = ''

    if (pid === '*') {
      path = this.firepath + uid
    } else {
      path = `${this.firepath}/${uid}/${pid}`
    }

    var _this = this
    const observable = new Observable<UserprojectI[]>((subscriber) => {
      get(child(_this.dbRef, path)).then((snapshot) => {
        var userProjects: any[] = []
        if (snapshot.exists()) {
          if (pid === '*') {
            snapshot.forEach((childSnapshot) => {
              userProjects.push(childSnapshot.val())
            })
          }
          else {
            userProjects.push(snapshot.val())
          }
          subscriber.next(userProjects)
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

