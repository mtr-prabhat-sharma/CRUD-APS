import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    const { email, password } = this.loginForm.value;

    // ✅ Mock login (no API)
    if (email === 'admin@test.com' && password === '1234') {
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/patients']);
      }, 1000);
    } else {
      setTimeout(() => {
        this.loading = false;
        this.errorMsg = 'Invalid credentials';
      }, 1000);
    }
  }

}
