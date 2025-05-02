# PWA Implementation Guide for Your Portfolio

This guide explains how to implement the Progressive Web App (PWA) features in your portfolio website.

## Files Overview

1. `manifest.json` - Web App Manifest that defines how your app appears when installed
2. `service-worker.js` - Service Worker for offline functionality and caching
3. `pwa.js` - Script to register the service worker and handle "Add to Home Screen" functionality
4. `offline.html` - Offline fallback page
5. `icons-generator.js` - Helper script to generate app icons from your profile picture

## Implementation Steps

1. **Copy the new files to your repository**
   - Add all the files to your GitHub repository

2. **Update your index.html**
   - Replace your current index.html with the updated version or manually add the PWA meta tags and links

3. **Generate Icons**
   - Create an `icons` folder in your repository
   - Either run the icons-generator.js script with Node.js or manually create icons
   - You can use online tools like https://app-manifest.firebaseapp.com/ to generate icons

4. **Test Your PWA**
   - Deploy your site to GitHub Pages
   - Use Chrome DevTools > Application > Manifest to verify your PWA setup
   - Test installation by clicking the install icon in Chrome's address bar

## Features Added

- **Offline Access**: Your portfolio will work even without an internet connection
- **Installable**: Users can add your portfolio to their home screen
- **App-like Experience**: Full-screen mode without browser UI when launched from home screen
- **Improved Performance**: Assets are cached for faster loading

## Troubleshooting

If your PWA isn't working as expected:

1. Check Chrome DevTools > Application > Service Workers to ensure registration
2. Verify your manifest in Chrome DevTools > Application > Manifest
3. Use Lighthouse audit (in Chrome DevTools > Lighthouse) to identify PWA issues
