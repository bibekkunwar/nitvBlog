import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl =
    'https://blog-api-django-rest-framework-production.up.railway.app/api/v1';

  accessToken: string = '';
  refreshKeyToken: string = '';
  isAuthenticated = new BehaviorSubject(false);

  constructor(public http: HttpClient) {}

  refreshToken(): Observable<any> {
    const refreshTokenUrl =
      'https://blog-api-django-rest-framework-production.up.railway.app/api/v1/refresh/';
    const payload = {
      refreshToken: this.refreshKeyToken,
    };

    return this.http.post<any>(refreshTokenUrl, payload);
  }

  authenticate(value: boolean) {
    this.isAuthenticated.next(value);
  }

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login/`, data);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/` + id);
  }

  /**
   * The function removes an auth_token from local storage.
   */
  logOut(): void {
    localStorage.removeItem('auth_token');
  }

  getBlogList(pageNo?: number, pageSize?: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/list/?limit=${pageSize}&page_no=${pageNo}`
    );
  }

  createPost(data: any) {
    console.log(data);
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  register(newUsers: {
    username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
  }) {
    return this.http.post(`${this.apiUrl}/register/`, newUsers);
  }

  refreshKeyGeneerator(refresh: string) {
    const data = {
      refresh: refresh,
    };
    return this.http
      .post<any>(`${this.apiUrl}/login/refresh/`, data)
      .subscribe((data) => {
        // console.log(data);
        localStorage.setItem('auth_token', JSON.stringify(data));
      });
  }

  getPostDetailById(postId: number) {
    return this.http.get(`${this.apiUrl}/detail/${postId}`);
  }

  updatePost(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/update/` + id, data);
  }

  private isLoggedIn: boolean = false;

  storeToken(auth_token: any): void {
    localStorage.setItem('auth_token', auth_token);
  }

  getStorageToken() {
    localStorage.getItem('auth_token');
  }
}
