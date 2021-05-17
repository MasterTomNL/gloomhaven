import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { Character, User } from '../interfaces/interfaces';
import { MissionService } from '../services/mission.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  characters: Character[];
  user: User;

  constructor(
    private missionService: MissionService,
    public dialog: MatDialog,
    userService: UserService
  ) {
    // get characters
    missionService.getCharacters().subscribe(result => {
      this.characters = result;
      missionService.updateCharactersInLocalStorage(result);
    });
    // get user
    let userId = userService.getCurrentUserId();
    if (userId) userService.getUser(userId).subscribe(u => (this.user = u));
  }

  ngOnInit() {}

  addCharacter() {
    const dialogRef = this.dialog.open(DialogCharacter, {
      width: '50%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isAdmin() {
    return this.user ? this.user.isAdmin : false;
  }
}

@Component({
  selector: 'character-dialog',
  templateUrl: 'character.dialog.html'
})
export class DialogCharacter {
  constructor(
    public dialogRef: MatDialogRef<DialogCharacter>,
    @Inject(MAT_DIALOG_DATA) public data: Character
  ) {}

  close(bSave?: boolean) {
    this.dialogRef.close();
  }
}
