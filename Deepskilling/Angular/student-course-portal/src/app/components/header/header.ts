import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * HeaderComponent — Toolbar right-side actions.
 *
 * Renders inside the top MatToolbar (defined in app.html).
 * Provides: notifications icon button + user profile icon button.
 *
 * No @Input / @Output — HO-1 compliant.
 * Interactions are purely presentational for this exercise.
 */
@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {}
