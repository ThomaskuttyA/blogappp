import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

interface Blog {
  blogid: number;
  topic: string;
  content: string;
  userid: number; // Assuming this is needed for updates
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './editpost.component.html',
})
export class EditPostComponent implements OnInit {
  blogId!: number;
  blog: Blog = { blogid: 0, topic: '', content: '', userid: 0 };
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
    });
  }

  getBlog(id: number): void {
    this.blogService.getBlogById(id).subscribe(
      (foundBlog) => {
        console.log('Fetched blog:', foundBlog); // Add logging here
        if (foundBlog) {
          this.blog = foundBlog; // Assuming this contains the fields
        } else {
          console.error('Blog not found');
          alert('Blog not found.');
        }
        this.loading = false;
      },
      error => {
        console.error('Error fetching blog:', error); // Log the error
        alert('Failed to fetch blog.'); // Notify user
        this.loading = false;
      }
    );
  }


  updateBlog(): void {
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
