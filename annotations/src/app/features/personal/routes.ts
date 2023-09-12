import { Route } from '@angular/router';

export default [
  {
    path: 'personal',
    loadComponent: () => import('./pages/personal/personal.component').then((m) => m.PersonalComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/personal/subroutes/not-selected/not-selected.component').then((m) => m.NotSelectedComponent),
      },
      {
        path: 'notes',
        loadComponent: () => import('./pages/personal/subroutes/note-list/note-list.component').then((m) => m.NoteListComponent),
      },
      {
        path: 'todos',
        loadComponent: () => import('./pages/personal/subroutes/todo-list/todo-list.component').then((m) => m.TodoListComponent),
      },
    ],
  },
] as Route[];
