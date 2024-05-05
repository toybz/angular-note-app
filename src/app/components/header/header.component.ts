import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, MatCard, MatCardContent, RouterLink, MatMiniFabButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() showBackButton = true;

  goBack() {
    history.back();
  }
}
