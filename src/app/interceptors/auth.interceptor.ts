import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken = '';
  refreshKeyToken!: string;
  refresh = false;
  auth_token: any;

  refreshUrl =
    'https://blog-api-django-rest-framework-production.up.railway.app/api/v1/login/refresh/';

  IgnoredUrls = [
    `${this._demoService.apiUrl}/list/`,
    `${this._demoService.apiUrl}/register/`,
  ];
  constructor(
    private _demoService: ApiService,
    private http: HttpClient,
    private router: Router
  ) {}

  getAuthToken() {
    if (localStorage.getItem('auth_token')) {
      console.log(localStorage.getItem('auth_token'));
      this.auth_token = JSON.parse(localStorage.getItem('auth_token') || '');
      this.accessToken = this.auth_token.access;
      this.refreshKeyToken = this.auth_token.refresh;
      console.log('refesth key', this.refreshKeyToken);
    }
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {


    // Check if the request URL is in the ignored URLs list
   /* The code `const isIgnoredUrl = this.IgnoredUrls.some((url) => request.url.includes(url));` is
   checking if the request URL is present in the `IgnoredUrls` array. */

    const isIgnoredUrl = this.IgnoredUrls.some((url) =>
      request.url.includes(url)
    );

    if (isIgnoredUrl) {
      return next.handle(request);
    }


    this.getAuthToken();
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.refresh = true;

          return this.http
            .post(this.refreshUrl, { refresh: this.refreshKeyToken })
            .pipe(
              switchMap((res: any) => {
                localStorage.removeItem('auth_token');

                const data = {
                  user_email: '',
                  refresh: res.refresh,
                  access: res.access,
                };
                localStorage.setItem('auth_token', JSON.stringify(data));

                return next.handle(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${res.access}`,
                    },
                  })
                );
              })
            );
        }
        if (err.status === 403) {
          localStorage.removeItem('auth_token');
          alert('your session time out, login')
          this.router.navigate(['login']);
        }
        this.refresh = false;
        return throwError(() => err);
      })
    );
  }
}
