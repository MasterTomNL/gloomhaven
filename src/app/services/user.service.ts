import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { User } from '../interfaces/interfaces';

@Injectable()
export class UserService {
  constructor(private db: AngularFirestore) {}

  add(user: User) {
    return this.db
      .collection('users')
      .add(user)
      .then(
        res => {
          console.log('user saved');
          localStorage.setItem('userId', res.id);
        },
        err => {
          alert(err);
        }
      );
  }

  getCurrentUserId() {
    return localStorage.getItem('userId')
      ? localStorage.getItem('userId')
      : null;
  }

  getUser(id: string) {
    return from(
      this.db
        .collection('users')
        .doc<User>(id)
        .valueChanges()
    );
  }
}
