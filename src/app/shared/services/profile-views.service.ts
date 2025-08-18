import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

interface ProfileViewsData {
  views: number;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileViewsService {
  private readonly STORAGE_KEY = 'profile_views';
  private readonly STORAGE_KEY_LAST_INCREMENT = 'profile_views_last_increment';
  private readonly VIEWS_FILE_PATH = 'assets/data/profile-views.json';
  private viewsSubject = new BehaviorSubject<number>(0);
  public views$ = this.viewsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadViews();
  }

  private loadViews(): void {
    // First try to load from localStorage (primary storage)
    const storedViews = localStorage.getItem(this.STORAGE_KEY);
    const currentViews = storedViews ? parseInt(storedViews, 10) : 0;
    
    // Set the current views immediately
    this.viewsSubject.next(currentViews);
    
    // Then try to sync with JSON file (as backup/fallback)
    this.loadViewsFromFile().subscribe({
      next: (fileViews) => {
        // If JSON file has higher count, use it
        if (fileViews > currentViews) {
          this.viewsSubject.next(fileViews);
          localStorage.setItem(this.STORAGE_KEY, fileViews.toString());
          console.log('✅ Synced with JSON file, updated to:', fileViews);
        } else {
          console.log('📊 Using localStorage views:', currentViews);
        }
      },
      error: (error) => {
        console.log('📊 Using localStorage views (JSON file not available):', currentViews);
      }
    });
  }

  private loadViewsFromFile(): Observable<number> {
    return this.http.get<ProfileViewsData>(this.VIEWS_FILE_PATH).pipe(
      tap(data => console.log('📄 Loaded from JSON file:', data)),
      map(data => data.views),
      catchError(error => {
        console.warn('⚠️ Could not load from JSON file:', error);
        return of(0);
      })
    );
  }

  private shouldIncrement(): boolean {
    const today = new Date().toDateString();
    const lastIncrement = localStorage.getItem(this.STORAGE_KEY_LAST_INCREMENT);
    
    // Only increment once per day per user
    if (lastIncrement !== today) {
      localStorage.setItem(this.STORAGE_KEY_LAST_INCREMENT, today);
      return true;
    }
    return false;
  }

  incrementViews(): void {
    // Only increment once per day per user
    if (this.shouldIncrement()) {
      const currentViews = this.viewsSubject.value;
      const newViews = currentViews + 1;
      
      // Update local state immediately
      this.viewsSubject.next(newViews);
      localStorage.setItem(this.STORAGE_KEY, newViews.toString());
      
      console.log(`✅ Profile view incremented to: ${newViews}`);
    } else {
      console.log('⏰ View already counted today');
    }
  }

  getCurrentViews(): number {
    return this.viewsSubject.value;
  }

  resetViews(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STORAGE_KEY_LAST_INCREMENT);
    this.viewsSubject.next(0);
  }

  // Method to manually increment views (for testing purposes)
  forceIncrementViews(): void {
    const currentViews = this.viewsSubject.value;
    const newViews = currentViews + 1;
    this.viewsSubject.next(newViews);
    localStorage.setItem(this.STORAGE_KEY, newViews.toString());
    console.log(`🔧 Force incremented to: ${newViews}`);
  }

  // Method to refresh views
  refreshViews(): void {
    this.loadViews();
  }

  // Get last increment date
  getLastIncrementDate(): string | null {
    return localStorage.getItem(this.STORAGE_KEY_LAST_INCREMENT);
  }

  // Method to manually update the views (for admin purposes)
  updateViewsManually(views: number): void {
    this.viewsSubject.next(views);
    localStorage.setItem(this.STORAGE_KEY, views.toString());
    console.log(`🔧 Manually updated to: ${views}`);
  }

  // Method to clear daily increment flag (for testing)
  clearDailyIncrement(): void {
    localStorage.removeItem(this.STORAGE_KEY_LAST_INCREMENT);
    console.log('🧹 Cleared daily increment flag');
  }
}

