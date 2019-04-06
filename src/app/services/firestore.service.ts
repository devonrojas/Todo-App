import { Injectable }       from '@angular/core';

// Angular Material Imports
import { AngularFirestore } from '@angular/fire/firestore';

// Misc Imports
import { Observable }       from 'rxjs';
import {firestore}          from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  user: string = "jBHN86GXU6SSepoqzUYZSgbrVI72";

  constructor(private afs: AngularFirestore) { }

  getTodos() : Observable<any> {
    return this.afs.collection('todos').doc(this.user).valueChanges();
  }

  updateTodos(list: any[]) {
    // Mapping any[] back to string[] for database
    list = list.map(item => item.title);
    this.afs.collection('todos').doc(this.user).update({
      lastUpdated: firestore.FieldValue.serverTimestamp(),
      todos: list
    });
  }

  addTodo(todo: string) {
    this.afs.collection('todos').doc(this.user).update({
      lastUpdated: firestore.FieldValue.serverTimestamp(),
      todos: firestore.FieldValue.arrayUnion(todo)
    })
  }

  deleteTodo(todo: string) {
    this.afs.collection('todos').doc(this.user).update({
      lastUpdated: firestore.FieldValue.serverTimestamp(),
      todos: firestore.FieldValue.arrayRemove(todo)
    })
  }
}
