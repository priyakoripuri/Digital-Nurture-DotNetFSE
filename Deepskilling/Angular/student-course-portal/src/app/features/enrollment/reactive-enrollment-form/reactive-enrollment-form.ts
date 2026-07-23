import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';

// ─── Custom Synchronous Validator ─────────────────────────────────────────────
/**
 * noCourseCode: rejects any courseId value that starts with "XX".
 * Returns { noCourseCode: true } when invalid, null when valid.
 */
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// ─── Custom Async Validator ────────────────────────────────────────────────────
/**
 * simulateEmailCheck: simulates a 800ms backend call.
 * If the email contains "test@" it is considered already taken.
 * Returns an Observable<ValidationErrors | null>.
 */
function simulateEmailCheck(control: AbstractControl): Observable<ValidationErrors | null> {
  const email: string = control.value || '';
  return of(email.toLowerCase().includes('test@') ? { emailTaken: true } : null).pipe(
    delay(800)
  );
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.enrollForm = this.fb.group({
      studentName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck]  // async validator
      ],
      // Note: In Hands-On 4, courseId was numeric. 
      // Changed to string here to support the 'XX' string-based custom validator.
      courseId: [
        '',
        [Validators.required, noCourseCode]  // built-in + custom sync validator
      ],
      preferredSemester: [
        'Odd',
        Validators.required
      ],
      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],
      additionalCourses: this.fb.array([])
    });
  }

  // ── FormArray Getter ─────────────────────────────────────────────────────────
  // Using a getter keeps the template clean and avoids repeated casting.
  // It provides typed access to the FormArray without polluting the template.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // ── Shorthand getters for cleaner template validation ─────────────────────
  get nameCtrl() { return this.enrollForm.get('studentName')!; }
  get emailCtrl() { return this.enrollForm.get('studentEmail')!; }
  get courseIdCtrl() { return this.enrollForm.get('courseId')!; }
  get semesterCtrl() { return this.enrollForm.get('preferredSemester')!; }
  get termsCtrl() { return this.enrollForm.get('agreeToTerms')!; }

  // ── Dynamic FormArray Controls ────────────────────────────────────────────
  addCourse() {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  // ── Submit Handler ────────────────────────────────────────────────────────
  onSubmit() {
    if (this.enrollForm.invalid) return;

    // Task 1: Wire createCourse to the enrollment form submit handler
    const newCourse = {
      name: this.enrollForm.value.studentName + "'s Custom Course",
      code: this.enrollForm.value.courseId,
      credits: 3,
      gradeStatus: 'pending' as any
    };

    this.courseService.createCourse(newCourse).subscribe({
      next: (course) => {
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error('Failed to create course:', err);
      }
    });
  }

  reset() {
    this.enrollForm.reset({ preferredSemester: 'Odd', agreeToTerms: false });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
