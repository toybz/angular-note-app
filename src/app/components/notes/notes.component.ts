import { Component, Input } from '@angular/core';
import { Note } from '../../models/note';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardTitle, MatCardHeader, RouterLink],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  @Input({ required: true }) note!: Note;
}
