import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.http.post<any>('http://localhost:3000/api/auth/login', this.loginForm.value)
      .subscribe({
        next: res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          alert('Login success');
        },
        error: err => {
          this.errorMessage = 'Invalid credentials';
        }
      });
  }
}
