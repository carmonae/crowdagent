import { Injectable, OnInit } from '@angular/core';
import {
  child,
  get,
  getDatabase,
  increment,
  ref,
  update,
} from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { CrowdAgentStatsI } from '@app/models/crowdagentstats-model';

@Injectable({
  providedIn: 'root',
})
export class CrowdAgentService implements OnInit {
  private db = getDatabase();
  private dbRef: any;
  private uid: string | undefined;
  private firepath: string = 'crowdagent';

  constructor(private authService: AuthService) {
    this.uid = this.authService.getUid();
    this.firepath = `crowdagent`;

    console.log(`CrowdAgentService querying for ${this.firepath}`);
    this.dbRef = ref(this.db);
  }

  ngOnInit() {}

  getCrowdAgentStats(): Observable<CrowdAgentStatsI> {
    console.log(`Get CrowdAgent Stats`);

    const path = `${this.firepath}`;

    var _this = this;
    const observable = new Observable<CrowdAgentStatsI>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          subscriber.next(snapshot.val());
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

  incrementReaders(): void {
    console.log(`Increment Number of Readers.`);
    var path = `${this.firepath}`;
    update(ref(this.db, path), { readers: increment(1) });
  }

  incrementAuthors(): void {
    console.log(`Increment Number of Authors.`);
    var path = `${this.firepath}`;
    update(ref(this.db, path), { authors: increment(1) });
  }

  incrementBooks(): void {
    console.log(`Increment Number of Boooks.`);
    var path = `${this.firepath}`;
    update(ref(this.db, path), { books: increment(1) });
  }
}
