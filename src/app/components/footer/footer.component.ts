import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { ContactInfo } from '../../shared/models/portfolio.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contactInfo: ContactInfo | null = null;
  currentYear = new Date().getFullYear();

  navLinks = [
    { id: 'home',       label: 'Home' },
    { id: 'about',      label: 'About' },
    { id: 'skills',     label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects' },
    { id: 'awards',     label: 'Awards' },
    { id: 'contact',    label: 'Contact' },
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getContactInfo().subscribe(info => { this.contactInfo = info; });
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  openLinkedIn()     { if (this.contactInfo?.linkedin)     window.open(this.contactInfo.linkedin,     '_blank'); }
  openGitHub()       { if (this.contactInfo?.github)       window.open(this.contactInfo.github,       '_blank'); }
  openStackOverflow(){ if (this.contactInfo?.stackoverflow) window.open(this.contactInfo.stackoverflow,'_blank'); }
  openEmail()        { if (this.contactInfo?.email)        window.open(`mailto:${this.contactInfo.email}`, '_blank'); }
  openPhone()        { if (this.contactInfo?.phone)        window.open(`tel:${this.contactInfo.phone}`,    '_blank'); }
}