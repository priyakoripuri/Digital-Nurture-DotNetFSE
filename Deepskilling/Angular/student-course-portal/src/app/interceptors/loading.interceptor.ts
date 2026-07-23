import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Defer show() to a microtask so it runs AFTER Angular's current change detection
  // cycle completes. Calling show() synchronously here causes NG0100 because the
  // BehaviorSubject value changes between the template check and the end of the cycle.
  Promise.resolve().then(() => loadingService.show());

  return next(req).pipe(
    // finalize executes when the observable completes OR errors — always hides the spinner
    finalize(() => {
      loadingService.hide();
    })
  );
};
