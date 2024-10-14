import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: { username: string, email: string } | null = null;

  setUserData(username: string, email: string) {
    this.userData = { username, email };
  }

  getUserData() {
    return this.userData;
  }
}
