import { Component, inject, Input } from '@angular/core';
import { Note } from '../../models/note';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NotesComponent } from '../notes/notes.component';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-notes-container',
  standalone: true,
  imports: [MatCard, MatCardContent, NotesComponent],
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.scss',
})
export class NotesContainerComponent {
  noteService = inject(NoteService);
  @Input('notes') notes: Note[] = [];
}
