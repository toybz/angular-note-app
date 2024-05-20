import { Route } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

export const AuthRoutes: Route[] = [
  {
    path: 'login',
    component: SignUpComponent,
    data: { authType: 'login' },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { authType: 'sign-up' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-up',
  },
];
