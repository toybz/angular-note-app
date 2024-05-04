import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

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
    ReactiveFormsModule
  ],
  templateUrl: './search-sort.component.html',
  styleUrl: './search-sort.component.scss'
})


export class SearchSortComponent {

  formBuilder = inject(FormBuilder)

  searchSortForm = this.formBuilder.group({
    searchQuery: [''],
    sortParam: [''],
    sortType: ['']
  });


}
