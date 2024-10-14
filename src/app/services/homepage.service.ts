import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  // Correctly import catchError

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost/thomasapp-api/getblog.php'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching blogs:', error);
        return throwError(() => new Error('Error fetching blogs; please try again later.'));
      })
    );
  }
}
