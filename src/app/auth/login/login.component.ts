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
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth
        .login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe({
          next: (response) => {
            const userData = localStorage.getItem('userData')
              ? JSON.parse(localStorage.getItem('userData')!)
              : null;
            userData
              ? (userData.access_token = response.access_token)
              : localStorage.setItem(
                  'userData',
                  JSON.stringify(response.access_token)
                );
            console.log('user token updated succ');
            this.router.navigate(['/home']);
          },
          error: (err) => console.log(err),
        });
    }
  }
}
