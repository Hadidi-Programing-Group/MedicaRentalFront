import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, catchError, map, switchMap, tap, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  )
  {
  }

  private isRefreshing = false; // Add flag for token refresh

  requestNewToken()
  {
    // Replace the following URL with the endpoint in your ASP.NET Core backend that issues new tokens
    const url = `${environment.apiURL}/RenewTokens`;

    // Send a POST request to the backend to request a new token
    // You can pass any necessary data in the request body, such as the expired token or refresh token
    return this.httpClient.get(url, {withCredentials: true});
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>
  {
    let authToken = localStorage.getItem('authToken');

    if (!authToken)
    {
      return next.handle(req);
    }

    let authTokenExpiry = localStorage.getItem('authTokenExpDate');

    if (authTokenExpiry && new Date() < new Date(authTokenExpiry))
    {
      const authReq = this.addAuthorizationHeader(req, authToken);
      return next.handle(authReq);
    }


    if (!this.isRefreshing)
    {
      // Check if token refresh is not already in progress
      this.isRefreshing = true; // Set flag to true to indicate token refresh is in progress
      return this.requestNewToken().pipe(
        switchMap((data: any) =>
        {
          localStorage.setItem('authToken', data['tokenString']);
          localStorage.setItem('authTokenExpDate', data['expiresOn']);
          this.isRefreshing = false; // Set flag to false to indicate token refresh is completed
          return next.handle(
            this.addAuthorizationHeader(req, data['tokenString'])
          );
        }),
        catchError((err) =>
        {
          console.log(err)
          this.isRefreshing = false; // Set flag to false to indicate token refresh is completed
          this.router.navigate(['/login']); // Redirect to login page on token refresh failure
          return throwError(() => new Error(err.error));
        })
      );
    }
    else
    {
      // If token refresh is already in progress, wait for it to complete and then retry the request
      return next.handle(req);
    }
  }

  addAuthorizationHeader(
    req: HttpRequest<any>,
    authToken: string
  ): HttpRequest<any>
  {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  }
}

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor
{
  constructor(private router: Router)
  {
  } // Inject Router module

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>
  {
    return next.handle(req).pipe(
      tap((event) =>
      {
        if (event instanceof HttpResponse)
        {
          // You can handle the response globally here
          // For example, you can check the response status code, headers, etc.
          // and perform actions accordingly
          console.log(event);
        }
      }),
      catchError((error: HttpErrorResponse) =>
      {
        // You can handle HTTP errors globally here
        // For example, you can check the error status code, headers, etc.
        // and perform actions accordingly
        if (error.status === 401)
        {
          this.router.navigate(['/login']);
        }
        else if (error.status == 403)
        {
          this.router.navigate(['/forbidden']);
        }
        return throwError(error);
      })
    );
  }
}
