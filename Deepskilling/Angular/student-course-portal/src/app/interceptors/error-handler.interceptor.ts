import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized request. Redirecting to home...');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('A critical server error occurred:', error.message);
        // In a real app, we might trigger a snackbar or global notification service here
        alert('Global Error: Internal Server Error (500)');
      }
      return throwError(() => error);
    })
  );
};
