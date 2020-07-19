import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  creadentials: any;

  constructor() {
    this.creadentials = environment.basicAuthenticationCredentials;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${this.auth.getToken()}`
        Authorization: 'Basic ' + btoa(this.creadentials)
      }
    });
    return next.handle(req);
  }
}
