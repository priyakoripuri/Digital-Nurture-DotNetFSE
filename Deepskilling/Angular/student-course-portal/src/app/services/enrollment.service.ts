import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'https://student-course-portal-api.onrender.com';

  constructor(private http: HttpClient) {}

  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/students?courseId=${courseId}`);
  }
}

