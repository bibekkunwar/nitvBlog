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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
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
    this.registerform()
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
        this.closeBtn.nativeElement.click()
        this.router.navigate(['/bloglist']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 || error) {
          alert(error.error.detail || 'Enter valid details');
        }
      },
    });
  }

  registerform() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, this.noSpaceAllowed]),
      password: new FormControl('', [Validators.required, this.noSpaceAllowed]),
      password2: new FormControl('', [
        Validators.required,
        this.noSpaceAllowed,
      ]),
      email: new FormControl('', [
        Validators.required,
        this.noSpaceAllowed,
        Validators.email,
      ]),
      firstName: new FormControl('', [
        Validators.required,
        this.noSpaceAllowed,
      ]),
      lastName: new FormControl('', [Validators.required, this.noSpaceAllowed]),
    });
  }

  noSpaceAllowed(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  register() {
    const password = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('password2')?.value;

    console.log(password)
    console.log("password2",password2)

    if (password !== password2) {
      alert('Passwords do not match!');
      return;
    }
    const newUsers = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      password2: this.registerForm.value.password2,
      email: this.registerForm.value.email,
      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName,
    };

    this._apiService.register(newUsers).subscribe({
      next: (response) => {
        console.log(response);
        alert('registeration successful');
        this.closeBtn.nativeElement.click()
        this.router.navigate(['']);
      },

      error: (error: HttpErrorResponse) => {
        if (error.error && error.error.status === 400) {
          const errorMessages = Object.values(error.error).flat().join(', ');
          alert(
            errorMessages ||
              'Read the instructions above the input fields and try again. TY'
          );
        } else {
          alert('An error occurred. Please try again.');
        }
      },
    });
  }

  logout(){
    localStorage.removeItem('auth_token')
    this.router.navigateByUrl('/')
    this.isLoggedIn=false
  }
}
