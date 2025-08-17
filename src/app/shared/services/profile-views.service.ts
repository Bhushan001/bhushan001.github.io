import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileViewsService {
  private readonly STORAGE_KEY = 'profile_views';
  private viewsSubject = new BehaviorSubject<number>(0);
  public views$ = this.viewsSubject.asObservable();

  constructor() {
    this.loadViews();
  }

  private loadViews(): void {
    const storedViews = localStorage.getItem(this.STORAGE_KEY);
    const currentViews = storedViews ? parseInt(storedViews, 10) : 0;
    this.viewsSubject.next(currentViews);
  }

  incrementViews(): void {
    const currentViews = this.viewsSubject.value;
    const newViews = currentViews + 1;
    localStorage.setItem(this.STORAGE_KEY, newViews.toString());
    this.viewsSubject.next(newViews);
  }

  getCurrentViews(): number {
    return this.viewsSubject.value;
  }

  resetViews(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.viewsSubject.next(0);
  }
}

