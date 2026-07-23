import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

/**
 * CourseListComponent — Course catalog page.
 * Iterates over CourseCardComponent passing data via @Input and receiving events via @Output.
 * 
 * Note: Why store is better than service state for shared complex state:
 * - A single source of truth across the app (CourseList, Profile, CourseDetails).
 * - Centralized side effects and predictable state transitions.
 * - Better tooling support (Redux DevTools).
 */
@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Expose store selectors as observables to the template
  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  isLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  errorMessage$: Observable<string | null> = this.store.select(selectCoursesError);

  searchTerm = '';

  ngOnInit() {
    // Dispatch action to load courses. Effects will handle the API call.
    this.store.dispatch(loadCourses());

    // Read query parameter
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
    }
  }

  // trackBy improves performance by preventing Angular from re-rendering unchanged items.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    // Event handled in card component
  }

  viewCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  onSearchChange() {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm } });
  }
}

