import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { UsersService } from '../../../services/users/users.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NoteService } from '../../../services/note/note.service';

@Component({
  selector: 'app-share-note-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatList,
    MatListItem,
    MatSlideToggle,
  ],
  templateUrl: './share-note-dialog.component.html',
  styleUrl: './share-note-dialog.component.scss',
})
export class ShareNoteDialogComponent {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private noteService = inject(NoteService);
  public usersInSharedList = [
    {
      sharedTo: { username: 'user1' },
      sharedBy: { username: 'user2' },
    },
    {
      sharedTo: { username: 'user3' },
      sharedBy: { username: 'user2' },
    },
  ]; //this.noteService.getSharedList()
  public signedInUser = this.authService.user();
  public users = this.usersService
    .getUsers()
    .filter((user) => user.username !== this.signedInUser?.username);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { noteId: string }) {
    console.log('users', this.users);
  }
}
