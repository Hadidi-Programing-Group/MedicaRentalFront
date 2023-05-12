import {Injectable} from '@angular/core';
import {Router, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard {
  constructor(private router: Router) {}
  canActivate(

  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('authToken');

    const isAuth =
      localStorage.getItem('isAuthenticated') == 'true' && token && token != '';

    if (isAuth) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
