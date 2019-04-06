import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';

// Angular Material Imports
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';
  list_name: string = 'To-do';

  todos: any[];
  todo_title: string;

  active: boolean = false;

  constructor(private firestore: FirestoreService) {
    this.firestore.getTodos()
    .pipe(
      map(data => data.todos.map(todo => {return {title:todo}}))
    )
    .subscribe(res => this.todos = res);
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.firestore.updateTodos(this.todos);
  }

  addTodo() {
    this.firestore.addTodo(this.todo_title);
    this.todo_title = '';
  }

  onDelete(todo: string) {
    todo ? this.firestore.deleteTodo(todo) : null;
  }

  onEdit(todo: string) {
    todo ? this.firestore.updateTodos(this.todos) : null;
  }

  onSelect(event) {
    this.active = event;
  }
}
