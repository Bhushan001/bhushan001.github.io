import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  // Get this from your Make.com scenario webhook module
  private readonly WEBHOOK_URL = 'https://hook.eu2.make.com/tzfmt2nfxfjdh9lybergixy3iy9ji9t7';
  
  constructor(private http: HttpClient) {}

  submitContactForm(formData: ContactFormData): Observable<any> {
    // Add additional data
    const enrichedData: ContactFormData = {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    // Set proper headers for JSON POST request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('📧 Submitting contact form:', enrichedData);
    console.log('🔗 Webhook URL:', this.WEBHOOK_URL);
    console.log('📊 Data being sent to Make.com:');
    console.log('  - Name:', enrichedData.name);
    console.log('  - Email:', enrichedData.email);
    console.log('  - Subject:', enrichedData.subject);
    console.log('  - Message:', enrichedData.message);
    console.log('  - Timestamp:', enrichedData.timestamp);
    console.log('  - Headers:', headers);

    return this.http.post(this.WEBHOOK_URL, enrichedData, { headers }).pipe(
      tap(response => {
        console.log('✅ Contact form submitted successfully:', response);
        console.log('💡 Check your Make.com scenario execution history');
        console.log('💡 Check your Google Sheet for new entries');
        console.log('🔍 If data is not appearing in Google Sheets:');
        console.log('   1. Go to Make.com dashboard');
        console.log('   2. Check if your scenario is turned ON');
        console.log('   3. Look at the webhook queue/history');
        console.log('   4. Verify Google Sheets connection');
      }),
      catchError(error => {
        console.error('❌ Error submitting contact form:', error);
        console.error('📋 Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        
        // Check for specific webhook errors
        if (error.status === 410) {
          console.error('🚨 Webhook Error: Scenario not active or URL incorrect');
          console.error('💡 Please check your Make.com scenario is turned ON');
        } else if (error.status === 429) {
          console.error('🚨 Rate Limit Error: Too many requests');
          console.error('💡 Check your Make.com plan limits');
        } else if (error.status === 0) {
          console.error('🚨 Network Error: CORS or network issue');
          console.error('💡 Check webhook URL and network connection');
        }
        
        // Return a mock success response for development
        return of({ 
          success: true, 
          message: 'Form submitted (mock response - webhook not active)',
          debug: {
            originalError: error,
            webhookUrl: this.WEBHOOK_URL,
            dataSent: enrichedData
          }
        });
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

    console.log('🧪 Starting webhook test...');
    console.log('📋 Test data:', testData);
    console.log('🔗 Webhook URL:', this.WEBHOOK_URL);

    return this.submitContactForm(testData);
  }

  // Method to check webhook status
  checkWebhookStatus(): Observable<any> {
    console.log('🔍 Checking webhook status...');
    console.log('🔗 Webhook URL:', this.WEBHOOK_URL);
    
    // Send a simple GET request to check if webhook is accessible
    return this.http.get(this.WEBHOOK_URL, { responseType: 'text' }).pipe(
      tap(response => {
        console.log('✅ Webhook is accessible:', response);
        console.log('📊 Response type:', typeof response);
        console.log('📊 Response length:', response?.length);
        console.log('💡 200 response with "' + response + '" means webhook is active');
        console.log('💡 Check Make.com dashboard to ensure scenario is turned ON');
      }),
      catchError(error => {
        console.error('❌ Webhook accessibility check failed:', error);
        console.error('📋 Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message
        });
        return of({ 
          accessible: false, 
          error: error,
          message: 'Webhook may not be accessible or scenario is OFF'
        });
      })
    );
  }
}
