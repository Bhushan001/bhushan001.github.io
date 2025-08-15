import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { PersonalInfo } from '../../shared/models/portfolio.models';
import { gsap } from 'gsap';

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

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
    // Start typing animation after a short delay
    setTimeout(() => {
      this.startTextAnimation();
    }, 1000);
  }

  ngAfterViewInit() {
    this.initHeroAnimations();
  }

  private initHeroAnimations() {
    // Hero section entrance animation
    const tl = gsap.timeline();
    
    tl.from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power2.out'
    })
    .from('.hero-subtitle', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-description', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-buttons', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.3');

    // Parallax effect on scroll
    gsap.to('.hero-background', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
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
}
