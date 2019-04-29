import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router, private authService: AuthService) { }
  // TODO: If the page is landing and the user is logged in, needs to redirect to home,
  // in other words, user cannot go to landing page if the session is active
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/landing']);
    return false;
  }
}
