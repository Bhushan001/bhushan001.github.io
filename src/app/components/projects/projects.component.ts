import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Project } from '../../shared/models/portfolio.models';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
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

  getProjectThumbnail(cat: string): string {
    return this.portfolioService.getProjectThumbnail(cat);
  }

  getLiveDemosCount(): number  { return this.projects.filter(p => p.liveUrl).length; }
  getOpenSourceCount(): number { return this.projects.filter(p => p.githubUrl).length; }
  getCategoriesCount(): number { return this.categories.length - 1; }
}