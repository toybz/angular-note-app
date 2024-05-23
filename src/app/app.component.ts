import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public isUserLoggedIn = this.authService.user;

  constructor() {
    if (!this.isUserLoggedIn()) {
      this.router.navigateByUrl('auth/login');
    }
  }
}
