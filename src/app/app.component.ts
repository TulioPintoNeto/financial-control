import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'data/auth.service';
import { NavComponent } from 'view/components/nav/nav.component';
import { MessagingComponent } from 'view/messaging/messaging.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MessagingComponent, NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
