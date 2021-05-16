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
  events: Event[];
  constructor(
    private missionService: MissionService,
    public dialog: MatDialog
  ) {
    // get events
    missionService.getEvents().subscribe(result => (this.events = result));
  }

  ngOnInit() {}

  addEvent() {
    const dialogRef = this.dialog.open(DialogEvent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'event-dialog',
  templateUrl: 'event.dialog.html'
})
export class DialogEvent {
  constructor(
    public dialogRef: MatDialogRef<DialogEvent>,
    @Inject(MAT_DIALOG_DATA) public data: Character
  ) {}

  close(bSave?: boolean) {
    this.dialogRef.close();
  }
}
