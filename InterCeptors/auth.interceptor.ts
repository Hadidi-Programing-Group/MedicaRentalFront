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
import { LoginService } from 'src/app/Services/Login/login.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  private isRefreshing = false; // Add flag for token refresh

  requestNewToken() {
    // Replace the following URL with the endpoint in your ASP.NET Core backend that issues new tokens
    const url = `${environment.apiURL}/RenewTokens`;

    // Send a POST request to the backend to request a new token
    // You can pass any necessary data in the request body, such as the expired token or refresh token
    return this.httpClient.get(url, { withCredentials: true });
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
          if (!this.isRefreshing) {
            // Check if token refresh is not already in progress
            this.isRefreshing = true; // Set flag to true to indicate token refresh is in progress



            return this.requestNewToken().pipe(
              switchMap((data: any) => {
                localStorage.setItem('authToken', data['tokenString']);
                localStorage.setItem('authTokenExpDate', data['expiresOn']);
                localStorage.setItem('isAuthenticated', "true");
                // debugger
                this.isRefreshing = false; // Set flag to false to indicate token refresh is completed
                return next.handle(
                  this.addAuthorizationHeader(req, data['tokenString'])
                );
              }),
              catchError((err) => {
                this.isRefreshing = false; // Set flag to false to indicate token refresh is completed
                localStorage.setItem('authToken', '');
                localStorage.setItem('authTokenExpDate', '');
                localStorage.setItem('isAuthenticated', '');

                this.loginService.isAuthenticatedChanged.emit(false);
                  // debugger

                this.router.navigate(['/login']); // Redirect to login page on token refresh failure
                return throwError(() => new Error(err.error));
              })
            );
          } else {
            // If token refresh is already in progress, wait for it to complete and then retry the request
            return next.handle(req);
          }
        }
      }
      const authReq = this.addAuthorizationHeader(req, authToken);
      return next.handle(authReq);
    }

    return next.handle(req);
  }

  addAuthorizationHeader(
    req: HttpRequest<any>,
    authToken: string
  ): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
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
        return throwError(error);
      })
    );
  }
}
