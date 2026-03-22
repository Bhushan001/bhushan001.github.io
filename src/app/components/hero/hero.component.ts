import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  currentText = '';
  stats = [
    { value: 10, display: '10+', label: 'Years Experience' },
    { value: 20, display: '20+', label: 'Projects Delivered' },
    { value: 5,  display: '5+',  label: 'Companies' },
    { value: 15, display: '15+', label: 'Technologies' },
  ];

  private readonly roles = [
    'Tech Team Lead',
    'Full-Stack Developer',
    'Angular Expert',
    'DevOps Enthusiast',
  ];
  private roleIndex = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getPersonalInfo().subscribe();
    setTimeout(() => this.typeNext(), 800);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  private typeNext() {
    const text = this.roles[this.roleIndex];
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        this.currentText = text.slice(0, i++);
        this.timer = setTimeout(type, 85);
      } else {
        this.timer = setTimeout(() => this.eraseText(), 2200);
      }
    };
    type();
  }

  private eraseText() {
    const erase = () => {
      if (this.currentText.length > 0) {
        this.currentText = this.currentText.slice(0, -1);
        this.timer = setTimeout(erase, 45);
      } else {
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.timer = setTimeout(() => this.typeNext(), 400);
      }
    };
    erase();
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  }

  downloadResume() {
    window.open('https://drive.google.com/file/d/1PTUgrSbcre6XwOHH9ON34IfAXHnuDcQ3/view?usp=drive_link', '_blank');
  }

  openContact() {
    this.scrollToSection('contact');
  }
}