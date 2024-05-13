import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Tag } from '../../models/tag';
import { generateUniqueId } from '../../utils/uniqueIdGenerator';
import { LocalStorageKeys } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private _allTags: WritableSignal<Tag[]> = signal([]);
  readonly allTags: WritableSignal<Tag[]> = signal([]);

  constructor() {
    const savedTags = localStorage.getItem(LocalStorageKeys.tags);
    if (savedTags) {
      this._allTags.set(JSON.parse(savedTags));
    }

    effect(
      () => {
        const allTags = this._allTags();
        this.allTags.set(allTags);
        localStorage.setItem(LocalStorageKeys.tags, JSON.stringify(allTags));
      },
      { allowSignalWrites: true },
    );
  }

  addTag(tagName: string) {
    const newTag: Tag = {
      tagId: generateUniqueId(),
      tagName: tagName,
    };
    this._allTags.update((existingTags) => [...existingTags, newTag]);
  }
}
