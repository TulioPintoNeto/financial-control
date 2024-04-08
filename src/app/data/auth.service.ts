import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { singletons } from '../core/initialization';
import { Observable, catchError, from, map } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import { SessionManager } from './session-manager';

interface Credential {
  accessToken: string;
  idToken: string;
}

interface Session {
  credential: Credential;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credential?: Credential;
  private _user?: User;
  private session: SessionManager<Session>;

  auth: Auth;
  provider: GoogleAuthProvider;

  constructor() {
    this.auth = singletons.firebase.auth;
    this.provider = singletons.firebase.provider;

    this.session = new SessionManager('credential');
    const { credential, user } = this.session.get() || {};

    this.credential = credential;
    this._user = user;
  }

  login(): Observable<void> {
    return from(signInWithPopup(this.auth, this.provider)).pipe(
      map((userCredential) => {
        this.credential = this.parseCredential(userCredential);
        this._user = this.parseUser(userCredential);
        this.session.set({ credential: this.credential, user: this._user });
        return;
      }),
      catchError((error) => {
        if (error instanceof FirebaseError) {
          throw new Error('Access Denied: You do not have permission to login');
        }

        throw error;
      })
    );
  }

  parseCredential(userCredential: UserCredential): Credential {
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);

    const { accessToken, idToken } = credential || {};

    if (!accessToken || !idToken) {
      throw new Error('Missing credential in sign in method');
    }

    return { accessToken, idToken };
  }

  parseUser(userCredential: UserCredential): User {
    const { displayName: name, photoURL: image } = userCredential.user;

    return { name, image };
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      map(() => {
        this.credential = undefined;
        this._user = undefined;
        this.session.clear();
        return;
      })
    );
  }

  get isAuthenticated() {
    return Boolean(this.credential);
  }

  get token() {
    return this.credential?.accessToken;
  }

  get user() {
    return this._user;
  }
}
