import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/routes'),
  },
  {
    path: '',
    loadChildren: () => import('./features/login/routes'),
  },
  {
    path: '',
    loadChildren: () => import('./features/personal/routes'),
  },
  {
    path: '',
    loadChildren: () => import('./features/not-found/routes'),
  },
];
