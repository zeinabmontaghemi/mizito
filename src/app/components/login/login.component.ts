import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {}

  signin() {
    this.router.navigate(['mizito/signin']);
  }
  signup() {
    this.router.navigate(['mizito/signup']);
  }
}
