import { UserT } from './user';

export interface Note {
  readonly id: string;
  title: string;
  content: string;
  dateCreated: Date;
  lastModified?: Date;
  tags?: string[];
}

export interface NoteForm {
  title: string;
  content: string;
  tags?: string[];
}

export interface SharedNoteT {
  id: string;
  noteId: string;
  sharedBy: UserT;
  sharedTo: UserT;
}
