import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'data/auth.service';
import { ToastService } from 'view/messaging/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  login() {
    this.authService.login().subscribe({
      next: () => this.success(),
      error: (e) => this.toastService.error(e),
    });
  }

  success() {
    this.router.navigate(['/']);
    this.toastService.success('Logged in with success');
  }
}
