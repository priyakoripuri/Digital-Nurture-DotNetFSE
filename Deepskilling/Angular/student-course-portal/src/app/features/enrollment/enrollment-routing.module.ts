import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form';
import { ReactiveEnrollmentFormComponent } from './reactive-enrollment-form/reactive-enrollment-form';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

const routes: Routes = [
  // The empty path is mapped from the parent lazy route ('/enroll')
  { path: '', component: EnrollmentFormComponent, title: 'Enrollment — Student Portal' },
  // Adding the reactive form here as a sibling for simplicity, though the prompt asked for a redirect if needed
  // We can just define 'reactive' here and redirect the root level to it, or keep it as before.
  { 
    path: 'reactive', 
    component: ReactiveEnrollmentFormComponent, 
    title: 'Reactive Enrollment — Student Portal',
    canDeactivate: [unsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
