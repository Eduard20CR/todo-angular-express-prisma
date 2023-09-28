import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { userResolver } from './core/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/routes'),
    resolve: {
      user: userResolver,
    },
  },
  {
    path: '',
    loadChildren: () => import('./features/login/routes'),
    resolve: {
      user: userResolver,
    },
  },
  {
    path: '',
    loadChildren: () => import('./features/personal/routes'),
    canActivateChild: [authGuard],
    resolve: {
      user: userResolver,
    },
  },
  {
    path: '',
    loadChildren: () => import('./features/not-found/routes'),
    resolve: {
      user: userResolver,
    },
  },
];
