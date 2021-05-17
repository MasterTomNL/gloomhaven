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
    const dialogRef = this.dialog.open(DialogCharacter);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  isAdmin() {
    return this.user ? this.user.isAdmin : false;
  }

  edit(character: Character) {
    const dialogRef = this.dialog.open(DialogCharacter, {
      data: { character: character }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        this.missionService.saveCharacter(result);
      }
    });
  }
}

@Component({
  selector: 'character-dialog',
  templateUrl: 'character.dialog.html'
})
export class DialogCharacter {
  character: Character;
  classes: string[] = ['Mindthief', 'Cragheart', 'Tinkerer'];

  constructor(
    public dialogRef: MatDialogRef<DialogCharacter>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.character = <Character>{};
    if (data) this.character = data.character;
  }

  close(bSave?: boolean) {
    if (bSave) this.dialogRef.close(this.character);
    else this.dialogRef.close();
  }
}
