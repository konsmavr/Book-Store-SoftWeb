import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login() {
    console.log('Login attempt', { username: this.username, password: this.password });
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.errorMessage = '';
        // Redirect to another page or store the user data as needed
      },
      error: err => {
        console.error('Login failed', err);
        this.errorMessage = err.error.message;
      }
    });
  }
  
}
