import { Routes } from '@angular/router';
import { AllNotesComponent } from './pages/notes/all-notes/all-notes.component';
import { CreateEditNoteComponent } from './pages/notes/create-edit-note/create-edit-note.component';

export const routes: Routes = [
  {
    path: 'notes',
    children: [
      {
        path: '',
        component: AllNotesComponent,
      },
      {
        path: 'create-note',
        component: CreateEditNoteComponent,
      },
      {
        path: 'edit-note/:id',
        component: CreateEditNoteComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
];
