import {Component, Input} from '@angular/core';
import {Tag} from "../../models/tag";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";

@Component({
  selector: 'app-tags-container',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatChipSet,
    MatChip
  ],
  templateUrl: './tags-container.component.html',
  styleUrl: './tags-container.component.scss'
})
export class TagsContainerComponent {

  @Input('tags') tags: Tag[] = []
}
