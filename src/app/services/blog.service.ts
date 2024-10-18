import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseApiUrl = 'http://localhost/thomasapp-api/';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    // Enhanced error logging
    console.error('API error:', error.status, error.message);
    return throwError(error);
  }

  private request(method: string, url: string, body?: any): Observable<any> {
    return this.http.request(method, `${this.baseApiUrl}${url}`, {
      body,
      headers: { 'Content-Type': 'application/json' }
    }).pipe(catchError(this.handleError));
  }

  createBlog(blogData: { topic: string; content: string; userid: number; }): Observable<any> {
    return this.request('POST', 'createblog.php', blogData);
  }

  getUserBlogs(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}getusersblog.php?userid=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteBlog(blogId: number): Observable<any> {
    return this.request('DELETE', `deliteblog.php?blogid=${blogId}`);
  }

  updateBlog(blogId: number, blogData: { topic: string; content: string }): Observable<any> {
    return this.request('POST', `updateblog.php`, blogData);
  }

  getBlogById(blogId: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}fetchblog.php?blogid=${blogId}`).pipe(
      catchError(this.handleError)
    );
  }

  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}authors.php`).pipe(
      catchError(this.handleError)
    );
  }

  followAuthor(currentUserId: number, authorId: number): Observable<any> {
    const followData = { userid: currentUserId, friendid: authorId };
    return this.http.post<any>(`${this.baseApiUrl}follow.php`, followData).pipe(
      catchError(this.handleError)
    );
  }

  getFollowers(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}getFollowers.php?userid=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getFollowing(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}getFollowing.php?userid=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

}
