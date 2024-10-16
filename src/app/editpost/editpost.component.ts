import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

interface Blog {
  blogid: number;
  topic: string;
  content: string;
  userid: number;
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './editpost.component.html',
})
export class EditPostComponent implements OnInit {
  blogId!: number;
  blog: Blog = {
    blogid: 0,
    topic: '',
    content: '',
    userid: 0
  };
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public blogService: BlogService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['id'];
      this.getBlog(this.blogId);
      const storedBlogId = localStorage.getItem('selectedBlogId');
      this.blogId = storedBlogId ? parseInt(storedBlogId, 10) : 0; // Default to 0 if not found

    console.log('Blog ID:', this.blogId);
    });
  }

  getBlog(id: number): void {
    this.blogService.getBlogById(id).subscribe(
      (foundBlog) => {
        console.log('Fetched blog:', foundBlog);
        if (foundBlog) {
          this.blog = foundBlog; // Use the fetched blog directly
        } else {
          console.error('Blog not found');
          alert('Blog not found.');
        }
        this.loading = false;
      },
      error => {
        console.error('Error fetching blog:', error);

        this.loading = false;
      }
    );

    // Check local storage for topic and content
    this.blog.topic = localStorage.getItem('selectedBlogTopic') || '';
    this.blog.content = localStorage.getItem('selectedBlogContent') || '';

  }

  updateBlog(): void {
    // Ensure the blogId is set correctly
    this.blog.blogid = this.blogId; // Set the blogId in the blog object
    this.blogService.updateBlog(this.blogId, this.blog).subscribe(
      () => {
        alert('Blog updated successfully!');
        this.router.navigate(['/myblogs']);
      },
      error => {
        console.error('Error updating blog:', error);
        alert('Failed to update blog.');
      }
    );
  }

  confirmCancel(): boolean {
    return confirm('You have unsaved changes. Are you sure you want to cancel?');
  }
}
