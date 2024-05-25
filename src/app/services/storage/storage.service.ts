import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../../utils/constants';
import { LocalStorageKeysT } from '../../models/local-storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public getDatum(tableName: LocalStorageKeysT, id: string) {
    const localData = JSON.parse(
      localStorage.getItem(LocalStorageKeys[tableName]) || '[]',
    );
    const datum = localData.find((item: any) => item.id === id);
    return datum || undefined;
  }

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

  public editData<T extends { id: string }>(
    tableName: LocalStorageKeysT,
    data: T,
  ) {
    const localData = JSON.parse(
      localStorage.getItem(LocalStorageKeys[tableName]) || '[]',
    ) as T[];
    const itemToEditIndex = localData.findIndex((item) => item.id === data.id);
    localData[itemToEditIndex] = {
      ...localData[itemToEditIndex]!,
      ...data,
    };
    const newData = JSON.stringify(localData);
    localStorage.setItem(LocalStorageKeys[tableName], newData);
  }

  public deleteData(tableName: LocalStorageKeysT, id: string) {
    const localData = JSON.parse(
      localStorage.getItem(LocalStorageKeys[tableName]) || '[]',
    );
    const unDeletedData = localData.filter((item: any) => item.id !== id);
    const newData = JSON.stringify(unDeletedData);
    localStorage.setItem(LocalStorageKeys[tableName], newData);
  }
}
