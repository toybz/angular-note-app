import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '../../app.routes';
import { notes } from '../../../testData';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesComponent],
      providers: [provideRouter(routes, withComponentInputBinding())],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    component.note = notes[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
