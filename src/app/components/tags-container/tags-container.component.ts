import { Component, inject, Input, output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagsService } from '../../services/tags/tags.service';

@Component({
  selector: 'app-tags-container',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatChipSet,
    MatChip,
    MatIcon,
    MatMiniFabButton,
    MatInput,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
  ],
  templateUrl: './tags-container.component.html',
  styleUrl: './tags-container.component.scss',
})
export class TagsContainerComponent {
  private formBuilder = inject(FormBuilder);
  private tagsService = inject(TagsService);
  allTags = this.tagsService.allTags;
  @Input() editMode: boolean = false;
  @Input() selectedTags: string[] = [];

  onTagsSelectionChange = output<string[]>();
  showAddTagContainer = false;
  newTagForm = this.formBuilder.group({
    tagName: ['', Validators.required],
  });

  toggleShowAddTagContainer() {
    this.showAddTagContainer = !this.showAddTagContainer;
  }

  addTag() {
    const tagName = this.newTagForm.value.tagName || '';
    this.tagsService.addTag(tagName);
  }

  toggleSelectedTag(tagId: string) {
    const tagItem = this.selectedTags.find((item) => item === tagId);
    let tagSelection;
    if (tagItem) {
      tagSelection = this.selectedTags.filter((item) => item !== tagId);
    } else {
      tagSelection = [...this.selectedTags, tagId];
    }
    this.onTagsSelectionChange.emit(tagSelection);
  }

  isTagSelected(tagId: string) {
    return this.selectedTags.find((item) => item === tagId);
  }
}
