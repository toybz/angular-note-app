import { Route } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

export const AuthRoutes: Route[] = [
  {
    path: 'login',
    component: SignUpComponent,
    data: { authenticationType: 'login' },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { authenticationType: 'sign-up' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-up',
  },
];
