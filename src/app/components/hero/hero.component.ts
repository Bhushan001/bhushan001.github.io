import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { ProfileViewsService } from '../../shared/services/profile-views.service';
import { PersonalInfo } from '../../shared/models/portfolio.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit {
  personalInfo: PersonalInfo | null = null;
  animatedTexts: string[] = ['Tech Team Lead', 'Full-Stack Developer', 'Angular Expert', 'DevOps Enthusiast'];
  currentTextIndex = 0;
  currentText = '';
  profileViews = 0;

  constructor(
    private portfolioService: PortfolioService,
    private profileViewsService: ProfileViewsService
  ) {}

  ngOnInit() {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
    
    // Initialize profile views
    this.profileViewsService.views$.subscribe(views => {
      this.profileViews = views;
      // Add a subtle animation effect when views change
      this.animateViewsChange();
    });
    
    // Increment profile views on component initialization
    this.profileViewsService.incrementViews();
    
    // Start typing animation after a short delay
    setTimeout(() => {
      this.startTextAnimation();
    }, 1000);
  }

  ngAfterViewInit() {
    // Only keep typing animation, remove other animations
  }

  private startTextAnimation() {
    const animateText = () => {
      const text = this.animatedTexts[this.currentTextIndex];
      let charIndex = 0;
      
      const typeWriter = () => {
        if (charIndex < text.length) {
          this.currentText = text.substring(0, charIndex + 1);
          charIndex++;
          setTimeout(typeWriter, 100);
        } else {
          setTimeout(() => {
            // Erase text
            const eraseText = () => {
              if (this.currentText.length > 0) {
                this.currentText = this.currentText.substring(0, this.currentText.length - 1);
                setTimeout(eraseText, 50);
              } else {
                // Move to next text
                this.currentTextIndex = (this.currentTextIndex + 1) % this.animatedTexts.length;
                setTimeout(animateText, 500);
              }
            };
            setTimeout(eraseText, 2000);
          }, 2000);
        }
      };
      
      typeWriter();
    };
    
    animateText();
  }

  scrollToSection(sectionId: string) {
    console.log('Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Element not found:', sectionId);
    }
  }

  downloadResume() {
    // Open Google Drive resume link
    const resumeUrl = 'https://drive.google.com/file/d/1PTUgrSbcre6XwOHH9ON34IfAXHnuDcQ3/view?usp=drive_link';
    window.open(resumeUrl, '_blank');
  }

  openContact() {
    this.scrollToSection('contact');
  }

  private animateViewsChange(): void {
    // This will be handled by CSS animations
    const viewsElement = document.querySelector('.profile-views-number');
    if (viewsElement) {
      viewsElement.classList.add('animate-pulse');
      setTimeout(() => {
        viewsElement.classList.remove('animate-pulse');
      }, 1000);
    }
  }

  // Test method for debugging profile views
  testProfileViews(): void {
    console.log('🧪 Testing profile views...');
    console.log('Current views:', this.profileViews);
    console.log('Last increment date:', this.profileViewsService.getLastIncrementDate());
    
    // Force increment for testing
    this.profileViewsService.forceIncrementViews();
    
    // Clear daily increment flag for testing
    this.profileViewsService.clearDailyIncrement();
    
    console.log('✅ Test completed');
  }
}
