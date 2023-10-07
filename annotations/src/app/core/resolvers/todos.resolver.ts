import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TodoGroup } from 'src/app/features/personal/models/todo.model';
import { TodosService } from 'src/app/features/personal/services/todos.service';

export const todosResolver: ResolveFn<TodoGroup> = (route, state) => {
  const todosService = inject(TodosService);
  const id = route.params['id'];
  return todosService.fetchTodos(id);
};
