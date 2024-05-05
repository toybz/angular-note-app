import { Component, inject } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageContentComponent } from '../../../components/page-content/page-content.component';
import { TagsContainerComponent } from '../../../components/tags-container/tags-container.component';
import { tags } from '../../../../testData';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NoteService } from '../../../services/note/note.service';
import { NoteForm } from '../../../models/note';

@Component({
  selector: 'app-create-edit-note',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    PageContentComponent,
    TagsContainerComponent,
    MatButton,
    HeaderComponent,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './create-edit-note.component.html',
  styleUrl: './create-edit-note.component.scss',
})
export class CreateEditNoteComponent {
  formBuilder = inject(FormBuilder);
  private noteService = inject(NoteService);

  noteForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    tags: [],
  });
  tags = [...tags];

  createNote() {
    const noteFormValue = this.noteForm.value as NoteForm;
    this.noteService.addNote(noteFormValue);
    this.noteForm.reset({
      title: '',
      content: '',
    });
  }
}
