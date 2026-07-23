import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://student-course-portal-api.onrender.com/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // retry(2): re-subscribes (retries) the HTTP request up to 2 times on failure BEFORE
      // any operators below process the data. Must be first so it wraps the raw HTTP call.
      retry(2),
      // map: transform / filter the data stream; does not affect the retry behaviour
      map(courses => {
        if (!Array.isArray(courses)) {
          console.warn('CourseService: Unexpected response shape', courses);
          return [];
        }
        // Filter out courses with no credits (data-integrity guard)
        return courses.filter(c => c.credits > 0);
      }),
      // catchError: only runs on an actual error (network failure, non-2xx status, etc.)
      catchError(err => {
        console.error('CourseService error:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
