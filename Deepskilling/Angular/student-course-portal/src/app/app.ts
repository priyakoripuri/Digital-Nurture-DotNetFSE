import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HeaderComponent } from './components/header/header';
import { SidebarService } from './services/sidebar.service';
import { LoadingService } from './services/loading.service';

/** Navigation item definition */
interface NavItem {
  label: string;
  icon:  string;
  path:  string;
  exact: boolean;
}

/**
 * App — Root shell component.
 *
 * Provides the full application layout:
 *   - Left sidebar (MatSidenav) with route-aware nav items
 *   - Top toolbar (MatToolbar) with hamburger toggle
 *   - Main content area (RouterOutlet)
 *
 * Uses BreakpointObserver to switch between:
 *   - mode="side"  opened=true  on desktop
 *   - mode="over"  opened=false on mobile (with backdrop)
 *
 * No @Input / @Output / lifecycle hooks used — HO-1 compliant.
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe,
    MatSidenavModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatListModule, MatDividerModule,
    MatTooltipModule, MatProgressBarModule, HeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly breakpoints = inject(BreakpointObserver);
  readonly sidebar = inject(SidebarService);
  readonly loadingService = inject(LoadingService);

  /** Track if user is dragging the sidebar handle */
  isResizing = false;

  /** Emits true when the viewport is phone-sized */
  readonly isHandset$ = this.breakpoints
    .observe(Breakpoints.Handset)
    .pipe(map(r => r.matches), shareReplay(1));

  /** Sidebar navigation items */
  readonly navItems: NavItem[] = [
    { label: 'Dashboard',           icon: 'dashboard',     path: '/',                exact: true  },
    { label: 'Courses',             icon: 'menu_book',     path: '/courses',         exact: false },
    { label: 'Enroll',              icon: 'edit_note',     path: '/enroll',          exact: false },
    { label: 'Reactive Enrollment', icon: 'dynamic_form',  path: '/enroll-reactive', exact: false },
    { label: 'Profile',             icon: 'person',        path: '/profile',         exact: false },
  ];

  /** Event bound to mousedown on the resize handle */
  startResize(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault(); // Prevent text selection while dragging
  }

  /** Event bound to document:mousemove to update width */
  onResize(event: MouseEvent) {
    if (!this.isResizing) return;
    // Constrain width between 200px and 380px
    const newWidth = Math.min(Math.max(event.clientX, 200), 380);
    this.sidebar.setWidth(newWidth);
  }

  /** Event bound to document:mouseup to stop dragging */
  stopResize() {
    this.isResizing = false;
  }

  /** Handle hamburger menu click */
  onMenuClick(sidenav: any) {
    if (this.breakpoints.isMatched(Breakpoints.Handset)) {
      sidenav.toggle();
    } else {
      this.sidebar.toggleCollapse();
    }
  }

  /** Handle navigation item click */
  onNavClick(sidenav: any) {
    if (this.breakpoints.isMatched(Breakpoints.Handset)) {
      sidenav.close();
    }
  }

  /** Determine the correct icon for the menu toggle */
  getMenuIcon(sidenav: any): string {
    if (this.breakpoints.isMatched(Breakpoints.Handset)) {
      return sidenav.opened ? 'close' : 'menu';
    }
    return !this.sidebar.isCollapsed() ? 'close' : 'menu';
  }
}
