import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  blogs: any[] = [];
  loading: boolean = true;

  constructor(private homepageService: HomeService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.homepageService.getBlogs().subscribe(
      (data: any[]) => {
        console.log('Fetched blogs:', data); // Log the fetched data
        this.blogs = data;
        this.loading = false; // Set loading to false after data is fetched
      },
      (error: any) => {
        console.error('Error fetching blogs:', error);
        this.loading = false; // Also set loading to false on error
      }
    );
  }

  toggleLike(blog: any): void {
    blog.statuslike = !blog.statuslike; // Toggle the like status
    // Optionally, send the updated status to your backend
  }
}
