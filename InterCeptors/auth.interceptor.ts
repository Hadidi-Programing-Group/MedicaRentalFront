import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    console.log(`authToken from auth: ${authToken}`);
    if(authToken)
    {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      })
      return next.handle(authReq);
    }

    console.log(`Request from auth: ${req.body}`);
    return next.handle(req);
  }
}
