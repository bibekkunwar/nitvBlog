import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  url = "https://blog-api-django-rest-framework-production.up.railway.app/api/v1/login/"

  constructor(private http: HttpClient) {

   }

   proceedLogin(userCred: any){
    return this.http.post(this.url, userCred);
   }


   isLoggedIn(){
    return localStorage.getItem('auth_token')!=null;
   }

   getToken(){
    return localStorage.getItem('auth_token') || '';
   }


   setAccessToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh', token);
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_oken') || '';
  }




}
