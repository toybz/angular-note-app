import { Tag } from './tag';

export interface Note {
  readonly id: string;
  title: string;
  content: string;
  dateCreated: Date;
  lastModified?: Date;
}

export interface NoteForm {
  title: string;
  content: string;
  tags?: Tag[];
}
