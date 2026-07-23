import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CourseListComponent } from './pages/course-list/course-list';
import { StudentProfileComponent } from './pages/student-profile/student-profile';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';

/**
 * Application route table — Hands-On 1 through 5.
 *
 *  /                → Home dashboard
 *  /courses         → Course catalogue
 *  /profile         → Student profile
 *  /enroll          → Template-driven enrollment form (HO-4)
 *  /enroll-reactive → Reactive enrollment form (HO-5)
 *  /**              → redirect to /
 */
export const routes: Routes = [
  { path: '',               component: HomeComponent,                   title: 'Dashboard — Student Portal'          },
  { 
    path: 'courses',        
    component: CoursesLayoutComponent,
    children: [
      { path: '',           component: CourseListComponent,             title: 'Courses — Student Portal'            },
      { path: ':id',        component: CourseDetailComponent,           title: 'Course Details — Student Portal'     }
    ]
  },
  { 
    path: 'profile',        
    component: StudentProfileComponent,         
    title: 'My Profile — Student Portal',
    canActivate: [authGuard]
  },
  { 
    path: 'enroll',         
    loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule),
    canActivate: [authGuard]
  },
  { path: 'enroll-reactive', redirectTo: 'enroll/reactive' },
  { path: '**',             component: NotFoundComponent,               title: 'Page Not Found — Student Portal'     }
];
