import {Component, Input} from '@angular/core';
import {Note} from "../../models/note";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NotesComponent} from "../notes/notes.component";

@Component({
  selector: 'app-notes-container',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NotesComponent
  ],
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.scss'
})
export class NotesContainerComponent {

  @Input('notes') notes: Note[] = []
}
