import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Skill, SkillCategory } from '../../shared/models/portfolio.models';
import { gsap } from 'gsap';

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

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getSkills().subscribe(skills => {
      this.skills = skills;
    });

    this.portfolioService.getSkillCategories().subscribe(categories => {
      this.skillCategories = categories;
    });
  }

  ngAfterViewInit() {
    this.initSkillsAnimations();
  }

  private initSkillsAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement;
          const progress = bar.getAttribute('data-progress');
          
          gsap.fromTo(bar, 
            { width: '0%' },
            { 
              width: progress + '%',
              duration: 1.5,
              ease: 'power2.out'
            }
          );
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));

    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
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
          delay: index * 0.1,
          ease: 'power2.out'
        }
      );
    });
  }

  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Languages & Frameworks': 'from-blue-500 to-purple-600',
      'DevOps & Tools': 'from-green-500 to-teal-600',
      'Cloud & Database': 'from-orange-500 to-red-600',
      'Testing': 'from-purple-500 to-pink-600',
      'CI/CD': 'from-indigo-500 to-blue-600',
      'Agile & Collaboration': 'from-yellow-500 to-orange-600'
    };
    return colorMap[category] || 'from-gray-500 to-gray-600';
  }

  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Languages & Frameworks': 'fas fa-code',
      'DevOps & Tools': 'fas fa-tools',
      'Cloud & Database': 'fas fa-cloud',
      'Testing': 'fas fa-vial',
      'CI/CD': 'fas fa-sync-alt',
      'Agile & Collaboration': 'fas fa-users'
    };
    return iconMap[category] || 'fas fa-star';
  }

  getExpertLevelCount(): number {
    return this.skills.filter(s => s.proficiency >= 90).length;
  }

  getAdvancedLevelCount(): number {
    return this.skills.filter(s => s.proficiency >= 80).length;
  }
}
