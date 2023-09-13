import { Route } from '@angular/router';

export default [
  {
    path: 'personal',
    loadComponent: () => import('./pages/personal/personal.component').then((m) => m.PersonalComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/not-selected/not-selected.component').then((m) => m.NotSelectedComponent),
      },
      {
        path: 'notes/:id',
        loadComponent: () => import('./pages/note-list/note-list.component').then((m) => m.NoteListComponent),
      },
      {
        path: 'todos/:id',
        loadComponent: () => import('./pages/todo-list/todo-list.component').then((m) => m.TodoListComponent),
      },
    ],
  },
] as Route[];
