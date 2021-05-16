import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './config/firebase.config';

import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { MissionService } from './services/mission.service';
import { PartyComponent } from './party/party.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,

    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [AppComponent, MissionComponent, PartyComponent],
  providers: [MissionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
