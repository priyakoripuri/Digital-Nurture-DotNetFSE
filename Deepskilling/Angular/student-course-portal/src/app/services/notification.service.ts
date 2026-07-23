import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private messages: string[] = [];

  addMessage(msg: string) {
    this.messages.push(msg);
  }

  getMessages(): string[] {
    return this.messages;
  }
}
