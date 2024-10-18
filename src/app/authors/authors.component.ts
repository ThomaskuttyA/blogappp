import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: any[] = [];
  loading = true;
  currentUserId: string | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId'); // Get the user ID from local storage
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.blogService.getAuthors().subscribe(
      (data) => {
        this.authors = data.map(author => ({ ...author, following: false })); // Initialize following state
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching authors:', error);
        this.loading = false;
      }
    );
  }

  toggleFollow(author: any): void {
    if (!this.currentUserId) {
      console.error('User not logged in');
      return;
    }

    author.following = !author.following; // Toggle following state

    // Convert currentUserId to a number
    const userIdNumber = Number(this.currentUserId);

    if (author.following) {
      this.blogService.followAuthor(userIdNumber, author.userid).subscribe(
        () => console.log(`Following author with ID: ${author.userid}`),
        (error) => {
          console.error('Error following author:', error);
          author.following = false; // Revert toggle on error
        }
      );
    } else {
      // Handle unfollow logic if needed
      console.log(`Unfollowed author with ID: ${author.userid}`);
    }
  }
}
