import { Component, inject, Input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PageContentComponent } from '../../../components/page-content/page-content.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserT } from '../../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    PageContentComponent,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatButton,
    RouterLink,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  public authType: string | undefined;
  public signUpForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.min(6)]],
  });

  @Input()
  private set authenticationType(authType: string) {
    this.authType = authType;
  }

  constructor() {}

  public signUp() {
    this.authService.signUpNewUser(this.signUpForm.value as UserT);
    this.snackBar.open('User sign up successfully', 'Close');
    this.router.navigateByUrl('notes');
  }

  public login() {
    const userSearch = this.authService.isUserExist(
      this.signUpForm.value as UserT,
    );
    if (!userSearch) {
      this.snackBar.open('User login failed', 'Close');
      return;
    }
    this.snackBar.open('User login successfully', 'Close');
    this.router.navigateByUrl('notes');
  }
}
