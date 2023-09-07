import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
] as Route[];
