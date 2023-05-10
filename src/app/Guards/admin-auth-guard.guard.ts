import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/Login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardGuard {
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {
    this.loginService.getRole().subscribe({
      next: (data: { role: string }) => {
        this.userRole = data.role;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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

    if (isAuth && this.userRole != 'Admin' && this.userRole != 'Moderator') {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return isAuth && (this.userRole == 'Admin' || this.userRole == 'Moderator');
  }
}
