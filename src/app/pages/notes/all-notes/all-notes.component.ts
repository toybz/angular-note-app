import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { HeaderComponent } from '../../../components/header/header.component';
import { PageContentComponent } from '../../../components/page-content/page-content.component';
import { SearchSortComponent } from '../../../components/search-sort/search-sort.component';
import { TagsContainerComponent } from '../../../components/tags-container/tags-container.component';
import { NotesContainerComponent } from '../../../components/notes-container/notes-container.component';
import { Tag } from '../../../models/tag';
import { tags } from '../../../../testData';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../../services/note/note.service';
import { AsyncPipe } from '@angular/common';
import { SortType } from '../../../models/searchSort';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-all-notes',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    HeaderComponent,
    PageContentComponent,
    SearchSortComponent,
    TagsContainerComponent,
    NotesContainerComponent,
    MatIcon,
    MatFabButton,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './all-notes.component.html',
  styleUrl: './all-notes.component.scss',
})
export class AllNotesComponent {
  private noteService = inject(NoteService);

  tags: Tag[] = [...tags];
  searchQuery = new BehaviorSubject('');
  sortType = new BehaviorSubject('');

  notes = combineLatest(
    this.noteService.notes,
    this.searchQuery,
    this.sortType,
  ).pipe(
    map(([notes, searchQuery, sortType]) => {
      let displayedNote = notes;
      if (searchQuery) {
        displayedNote = notes.filter((note) => {
          return note.title.includes(searchQuery);
        });
      }
      if (sortType) {
        displayedNote = [...displayedNote].sort((a, b) => {
          if (sortType === 'asc') {
            return a.title > b.title ? 1 : -1;
          } else {
            return b.title > a.title ? 1 : -1;
          }
        });
      }
      return displayedNote;
    }),
  );

  constructor() {}

  searchNotes(event: string) {
    this.searchQuery.next(event);
  }

  sortNotes(event: SortType) {
    this.sortType.next(event);
  }
}
