import { Injectable } from '@angular/core';
import {
  child,
  get,
  getDatabase,
  increment,
  ref,
  set,
} from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { UserPique, UserPiqueI } from '@app/models/user-piques';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  getUserPiques(userId: string): Observable<UserPiqueI> {
    console.log(`Get User Piques Method.`);

    let path = `${this.firepath}/${userId}/piques`;

    var _this = this;
    const observable = new Observable<UserPiqueI>((subscriber) => {
      get(child(_this.dbRef, path))
        .then((snapshot) => {
          var userPiques: UserPiqueI = new UserPique();
          if (snapshot.exists()) {
            subscriber.next(snapshot.val() as UserPiqueI);
          } else {
            subscriber.next();
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

  incrementUserPiques(userId: string, amount: number): void {
    const userPiquesRef = ref(
      this.db,
      `${this.firepath}/${userId}/piques/amountLeft`
    );

    var ratedAmount: number = 0;
    if (amount <= 0) {
      ratedAmount = -(20 + amount);
    } else {
      ratedAmount = 20 + amount;
    }

    set(userPiquesRef, increment(ratedAmount))
      .then(() => {
        console.log(
          `User piques incremented by ${ratedAmount} for user ${userId}`
        );
      })
      .catch((error) => {
        console.error(`Error incrementing user piques: ${error}`);
      });
  }

  decrementUserPiques(userId: string, amount: number): void {
    this.incrementUserPiques(userId, -amount);
  }
}
