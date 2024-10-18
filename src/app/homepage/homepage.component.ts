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
  username: string | null = localStorage.getItem('username');


  constructor(private homepageService: HomeService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.homepageService.getBlogs().subscribe(
      (data: any[]) => {
        console.log('Fetched blogs:', data);
        this.blogs = data;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching blogs:', error);
        this.loading = false;
      }
    );
  }

  toggleLike(blog: any): void {
    blog.statuslike = !blog.statuslike; // Toggle the like status
    // Optionally, send the updated status to your backend
  }



}
