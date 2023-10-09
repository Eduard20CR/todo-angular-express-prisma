import { Injectable } from '@angular/core';
import { Todo, TodoDTO, TodoGroup } from '../models/todo.model';
import { BehaviorSubject, catchError, concatMap, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/models/user.model';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { environment } from 'src/environments/environment';
import { NoteGroup } from '../models/note.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private loading = new BehaviorSubject<boolean>(false);
  private todos = new BehaviorSubject<Todo[]>([]);
  private name = new BehaviorSubject<string>('Notes');
  todos$ = this.todos.asObservable();
  name$ = this.name.asObservable();
  loading$ = this.loading.asObservable();
  private groupId = '';

  constructor(private http: HttpClient, private popupMessageService: PopupMessageService, private router: Router) {}

  emitTodos(todos: Todo[]) {
    console.log(todos);

    this.todos.next(todos);
  }
  emitName(name: string) {
    this.name.next(name);
  }
  setGroupId(id: string) {
    this.groupId = id;
  }
  getGroupId() {
    return this.groupId;
  }
  getTodos() {
    return this.todos.value.slice();
  }

  fetchTodos(groupsId: string) {
    return this.http.get<ApiResponse<TodoGroup>>(`${environment.API_URL}/api/todos/${groupsId}`).pipe(
      map((res) => {
        return res.data;
      }),
      catchError((err) => {
        console.log(err);
        this.popupMessageService.addMessage('Could not load notes');

        const errorData: TodoGroup = {
          id: '',
          name: '',
          todos: [],
        };

        this.router.navigate(['/personal']);
        return of(errorData);
      })
    );
  }
  addNewTodo(todo: TodoDTO) {
    this.http.post<ApiResponse<Todo>>('http://localhost:3000/api/todos/', todo).subscribe({
      next: (res) => {
        this.todos.next([...this.todos.getValue(), res.data]);
      },
      error: (err) => {
        this.popupMessageService.addMessage("Couldn't delete new todo");
      },
    });
  }
  changeOrder(todos: Todo[]) {
    this.todos.next(todos);
  }
  deleteTodo(todo: Todo) {
    this.http.delete<ApiResponse<Todo[]>>(`http://localhost:3000/api/todos/${todo.id}/group/${this.getGroupId()}`).subscribe({
      next: (res) => {
        this.todos.next([...res.data]);
      },
      error: (err) => {
        console.log('err');

        this.popupMessageService.addMessage("Couldn't add new todo");
      },
    });
  }
}
