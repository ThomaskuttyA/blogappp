import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css'] // Add this if you have a CSS file
})
export class MyBlogsComponent implements OnInit {
  blogs: any[] = [];  // Array to hold the blogs
  loading: boolean = true; // Loading state
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10); // Get logged-in user's ID

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    console.log('Logged-in user ID:', this.userId); // Log user ID for debugging
    this.getUserBlogs(); // Fetch blogs when component initializes
  }

  getUserBlogs(): void {
    this.blogService.getUserBlogs(this.userId).subscribe(
      (data: any[]) => {
        this.blogs = data; // Assign fetched blogs to the array
        this.loading = false; // Set loading to false
      },
      (error: any) => {
        console.error('Error fetching user blogs:', error);
        this.loading = false; // Set loading to false on error
      }
    );
  }

  goHome(): void {
    this.router.navigate(['/home']); // Navigate back to home
  }
}
