import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientAuthGuardGuard {
  constructor(private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userRole = localStorage.getItem('userRole');
    const isAuth = localStorage.getItem('isAuthenticated') == 'true';

    if (!isAuth) {
      this.router.navigate(['/login']);
      return false;
    }

    if (isAuth && userRole != 'Client') {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return isAuth && userRole == 'Client';
  }
}
