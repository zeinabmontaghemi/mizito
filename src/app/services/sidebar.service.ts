import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(false);

  // Observable to expose the sidebar state
  isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();

  // Method to toggle the sidebar state
  toggleSidebar(): void {
    const currentState = this.isSidebarOpenSubject.value;
    this.isSidebarOpenSubject.next(!currentState);
  }

  // Method to set the sidebar state explicitly
  setSidebarState(isOpen: boolean): void {
    this.isSidebarOpenSubject.next(isOpen);
  }
}
