import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Skill, SkillCategory } from '../../shared/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  skills: Skill[] = [];
  skillCategories: SkillCategory = {};
  Object = Object;

  summaryStats = [
    { val: '27', lbl: 'Total Skills' },
    { val: '6',  lbl: 'Categories' },
    { val: '0',  lbl: 'Expert Level' },
    { val: '0',  lbl: 'Advanced Level' },
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getSkills().subscribe(s => {
      this.skills = s;
      this.summaryStats[2].val = String(s.filter(x => x.proficiency >= 90).length);
      this.summaryStats[3].val = String(s.filter(x => x.proficiency >= 80).length);
    });
    this.portfolioService.getSkillCategories().subscribe(c => { this.skillCategories = c; });
  }

  ngAfterViewInit() {
    // Reveal cards
    const revealEls = document.querySelectorAll<HTMLElement>('#skills .reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));

    // Animate skill bars
    const bars = document.querySelectorAll<HTMLElement>('#skills .skill-bar');
    const barIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target as HTMLElement;
          bar.style.width = (bar.getAttribute('data-progress') || '0') + '%';
          barIO.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barIO.observe(b));
  }

  getCategoryIcon(cat: string): string {
    const m: Record<string, string> = {
      'Languages & Frameworks': 'fas fa-code',
      'DevOps & Tools':         'fas fa-tools',
      'Cloud & Database':       'fas fa-cloud',
      'Testing':                'fas fa-vial',
      'CI/CD':                  'fas fa-rotate',
      'Agile & Collaboration':  'fas fa-users',
    };
    return m[cat] || 'fas fa-star';
  }

  getCategoryColor(cat: string): string {
    const m: Record<string, string> = {
      'Languages & Frameworks': '#818cf8',
      'DevOps & Tools':         '#34d399',
      'Cloud & Database':       '#fb923c',
      'Testing':                '#c084fc',
      'CI/CD':                  '#60a5fa',
      'Agile & Collaboration':  '#fbbf24',
    };
    return m[cat] || '#94a3b8';
  }

  getCategoryBg(cat: string): string {
    const m: Record<string, string> = {
      'Languages & Frameworks': 'rgba(129,140,248,0.12)',
      'DevOps & Tools':         'rgba(52,211,153,0.12)',
      'Cloud & Database':       'rgba(251,146,60,0.12)',
      'Testing':                'rgba(192,132,252,0.12)',
      'CI/CD':                  'rgba(96,165,250,0.12)',
      'Agile & Collaboration':  'rgba(251,191,36,0.12)',
    };
    return m[cat] || 'rgba(148,163,184,0.1)';
  }

  getExpertLevelCount(): number  { return this.skills.filter(s => s.proficiency >= 90).length; }
  getAdvancedLevelCount(): number { return this.skills.filter(s => s.proficiency >= 80).length; }
}