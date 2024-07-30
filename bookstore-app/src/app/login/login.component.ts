import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  login() {
    console.log('Login attempt', { username: this.username, password: this.password });
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.errorMessage = '';
        this.router.navigate(['/books']);
      },
      error: err => {
        console.error('Login failed', err);
        this.errorMessage = err.error.message;
      }
    });
  }
  
}
