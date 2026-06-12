import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registeration',
  standalone: false,
  templateUrl: './registeration.html',
  styleUrl: './registeration.css'
})
export class Registeration {

  registrationForm: FormGroup;

  constructor(
    private auth: Auth,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      employeeCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', Validators.required],
      managerId: [''],
      departmentId: ['', Validators.required],
      projectId: ['', Validators.required],
      joiningDate: ['', Validators.required]
    });
  }

  register() {

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.auth.register(this.registrationForm.value).subscribe({
      next: (response) => {
        console.log(response);
        alert('Registration Successful');
        this.registrationForm.reset();
      },
      error: (error) => {
        console.error(error);
        alert(error.error?.message || 'Registration Failed');
      }
    });
  }
}