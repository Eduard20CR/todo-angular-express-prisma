import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
    canActivateChild: [authGuard],
  },
  {
    path: '',
    loadChildren: () => import('./features/not-found/routes'),
  },
];
