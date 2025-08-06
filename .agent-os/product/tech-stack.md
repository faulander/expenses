# Technical Stack

> Last Updated: 2025-08-06
> Version: 1.0.0

## Application Framework

- **Framework:** SvelteKit 5
- **Version:** 2.16.0
- **Language:** JavaScript with ES6+ modules
- **Syntax:** Svelte 5 Runes ($state, $props, $effect)

## Database

- **Primary Database:** JSON files (expenses_YYYY_MM.json format)
- **Categories Storage:** categories.json file
- **Future Migration:** SQLite (planned)

## JavaScript Framework

- **Framework:** SvelteKit 5
- **Build Tool:** Vite 6.2.6
- **Package Manager:** npm
- **Node Version:** 18+ (Docker uses node:18-alpine)

## CSS Framework

- **Framework:** Tailwind CSS v4.0
- **Plugin:** @tailwindcss/vite 4.0.0
- **Approach:** Utility-first CSS with custom properties for theming

## UI Components

- **Library:** Custom Svelte components
- **Date Picker:** Flatpickr 4.6.13
- **Icons:** Emoji-based (💰 for branding)
- **Theming:** CSS custom properties with dark/light mode

## Import Strategy

- **Strategy:** Node.js ES6 modules
- **Type:** "module" in package.json
- **Alias:** $lib for src/lib imports

## Application Hosting

- **Primary:** Docker deployment
- **Docker Base:** node:18-alpine
- **Port:** 3000 (configurable via PORT env var)
- **Alternative:** Static hosting (Netlify, Vercel) for SSG builds

## Database Hosting

- **Current:** Local JSON files
- **Data Directory:** Configurable via DATA_DIR env var (default: project root)
- **Backup Strategy:** File system backups (JSON files are easily portable)

## Development Tools

- **Dev Server:** Vite dev server on port 5173
- **Preview:** Vite preview on port 4173
- **Adapter:** @sveltejs/adapter-auto 6.0.0
- **Config:** svelte.config.js with Vite plugin

## API Architecture

- **API Routes:** SvelteKit server-side routes
- **Endpoints:** 
  - `/api/expenses` - CRUD operations for expenses
  - `/api/categories` - Category management
- **Data Format:** JSON request/response
- **File Operations:** Node.js fs module for JSON file I/O

## Internationalization

- **Locales:** German (de) and English (en)
- **Date Formatting:** Locale-aware via utils/locale.js
- **Number Parsing:** Supports both German (4,50) and English (4.50) formats
- **Framework:** Custom locale utilities (not i18n library)

## Deployment Options

1. **Docker Deployment (Recommended)**
   - Container: node:18-alpine
   - Volume mounting for data persistence
   - Production-ready with proper build step

2. **Static Hosting**
   - Build target: Static files
   - Platforms: Netlify, Vercel, GitHub Pages
   - Note: Loses server-side API functionality

3. **Node.js Server**
   - Platforms: Railway, Render, DigitalOcean
   - Full SSR and API support
   - Requires Node.js 18+ runtime