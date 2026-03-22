import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Project } from '../../shared/models/portfolio.models';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory = 'All';
  categories: string[] = ['All'];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(p => {
      this.projects = p;
      this.filteredProjects = p;
      this.categories = ['All', ...new Set(p.map(x => x.category))];
    });
  }

  ngAfterViewInit() {
    this.initReveal();
  }

  private initReveal() {
    const els = document.querySelectorAll<HTMLElement>('#projects .reveal, #projects .reveal-scale');
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

  filterProjects(cat: string) {
    this.selectedCategory = cat;
    this.filteredProjects = cat === 'All' ? this.projects : this.projects.filter(p => p.category === cat);
    // re-run reveal for newly visible items
    setTimeout(() => this.initReveal(), 50);
  }

  openProject(url: string | undefined) {
    if (url) window.open(url, '_blank');
  }

  getThumbConfig(cat: string): { icon: string; from: string; to: string } {
    const map: Record<string, { icon: string; from: string; to: string }> = {
      'E-commerce':     { icon: 'fas fa-shopping-bag',    from: '#6366f1', to: '#a855f7' },
      'Healthcare':     { icon: 'fas fa-heartbeat',       from: '#ec4899', to: '#f43f5e' },
      'Finance':        { icon: 'fas fa-chart-line',      from: '#0ea5e9', to: '#6366f1' },
      'Analytics':      { icon: 'fas fa-chart-bar',       from: '#14b8a6', to: '#0ea5e9' },
      'Productivity':   { icon: 'fas fa-tasks',           from: '#f59e0b', to: '#ef4444' },
      'Social':         { icon: 'fas fa-users',           from: '#8b5cf6', to: '#ec4899' },
      'Education':      { icon: 'fas fa-graduation-cap', from: '#10b981', to: '#0ea5e9' },
      'Infrastructure': { icon: 'fas fa-server',          from: '#64748b', to: '#475569' },
    };
    return map[cat] ?? { icon: 'fas fa-code',             from: '#6366f1', to: '#8b5cf6' };
  }

  getLiveDemosCount(): number  { return this.projects.filter(p => p.liveUrl).length; }
  getOpenSourceCount(): number { return this.projects.filter(p => p.githubUrl).length; }
  getCategoriesCount(): number { return this.categories.length - 1; }
}