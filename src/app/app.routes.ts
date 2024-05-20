import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () =>
      import('./pages/notes/note.routes').then((source) => source.NoteRoutes),
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
];
