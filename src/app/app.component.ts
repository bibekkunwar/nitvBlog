import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'atg';
  isAuthenticate:boolean=false
  auth:any
  constructor(private _apiService:ApiService){
    this.auth=localStorage.getItem('auth_token')

    this._apiService.isAuthenticated.subscribe(res=>{
      console.log(res,"dsfsdfsdf")
      this.isAuthenticate=res
    })
  }




}
