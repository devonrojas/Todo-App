import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';
  list_name: string = 'To-do';

  todos: Todo[];
  todo_title: string;
  todosArr: Todo[] = [];

  constructor(private firestore: FirestoreService) {
    this.firestore.getTodos()
    .subscribe((user:any) => this.todos = user.todos);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.firestore.updateTodos(this.todos);
  }

  addTodo() {
    let todo = {
      title: this.todo_title
    }
    this.firestore.addTodo(todo);
    this.todo_title = '';
  }

  onDelete(todo: Todo) {
    todo ? this.firestore.deleteTodo(todo) : null;
  }

  onEdit(todo: Todo) {
    todo ? this.firestore.updateTodos(this.todos) : null;
  }
}
