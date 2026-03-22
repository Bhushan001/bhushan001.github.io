import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Award } from '../../shared/models/portfolio.models';

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
    this.portfolioService.getAwards().subscribe(a => { this.awards = a; });
  }

  ngAfterViewInit() {
    const els = document.querySelectorAll<HTMLElement>('#awards .reveal, #awards .reveal-scale');
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

  private readonly palette: Record<string, [string, string]> = {
    recent:   ['rgba(99,102,241,0.15)',  '#818cf8'],
    mid:      ['rgba(6,182,212,0.13)',   '#22d3ee'],
    older:    ['rgba(139,92,246,0.13)',  '#a78bfa'],
    multiple: ['rgba(251,191,36,0.13)',  '#fbbf24'],
  };

  private getKey(year: string): string {
    if (year === 'Multiple Years') return 'multiple';
    const y = parseInt(year);
    const now = new Date().getFullYear();
    if (y >= now - 1)  return 'recent';
    if (y >= now - 3)  return 'mid';
    return 'older';
  }

  getAwardGlow(year: string): string  { return this.palette[this.getKey(year)][0]; }
  getAwardAccent(year: string): string { return this.palette[this.getKey(year)][1]; }
}