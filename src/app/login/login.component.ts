import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn!:ElementRef<HTMLDivElement>
  form!: FormGroup;
  toggleSignIn = false;
  registerForm!:FormGroup
  isLoggedIn!:boolean

  constructor(private _apiService: ApiService, private router: Router) {
    if(localStorage.getItem('auth_token')){
      this.isLoggedIn=true
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }


  login() {
    this._apiService.login(this.form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('auth_token', JSON.stringify(res));
        this.isLoggedIn=true
        alert('Logged in successfully');
        this.router.navigate(['/bloglist']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error) {
          alert(error.error.detail || 'Enter valid details');
        }
      },
    });
  }



  noSpaceAllowed(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }



}
