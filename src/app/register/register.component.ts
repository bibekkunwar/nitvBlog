import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form! : FormGroup;
  constructor(private router: Router, private _apiService: ApiService, private location: Location){}

  ngOnInit(): void {
    this.registerForm();
  }

  registerForm() {
    this.form = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      password2: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),

    });
  }


  register() {
    const newUsers = {
      username: this.form.value.username,
      password: this.form.value.password,
      password2: this.form.value.password2,
      email: this.form.value.email,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,

    };

    this._apiService.register(newUsers)
    .subscribe({
      next:response => {
        alert("registeration successful");
        this.router.navigate(['login'])
    },

    error: (error: HttpErrorResponse) => {
      if(error.status===400 || error){
        alert(error.error.details || "Enter valid details");
      }
  }
      }
    );
    }
}
