import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { Character, Event } from '../interfaces/interfaces';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  characters: Character[];
  events: Event[];
  constructor(
    private missionService: MissionService,
    public dialog: MatDialog
  ) {
    // get events
    missionService.getEvents().subscribe(result => (this.events = result));
    this.characters = missionService.getCharactersFromLocalStorage();
  }

  ngOnInit() {}

  addEvent() {
    const dialogRef = this.dialog.open(DialogEvent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  extractJson(obj) {
    return JSON.parse(obj);
  }
  isVisible() {
    return true;
  }
  typeIcon(type: string) {
    return {
      story: 'auto_stories',
      road: 'explore',
      city: 'location_city'
    }[type];
  }
}

@Component({
  selector: 'event-dialog',
  templateUrl: 'event.dialog.html'
})
export class DialogEvent {
  event: Event;
  characters = ['Furgison', 'Bora', 'Trinquil'];
  types = ['story', 'road', 'city'];
  constructor(
    public dialogRef: MatDialogRef<DialogEvent>,
    @Inject(MAT_DIALOG_DATA) public data: Event,
    missionService: MissionService
  ) {
    this.event = <Event>{};
    //this.characters = ['Furgison', 'Bora', 'Trinquil']; //missionService.getCharacterNames();
  }

  close(bSave?: boolean) {
    this.dialogRef.close();
  }
}
