import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';
  constructor() { }

  isAuthenticated(): boolean {
    // TODO: back-end will verify if the token is correct
    return this.token.length > 0;
  }

  login() {
    // TODO: generate token
    this.token = 'dummy token';
  }

  logout() {
    this.token = '';
  }
}
