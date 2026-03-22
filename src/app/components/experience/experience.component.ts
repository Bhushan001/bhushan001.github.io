import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Experience } from '../../shared/models/portfolio.models';

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
    this.portfolioService.getExperience().subscribe(e => { this.experiences = e; });
  }

  ngAfterViewInit() {
    const els = document.querySelectorAll<HTMLElement>('#experience .reveal, #experience .reveal-left');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
  }

  getCurrentRolesCount(): number   { return this.experiences.filter(e => e.isCurrent).length; }
  getLeadershipRolesCount(): number { return this.experiences.filter(e => e.title.toLowerCase().includes('lead')).length; }
}