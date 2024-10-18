// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  username: string | null = null;
  email: string | null = null;
  followers: any[] = [];
  following: any[] = [];
  constructor(private router: Router, private blogService: BlogService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');

    // Redirect to login if not logged in
    if (!this.userId || !this.username) {
      this.router.navigate(['/login']);
    } else {
      this.fetchFollowers();
      this.fetchFollowing(); // Fetch following
    }
  }

  fetchFollowers(): void {
    const userIdNum = parseInt(this.userId!, 10);
    this.blogService.getFollowers(userIdNum).subscribe(
      (data) => {
        this.followers = data;
      },
      (error) => {
        console.error('Error fetching followers:', error);
      }
    );
  }

  fetchFollowing(): void {
    const userIdNum = parseInt(this.userId!, 10);
    this.blogService.getFollowing(userIdNum).subscribe(
      (data) => {
        this.following = data;
      },
      (error) => {
        console.error('Error fetching following:', error);
      }
    );
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
