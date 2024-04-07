import { CanActivateFn, Router, Routes } from '@angular/router';
import { LoginComponent } from './view/pages/login/login.component';
import { AuthService } from 'data/auth.service';
import { inject } from '@angular/core';
import { HomeComponent } from 'view/pages/home/home.component';

const canActivate: CanActivateFn = () => {
  const { isAuthenticated } = inject(AuthService);
  const router = inject(Router);

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [canActivate],
  },
  { path: 'login', component: LoginComponent },
];
