import { Injectable, signal } from '@angular/core';

/**
 * SidebarService — Manages state for the resizable, collapsible sidebar.
 * Persists width and collapse state to localStorage.
 */
@Injectable({ providedIn: 'root' })
export class SidebarService {
  /** The current width of the sidebar (in pixels) */
  readonly width = signal<number>(
    parseInt(localStorage.getItem('sidebar_width') || '240', 10)
  );

  /** Whether the sidebar is fully collapsed */
  readonly isCollapsed = signal<boolean>(
    localStorage.getItem('sidebar_collapsed') === 'true'
  );

  /** Update the sidebar width and save to local storage */
  setWidth(newWidth: number) {
    this.width.set(newWidth);
    localStorage.setItem('sidebar_width', newWidth.toString());
  }

  /** Toggle the collapse state and save to local storage */
  toggleCollapse() {
    const collapsed = !this.isCollapsed();
    this.isCollapsed.set(collapsed);
    localStorage.setItem('sidebar_collapsed', collapsed.toString());
  }
}
