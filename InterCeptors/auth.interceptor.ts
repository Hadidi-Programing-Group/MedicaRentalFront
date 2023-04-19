import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { Observable, map, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly httpClient: HttpClient) {}

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

          // redirect to login
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
