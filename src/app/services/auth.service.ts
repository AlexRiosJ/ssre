import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';
  isLoggedIn = new Subject<boolean>();
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {}

  changeStatus() {
    this.isLoggedIn.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    // TODO: back-end will verify if the token is correct
    return this.token.length > 0;
  }

  login() {
    this.token = 'dummy token';
    this.router.navigate([''], {relativeTo: this.route});
    this.changeStatus();
    this.userService.changeUserName();
  }

  logout() {
    this.token = '';
    this.changeStatus();
  }
}
