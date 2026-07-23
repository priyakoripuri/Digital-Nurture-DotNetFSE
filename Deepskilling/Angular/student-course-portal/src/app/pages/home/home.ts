import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../services/course.service';
import { NotificationComponent } from '../../components/notification/notification';
import { Store } from '@ngrx/store';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { inject } from '@angular/core';

/**
 * HomeComponent — Dashboard landing page.
 * Displays a welcome hero section and academic statistics cards.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, MatButtonModule, MatCardModule, MatIconModule, NotificationComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  
  private store = inject(Store);
  constructor(private courseService: CourseService) {}

  availableCourses = 0;
  enrolledCourses = 0;

  /** Academic statistics */
  get stats() {
    return [
      {
        title: 'Courses Available',
        value: this.availableCourses.toString(),
        icon: 'library_books',
        colorClass: 'stat-icon--blue'
      },
      {
        title: 'Enrolled Courses',
        value: this.enrolledCourses.toString(),
        icon: 'check_circle',
        colorClass: 'stat-icon--green'
      },
      {
        title: 'Current GPA',
        value: '6.85',
        icon: 'school',
        colorClass: 'stat-icon--purple'
      }
    ];
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.availableCourses = courses.length;
    });
    this.store.select(selectEnrolledIds).subscribe(ids => {
      this.enrolledCourses = ids.length;
    });
  }

  ngOnDestroy() {
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}
