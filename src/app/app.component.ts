import { Component, Inject } from '@angular/core';
import { User } from './interfaces/interfaces';
import { UserService } from './services/user.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  constructor(private userService: UserService, public dialog: MatDialog) {
    let userId = userService.getCurrentUserId();
    if (userId) {
      userService.getUser(userId).subscribe(u => {
        this.user = u;
        if (u.isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.setItem('isAdmin', 'false');
        }
      });
    }
  }
  authentication() {
    const dialogRef = this.dialog.open(DialogAuthentication);

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        this.userService.add(result);
      }
    });
  }
}

@Component({
  selector: 'authentication-dialog',
  templateUrl: 'dialog.authentication.html'
})
export class DialogAuthentication {
  user: User;
  constructor(private dialogRef: MatDialogRef<DialogAuthentication>) {
    this.user = <User>{};
  }

  close(bSave?: boolean) {
    if (bSave) this.dialogRef.close(this.user);
    else this.dialogRef.close();
  }
}
