import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private auth: AuthService, private router: Router) {}
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/),
    ]),
  });
  onSubmit() {
    if (this.registerForm.valid) {
      this.auth
        .register(
          this.registerForm.get('email')?.value,
          this.registerForm.get('password')?.value
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            alert('your account created successfully login now');
            this.router.navigate(['/login']);
          },
          error: (err) => console.log(err),
        });
    }
  }
}
