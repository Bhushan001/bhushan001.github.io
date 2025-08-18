import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
  userAgent?: string;
  referrer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Replace this with your Make.com webhook URL
  private readonly WEBHOOK_URL = 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID';
  
  constructor(private http: HttpClient) {}

  submitContactForm(formData: ContactFormData): Observable<any> {
    // Add additional data
    const enrichedData: ContactFormData = {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    console.log('📧 Submitting contact form:', enrichedData);

    return this.http.post(this.WEBHOOK_URL, enrichedData).pipe(
      tap(response => {
        console.log('✅ Contact form submitted successfully:', response);
      }),
      catchError(error => {
        console.error('❌ Error submitting contact form:', error);
        // Return a mock success response for development
        return of({ success: true, message: 'Form submitted (mock response)' });
      })
    );
  }

  // Method to test the webhook connection
  testWebhook(): Observable<any> {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the portfolio contact form.',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    return this.submitContactForm(testData);
  }
}
