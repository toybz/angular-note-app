import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../../utils/constants';
import { LocalStorageKeysT } from '../../models/local-storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public getData(tableName: LocalStorageKeysT) {
    const localData = localStorage.getItem(LocalStorageKeys[tableName]);
    if (!localData) {
      return {};
    }
    return JSON.parse(localData);
  }

  public addData(tableName: LocalStorageKeysT, data: never) {
    const localData = JSON.parse(
      localStorage.getItem(LocalStorageKeys[tableName]) || '[]',
    );
    const newData = JSON.stringify([...localData, data]);
    localStorage.setItem(LocalStorageKeys[tableName], newData);
  }
}
