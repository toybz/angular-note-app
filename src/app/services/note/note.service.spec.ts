import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { BehaviorSubject, skip } from 'rxjs';
import { Note } from '../../models/note';
import { notes } from '../../test-assets/testData';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
    });
    service = TestBed.inject(NoteService);
    service['_notes'] = new BehaviorSubject<Note[]>([...notes]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getNote()', () => {
    it('should return note of #id', () => {
      const expectedNote = notes[0];
      expect(service.getNote('1')).toEqual(expectedNote);
    });
  });

  describe('#addNote()', () => {
    it('should add #note to the notes observable', () => {
      const currentLengthOfNotes = notes.length;
      service.notes.pipe(skip(1)).subscribe((newNotesList) => {
        expect(newNotesList.length).toEqual(currentLengthOfNotes + 1);
      });
      service.addNote(notes[0]);
    });
  });

  describe('#editNote()', () => {
    it('should edit the note', () => {
      const targetNote = notes[0];
      const newTitle = 'New and Modified title';
      targetNote.title = newTitle;
      service.notes.pipe(skip(1)).subscribe((notes) => {
        expect(notes[0].title).toEqual(newTitle);
      });
      service.editNote('1', targetNote);
    });
  });

  describe('#deleteNote()', () => {
    it('should delete the note of #id', () => {
      const currentLengthOfNotes = notes.length;
      service.notes.pipe(skip(1)).subscribe((newNotesList) => {
        expect(newNotesList.length).toEqual(currentLengthOfNotes - 1);
      });
      service.deleteNote('1');
    });
  });
});
