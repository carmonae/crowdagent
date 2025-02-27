import { Injectable } from '@angular/core';
import { getDatabase, ref, child, set, get, push, update } from 'firebase/database'
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { TagI } from 'src/app/models/tag-interface'

@Injectable({
  providedIn: 'root'
})
export class UserTagsService {

  private db = getDatabase()
  private dbRef: any;

  private uid: string | undefined
  private firepath: string = ''
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `users/tags`

    console.log(`UserTagsService querying for ${this.firepath}`)
    this.dbRef = ref(this.db);

  }

  ngOnInit() {
  }

  getTags(userId: string): Observable<TagI[]> {
    console.log(`Get Tags Method.`)
    var titles: TagI[] = []
    var path = userId

    path = `${this.firepath}/${userId}`

    var _this = this
    const observable = new Observable<TagI[]>((subscriber) => {
      get(child(_this.dbRef, path)).then((snapshot) => {
        var userTags: TagI[] = []
        if (snapshot.exists()) {
          titles = snapshot.exportVal()
          for (var p in titles) {
            userTags.push(titles[p])
          }
          subscriber.next(userTags)
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

