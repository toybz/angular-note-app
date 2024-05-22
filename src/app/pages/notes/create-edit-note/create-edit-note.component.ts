import { Component, inject, Input } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PageContentComponent } from '../../../components/page-content/page-content.component';
import { TagsContainerComponent } from '../../../components/tags-container/tags-container.component';
import { tags } from '../../../test-assets/testData';
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
  private formBuilder = inject(FormBuilder);
  private noteService = inject(NoteService);
  inEditMode = false;
  editNoteId: string | null = null;

  @Input()
  set id(noteId: string) {
    if (this.noteService.getNote(noteId)) {
      this.inEditMode = true;
      this.editNoteId = noteId;
      const note = this.noteService.getNote(noteId)!;
      this.noteForm.patchValue({
        title: note.title,
        content: note.content,
      });
    } else {
      // todo redirect to 404
    }
  }

  noteForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    tags: new FormControl<string[]>([]),
  });

  tags = [...tags];

  get selectedTags() {
    return this.noteForm.value.tags || [];
  }

  createNote() {
    const noteFormValue = this.noteForm.value as NoteForm;
    if (!this.inEditMode) {
      this.noteService.addNote(noteFormValue);
      this.noteForm.reset({
        title: '',
        content: '',
        tags: [],
      });
    } else {
      this.noteService.editNote(this.editNoteId!, noteFormValue);
    }
  }

  tagsSelectionChangeHandler(event: string[]) {
    this.noteForm.patchValue({
      tags: event,
    });
  }
}
