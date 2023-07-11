import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('closeBtn') closeBtn!:ElementRef<HTMLDivElement>
  form!: FormGroup;
  toggleSignIn = false;
  registerForm!:FormGroup;
   _isLoggedIn :boolean;

  constructor(private _apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) {

    this._isLoggedIn = !!localStorage.getItem('auth_token');

   /* The code `this.router.events.subscribe((event) => { ... })` is subscribing to the events emitted
   by the Angular router. It listens for navigation events, specifically the `NavigationEnd` event,
   which is emitted when a navigation is successfully completed. */
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this._isLoggedIn = !!localStorage.getItem('auth_token');
        this.cdr.detectChanges();
      }
    })

  }

  noSpaceAllowed(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.router.navigateByUrl('/');
    this._isLoggedIn= false;
  }

  // scroll top top when logo clicked

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



}
