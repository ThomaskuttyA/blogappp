import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  blogForm: FormGroup;
  submissionError: string | null = null;
  submissionSuccess: string | null = null;
  userId: number = 1; // Replace with actual user ID from authentication

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router) {
    this.blogForm = this.fb.group({
      topic: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blogData = { ...this.blogForm.value, userid: this.userId };
      this.blogService.createBlog(blogData).subscribe(
        response => {
          this.submissionSuccess = response.message;
          this.submissionError = null;
          this.blogForm.reset();
        },
        error => {
          this.submissionError = error.error.message || "An error occurred.";
          this.submissionSuccess = null;
        }
      );
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
