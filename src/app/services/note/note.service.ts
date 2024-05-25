import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note, NoteForm } from '../../models/note';
import { generateUniqueId } from '../../utils/uniqueIdGenerator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private storageService = inject(StorageService);

  private _notes = new BehaviorSubject<Note[]>([]);
  public notes = this._notes.asObservable();

  constructor() {
    const localNotes = this.storageService.getData('notes');
    if (localNotes) {
      this._notes.next(localNotes);
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
    this.storageService.addData('notes', newNote as never);
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

    this.storageService.editData('notes', noteToEdit!);
    this._notes.next(allNotes);

    this.snackBar.open('Note updated successfully', 'Close');
  }

  public deleteNote(noteId: string) {
    this.storageService.deleteData('notes', noteId);
    const unDeletedNotes = this._notes.value.filter(
      (note) => note.id !== noteId,
    );
    this._notes.next(unDeletedNotes);

    this.snackBar.open('Note deleted successfully', 'Close');
    this.router.navigateByUrl('/notes');
  }
}
