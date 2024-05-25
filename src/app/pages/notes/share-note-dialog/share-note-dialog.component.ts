import { Component, computed, inject, Inject } from '@angular/core';
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
import { ShareNoteService } from '../../../services/share/share-note.service';

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
  private shareNoteService = inject(ShareNoteService);
  public sharedList = this.shareNoteService.getSharedWithUsers(
    this.data.noteId,
  );
  public signedInUser = this.authService.user();
  public users = this.usersService
    .getUsers()
    .filter((user) => user.username !== this.signedInUser?.username);

  public renderedList = computed(() => {
    return this.users.map((user) => {
      return {
        user: { ...user },
        shareDetail: this.isNoteSharedToUser(user.id!),
      };
    });
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { noteId: string }) {}

  public shareNote(userId: string, noteId: string) {
    this.shareNoteService.shareNote(userId, noteId);
  }

  public undoShare(shareId: string) {
    this.shareNoteService.undoShare(shareId);
  }

  public isNoteSharedToUser(userId: string) {
    return this.sharedList().find((item) => item.sharedTo.id === userId);
  }
}
