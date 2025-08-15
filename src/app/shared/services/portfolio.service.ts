import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Skill, SkillCategory, Experience, Project, Award, ContactInfo, PersonalInfo } from '../models/portfolio.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  getPersonalInfo(): Observable<PersonalInfo> {
    return of({
      name: 'Bhushan Gadekar',
              title: 'Senior Engineer (User Experience)',
        summary: 'Senior Engineer (User Experience) with 10+ years of experience building scalable web applications and microservices. Skilled in Angular, React, Spring Boot, Node.js, and DevOps tools like Docker and Jenkins. Proven in leading CI/CD pipelines, optimizing performance, and mentoring teams. Active Stack Overflow contributor with 13,805+ reputation and 2.4M+ reach. Collaborative, curious, and always learning.',
      location: 'Pune, Maharashtra, India',
      experience: '10+ Years',
      education: [
        'Bachelor of Technology in Information Technology – Walchand College of Engineering, Sangli (2012–2015)',
        'Diploma in Information Technology – Government Polytechnic, Nashik (2009–2012)'
      ],
      hobbies: ['Watching Tech Talks', 'Writing Tech Articles', 'Playing Chess', 'Singing']
    });
  }

  getSkills(): Observable<Skill[]> {
    return of([
      // Languages & Frameworks
      { name: 'Java', proficiency: 95, icon: 'fab fa-java', color: '#007396', category: 'Languages & Frameworks' },
      { name: 'JavaScript', proficiency: 90, icon: 'fab fa-js-square', color: '#F7DF1E', category: 'Languages & Frameworks' },
      { name: 'TypeScript', proficiency: 88, icon: 'fab fa-js-square', color: '#3178C6', category: 'Languages & Frameworks' },
      { name: 'Angular', proficiency: 92, icon: 'fab fa-angular', color: '#DD0031', category: 'Languages & Frameworks' },
      { name: 'React', proficiency: 85, icon: 'fab fa-react', color: '#61DAFB', category: 'Languages & Frameworks' },
      { name: 'Spring Boot', proficiency: 90, icon: 'fas fa-leaf', color: '#6DB33F', category: 'Languages & Frameworks' },
      { name: 'Node.js', proficiency: 82, icon: 'fab fa-node-js', color: '#339933', category: 'Languages & Frameworks' },
      
      // DevOps & Tools
      { name: 'Docker', proficiency: 88, icon: 'fab fa-docker', color: '#2496ED', category: 'DevOps & Tools' },
      { name: 'Jenkins', proficiency: 85, icon: 'fab fa-jenkins', color: '#D24939', category: 'DevOps & Tools' },
      { name: 'Git', proficiency: 92, icon: 'fab fa-git-alt', color: '#F05032', category: 'DevOps & Tools' },
      { name: 'CircleCI', proficiency: 80, icon: 'fas fa-circle', color: '#343434', category: 'DevOps & Tools' },
      { name: 'Shell Scripting', proficiency: 85, icon: 'fas fa-terminal', color: '#4EAA25', category: 'DevOps & Tools' },
      
      // Cloud & Database
      { name: 'AWS', proficiency: 85, icon: 'fab fa-aws', color: '#FF9900', category: 'Cloud & Database' },
      { name: 'Azure', proficiency: 78, icon: 'fab fa-microsoft', color: '#0078D4', category: 'Cloud & Database' },
      { name: 'MySQL', proficiency: 88, icon: 'fas fa-database', color: '#4479A1', category: 'Cloud & Database' },
      { name: 'MongoDB', proficiency: 82, icon: 'fas fa-database', color: '#47A248', category: 'Cloud & Database' },
      { name: 'PostgreSQL', proficiency: 80, icon: 'fas fa-database', color: '#336791', category: 'Cloud & Database' },
      { name: 'Elasticsearch', proficiency: 75, icon: 'fas fa-search', color: '#FED10A', category: 'Cloud & Database' },
      
      // Testing
      { name: 'Jest', proficiency: 85, icon: 'fas fa-vial', color: '#C21325', category: 'Testing' },
      { name: 'Jasmine', proficiency: 80, icon: 'fas fa-flask', color: '#8A4182', category: 'Testing' },
      { name: 'Integration Testing', proficiency: 88, icon: 'fas fa-cogs', color: '#4CAF50', category: 'Testing' },
      
      // CI/CD
      { name: 'CI/CD Pipelines', proficiency: 90, icon: 'fas fa-sync-alt', color: '#2196F3', category: 'CI/CD' },
      { name: 'Deployment Automation', proficiency: 88, icon: 'fas fa-robot', color: '#FF9800', category: 'CI/CD' },
      
      // Agile & Collaboration
      { name: 'Agile/Scrum', proficiency: 92, icon: 'fas fa-users', color: '#9C27B0', category: 'Agile & Collaboration' },
      { name: 'Jira', proficiency: 90, icon: 'fab fa-jira', color: '#0052CC', category: 'Agile & Collaboration' },
      { name: 'Code Reviews', proficiency: 88, icon: 'fas fa-eye', color: '#607D8B', category: 'Agile & Collaboration' }
    ]);
  }

  getSkillCategories(): Observable<SkillCategory> {
    return this.getSkills().pipe(
      map(skills => {
        const categories: SkillCategory = {};
        skills.forEach(skill => {
          if (!categories[skill.category]) {
            categories[skill.category] = [];
          }
          categories[skill.category].push(skill);
        });
        return categories;
      })
    );
  }

  getExperience(): Observable<Experience[]> {
    return of([
      {
        title: 'Tech Team Lead',
        company: 'CRIF Solutions',
        location: 'Pune, Maharashtra',
        duration: 'Dec 2023 – Present',
        description: 'Leading development of CSH & Chrono projects using Angular and Spring Boot technologies.',
        achievements: [
          'Built multi-tenant schema mapping, reduced processing from 2 weeks to 2 hours',
          'Integrated NEOS & CIBIL APIs for enhanced functionality',
          'Led a team of 6 developers and mentored junior team members',
          'Implemented CI/CD pipelines and automated testing processes'
        ],
        technologies: ['Angular', 'Spring Boot', 'Java', 'Docker', 'Jenkins', 'MySQL'],
        isCurrent: true
      },
      {
        title: 'Team Lead',
        company: 'Altimetrik India',
        location: 'Pune, Maharashtra',
        duration: 'Jan 2020 – Dec 2023',
        description: 'Led Mastercard SFTP Portal project development and team management.',
        achievements: [
          'Led Mastercard SFTP Portal project using ReactJS and Spring Boot',
          'Managed IBM Sterling file storage and SSL implementation via Venafi',
          'Set up Chef Habitat DevOps infrastructure',
          'Improved system performance by 40% through optimization'
        ],
        technologies: ['ReactJS', 'Spring Boot', 'IBM Sterling', 'Venafi', 'Chef Habitat', 'AWS'],
        isCurrent: false
      },
      {
        title: 'Full Stack Developer',
        company: 'CRIF Solutions',
        location: 'Pune, Maharashtra',
        duration: 'Jan 2018 – Jan 2020',
        description: 'Developed CREDITY platform and implemented CI/CD processes.',
        achievements: [
          'Led CI/CD implementation with Jenkins and Docker',
          'Developed Angular UI for CREDITY multinational credit scoring platform',
          'Implemented Zalenium test automation framework',
          'Set up Prometheus monitoring and alerting system'
        ],
        technologies: ['Angular', 'Spring Boot', 'Jenkins', 'Docker', 'Zalenium', 'Prometheus'],
        isCurrent: false
      },
      {
        title: 'Full Stack Developer',
        company: 'Causecode Technologies',
        location: 'Pune, Maharashtra',
        duration: 'Jul 2018 – Dec 2018',
        description: 'Developed healthcare product with ReactJS frontend and serverless backend.',
        achievements: [
          'Built ReactJS frontend for healthcare product',
          'Developed serverless backend APIs using AWS Lambda',
          'Implemented responsive design and accessibility features',
          'Reduced API response time by 60% through optimization'
        ],
        technologies: ['ReactJS', 'AWS Lambda', 'Node.js', 'MongoDB', 'AWS'],
        isCurrent: false
      },
      {
        title: 'Software Engineer (R&D)',
        company: 'ShoppinPal',
        location: 'Pune, Maharashtra',
        duration: 'Jun 2017 – Jun 2018',
        description: 'Developed Angular and React applications with AWS deployments.',
        achievements: [
          'Developed Angular and React applications for e-commerce platform',
          'Implemented AWS deployments and automation scripts',
          'Created reusable component library for faster development',
          'Improved application performance by 35%'
        ],
        technologies: ['Angular', 'React', 'AWS', 'Node.js', 'MongoDB', 'Docker'],
        isCurrent: false
      },
      {
        title: 'Systems Engineer',
        company: 'Infosys Ltd (iCETS)',
        location: 'Pune, Maharashtra',
        duration: 'Jun 2015 – Jun 2017',
        description: 'Worked on MEAN stack projects and Spring MVC applications.',
        achievements: [
          'Developed MEAN stack projects for enterprise clients',
          'Built Spring MVC applications with RESTful APIs',
          'Obtained Docker and Angular certifications',
          'Achieved 92.3% performance rating in training'
        ],
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Express', 'Spring MVC', 'Docker'],
        isCurrent: false
      }
    ]);
  }

  getProjects(): Observable<Project[]> {
    return of([
      {
        name: 'BNext Buyer Portal',
        description: 'A comprehensive buyer portal for BNext platform with advanced features for procurement management and supplier collaboration.',
        category: 'E-commerce',
        technologies: ['Angular', 'Spring Boot', 'MySQL', 'AWS'],
        features: [
          'Multi-tenant architecture',
          'Real-time notifications',
          'Advanced search and filtering',
          'Document management system',
          'Analytics dashboard'
        ],
        liveUrl: 'https://app.bnext.in',
        githubUrl: undefined
      },
      {
        name: 'PosxData Dashboard',
        description: 'Data visualization dashboard for POS analytics with real-time reporting and interactive charts.',
        category: 'Analytics',
        technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
        features: [
          'Real-time data visualization',
          'Interactive charts and graphs',
          'Custom reporting tools',
          'Data export functionality',
          'User role management'
        ],
        liveUrl: 'https://posxdata.io',
        githubUrl: undefined
      },
      {
        name: 'CREDITY Platform',
        description: 'Multinational credit scoring platform with advanced risk assessment algorithms and compliance features.',
        category: 'Fintech',
        technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
        features: [
          'Credit scoring algorithms',
          'Risk assessment models',
          'Compliance reporting',
          'Multi-language support',
          'API integration'
        ],
        liveUrl: undefined,
        githubUrl: undefined
      },
      {
        name: 'Chrono Schema Mapping',
        description: 'Multi-tenant schema mapping tool that reduces data processing time from weeks to hours.',
        category: 'Data Processing',
        technologies: ['Angular', 'Spring Boot', 'MySQL', 'Docker'],
        features: [
          'Multi-tenant architecture',
          'Schema mapping tools',
          'Data validation',
          'Processing automation',
          'Performance monitoring'
        ],
        liveUrl: undefined,
        githubUrl: undefined
      },
      {
        name: 'Mastercard SFTP Portal',
        description: 'Secure file transfer portal for Mastercard with IBM Sterling integration and SSL management.',
        category: 'Financial Services',
        technologies: ['React', 'Spring Boot', 'IBM Sterling', 'Venafi'],
        features: [
          'Secure file transfer',
          'SSL certificate management',
          'IBM Sterling integration',
          'Audit logging',
          'User access control'
        ],
        liveUrl: undefined,
        githubUrl: undefined
      }
    ]);
  }

  getAwards(): Observable<Award[]> {
    return of([
      {
        title: 'Spark of Brilliance Award',
        issuer: 'CRIF',
        year: '2019',
        description: 'Recognized for exceptional performance and innovative contributions to the CREDITY platform development.',
        icon: 'fas fa-award'
      },
      {
        title: 'Pluralsight Angular Expert',
        issuer: 'Pluralsight',
        year: '2018',
        description: 'Achieved expert level certification in Angular development through comprehensive training and assessment.',
        icon: 'fas fa-certificate'
      },
      {
        title: 'Top Performer in Infosys Training',
        issuer: 'Infosys Ltd',
        year: '2015',
        description: 'Achieved 92.3% performance rating in comprehensive training program.',
        icon: 'fas fa-trophy'
      },
      {
        title: 'Best Final Year Project',
        issuer: 'Walchand College of Engineering',
        year: '2015',
        description: 'Received recognition for outstanding final year project in Information Technology.',
        icon: 'fas fa-medal'
      },
      {
        title: 'Chess Competition Winner',
        issuer: 'Multiple Organizations',
        year: 'Multiple Years',
        description: 'Multiple-time winner in various chess competitions demonstrating strategic thinking.',
        icon: 'fas fa-chess'
      },
      {
        title: 'Stack Overflow Electorate Badge',
        issuer: 'Stack Overflow',
        year: '2016',
        description: 'Achieved Electorate badge with 13,805+ reputation and 2.4M+ reach, demonstrating expertise in Angular, JavaScript, and TypeScript.',
        icon: 'fab fa-stack-overflow'
      },
      {
        title: 'Stack Overflow Fanatic Badge',
        issuer: 'Stack Overflow',
        year: '2016',
        description: 'Earned Fanatic badge for visiting Stack Overflow for 100 consecutive days, showing dedication to the developer community.',
        icon: 'fas fa-fire'
      }
    ]);
  }

  getContactInfo(): Observable<ContactInfo> {
    return of({
      email: 'bhushangadekar@yahoo.com',
      phone: '+91 98866 31264',
      linkedin: 'https://www.linkedin.com/in/bhushangadekar01/',
      github: 'https://github.com/Bhushan001',
      stackoverflow: 'https://stackoverflow.com/users/4460894/bhushan-gadekar'
    });
  }

  getProjectThumbnail(category: string): string {
    const thumbnails: { [key: string]: string } = {
      'E-commerce': `
        <svg width="128" height="128" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ecommerceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1" />
              <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6" />
              <stop offset="100%" style="stop-color:#1d4ed8" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#ecommerceGradient)" rx="16"/>
          
          <!-- Shopping Cart -->
          <g transform="translate(40, 60)">
            <circle cx="20" cy="70" r="10" fill="url(#cartGradient)"/>
            <circle cx="70" cy="70" r="10" fill="url(#cartGradient)"/>
            <rect x="15" y="30" width="60" height="50" rx="8" fill="none" stroke="url(#cartGradient)" stroke-width="4"/>
            <rect x="25" y="15" width="40" height="20" rx="4" fill="none" stroke="url(#cartGradient)" stroke-width="3"/>
            <line x1="25" y1="35" x2="65" y2="35" stroke="url(#cartGradient)" stroke-width="2"/>
            <line x1="30" y1="42" x2="60" y2="42" stroke="url(#cartGradient)" stroke-width="2"/>
            <line x1="30" y1="49" x2="60" y2="49" stroke="url(#cartGradient)" stroke-width="2"/>
          </g>
          
          <!-- Price Tags -->
          <g transform="translate(130, 30)">
            <path d="M0,0 L25,0 L30,5 L25,10 L0,10 Z" fill="#8b5cf6"/>
            <circle cx="30" cy="5" r="4" fill="#8b5cf6"/>
            <text x="12" y="7" font-family="Arial" font-size="8" fill="white" text-anchor="middle" font-weight="bold">$</text>
          </g>
          <g transform="translate(140, 50)">
            <path d="M0,0 L20,0 L25,5 L20,10 L0,10 Z" fill="#3b82f6"/>
            <circle cx="25" cy="5" r="3" fill="#3b82f6"/>
            <text x="10" y="7" font-family="Arial" font-size="6" fill="white" text-anchor="middle">%</text>
          </g>
          
          <!-- Product Icons -->
          <g transform="translate(30, 140)">
            <rect x="0" y="0" width="15" height="20" rx="2" fill="#10b981"/>
            <rect x="20" y="0" width="15" height="20" rx="2" fill="#f59e0b"/>
            <rect x="40" y="0" width="15" height="20" rx="2" fill="#ef4444"/>
          </g>
        </svg>
      `,
      'Analytics': `
        <svg width="128" height="128" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.1" />
              <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#10b981" />
              <stop offset="100%" style="stop-color:#059669" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#analyticsGradient)" rx="16"/>
          
          <!-- Bar Chart -->
          <g transform="translate(30, 130)">
            <rect x="0" y="-50" width="12" height="50" fill="url(#chartGradient)" rx="2"/>
            <rect x="20" y="-70" width="12" height="70" fill="#3b82f6" rx="2"/>
            <rect x="40" y="-40" width="12" height="40" fill="url(#chartGradient)" rx="2"/>
            <rect x="60" y="-80" width="12" height="80" fill="#3b82f6" rx="2"/>
            <rect x="80" y="-60" width="12" height="60" fill="url(#chartGradient)" rx="2"/>
            <rect x="100" y="-30" width="12" height="30" fill="#3b82f6" rx="2"/>
            <rect x="120" y="-90" width="12" height="90" fill="url(#chartGradient)" rx="2"/>
          </g>
          
          <!-- Line Chart -->
          <g transform="translate(30, 80)">
            <polyline points="0,20 25,10 50,25 75,5 100,15 125,8 150,20" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="0" cy="20" r="3" fill="#8b5cf6"/>
            <circle cx="25" cy="10" r="3" fill="#8b5cf6"/>
            <circle cx="50" cy="25" r="3" fill="#8b5cf6"/>
            <circle cx="75" cy="5" r="3" fill="#8b5cf6"/>
            <circle cx="100" cy="15" r="3" fill="#8b5cf6"/>
            <circle cx="125" cy="8" r="3" fill="#8b5cf6"/>
            <circle cx="150" cy="20" r="3" fill="#8b5cf6"/>
          </g>
          
          <!-- Pie Chart -->
          <g transform="translate(140, 40)">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#10b981" stroke-width="8" stroke-dasharray="31.4 62.8"/>
            <circle cx="25" cy="25" r="20" fill="none" stroke="#3b82f6" stroke-width="8" stroke-dasharray="15.7 62.8" stroke-dashoffset="31.4"/>
            <circle cx="25" cy="25" r="20" fill="none" stroke="#8b5cf6" stroke-width="8" stroke-dasharray="15.7 62.8" stroke-dashoffset="47.1"/>
          </g>
        </svg>
      `,
      'Fintech': `
        <svg width="128" height="128" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fintechGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.1" />
              <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f59e0b" />
              <stop offset="100%" style="stop-color:#d97706" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#fintechGradient)" rx="16"/>
          
          <!-- Credit Card -->
          <g transform="translate(30, 70)">
            <rect x="0" y="0" width="140" height="80" rx="12" fill="url(#cardGradient)"/>
            <rect x="15" y="20" width="50" height="30" fill="white" rx="4"/>
            <text x="20" y="35" font-family="Arial" font-size="10" fill="#f59e0b" font-weight="bold">CREDIT</text>
            <text x="20" y="55" font-family="Arial" font-size="14" fill="white" font-weight="bold">**** **** **** 1234</text>
            <text x="20" y="70" font-family="Arial" font-size="8" fill="white">VALID THRU 12/25</text>
            <circle cx="120" cy="25" r="8" fill="white"/>
            <circle cx="130" cy="25" r="8" fill="white" opacity="0.7"/>
          </g>
          
          <!-- Dollar Signs -->
          <g transform="translate(150, 30)">
            <circle cx="20" cy="20" r="18" fill="#ef4444"/>
            <text x="20" y="27" font-family="Arial" font-size="18" fill="white" text-anchor="middle" font-weight="bold">$</text>
          </g>
          <g transform="translate(160, 60)">
            <circle cx="15" cy="15" r="12" fill="#f59e0b"/>
            <text x="15" y="20" font-family="Arial" font-size="12" fill="white" text-anchor="middle" font-weight="bold">€</text>
          </g>
          
          <!-- Security Lock -->
          <g transform="translate(40, 30)">
            <rect x="0" y="10" width="20" height="15" rx="2" fill="#10b981"/>
            <rect x="5" y="5" width="10" height="10" rx="5" fill="#10b981"/>
            <circle cx="10" cy="10" r="3" fill="white"/>
          </g>
        </svg>
      `,
      'Data Processing': `
        <svg width="128" height="128" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.1" />
              <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="dbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8b5cf6" />
              <stop offset="100%" style="stop-color:#7c3aed" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#dataGradient)" rx="16"/>
          
          <!-- Database -->
          <g transform="translate(50, 50)">
            <ellipse cx="50" cy="25" rx="50" ry="20" fill="url(#dbGradient)"/>
            <rect x="0" y="25" width="100" height="80" fill="url(#dbGradient)" opacity="0.8"/>
            <ellipse cx="50" cy="105" rx="50" ry="20" fill="url(#dbGradient)"/>
            <line x1="50" y1="45" x2="50" y2="85" stroke="white" stroke-width="3" opacity="0.8"/>
            <line x1="20" y1="55" x2="80" y2="55" stroke="white" stroke-width="1" opacity="0.6"/>
            <line x1="20" y1="65" x2="80" y2="65" stroke="white" stroke-width="1" opacity="0.6"/>
            <line x1="20" y1="75" x2="80" y2="75" stroke="white" stroke-width="1" opacity="0.6"/>
          </g>
          
          <!-- Data Flow Arrows -->
          <g transform="translate(20, 100)">
            <path d="M0,0 L25,0 L20,-5 M25,0 L20,5" stroke="#06b6d4" stroke-width="3" fill="none"/>
            <path d="M0,20 L25,20 L20,15 M25,20 L20,25" stroke="#06b6d4" stroke-width="3" fill="none"/>
          </g>
          <g transform="translate(155, 100)">
            <path d="M0,0 L-25,0 L-20,-5 M-25,0 L-20,5" stroke="#06b6d4" stroke-width="3" fill="none"/>
            <path d="M0,20 L-25,20 L-20,15 M-25,20 L-20,25" stroke="#06b6d4" stroke-width="3" fill="none"/>
          </g>
          
          <!-- Processing Nodes -->
          <g transform="translate(30, 30)">
            <circle cx="10" cy="10" r="8" fill="#06b6d4"/>
            <text x="10" y="14" font-family="Arial" font-size="8" fill="white" text-anchor="middle">1</text>
          </g>
          <g transform="translate(160, 30)">
            <circle cx="10" cy="10" r="8" fill="#06b6d4"/>
            <text x="10" y="14" font-family="Arial" font-size="8" fill="white" text-anchor="middle">2</text>
          </g>
          <g transform="translate(30, 160)">
            <circle cx="10" cy="10" r="8" fill="#06b6d4"/>
            <text x="10" y="14" font-family="Arial" font-size="8" fill="white" text-anchor="middle">3</text>
          </g>
          <g transform="translate(160, 160)">
            <circle cx="10" cy="10" r="8" fill="#06b6d4"/>
            <text x="10" y="14" font-family="Arial" font-size="8" fill="white" text-anchor="middle">4</text>
          </g>
        </svg>
      `,
      'Financial Services': `
        <svg width="128" height="128" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="financialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#059669;stop-opacity:0.1" />
              <stop offset="100%" style="stop-color:#0d9488;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="bankGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#059669" />
              <stop offset="100%" style="stop-color:#047857" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#financialGradient)" rx="16"/>
          
          <!-- Bank Building -->
          <g transform="translate(50, 90)">
            <rect x="0" y="0" width="100" height="70" fill="url(#bankGradient)"/>
            <rect x="10" y="15" width="20" height="25" fill="white" rx="2"/>
            <rect x="40" y="15" width="20" height="25" fill="white" rx="2"/>
            <rect x="70" y="15" width="20" height="25" fill="white" rx="2"/>
            <polygon points="0,0 50,-25 100,0" fill="#0d9488"/>
            <rect x="45" y="5" width="10" height="15" fill="white" rx="2"/>
          </g>
          
          <!-- Security Shield -->
          <g transform="translate(140, 50)">
            <path d="M20,0 L35,5 L35,20 C35,35 20,45 20,45 C20,45 5,35 5,20 L5,5 Z" fill="#059669"/>
            <path d="M15,15 L20,20 L25,15" stroke="white" stroke-width="2" fill="none"/>
            <circle cx="20" cy="10" r="3" fill="white"/>
          </g>
          
          <!-- Charts -->
          <g transform="translate(30, 30)">
            <rect x="0" y="15" width="8" height="15" fill="#10b981" rx="1"/>
            <rect x="12" y="10" width="8" height="20" fill="#10b981" rx="1"/>
            <rect x="24" y="20" width="8" height="10" fill="#10b981" rx="1"/>
          </g>
          
          <!-- Dollar Signs -->
          <g transform="translate(150, 120)">
            <circle cx="15" cy="15" r="12" fill="#f59e0b"/>
            <text x="15" y="20" font-family="Arial" font-size="12" fill="white" text-anchor="middle" font-weight="bold">$</text>
          </g>
          <g transform="translate(170, 140)">
            <circle cx="10" cy="10" r="8" fill="#ef4444"/>
            <text x="10" y="14" font-family="Arial" font-size="8" fill="white" text-anchor="middle" font-weight="bold">€</text>
          </g>
        </svg>
      `
    };

    return thumbnails[category] || thumbnails['Analytics']; // Default to Analytics if category not found
  }
}
