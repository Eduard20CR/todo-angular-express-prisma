import { Route } from '@angular/router';

export default [
  {
    path: 'personal',
    loadComponent: () =>
      import('./pages/personal/personal.component').then(
        (m) => m.PersonalComponent
      ),
  },
] as Route[];
