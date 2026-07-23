import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../services/notification.service';

/**
 * Providing NotificationService at the component level:
 * providers: [NotificationService]
 * 
 * WHY: This creates a separate, isolated instance of NotificationService 
 * strictly scoped to this component and its children. It is NOT a singleton.
 * If multiple NotificationComponents are rendered, each gets its own service instance.
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [NotificationService],
  template: `
    <mat-card style="margin-top: 24px; border: 1px dashed var(--color-primary);">
      <mat-card-header>
        <mat-icon mat-card-avatar color="primary">notifications_active</mat-icon>
        <mat-card-title>Component-Level Provider Demo</mat-card-title>
        <mat-card-subtitle>NotificationService scoped to this component instance.</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content style="padding: 16px;">
        <p *ngIf="messages.length === 0" style="color: var(--color-text-secondary); margin: 0;">No notifications yet.</p>
        <ul *ngIf="messages.length > 0" style="margin: 0; padding-left: 20px; color: var(--color-text);">
          <li *ngFor="let msg of messages">{{ msg }}</li>
        </ul>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary" (click)="notify()">Trigger Notification</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {}

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  notify() {
    const timestamp = new Date().toLocaleTimeString();
    this.notificationService.addMessage(`System check complete at ${timestamp}`);
  }
}
