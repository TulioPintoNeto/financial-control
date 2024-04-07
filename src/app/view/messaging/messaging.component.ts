import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  host: { class: 'toast-container position-fixed top-0 end-0 p-3' },
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule, NgbToast],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.scss',
})
export class MessagingComponent {
  constructor(private toastService: ToastService) {}

  get toasts() {
    return this.toastService.toasts;
  }
}
