import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Experience } from '../../shared/models/portfolio.models';
import { gsap } from 'gsap';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  experiences: Experience[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getExperience().subscribe(experiences => {
      this.experiences = experiences;
    });
  }

  ngAfterViewInit() {
    this.initExperienceAnimations();
  }

  private initExperienceAnimations() {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target as HTMLElement;
          
          gsap.fromTo(item, 
            {
              opacity: 0,
              x: item.classList.contains('timeline-left') ? -50 : 50
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out'
            }
          );
        }
      });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => observer.observe(item));
  }

  getDurationColor(isCurrent: boolean): string {
    return isCurrent ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400';
  }

  getStatusBadge(isCurrent: boolean): string {
    return isCurrent ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }

  getCurrentRolesCount(): number {
    return this.experiences.filter(e => e.isCurrent).length;
  }

  getLeadershipRolesCount(): number {
    return this.experiences.filter(e => e.title.toLowerCase().includes('lead')).length;
  }
}
