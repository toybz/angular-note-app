import { Routes } from '@angular/router';
import { AllNotesComponent } from './pages/notes/all-notes/all-notes.component';
import { CreateEditNoteComponent } from './pages/notes/create-edit-note/create-edit-note.component';
import { ViewNoteComponent } from './pages/notes/view-note/view-note.component';

export const routes: Routes = [
  {
    path: 'notes',
    children: [
      {
        path: 'create-note',
        component: CreateEditNoteComponent,
      },
      {
        path: 'edit-note/:id',
        component: CreateEditNoteComponent,
      },
      {
        path: '',
        component: AllNotesComponent,
      },
      {
        path: ':id',
        component: ViewNoteComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
];
