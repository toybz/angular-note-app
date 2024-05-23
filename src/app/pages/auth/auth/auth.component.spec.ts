import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { provideRouter, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserT } from '../../../models/user';
import { RouterTestingHarness } from '@angular/router/testing';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let harness: RouterTestingHarness;
  let fixture: HTMLElement;

  // injected services
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    // service spy objects
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'signUpNewUser',
      'isUserExist',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [AuthComponent, BrowserAnimationsModule],
      providers: [
        FormBuilder,
        provideRouter([{ path: '**', component: AuthComponent }]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    // service injections
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/', AuthComponent);
    fixture = harness.routeNativeElement!;
    harness.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#constructor', () => {
    it('should set the authType to sign-up', () => {
      const authType = 'sign-up';
      component['authenticationType'] = authType;
      harness.detectChanges();
      const formSubmitButton = fixture.querySelector(
        'button[data-test-id="form-submit-button"]',
      ) as HTMLButtonElement;
      const signUpOrLoginLink = fixture.querySelector(
        '[data-test-id="form-link"]',
      ) as HTMLElement;

      expect(component.authType).toBe(authType);
      expect(formSubmitButton.textContent).toBe(' Sign Up ');
      expect(signUpOrLoginLink.textContent).toBe('Login');
    });

    it('should set the authType to login', () => {
      const authType = 'login';
      component['authenticationType'] = authType;
      harness.detectChanges();
      const formSubmitButton = fixture.querySelector(
        'button[data-test-id="form-submit-button"]',
      ) as HTMLButtonElement;
      const signUpOrLoginLink = fixture.querySelector(
        '[data-test-id="form-link"]',
      ) as HTMLElement;

      expect(component.authType).toBe(authType);
      expect(formSubmitButton.textContent).toBe(' Login ');
      expect(signUpOrLoginLink.textContent).toBe('Sign up');
    });
  });

  describe('#signUp', () => {
    it('should perform signup operations', () => {
      const newUser: Omit<UserT, 'id'> = {
        username: 'username',
        password: 'password',
      };
      component.signUpForm.patchValue(newUser);

      component.signUp();

      expect(authService.signUpNewUser).toHaveBeenCalledWith(newUser);
      expect(snackBar.open).toHaveBeenCalled();
      expect(TestBed.inject(Router).url)
        .withContext('should navigate to notes page')
        .toEqual(`/`);
    });
  });

  describe('#login', () => {
    it('should show error message for failed login', () => {
      const mockUser: UserT = {
        username: 'username',
        password: 'password',
      };
      authService.isUserExist.and.returnValue(null);
      component.signUpForm.patchValue(mockUser);

      component.login();

      expect(snackBar.open).toHaveBeenCalledWith('User login failed', 'Close');
    });

    it('should log user in for successful login', () => {
      const mockUser: UserT = {
        username: 'username',
        password: 'password',
      };
      authService.isUserExist.and.returnValue(mockUser);
      component.signUpForm.patchValue(mockUser);

      component.login();

      expect(snackBar.open).toHaveBeenCalledWith(
        'User login successfully',
        'Close',
      );
      expect(TestBed.inject(Router).url)
        .withContext('should navigate to notes page')
        .toEqual(`/`);
    });
  });
});
