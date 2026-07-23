import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, CreditLabelPipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  enrolledStudents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const courseId = Number(idParam);
      
      // switchMap automatically cancels the previous inner Observable if a new courseId arrives.
      // We first fetch the course, then switch to fetching the students for that course.
      this.courseService.getCourseById(courseId).pipe(
        tap(course => this.course = course),
        switchMap(course => {
          if (course) {
            return this.enrollmentService.getStudentsByCourse(course.id);
          }
          return of([]); // return empty observable if no course
        })
      ).subscribe({
        next: (students) => this.enrolledStudents = students,
        error: (err) => console.error('Error fetching course or students:', err)
      });
    }
  }
}
