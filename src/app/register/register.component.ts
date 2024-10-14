import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service'; // Adjust path as needed

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationError: string | null = null; // To show any registration errors

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }); // Add custom validator here
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          if (response.message === "Registration successful.") {
            // Redirect to login or homepage after successful registration
            window.location.href = '/login'; // Adjust as needed
          } else {
            // Show error message from server
            this.registrationError = response.message;
          }
        },
        error => {
          this.registrationError = 'An error occurred during registration. Please try again.';
          console.error('Registration error:', error);
        }
      );
    }
  }
}
