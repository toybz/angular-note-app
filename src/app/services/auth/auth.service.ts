import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { UserT } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageService = inject(StorageService);
  private router = inject(Router);

  user: WritableSignal<UserT | null> = signal(null);

  constructor() {}

  signUpNewUser(user: UserT) {
    this.storageService.addData('users', user);
    const users = this.storageService.getData('users');
  }

  isUserExist(user: UserT) {
    const users = this.storageService.getData('users') as UserT[];
    const userSearch = users.find((data) => {
      return (
        data.username === user?.username && data.password === user.password
      );
    });
    if (!userSearch) {
      return null;
    }
    this.user.set(userSearch);
    return userSearch;
  }

  logOut() {
    this.user.set(null);
    this.router.navigateByUrl('auth/login');
  }
}
