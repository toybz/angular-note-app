import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { PageContentComponent } from '../../../components/page-content/page-content.component';
import { TagsContainerComponent } from '../../../components/tags-container/tags-container.component';
import { Note } from '../../../models/note';
import { tags } from '../../../../testData';
import { Tag } from '../../../models/tag';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NoteService } from '../../../services/note/note.service';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [
    HeaderComponent,
    PageContentComponent,
    TagsContainerComponent,
    MatCard,
    MatCardContent,
    DatePipe,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatIconButton,
    MatMenuItem,
    RouterLink,
  ],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.scss',
})
export class ViewNoteComponent {
  noteService = inject(NoteService);
  note!: Note;
  @Input()
  set id(noteId: string) {
    if (this.noteService.getNote(noteId)) {
      this.note = this.noteService.getNote(noteId)!;
    } else {
      // todo: redirect to 404
    }
  }
  tags: Tag[] = [...tags];

  deleteNote(noteId: string) {
    this.noteService.deleteNote(noteId);
  }
}
