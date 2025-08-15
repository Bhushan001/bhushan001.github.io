import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Award } from '../../shared/models/portfolio.models';
import { gsap } from 'gsap';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit, AfterViewInit {
  awards: Award[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getAwards().subscribe(awards => {
      this.awards = awards;
    });
  }

  ngAfterViewInit() {
    this.initAwardsAnimations();
  }

  private initAwardsAnimations() {
    // Animate award cards on scroll
    const awardCards = document.querySelectorAll('.award-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          
          gsap.fromTo(card, 
            {
              opacity: 0,
              y: 50,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out'
            }
          );
        }
      });
    }, { threshold: 0.2 });

    awardCards.forEach(card => observer.observe(card));

    // Stagger animation for award icons
    gsap.fromTo('.award-icon', 
      {
        opacity: 0,
        scale: 0,
        rotation: -180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    );
  }

  getAwardColor(year: string): string {
    const currentYear = new Date().getFullYear();
    const awardYear = parseInt(year);
    
    if (year === 'Multiple Years') return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    if (awardYear === currentYear) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (awardYear >= currentYear - 2) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }

  getPerformanceAwardsCount(): number {
    return this.awards.filter(a => a.year === '2019').length;
  }

  getCertificationsCount(): number {
    return this.awards.filter(a => a.title.includes('Expert') || a.title.includes('Certification')).length;
  }

  getCompetitionWinsCount(): number {
    return this.awards.filter(a => a.title.includes('Chess')).length;
  }
}
