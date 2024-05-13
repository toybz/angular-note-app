export interface Tag {
  tagName: string;
  tagId: string;
}

export interface NoteTag {
  noteId: string;
  tag: Tag;
}
