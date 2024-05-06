import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNoteComponent } from './view-note.component';
import { NoteService } from '../../../services/note/note.service';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '../../../app.routes';
import { MockServices } from '../../../../testData';

describe('ViewNoteComponent', () => {
  let component: ViewNoteComponent;
  let fixture: ComponentFixture<ViewNoteComponent>;
  const noteServiceStub = MockServices.noteServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNoteComponent],
      providers: [
        { provide: NoteService, useValue: noteServiceStub },
        provideRouter(routes, withComponentInputBinding()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewNoteComponent);
    component = fixture.componentInstance;
    component.id = '2';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
