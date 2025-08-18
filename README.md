# Bhushan Portfolio

A modern, responsive portfolio website built with Angular and Tailwind CSS.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Beautiful animations and transitions
- **Profile Views Counter**: Track worldwide profile views
- **GitHub Pages Deployment**: Automatic deployment via GitHub Actions

## Profile Views System

The portfolio includes a profile views counter that tracks worldwide visits. The system uses a local JSON file for persistence and includes tools for easy management.

### How it works:

1. **Local Storage**: Each user's browser stores their visit count locally
2. **JSON File**: The global count is stored in `src/assets/data/profile-views.json`
3. **Daily Limit**: Each user can only increment the count once per day
4. **Manual Updates**: Use npm scripts to manually update the global count

### Managing Profile Views:

```bash
# Get current view count
npm run views:get

# Set view count to a specific number
npm run views:set 100

# Increment view count by 1
npm run views:increment
```

### Files:
- `src/assets/data/profile-views.json` - Stores the global view count
- `src/app/shared/services/profile-views.service.ts` - Service for managing views
- `scripts/update-views.js` - Utility script for manual updates

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build:prod

# Deploy to GitHub Pages
npm run deploy
```

## Deployment

The portfolio is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

Visit: https://bhushan001.github.io
