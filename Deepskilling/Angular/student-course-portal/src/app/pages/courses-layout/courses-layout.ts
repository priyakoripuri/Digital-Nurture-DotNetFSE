import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- Layout wrapper for the nested /courses routes -->
    <div class="courses-layout-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class CoursesLayoutComponent {}
