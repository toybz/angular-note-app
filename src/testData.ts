import { Tag } from './app/models/tag';
import { Note } from './app/models/note';
import { Observable } from 'rxjs';
import { NoteService } from './app/services/note/note.service';

const mockNoteContent =
  'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n' +
  '\n';
export const tags: Tag[] = [
  {
    tagName: 'Test',
    notedId: '123',
  },
];
export const notes: Note[] = [
  {
    id: '1',
    title: 'Test 1',
    content: mockNoteContent,
    dateCreated: new Date(),
  },

  {
    id: '2',
    title: 'Test 1',
    content: mockNoteContent,
    dateCreated: new Date(),
  },
  {
    id: '3',
    title: 'Test 1',
    content: mockNoteContent,
    dateCreated: new Date(),
  },
  {
    id: '4',
    title: 'Test 1',
    content: mockNoteContent,
    dateCreated: new Date(),
  },
  {
    id: '5',
    title: 'Test 1',
    content: mockNoteContent,
    dateCreated: new Date(),
  },
  {
    id: '6',
    title: 'Test 1',
    content: mockNoteContent,
    dateCreated: new Date(),
  },
  {
    id: '7',
    title: 'Test 1',
    content: mockNoteContent,
    dateCreated: new Date(),
  },
];

export const MockServices = {
  noteServiceStub: {
    snackBar: {},
    router: {},
    notes: new Observable<Note[]>((observer) => {
      observer.next(notes);
    }),
    getNote(noteId): Note {
      return notes[0];
    },
    deleteNote(noteId: string) {},
  } as Partial<NoteService>,
};
