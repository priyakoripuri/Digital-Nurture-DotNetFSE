import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page-wrapper" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
      <mat-card style="padding: 48px; text-align: center; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
        <mat-icon style="font-size: 64px; width: 64px; height: 64px; color: var(--color-primary); margin-bottom: 24px;">map</mat-icon>
        <h1 style="font-size: 2rem; margin-bottom: 8px; color: var(--color-text);">Page Not Found</h1>
        <p style="color: var(--color-text-secondary); margin-bottom: 32px;">The page you are looking for does not exist or has been moved.</p>
        <a routerLink="/" mat-flat-button color="primary" style="padding: 0 32px;">Back to Dashboard</a>
      </mat-card>
    </div>
  `
})
export class NotFoundComponent {}
