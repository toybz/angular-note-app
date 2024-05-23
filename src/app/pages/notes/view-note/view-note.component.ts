import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { PageContentComponent } from '../../../components/page-content/page-content.component';
import { TagsContainerComponent } from '../../../components/tags-container/tags-container.component';
import { Note } from '../../../models/note';
import { tags } from '../../../test-assets/testData';
import { Tag } from '../../../models/tag';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NoteService } from '../../../services/note/note.service';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShareNoteDialogComponent } from '../share-note-dialog/share-note-dialog.component';

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
  private noteService = inject(NoteService);
  private matDialog = inject(MatDialog);
  public note!: Note;

  @Input()
  private set id(noteId: string) {
    if (this.noteService.getNote(noteId)) {
      this.note = this.noteService.getNote(noteId)!;
    } else {
      // todo: redirect to 404
    }
  }

  public get selectedTags() {
    return this.note.tags || [];
  }

  public tags: Tag[] = [...tags];

  public deleteNote(noteId: string) {
    this.noteService.deleteNote(noteId);
  }

  public openShareDialog() {
    this.matDialog.open(ShareNoteDialogComponent, {
      data: {
        noteId: this.note.id,
      },
    });
  }
}
