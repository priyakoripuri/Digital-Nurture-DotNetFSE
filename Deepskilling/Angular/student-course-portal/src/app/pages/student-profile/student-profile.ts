import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { loadCourses } from '../../store/course/course.actions';

/**
 * StudentProfileComponent — Profile page.
 * Displays student details in a clean Material Card layout.
 */
@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule, MatListModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfileComponent implements OnInit {
  private store = inject(Store);

  readonly student = {
    name: 'Md Sarfaraz Alam',
    initials: 'SA',
    rollNumber: '231FA04237',
    department: 'B.Tech Computer Science & Engineering',
    email: '231fa04237@gmail.com',
    gpa: '6.85',
    status: 'Active',
    expectedGraduation: '2027'
  };

  // Cross-slice selector combines course entities with enrollment IDs
  enrolledCourses$: Observable<Course[]> = this.store.select(selectEnrolledCourses);

  ngOnInit() {
    // Ensure courses are loaded in the store if the user navigates here directly
    this.store.dispatch(loadCourses());
  }
}

