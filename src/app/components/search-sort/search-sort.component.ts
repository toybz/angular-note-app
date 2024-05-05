import { Component, inject, output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SortType } from '../../models/searchSort';

@Component({
  selector: 'app-search-sort',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatInputModule,
    MatIcon,
    MatLabel,
    MatHint,
    ReactiveFormsModule,
  ],
  templateUrl: './search-sort.component.html',
  styleUrl: './search-sort.component.scss',
})
export class SearchSortComponent {
  formBuilder = inject(FormBuilder);
  search = output<string>();
  sort = output<SortType>();
  sortValue: SortType = 'asc';

  searchForm = this.formBuilder.group({
    searchQuery: [''],
  });

  searchNote() {
    this.search.emit(this.searchForm.value.searchQuery!);
  }

  sortNote() {
    this.sortValue = this.sortValue === 'asc' ? 'desc' : 'asc';
    this.sort.emit(this.sortValue);
  }
}
