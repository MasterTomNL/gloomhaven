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
      console.log(result);
      if (typeof result === 'object') {
        result.party = JSON.stringify(result.party);
        this.missionService.addEvent(result);
      }
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
  characters: string[];
  types = ['story', 'road', 'city'];
  icons = [
    'anker',
    'bag',
    'beer',
    'berries',
    'boot',
    'bow',
    'bowl',
    'build',
    'campfire',
    'candle',
    'chest',
    'coin',
    'crown',
    'document',
    'fight',
    'fish',
    'glove',
    'hide',
    'hourglass',
    'letter',
    'navigation',
    'rune',
    'shield',
    'ship',
    'skull',
    'staff',
    'sword',
    'tent',
    'time',
    'tower',
    'wood'
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogEvent>,
    @Inject(MAT_DIALOG_DATA) public data: Event,
    missionService: MissionService
  ) {
    this.event = <Event>{};
    this.characters = missionService.getCharacterNames();
  }

  close(bSave?: boolean) {
    if (bSave) this.dialogRef.close(this.event);
    else this.dialogRef.close();
  }
}
