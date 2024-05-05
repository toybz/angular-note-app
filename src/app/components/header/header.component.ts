import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardContent,
    RouterLink,
    MatMiniFabButton,
    MatToolbar,
    MatIconButton,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() showBackButton = true;
  @Input() title = 'Cocus Note';

  goBack() {
    history.back();
  }
}
