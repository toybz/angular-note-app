import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Note, NoteForm } from '../../models/note';
import { generateUniqueId } from '../../utils/uniqueIdGenerator';
import { LocalStorageKeys } from '../../utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  private _notes = new BehaviorSubject<Note[]>([]);
  public notes = this._notes.asObservable().pipe(
    tap((notes) => {
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
  }

  public getNote(noteId: string) {
    return this._notes.value.find((note) => note.id === noteId);
  }

  public addNote(note: NoteForm) {
    const newNote: Note = {
      id: generateUniqueId(),
      title: note.title,
      content: note.content,
      dateCreated: new Date(),
      tags: note.tags,
    };
    const existingNotes = this._notes.value;
    this._notes.next([...existingNotes, newNote]);

    this.snackBar.open('Note added successfully', 'Close');
  }

  public editNote(noteId: string, note: NoteForm) {
    const allNotes = this._notes.value;
    const noteToEdit = allNotes.find((note) => note.id === noteId) as Note;
    noteToEdit.title = note.title;
    noteToEdit.content = note.content;
    noteToEdit.lastModified = new Date();
    noteToEdit.tags = note.tags;

    this._notes.next(allNotes);

    this.snackBar.open('Note updated successfully', 'Close');
  }

  public deleteNote(noteId: string) {
    const unDeletedNotes = this._notes.value.filter(
      (note) => note.id !== noteId,
    );
    this._notes.next(unDeletedNotes);

    this.snackBar.open('Note deleted successfully', 'Close');
    this.router.navigateByUrl('/notes');
  }
}
