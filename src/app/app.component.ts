import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AwardsComponent } from './components/awards/awards.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    AwardsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Bhushan Gadekar - Portfolio';
  isDarkMode = false;
  isMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';
  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark'; // Only use dark if explicitly saved, otherwise default to light
    this.applyTheme();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
    this.updateNavbarTextColor();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'awards', 'contact'];
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            this.activeSection = sectionId;
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    // Close mobile menu on window resize
    if (window.innerWidth >= 1024 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    
    // Update navbar text color
    this.updateNavbarTextColor();
  }

  private updateNavbarTextColor() {
    const navbarName = document.querySelector('.navbar-name') as HTMLElement;
    if (navbarName) {
      if (this.isDarkMode) {
        navbarName.style.color = '#ffffff';
      } else {
        navbarName.style.color = '#111827';
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // Prevent body scroll when menu is open
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  scrollToSection(sectionId: string) {
    console.log('Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset for fixed navbar
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      this.closeMenu();
    } else {
      console.error('Element not found:', sectionId);
    }
  }
}
