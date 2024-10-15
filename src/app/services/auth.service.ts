// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {}

  login(username: string, password: string): boolean {
    // Here you should call your API to authenticate
    // For now, we'll just simulate a login
    if (username === 'admin' && password === 'password') {
      this.loggedIn = true;
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('username') !== null;
  }
}
