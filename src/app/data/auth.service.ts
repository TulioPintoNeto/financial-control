import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { singletons } from '../core/initialization';
import { EMPTY, Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string | null;
  private _key = 'auth-token';

  auth: Auth;
  provider: GoogleAuthProvider;

  constructor() {
    this.auth = singletons.firebase.auth;
    this.provider = singletons.firebase.provider;
    this._token = localStorage.getItem(this._key);
  }

  login(): Observable<void> {
    return from(signInWithPopup(this.auth, this.provider)).pipe(
      map((userCredential) => {
        const credential =
          GoogleAuthProvider.credentialFromResult(userCredential);

        if (!credential?.accessToken) {
          throw new Error('Missing credential in sign in method');
        }

        this._token = credential?.accessToken;
        localStorage.setItem(this._key, this._token);
        return;
      })
    );
  }

  get token() {
    return this._token;
  }

  get isAuthenticated() {
    return Boolean(this._token);
  }
}
