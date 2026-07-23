import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';

import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effects';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';

/**
 * Application-level providers.
 * provideAnimationsAsync — enables Angular Material animation support.
 * provideRouter        — registers the app's route table.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor])
    ),
    provideStore(),
    provideState({ name: 'course', reducer: courseReducer }),
    provideState({ name: 'enrollment', reducer: enrollmentReducer }),
    provideEffects([CourseEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action
      traceLimit: 75, // maximum stack trace frames to be stored
      connectInZone: true // If set to true, the connection is established within the Angular zone
    })
  ]
};

