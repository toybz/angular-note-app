import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { SharedNoteT } from '../../models/note';
import { generateUniqueId } from '../../utils/uniqueIdGenerator';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShareNoteService {
  private authService = inject(AuthService);
  private userService = inject(UsersService);
  private storageService = inject(StorageService);
  private noteId = signal('');
  private sharedList: WritableSignal<SharedNoteT[]> = signal(
    this.storageService.getData('sharedNotes'),
  );
  public sharedWithUsers: WritableSignal<SharedNoteT[]> = signal([]);

  constructor() {
    effect(
      () => {
        const signedInUser = this.authService.user();
        const list = this.sharedList().filter((item) => {
          return (
            item.sharedBy.id === signedInUser?.id &&
            item.noteId === this.noteId()
          );
        });
        this.sharedWithUsers.set(list);
      },
      { allowSignalWrites: true },
    );
  }

  public shareNote(userId: string, noteId: string) {
    const sharedBy = this.authService.user()!;
    const sharedTo = this.userService.getUser(userId);
    const sharedNote: SharedNoteT = {
      id: generateUniqueId(),
      noteId,
      sharedTo,
      sharedBy,
    };
    this.storageService.addData('sharedNotes', sharedNote as never);
    const newSharedList = this.storageService.getData('sharedNotes');
    this.sharedList.set(newSharedList);
  }

  public undoShare(shareId: string) {
    this.storageService.deleteData('sharedNotes', shareId);
    const newSharedList = this.storageService.getData('sharedNotes');
    this.sharedList.set(newSharedList);
  }

  public getSharedWithUsers(noteId: string) {
    this.noteId.set(noteId);
    return this.sharedWithUsers;
  }
}
