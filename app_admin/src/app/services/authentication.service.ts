import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string {
    return String(this.storage.getItem('travlr-token'));
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Observable<any> {
    return this.tripDataService.login(user)
      .pipe(
        switchMap((authResp: AuthResponse) => {
          this.saveToken(authResp.token);
          return of(authResp);
        })
      );
  }

  public register(user: User): Observable<any> {
    return this.tripDataService.register(user)
      .pipe(
        switchMap((authResp: AuthResponse) => {
          this.saveToken(authResp.token);
          return of(authResp);
        })
      );
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token != 'null') {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    } else {
      const email: string = '';
      const name: string = '';
      return { email, name } as User;
    }
  }
}
