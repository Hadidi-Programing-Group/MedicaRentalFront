import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../Services/Login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardGuard {
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  userRole?: string;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuth = localStorage.getItem('isAuthenticated') == 'true';

    if (!isAuth) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.loginService.getRole().pipe(
      map((data) => {
        if (data.role == 'Admin' || data.role == 'Moderator') {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      })
    );
  }
}
