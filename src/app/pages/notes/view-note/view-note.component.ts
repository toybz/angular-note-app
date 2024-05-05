import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { PageContentComponent } from '../../../components/page-content/page-content.component';
import { TagsContainerComponent } from '../../../components/tags-container/tags-container.component';
import { Note } from '../../../models/note';
import { notes, tags } from '../../../../testData';
import { Tag } from '../../../models/tag';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [
    HeaderComponent,
    PageContentComponent,
    TagsContainerComponent,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.scss',
})
export class ViewNoteComponent {
  note: Note = notes[0];
  tags: Tag[] = [...tags];
}
