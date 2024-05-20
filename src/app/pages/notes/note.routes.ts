import { AllNotesComponent } from './all-notes/all-notes.component';
import { ViewNoteComponent } from './view-note/view-note.component';
import { Route } from '@angular/router';

export const NoteRoutes: Route[] = [
  {
    path: 'create-note',
    loadComponent: () =>
      import('./create-edit-note/create-edit-note.component').then(
        (source) => source.CreateEditNoteComponent,
      ),
  },
  {
    path: 'edit-note/:id',
    loadComponent: () =>
      import('./create-edit-note/create-edit-note.component').then(
        (source) => source.CreateEditNoteComponent,
      ),
  },
  {
    path: '',
    component: AllNotesComponent,
  },
  {
    path: ':id',
    component: ViewNoteComponent,
  },
];
