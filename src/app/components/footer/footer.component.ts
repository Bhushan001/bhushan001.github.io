import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { ContactInfo } from '../../shared/models/portfolio.models';
import { gsap } from 'gsap';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  contactInfo: ContactInfo | null = null;
  currentYear = new Date().getFullYear();

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }

  ngAfterViewInit() {
    this.initFooterAnimations();
  }

  private initFooterAnimations() {
    // Animate footer elements on scroll
    const footerElements = document.querySelectorAll('.footer-animate');
    
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

    footerElements.forEach(element => observer.observe(element));

    // Animate social links - only if they exist
    const socialLinks = document.querySelectorAll('.social-link');
    if (socialLinks.length > 0) {
      gsap.fromTo('.social-link', 
        {
          opacity: 0,
          scale: 0,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
