import {Injectable} from '@angular/core';
import {Router, UrlTree,} from '@angular/router';
import {map, Observable} from 'rxjs';
import {LoginService} from '../Services/Login/login.service';

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
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
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
