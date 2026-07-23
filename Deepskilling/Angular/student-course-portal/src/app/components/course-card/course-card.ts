import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  private store = inject(Store);
  
  isExpanded = false;

  // Observable to check if the current course is enrolled
  isEnrolled$: Observable<boolean> = this.store.select(selectEnrolledIds).pipe(
    map(ids => this.course ? ids.includes(this.course.id) : false)
  );

  // Using getters keeps templates cleaner and easier to maintain.
  get cardClasses() {
    return {
      'card--enrolled': this.course.gradeStatus !== undefined,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Course input changed', changes['course'].currentValue);
    }
  }

  onEnrollClick() {
    if (this.course) {
      this.store.select(selectEnrolledIds).pipe(
        take(1),
        map(ids => ids.includes(this.course.id))
      ).subscribe(isCurrentlyEnrolled => {
        if (isCurrentlyEnrolled) {
          this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
        } else {
          this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
        }
        this.enrollRequested.emit(this.course.id);
      });
    }
  }
}

