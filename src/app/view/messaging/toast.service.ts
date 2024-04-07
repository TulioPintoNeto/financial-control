import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastInfo[] = [];

  constructor() {}

  success(message: string) {
    this.toasts.push({ body: message, type: 'success' });
  }

  error(error: any) {
    this.toasts.push({ body: this.parseError(error), type: 'error' });
  }

  private parseError(error: any): string {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'Unidentified error';
    }
  }
}
