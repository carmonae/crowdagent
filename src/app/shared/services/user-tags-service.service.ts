import { Injectable } from '@angular/core';
import { child, get, getDatabase, ref, remove, set } from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { TagI } from 'src/app/models/tag-interface';

@Injectable({
  providedIn: 'root',
})
export class UserTagsService {
  private db = getDatabase();
  private dbRef: any;

  private uid: string | undefined;
  private firepath: string = '';
  private projects: any;

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `users/account/`;

    console.log(`UserTagsService querying for ${this.firepath}`);
    this.dbRef = ref(this.db);
  }

  ngOnInit() {}

  getTags(userId: string): Observable<TagI[]> {
    console.log(`Get Tags Method.`);
    var tags: TagI[] = [];
    var path = userId;

    path = `${this.firepath}/${userId}/tags`;

    var _this = this;
    const observable = new Observable<TagI[]>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          var userTags: TagI[] = [];
          if (snapshot.exists()) {
            tags = snapshot.exportVal();
            for (var p in tags) {
              userTags.push(tags[p]);
            }
            subscriber.next(userTags);
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

  //Better use add entire tags array
  removeTag(userId: string, tag: string): void {
    const tagRef = ref(this.db, `users/account/${userId}/tags/${tag}`);
    remove(tagRef)
      .then(() => {
        console.log(`Tag ${tag} removed successfully.`);
      })
      .catch((error) => {
        console.error(`Error removing tag ${tag}:`, error);
      });
  }

  addTag(userId: string, tag: TagI): void {
    const tagsRef = ref(this.db, `users/account/${userId}/tags/${tag.tag}`);
    set(tagsRef, tag)
      .then(() => {
        console.log(`Tag ${tag.tag} added successfully.`);
      })
      .catch((error) => {
        console.error(`Error adding tag ${tag.tag}:`, error);
      });
  }
}
