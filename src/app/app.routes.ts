import { Routes } from '@angular/router';
import {AllNotesComponent} from "./pages/notes/all-notes/all-notes.component";

export const routes: Routes = [
  {
    path: "notes",
    children: [
      {
        path: '',
        component: AllNotesComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  }
];
