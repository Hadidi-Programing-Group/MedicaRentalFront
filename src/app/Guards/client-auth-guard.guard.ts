import { Injectable } from '@angular/core';
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
export class ClientAuthGuardGuard {
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginService.getRole().pipe(
      map((data) => {
        if (data.role == 'Client') {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      })
    );
  }
}
