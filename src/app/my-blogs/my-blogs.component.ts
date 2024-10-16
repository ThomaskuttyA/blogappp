import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
})
export class MyBlogsComponent implements OnInit {
  blogs: any[] = [];
  loading: boolean = true;
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  username: string | null = localStorage.getItem('username');

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.getUserBlogs();
  }

  getUserBlogs(): void {
    this.blogService.getUserBlogs(this.userId).subscribe(
      (data: any[]) => {
        this.blogs = data;
        this.loading = false;
        console.log("Fetched blogs:", this.blogs);
      },
      (error: any) => {
        console.error('Error fetching user blogs:', error);
        this.loading = false;
      }
    );
  }

  deleteBlog(blogId: number): void {
    if (confirm("Are you sure you want to delete this blog?")) {
      this.blogService.deleteBlog(blogId).subscribe(
        (response) => {
          console.log(response.message);
          this.blogs = this.blogs.filter(blog => blog.blogid !== blogId);
        },
        (error) => {
          console.error('Error deleting blog:', error);
          alert('Failed to delete blog.');
        }
      );
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  editBlog(blogId: number, blog: any): void {
    // Store the topic and content in local storage
    localStorage.setItem('selectedBlogId', blogId.toString());
    localStorage.setItem('selectedBlogTopic', blog.topic);
    localStorage.setItem('selectedBlogContent', blog.blog);

    // Ensure this matches the correct property name
    this.router.navigate(['/edit', blogId]);
  }
}
