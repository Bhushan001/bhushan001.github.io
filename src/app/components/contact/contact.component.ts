import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { ContactService, ContactFormData } from '../../shared/services/contact.service';
import { ContactInfo } from '../../shared/models/portfolio.models';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactInfo: ContactInfo | null = null;
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(
    private portfolioService: PortfolioService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.portfolioService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }

  ngAfterViewInit() {
    this.initContactAnimations();
  }

  private initContactAnimations() {
    // Animate contact section on scroll
    const contactElements = document.querySelectorAll('.contact-animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          gsap.fromTo(element, 
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out'
            }
          );
        }
      });
    }, { threshold: 0.3 });

    contactElements.forEach(element => observer.observe(element));

    // Animate contact info cards
    gsap.fromTo('.contact-info-card', 
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;
      
      const formData: ContactFormData = {
        name: this.contactForm.name.trim(),
        email: this.contactForm.email.trim(),
        subject: this.contactForm.subject.trim(),
        message: this.contactForm.message.trim()
      };

      this.contactService.submitContactForm(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          
          // Reset form
          this.contactForm = {
            name: '',
            email: '',
            subject: '',
            message: ''
          };
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitError = true;
          this.errorMessage = 'Failed to send message. Please try again later.';
          
          // Hide error message after 5 seconds
          setTimeout(() => {
            this.submitError = false;
            this.errorMessage = '';
          }, 5000);
        }
      });
    }
  }

  private validateForm(): boolean {
    if (!this.contactForm.name.trim()) {
      this.showError('Please enter your name');
      return false;
    }
    
    if (!this.contactForm.email.trim()) {
      this.showError('Please enter your email');
      return false;
    }
    
    if (!this.isValidEmail(this.contactForm.email)) {
      this.showError('Please enter a valid email address');
      return false;
    }
    
    if (!this.contactForm.subject.trim()) {
      this.showError('Please enter a subject');
      return false;
    }
    
    if (!this.contactForm.message.trim()) {
      this.showError('Please enter your message');
      return false;
    }
    
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showError(message: string) {
    this.submitError = true;
    this.errorMessage = message;
    setTimeout(() => {
      this.submitError = false;
      this.errorMessage = '';
    }, 5000);
  }

  // Test webhook connection (for development)
  testWebhook() {
    console.log('🧪 Testing webhook connection...');
    this.contactService.testWebhook().subscribe({
      next: (response) => {
        console.log('✅ Webhook test successful:', response);
        alert('Webhook test successful! Check console for details.');
      },
      error: (error) => {
        console.error('❌ Webhook test failed:', error);
        alert('Webhook test failed! Check console for details.');
      }
    });
  }

  // Check webhook status (for debugging)
  checkWebhookStatus() {
    console.log('🔍 Checking webhook status...');
    this.contactService.checkWebhookStatus().subscribe({
      next: (response) => {
        console.log('✅ Webhook status check:', response);
        // If we get here, the webhook is accessible (200 response)
        // The response could be "Accepted" or any other text from Make.com
        alert('✅ Webhook is active and accessible!\n\nStatus: 200 OK\nResponse: ' + (response || 'Accepted') + '\n\n💡 If data is not appearing in Google Sheets automatically, check:\n1. Scenario is turned ON in Make.com\n2. Google Sheets connection is active\n3. No errors in scenario modules');
      },
      error: (error) => {
        console.error('❌ Webhook status check failed:', error);
        alert('❌ Webhook status check failed! Check console for details.');
      }
    });
  }

  openEmail() {
    if (this.contactInfo?.email) {
      window.open(`mailto:${this.contactInfo.email}`, '_blank');
    }
  }

  openPhone() {
    if (this.contactInfo?.phone) {
      window.open(`tel:${this.contactInfo.phone}`, '_blank');
    }
  }

  openLinkedIn() {
    if (this.contactInfo?.linkedin) {
      window.open(this.contactInfo.linkedin, '_blank');
    }
  }

  openGitHub() {
    if (this.contactInfo?.github) {
      window.open(this.contactInfo.github, '_blank');
    }
  }

  openStackOverflow() {
    if (this.contactInfo?.stackoverflow) {
      window.open(this.contactInfo.stackoverflow, '_blank');
    }
  }

  downloadResume() {
    // Open Google Drive resume link
    const resumeUrl = 'https://drive.google.com/file/d/1PTUgrSbcre6XwOHH9ON34IfAXHnuDcQ3/view?usp=drive_link';
    window.open(resumeUrl, '_blank');
  }
}
