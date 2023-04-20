import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  requestNewToken(): Observable<{ token: string }> {
    // Replace the following URL with the endpoint in your ASP.NET Core backend that issues new tokens
    const url = `${environment}/api/auth/refresh-token`;

    // Send a POST request to the backend to request a new token
    // You can pass any necessary data in the request body, such as the expired token or refresh token
    return this.httpClient.post<{ token: string }>(url, {});
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem('authToken');
    if (authToken) {
      let authTokenExpiry = localStorage.getItem('authTokenExpDate');
      if (authTokenExpiry) {
        if (new Date() > new Date(authTokenExpiry)) {
          console.log('Expired');
          localStorage.setItem('isAuthenticated', 'false');

          return next.handle(req);
        }
      }
      localStorage.setItem('isAuthenticated', 'true');
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router) {} // Inject Router module

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // You can handle the response globally here
          // For example, you can check the response status code, headers, etc.
          // and perform actions accordingly
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // You can handle HTTP errors globally here
        // For example, you can check the error status code, headers, etc.
        // and perform actions accordingly
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if (error.status == 403) {
          this.router.navigate(['/forbidden']);
        }
        return throwError(() => new Error('error'));
      })
    );
  }
}
