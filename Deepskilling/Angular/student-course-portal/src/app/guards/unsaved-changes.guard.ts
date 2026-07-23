import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentFormComponent } from '../features/enrollment/reactive-enrollment-form/reactive-enrollment-form';

export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentFormComponent> = (component) => {
  if (component.enrollForm.dirty && !component.submitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
