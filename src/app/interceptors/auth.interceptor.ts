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


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken = '';
  refreshKeyToken!: string;
  refresh = false;
  IgnoredUrls = [`${this._demoService.apiUrl}/list/`, `${this._demoService.apiUrl}/register/`];
  constructor(private _demoService: ApiService,
    private http: HttpClient) { }

  getAuthToken() {
    if (localStorage.getItem('auth_token')) {
      const auth_token = JSON.parse(localStorage.getItem('auth_token') || '');
      this.accessToken = auth_token.access;
      this.refreshKeyToken = auth_token.refresh;
    }
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check if the request URL is in the ignored URLs list
    const isIgnoredUrl = this.IgnoredUrls.some((url) => request.url.includes(url));

    // If the URL is in the ignored list, bypass interception and forward the request directly
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
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          const data = {
            refresh: this.refreshKeyToken,
          };

          // this._demoService
          //   .refreshKeyGeneerator(this.refreshKeyToken)
          //   .pipe(tap((res) => console.log('tap', res)))
          //   .subscribe((res) => {
          //     console.log('refresh', res);
          //   });

          return this.http
            .post(
              'https://blog-api-django-rest-framework-production.up.railway.app/api/v1/login/refresh/',
              data,
              { withCredentials: true }
            )
            .pipe(
              switchMap((res: any) => {
                console.log('switchmap', res);
                this.accessToken = res.token;

                return next.handle(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${this.accessToken}`,
                    },
                  })
                );
              })
            );
        }
        this.refresh = false;
        return throwError(() => err);
      })
    );
  }

}
