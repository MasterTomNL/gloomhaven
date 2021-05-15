import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { from } from 'rxjs';
import { Character, Event } from '../interfaces/interfaces';

@Injectable()
export class MissionService {
  userId: string;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  getCharacters() {
    return from(this.db.collection<Character>('characters').valueChanges());
  }
  getEvents() {
    return from(
      this.db
        .collection<Event>('events', ref => ref.orderBy('order'))
        .valueChanges()
    );
  }

  addCharacter(character: Character) {
    this.db.collection<Character>('characters').add(character);
  }
  addEvent(event: Event) {
    this.db.collection<Event>('events').add(event);
  }
}
