import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Select the feature state
export const selectCourseState = createFeatureSelector<CourseState>('course');

// Selectors are memoised, meaning they only recompute when their inputs change, improving performance.
export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error
);
