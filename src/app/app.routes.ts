import { Routes } from '@angular/router';
import { userLoggedInGuard } from './guards/user-logged-in/user-logged-in.guard';

export const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () =>
      import('./pages/notes/note.routes').then((source) => source.NoteRoutes),
    canActivate: [userLoggedInGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.route').then((source) => source.AuthRoutes),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
