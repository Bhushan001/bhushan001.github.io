# Bhushan Gadekar - Portfolio

A modern, responsive portfolio website built with Angular 19, Tailwind CSS, and GSAP animations.

## 🚀 Features

- **Modern Design**: Clean and professional portfolio design
- **Responsive**: Fully responsive across all devices
- **Animations**: Smooth GSAP animations for enhanced user experience
- **Performance**: Optimized for fast loading and smooth interactions
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: Angular 19
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock)
- **Icons**: Font Awesome
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/bhushan001/bhushan001.github.io.git
cd bhushan001.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## 🚀 Deployment

### Automatic Deployment (Recommended)

This project is configured with GitHub Actions for automatic deployment to GitHub Pages. Simply push to the `main` branch and the site will be automatically deployed.

### Manual Deployment

1. Build the project for production:
```bash
npm run build:prod
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── about/
│   │   ├── awards/
│   │   ├── contact/
│   │   ├── experience/
│   │   ├── footer/
│   │   ├── hero/
│   │   ├── projects/
│   │   └── skills/
│   ├── shared/
│   │   ├── models/
│   │   ├── pipes/
│   │   └── services/
│   └── app.component.*
├── assets/
│   ├── icons/
│   ├── images/
│   └── scss/
└── styles.scss
```

## 🎨 Customization

### Colors and Styling
The project uses Tailwind CSS for styling. You can customize colors, spacing, and other design tokens in the `tailwind.config.js` file.

### Content
Update the content in the respective component files:
- `hero.component.ts` - Hero section content
- `about.component.ts` - About section content
- `experience.component.ts` - Experience section content
- `projects.component.ts` - Projects section content
- `skills.component.ts` - Skills section content
- `awards.component.ts` - Awards section content
- `contact.component.ts` - Contact information

### Images
Replace images in the `src/assets/images/` directory with your own images.

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm run test` - Run unit tests
- `npm run deploy` - Deploy to GitHub Pages

### Code Style

This project follows Angular best practices and uses:
- TypeScript for type safety
- SCSS for component styling
- Tailwind CSS for utility classes
- Angular modules for component organization

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Bhushan Gadekar - [LinkedIn](https://linkedin.com/in/bhushangadekar) - bhushangadekar@example.com

Project Link: [https://github.com/bhushan001/bhushan001.github.io](https://github.com/bhushan001/bhushan001.github.io)
