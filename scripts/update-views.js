#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const viewsFilePath = path.join(__dirname, '../src/assets/data/profile-views.json');

function updateViews(newCount) {
  const data = {
    views: newCount,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(viewsFilePath, JSON.stringify(data, null, 2));
  console.log(`✅ Updated profile views to: ${newCount}`);
  console.log(`📅 Last updated: ${data.lastUpdated}`);
}

function getCurrentViews() {
  try {
    const data = JSON.parse(fs.readFileSync(viewsFilePath, 'utf8'));
    console.log(`📊 Current profile views: ${data.views}`);
    console.log(`📅 Last updated: ${data.lastUpdated}`);
    return data.views;
  } catch (error) {
    console.log('❌ No views file found, starting with 0');
    return 0;
  }
}

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === 'get') {
  getCurrentViews();
} else if (command === 'set' && args[1]) {
  const newCount = parseInt(args[1]);
  if (isNaN(newCount)) {
    console.log('❌ Please provide a valid number');
    process.exit(1);
  }
  updateViews(newCount);
} else if (command === 'increment') {
  const currentViews = getCurrentViews();
  updateViews(currentViews + 1);
} else {
  console.log('Usage:');
  console.log('  node scripts/update-views.js get                    - Get current views');
  console.log('  node scripts/update-views.js set <number>           - Set views to specific number');
  console.log('  node scripts/update-views.js increment              - Increment views by 1');
}
