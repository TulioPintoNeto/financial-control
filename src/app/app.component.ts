import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagingComponent } from 'view/messaging/messaging.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
