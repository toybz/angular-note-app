import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Note, NoteForm } from '../../models/note';
import { generateUniqueId } from '../../utils/uniqueIdGenerator';
import { LocalStorageKeys } from '../../utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private snackBar = inject(MatSnackBar);

  private _notes = new BehaviorSubject<Note[]>([]);
  notes = this._notes.asObservable().pipe(
    tap((notes) => {
      console.log('new notes', notes);
      //save to localStorage
      localStorage.setItem(LocalStorageKeys.notes, JSON.stringify(notes));
    }),
  );

  constructor() {
    if (localStorage.getItem(LocalStorageKeys.notes)) {
      const savedNotes = JSON.parse(
        localStorage.getItem(LocalStorageKeys.notes)!,
      );
      this._notes.next(savedNotes);
    }
    //todo: remove
    this.notes.subscribe();
  }

  addNote(note: NoteForm) {
    console.log('create clicked');

    const newNote: Note = {
      id: generateUniqueId(),
      title: note.title,
      content: note.content,
      dateCreated: new Date(),
    };
    const existingNotes = this._notes.value;
    this._notes.next([...existingNotes, newNote]);

    this.snackBar.open('Note added successfully', 'Close');
  }
}
