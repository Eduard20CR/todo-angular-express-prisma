import { Injectable } from '@angular/core';
import { Todo, TodoDTO, TodoGroup, TodoGroupArr } from '../models/todo.model';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/models/user.model';
import { PopupMessageService } from 'src/app/core/services/popup-message.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private loading = new BehaviorSubject<boolean>(false);
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();
  loading$ = this.loading.asObservable();
  private groupId = '';

  constructor(private http: HttpClient, private popupMessageService: PopupMessageService, private router: Router) {}

  emitTodos(todos: Todo[]) {
    this.todos.next(todos);
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
  editTodo(editedTodo: Todo) {
    this.http.put<ApiResponse<Todo>>(`http://localhost:3000/api/todos/${editedTodo.id}`, editedTodo).subscribe({
      next: (res) => {
        console.log(res);
        const todos = this.todos.getValue();
        const editedTodoIndex = todos.findIndex((todo) => todo.id === editedTodo.id);
        todos[editedTodoIndex] = editedTodo;
        this.todos.next([...todos]);
      },
      error: (err) => {
        console.log(err);
        this.popupMessageService.addMessage("Couldn't edit new todo");
      },
    });
  }
  changeOrder(todoGroups: TodoGroupArr) {
    this.http.put<ApiResponse<Todo[]>>(`http://localhost:3000/api/todos/order`, todoGroups).subscribe({
      next: (res) => {
        this.todos.next([...todoGroups.todos]);
      },
      error: (err) => {
        console.log(err);
        this.popupMessageService.addMessage("Couldn't change order");
      },
    });
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
  toggleCompleted(todo: Todo, state: boolean) {
    this.http.put<ApiResponse<Todo>>(`http://localhost:3000/api/todos/toggle/${todo.id}`, { state }).subscribe({
      next: (res) => {
        const todos = this.todos.getValue();
        const editedTodoIndex = todos.findIndex((todo) => todo.id === res.data.id);
        todos[editedTodoIndex].done = res.data.done;
        this.todos.next([...todos]);
      },
      error: (err) => {
        console.log(err);
        this.popupMessageService.addMessage("Couldn't toggle completed");
      },
    });
  }
}
