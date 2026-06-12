import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private auth: Auth,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('name', response.name);
        localStorage.setItem('userId', response.userId);

        if (response.role === 'ROLE_ADMIN' || response.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'ROLE_HR' || response.role === 'HR') {
          this.router.navigate(['/hr-dashboard']);
        } else if (response.role === 'ROLE_MANAGER' || response.role === 'MANAGER') {
          this.router.navigate(['/manager-dashboard']);
        } else if (response.role === 'ROLE_EMPLOYEE' || response.role === 'EMPLOYEE') {
          this.router.navigate(['/employee-dashboard']);
        }
      },

      error: (error) => {
        console.error(error);
        alert(error.error?.message || 'Login Failed');
      }
    });
  }
}