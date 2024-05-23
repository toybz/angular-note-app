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
  public onTagsSelectionChange = output<string[]>();

  public allTags = this.tagsService.allTags;
  public showAddTagContainer = false;
  public newTagForm = this.formBuilder.group({
    tagName: ['', Validators.required],
  });

  @Input() public editMode: boolean = false;
  @Input() public selectedTags: string[] = [];

  public toggleShowAddTagContainer() {
    this.showAddTagContainer = !this.showAddTagContainer;
  }

  public addTag() {
    const tagName = this.newTagForm.value.tagName || '';
    this.tagsService.addTag(tagName);
  }

  public toggleSelectedTag(tagId: string) {
    const tagItem = this.selectedTags.find((item) => item === tagId);
    let tagSelection;
    if (tagItem) {
      tagSelection = this.selectedTags.filter((item) => item !== tagId);
    } else {
      tagSelection = [...this.selectedTags, tagId];
    }
    this.onTagsSelectionChange.emit(tagSelection);
  }

  public isTagSelected(tagId: string) {
    return this.selectedTags.find((item) => item === tagId);
  }
}
