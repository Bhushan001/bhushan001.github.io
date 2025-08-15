# Bhushan Gadekar - Portfolio Website

A modern, responsive portfolio website built with Angular 19, Tailwind CSS, and SCSS. Features smooth animations, dark/light mode toggle, and a comprehensive showcase of skills, experience, and projects.

## 🚀 Features

- **Modern Design**: Clean, professional design with Tailwind CSS
- **Responsive**: Fully responsive across all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: GSAP animations for enhanced user experience
- **Interactive Components**: Hover effects, progress bars, and dynamic content
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Accessibility**: WCAG compliant with proper focus states and screen reader support

## 🛠️ Tech Stack

- **Frontend Framework**: Angular 19
- **Styling**: Tailwind CSS + SCSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18.19.1 or higher)
- **npm** (v9.0.0 or higher)
- **Angular CLI** (v19.0.0 or higher)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bhushan-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/` to view the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── hero/           # Hero section with animated text
│   │   ├── about/          # About section with personal info
│   │   ├── skills/         # Skills showcase with progress bars
│   │   ├── experience/     # Professional experience timeline
│   │   ├── projects/       # Project portfolio with filtering
│   │   ├── awards/         # Awards and certifications
│   │   ├── contact/        # Contact form and information
│   │   └── footer/         # Footer with social links
│   ├── shared/
│   │   ├── models/         # TypeScript interfaces
│   │   └── services/       # Data services
│   └── app.component.*     # Main app component
├── assets/
│   ├── images/             # Project images and icons
│   └── scss/              # Global SCSS files
└── styles.scss            # Global styles with Tailwind
```

## 🎨 Customization

### Colors and Theme
The color scheme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... other shades
        900: '#1e3a8a',
      }
    }
  }
}
```

### Content Updates
Update the portfolio content in `src/app/shared/services/portfolio.service.ts`:

- Personal information
- Skills and proficiency levels
- Work experience
- Projects
- Awards and certifications
- Contact information

### Styling
Custom styles can be added in:
- Component-specific `.scss` files
- Global styles in `src/styles.scss`
- Tailwind classes in templates

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

The dark mode toggle is implemented with:
- CSS custom properties for theme colors
- Local storage persistence
- System preference detection
- Smooth transitions between themes

## ⚡ Performance Optimization

- **Lazy Loading**: Components load on demand
- **Image Optimization**: Optimized images and placeholders
- **Code Splitting**: Automatic code splitting by Angular
- **Minification**: Production builds are minified
- **Caching**: Proper cache headers for static assets

## 🚀 Deployment

### Build for Production
```bash
ng build --configuration production
```

### Deploy to GitHub Pages
1. Install Angular CLI GitHub Pages package:
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. Build and deploy:
   ```bash
   ng build --configuration production --base-href "https://yourusername.github.io/repository-name/"
   ngh --dir=dist/bhushan-portfolio
   ```

### Deploy to Netlify
1. Build the project:
   ```bash
   ng build --configuration production
   ```

2. Upload the `dist/bhushan-portfolio` folder to Netlify

### Deploy to Vercel
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## 🔧 Development Commands

```bash
# Start development server
ng serve

# Build for production
ng build --configuration production

# Run tests
ng test

# Lint code
ng lint

# Generate component
ng generate component components/component-name

# Generate service
ng generate service services/service-name
```

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: bhushangadekar@yahoo.com
- **LinkedIn**: [Bhushan Gadekar](https://www.linkedin.com/in/bhushangadekar01/)
- **GitHub**: [Bhushan001](https://github.com/Bhushan001)
- **Stack Overflow**: [Bhushan Gadekar](https://stackoverflow.com/users/4460894/bhushan-gadekar)

## 🙏 Acknowledgments

- [Angular](https://angular.io/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography

---

**Built with ❤️ by Bhushan Gadekar**
