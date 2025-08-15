import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Project } from '../../shared/models/portfolio.models';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { gsap } from 'gsap';

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
  selectedCategory: string = 'All';
  categories: string[] = ['All'];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = projects;
      this.categories = ['All', ...new Set(projects.map(p => p.category))];
    });
  }

  ngAfterViewInit() {
    this.initProjectAnimations();
  }

  private initProjectAnimations() {
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
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

    projectCards.forEach(card => observer.observe(card));
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
  }

  openProject(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  getLiveDemosCount(): number {
    return this.projects.filter(p => p.liveUrl).length;
  }

  getOpenSourceCount(): number {
    return this.projects.filter(p => p.githubUrl).length;
  }

  getCategoriesCount(): number {
    return this.categories.length - 1;
  }

  getProjectThumbnail(category: string): string {
    return this.portfolioService.getProjectThumbnail(category);
  }
}
