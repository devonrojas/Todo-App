import { Component,
         AfterViewInit,
         Input,
         Output,
         EventEmitter,
         ViewChildren,
         QueryList } from '@angular/core';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements AfterViewInit {

  @Input() todo: any;
  @Output() deleted = new EventEmitter<string>();
  @Output() edited = new EventEmitter<string>();
  @Output() selected = new EventEmitter<boolean>();

  @ViewChildren('todoInput') todoField: QueryList<any>;

  // Flag for user input
  edit: boolean = false;

  constructor() { }

  // Utilizing AfterViewInit event to detect dynamically created DOM elements
  ngAfterViewInit() {
    this.todoField.changes.subscribe((r) => {
      if(r.length) {
        r.first.nativeElement.focus();
      }
    });
  }

  editTodo() {
    this.edit = true;
    this.selected.emit(true);
  }

  saveTodo() {
    this.edit = false;
    this.selected.emit(false);
    this.edited.emit(this.todo.title);
  }

  deleteTodo() {
    this.deleted.emit(this.todo.title);
  }

  blur(event) {
    event.target.blur();
  }

}
