import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip the Authorization header for local json-server (localhost:3000)
  // json-server does not support preflight CORS with Authorization headers by default.

  // Skip the Authorization header for Render json-server
  if (req.url.startsWith('https://student-course-portal-api.onrender.com')) {
    return next(req);
  }

  // Clone the request and add the Authorization header for real API calls
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });

  // Pass the cloned request to the next handler
  return next(authReq);
};
