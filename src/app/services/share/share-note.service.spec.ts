import { TestBed } from '@angular/core/testing';

import { ShareNoteService } from './share-note.service';

describe('ShareNoteService', () => {
  let service: ShareNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
