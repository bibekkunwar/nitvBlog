import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {

   }

   isLoggedIn(){
    return localStorage.getItem('auth_token')!=null;
   }






}
