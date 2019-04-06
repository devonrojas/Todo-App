import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements AfterViewInit {

  @Input() todo: Todo;
  @Output() deleted = new EventEmitter<Todo>();
  @Output() edited = new EventEmitter<Todo>();

  @ViewChildren('title') titleField: QueryList<any>;

  edit: boolean = false;

  constructor() { }

  ngAfterViewInit() {
    this.titleField.changes.subscribe((r) => {
      if(r.length) {
        r.first.nativeElement.focus();
      }
    });
  }

  editTodo() {
    this.edit = true;
  }

  saveTodo() {
    this.edit = false;
    this.edited.emit(this.todo);
  }

  deleteTodo() {
    this.deleted.emit(this.todo);
  }

}
