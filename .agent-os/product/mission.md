# Product Mission

> Last Updated: 2025-08-06
> Version: 1.0.0

## Pitch

Plemperer is a minimalistic personal expense tracker that prioritizes speed and comfort over features, helping individuals track their daily expenses without complexity or bells and whistles.

## Users

### Primary Customers

- **Individual Users**: Personal finance enthusiasts who want simple expense tracking
- **Minimalists**: Users who prefer clean, uncluttered interfaces over feature-heavy applications

### User Personas

**The Practical Tracker** (25-45 years old)
- **Role:** Working professional or student
- **Context:** Wants to monitor spending without complex budgeting tools
- **Pain Points:** Complicated expense apps with too many features, slow data entry, poor mobile experience
- **Goals:** Quick expense entry, easy categorization, monthly expense overview

**The Privacy-Conscious User** (30-50 years old)
- **Role:** Various professions
- **Context:** Prefers local data storage over cloud-based solutions
- **Pain Points:** Data privacy concerns with cloud expense trackers, subscription fees
- **Goals:** Complete data control, offline functionality, simple deployment

## The Problem

### Overcomplicated Expense Tracking

Most expense tracking applications are bloated with features like budgeting tools, investment tracking, and bank integrations that many users don't need. This complexity slows down the primary task: quickly recording an expense.

**Our Solution:** Focus exclusively on expense entry, categorization, and monthly organization with a lightning-fast interface.

### Poor Mobile Experience

Many expense trackers have clunky mobile interfaces that make quick expense entry frustrating when you're on the go.

**Our Solution:** Responsive design optimized for mobile-first expense entry with touch-friendly controls.

### Data Privacy and Control Concerns

Users worry about uploading financial data to third-party services and paying monthly subscription fees.

**Our Solution:** Local JSON file storage with optional Docker deployment for complete data ownership.

## Differentiators

### Speed Over Features

Unlike comprehensive financial apps like Mint or YNAB, we provide lightning-fast expense entry without budgeting complexity. This results in users actually tracking expenses consistently.

### File-Based Simplicity

Unlike database-driven applications, we use simple JSON files for storage. This results in easier backups, data portability, and zero database configuration.

### True Minimalism

Unlike "simple" apps that still have dozens of features, we genuinely focus on core expense tracking. This results in a clean interface that never overwhelms users.

## Key Features

### Core Features

- **Lightning-Fast Expense Entry:** Optimized form with smart amount parsing and quick category selection
- **Monthly Organization:** Automatic expense grouping by month with easy navigation between periods
- **Flexible Categories:** Pre-defined categories with ability to add custom categories on-the-fly
- **Smart Date Handling:** Integrated date picker with German/English locale support

### User Experience Features

- **Dark/Light Mode:** System preference detection with manual toggle option
- **Responsive Design:** Mobile-first design that works seamlessly on all device sizes
- **Smart Number Input:** Supports both English (4.50) and German (4,50) number formats
- **Edit Functionality:** One-click expense editing with smooth form pre-population

### Technical Features

- **File-Based Storage:** Simple JSON files - no database setup required
- **Docker Support:** One-command deployment with volume mounting for data persistence
- **RESTful API:** Clean API structure for potential future integrations
- **Internationalization:** German and English locale support for dates and formatting