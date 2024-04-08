import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'data/auth.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'view/messaging/toast.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnDestroy {
  private subscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  logout() {
    this.subscription = this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (e) => this.toastService.error(e),
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  get user() {
    return this.authService.user;
  }

  get name() {
    return this.authService.user?.name?.split(' ')[0];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
