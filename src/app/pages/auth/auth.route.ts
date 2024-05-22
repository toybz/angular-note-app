import { Route } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const AuthRoutes: Route[] = [
  {
    path: 'login',
    component: AuthComponent,
    data: { authenticationType: 'login' },
  },
  {
    path: 'sign-up',
    component: AuthComponent,
    data: { authenticationType: 'sign-up' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-up',
  },
];
