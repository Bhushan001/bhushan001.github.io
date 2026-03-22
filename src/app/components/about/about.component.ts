import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { PersonalInfo } from '../../shared/models/portfolio.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  personalInfo: PersonalInfo | null = null;

  competencies = [
    { label: 'Frontend Development', pct: 95 },
    { label: 'Backend Development',  pct: 90 },
    { label: 'DevOps & CI/CD',       pct: 88 },
    { label: 'Team Leadership',      pct: 85 },
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
  }

  ngAfterViewInit() {
    // Reveal on scroll
    const revealEls = document.querySelectorAll<HTMLElement>('#about .reveal, #about .reveal-left, #about .reveal-right, #about .reveal-scale');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

    // Animate progress bars when visible
    const bars = document.querySelectorAll<HTMLElement>('#about .progress-bar');
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target as HTMLElement;
          const pct = bar.getAttribute('data-progress') || '0';
          bar.style.width = pct + '%';
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barObserver.observe(b));
  }

  getHobbyIcon(hobby: string): string {
    const map: { [key: string]: string } = {
      'Watching Tech Talks': 'fas fa-video',
      'Writing Tech Articles': 'fas fa-pen-fancy',
      'Playing Chess': 'fas fa-chess',
      'Singing': 'fas fa-music',
    };
    return map[hobby] || 'fas fa-star';
  }
}