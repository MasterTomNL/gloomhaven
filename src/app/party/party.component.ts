import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { Character } from '../interfaces/interfaces';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  characters: Character[];

  constructor(
    private missionService: MissionService,
    public dialog: MatDialog
  ) {
    // get characters
    missionService
      .getCharacters()
      .subscribe(result => (this.characters = result));
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
