import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';
import { Course } from '../../models/course.model';

// Select the feature state
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state.enrolledCourseIds
);

// Cross-slice selector avoids duplicated state by combining course and enrollment slices.
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses: Course[], enrolledIds: number[]) => {
    return courses.filter(course => enrolledIds.includes(course.id));
  }
);
