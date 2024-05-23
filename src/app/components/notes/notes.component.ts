import { Component, Input } from '@angular/core';
import { Note } from '../../models/note';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { TruncateTextPipe } from '../../pipes/truncate-text/truncate-text.pipe';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    RouterLink,
    MatButton,
    TruncateTextPipe,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  @Input({ required: true }) public note!: Note;
}
