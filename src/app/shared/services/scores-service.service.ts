import { Injectable } from '@angular/core';
import { getDatabase, ref, runTransaction } from 'firebase/database'

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  private db = getDatabase()

  constructor() { }

  incrementTitleScore(user: string | undefined, author: string, project: string) {
    const path = `users/project/${author}/${project}`
    const tScoreRef = ref(this.db, path);

    runTransaction(tScoreRef, (data) => {
      if (data) {
        data.scoreT++
        this.decrementUsersPiques(user)
      }
      return data
    });
  }

  decrementUsersPiques(uid: string | undefined): void {
    console.log('decrement the users piQues')

    if (uid) {
      const path = `users/account//${uid}`
      const userAccountRef = ref(this.db, path);

      runTransaction(userAccountRef, (data) => {
        if (data && data.piques > 0) {
          data.piques--
        }
        return data
      });

    }
  }

}
