import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { PersonalInfo } from '../../shared/models/portfolio.models';
import { gsap } from 'gsap';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  personalInfo: PersonalInfo | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
  }

  ngAfterViewInit() {
    this.initAboutAnimations();
  }

  private initAboutAnimations() {
    // Animate about section on scroll
    const aboutElements = document.querySelectorAll('.about-animate');
    
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

    aboutElements.forEach(element => observer.observe(element));

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
      gsap.fromTo(bar, 
        { width: '0%' },
        { 
          width: bar.getAttribute('data-progress') + '%',
          duration: 1.5,
          delay: index * 0.1,
          ease: 'power2.out'
        }
      );
    });
  }

  getHobbyIcon(hobby: string): string {
    const iconMap: { [key: string]: string } = {
      'Watching Tech Talks': 'fas fa-video',
      'Writing Tech Articles': 'fas fa-pen-fancy',
      'Playing Chess': 'fas fa-chess',
      'Singing': 'fas fa-music'
    };
    return iconMap[hobby] || 'fas fa-heart';
  }
}
