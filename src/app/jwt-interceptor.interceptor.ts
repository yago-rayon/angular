import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let jwt: any = JSON.parse(localStorage.getItem('jwt') || '');
    if (jwt) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${jwt.token}`
            }
        });
    }
    return next.handle(request);
  }
}
