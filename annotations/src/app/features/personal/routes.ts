import { Route } from '@angular/router';
import { notesResolver } from 'src/app/core/resolver/notes.resolver';

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
        resolve: {
          notes: notesResolver,
        },
      },
      {
        path: 'todos/:id',
        loadComponent: () => import('./pages/todo-list/todo-list.component').then((m) => m.TodoListComponent),
      },
    ],
  },
] as Route[];
