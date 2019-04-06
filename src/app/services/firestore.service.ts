import { Injectable }                 from '@angular/core';
import { AngularFirestore,
         AngularFirestoreDocument,
         AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

import {firestore} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  user: string = "jBHN86GXU6SSepoqzUYZSgbrVI72";

  collection: AngularFirestoreCollection;
  document: AngularFirestoreDocument;

  constructor(private afs: AngularFirestore) { }

  getTodos() : Observable<any> {
    return this.afs.collection('todos').doc(this.user).valueChanges();
  }

  updateTodos(list: Todo[]) {
    this.document = this.afs.collection('todos').doc(this.user);
    this.document.update({todos: list});
  }
  
  addTodo(todo: Todo) {
    this.afs.collection('todos').doc(this.user).update({
      lastUpdated: firestore.FieldValue.serverTimestamp(),
      todos: firestore.FieldValue.arrayUnion(todo)
    })
  }

  deleteTodo(todo: Todo) {
    this.afs.collection('todos').doc(this.user).update({
      lastUpdated: firestore.FieldValue.serverTimestamp(),
      todos: firestore.FieldValue.arrayRemove(todo)
    })
  }
}
