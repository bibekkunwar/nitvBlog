import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NITV';
  // isAuthenticate:boolean=false
  // auth:any
 /**
  * The constructor initializes the private _apiService variable and sets the auth variable to the
  * value of the 'auth_token' stored in localStorage. It also subscribes to the isAuthenticated
  * observable from the _apiService and updates the isAuthenticate variable accordingly.
  * @param {ApiService} _apiService - The `_apiService` parameter is an instance of the `ApiService`
  * class. It is used to make API requests and handle authentication-related functionality.
  */
  // constructor(private _apiService:ApiService){
  //   this.auth=localStorage.getItem('auth_token')

  //   this._apiService.isAuthenticated.subscribe(res=>{
  //     this.isAuthenticate=res
  //   })
  // }




}
