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
    // First try to load from JSON file, fallback to localStorage
    this.loadViewsFromFile().subscribe({
      next: (views) => {
        this.viewsSubject.next(views);
        localStorage.setItem(this.STORAGE_KEY, views.toString());
      },
      error: () => {
        // Fallback to localStorage if file read fails
        const storedViews = localStorage.getItem(this.STORAGE_KEY);
        const currentViews = storedViews ? parseInt(storedViews, 10) : 0;
        this.viewsSubject.next(currentViews);
      }
    });
  }

  private loadViewsFromFile(): Observable<number> {
    return this.http.get<ProfileViewsData>(this.VIEWS_FILE_PATH).pipe(
      tap(data => console.log('Loaded views from file:', data)),
      map(data => data.views),
      catchError(error => {
        console.error('Error loading views from file:', error);
        const storedViews = localStorage.getItem(this.STORAGE_KEY);
        return of(storedViews ? parseInt(storedViews, 10) : 0);
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
    // Only increment once per day per user to simulate worldwide persistence
    if (this.shouldIncrement()) {
      const currentViews = this.viewsSubject.value;
      const newViews = currentViews + 1;
      
      this.viewsSubject.next(newViews);
      localStorage.setItem(this.STORAGE_KEY, newViews.toString());
      
      // Update the JSON file (this will be committed to git)
      this.updateViewsFile(newViews);
      
      console.log(`Profile view incremented to: ${newViews}`);
    }
  }

  private updateViewsFile(views: number): void {
    const data: ProfileViewsData = {
      views: views,
      lastUpdated: new Date().toISOString()
    };
    
    // Note: In a real application, you would need a backend to write to files
    // For now, we'll just log the data that should be written
    console.log('Views data to be written to file:', data);
    
    // TODO: In a production app, you'd send this to a backend endpoint
    // that updates the JSON file
  }

  getCurrentViews(): number {
    return this.viewsSubject.value;
  }

  resetViews(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STORAGE_KEY_LAST_INCREMENT);
    this.viewsSubject.next(0);
    this.updateViewsFile(0);
  }

  // Method to manually increment views (for testing purposes)
  forceIncrementViews(): void {
    const currentViews = this.viewsSubject.value;
    const newViews = currentViews + 1;
    this.viewsSubject.next(newViews);
    localStorage.setItem(this.STORAGE_KEY, newViews.toString());
    this.updateViewsFile(newViews);
  }

  // Method to refresh views
  refreshViews(): void {
    this.loadViews();
  }

  // Get last increment date
  getLastIncrementDate(): string | null {
    return localStorage.getItem(this.STORAGE_KEY_LAST_INCREMENT);
  }

  // Method to manually update the views file (for admin purposes)
  updateViewsManually(views: number): void {
    this.viewsSubject.next(views);
    localStorage.setItem(this.STORAGE_KEY, views.toString());
    this.updateViewsFile(views);
  }
}

