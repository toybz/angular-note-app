import { Tag } from '../models/tag';
import { Note } from '../models/note';
import { Observable } from 'rxjs';
import { NoteService } from '../services/note/note.service';
import { UserT } from '../models/user';

export const testUser: UserT = {
  id: '1',
  username: 'testUser',
  password: 'testPassword',
};

const mockNoteContent =
  'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n' +
  '\n';
export const tags: Tag[] = [
  {
    tagName: 'Test',
    tagId: '123',
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
