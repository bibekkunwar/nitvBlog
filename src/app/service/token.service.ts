import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {

   }


  /**
   * The function checks if the user is logged in by checking if the 'auth_token' item exists in the
   * localStorage.
   * @returns a boolean value. It will return true if the 'auth_token' item is present in the
   * localStorage, indicating that the user is logged in. Otherwise, it will return false.
   */
   isLoggedIn(){
    return localStorage.getItem('auth_token')!=null;
   }






}
