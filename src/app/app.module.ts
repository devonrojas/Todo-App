import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { environment } from '../environments/environment';

import { FirestoreService } from './services/firestore.service';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    DragDropModule
  ],
  entryComponents: [AppComponent],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
