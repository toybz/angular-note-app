import { inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { UserT } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private storageService = inject(StorageService);

  constructor() {}

  public getUsers(): UserT[] {
    return this.storageService.getData('users') || ([] as UserT[]);
  }
}
