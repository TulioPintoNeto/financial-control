import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  private basePath = '.netlify/functions';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getActivities() {}
}
