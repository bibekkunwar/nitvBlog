import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private service: TokenService, private route: Router) {}


  canActivate(){

    if(this.service.isLoggedIn()){
      return true;
    } else{
      this.route.navigate(['login']);
      return false;
    }
  }




}
