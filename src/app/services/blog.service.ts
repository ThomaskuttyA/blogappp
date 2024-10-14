import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost/thomasapp-api/createblog.php';

  constructor(private http: HttpClient) {}

  createBlog(blogData: { topic: string; content: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, blogData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
