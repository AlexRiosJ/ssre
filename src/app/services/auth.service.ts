import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';
  isLoggedIn = new Subject<boolean>();
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private http: HttpClient) {}

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
    this.http.post(environment.apiUrl + '/logout', {}, {headers: new HttpHeaders({
      'x-auth': this.userService.getActiveStudent().token
    })}).subscribe(data => console.log(data));
    this.token = '';
    this.changeStatus();
  }
}
