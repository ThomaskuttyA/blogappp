import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service'; // Adjust path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null; // Declare the loginError property

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        response => {
          if (response.message === "Login successful.") {
            // Handle successful login
            localStorage.setItem('username', this.loginForm.value.email); // Store email as username
            window.location.href = '/home'; // Redirect to homepage
          } else {
            // Handle login error
            this.loginError = response.message; // Set error message based on response
          }
        },
        error => {
          // Handle HTTP error
          this.loginError = 'An error occurred during login. Please try again.'; // Set general error message
          console.error('Login error:', error);
        }
      );
    }
  }
}
