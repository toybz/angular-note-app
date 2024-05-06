import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show back button if #showBackbutton is true', () => {
    component.showBackButton = true;
    const backButton = fixture.nativeElement.querySelector(
      'button[data-test-id="back-button"]',
    );
    expect(backButton).toBeTruthy();
  });

  it('should not show back button if #showBackbutton is false', () => {
    component.showBackButton = false;
    fixture.detectChanges();
    const backButton = fixture.nativeElement.querySelector(
      'button[data-test-id="back-button"]',
    );
    expect(backButton).toBeFalsy();
  });

  it('should show the passed in #title', () => {
    const testTitle = 'Test Title';
    component.title = testTitle;
    fixture.detectChanges();
    const titleEl = fixture.nativeElement.querySelector(
      'span[data-test-id="title"]',
    );
    expect(titleEl.textContent).toBe(testTitle);
  });
});
