import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  username: string | null = null;
  email: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');


    // Redirect to login if not logged in
    if (!this.userId || !this.username) {
      this.router.navigate(['/login']);
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
