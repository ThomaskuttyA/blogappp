import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private createApiUrl = 'http://localhost/thomasapp-api/createblog.php';
  private fetchApiUrl = 'http://localhost/thomasapp-api/getusersblog.php'; // New endpoint

  constructor(private http: HttpClient) {}

  createBlog(blogData: { topic: string; content: string; userid: number }): Observable<any> {
    return this.http.post<any>(this.createApiUrl, blogData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getUserBlogs(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.fetchApiUrl}?userid=${userId}`);
  }
}
