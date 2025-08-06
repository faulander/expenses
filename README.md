# 💰 Plemperer - Personal Expense Tracker

A modern, responsive expense tracking application built with SvelteKit 5. Track your daily expenses with ease, featuring dark/light mode, internationalization support, and a clean, intuitive interface.

## 🌟 Features

- **💸 Expense Management**: Add, edit, and track your daily expenses
- **📅 Smart Date Handling**: Integrated date picker with locale support
- **🏷️ Category Management**: Organize expenses with customizable categories
- **🌍 Internationalization**: German and English locale support for dates and currency
- **🌙 Dark/Light Mode**: Toggle between themes with system preference detection
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **💰 Smart Amount Input**: Supports both English (4.50) and German (4,50) number formats
- **✏️ Edit Functionality**: Modify existing expenses with one click
- **📊 Monthly Organization**: Expenses are organized by month for easy tracking
- **💾 File-based Storage**: Simple JSON file storage (no database required)

## 🛠️ Tech Stack

### Frontend

- **[SvelteKit 5](https://svelte.dev/)** - Modern web framework with runes
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Flatpickr](https://flatpickr.js.org/)** - Lightweight date picker

### Backend

- **[SvelteKit API Routes](https://kit.svelte.dev/docs/routing#server)** - Server-side API endpoints
- **Node.js File System** - JSON file-based data storage

### Development Tools

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **JavaScript/ES6+** - Modern JavaScript features
- **CSS Custom Properties** - For theming and dark mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd plemperer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   npm run dev -- --open  # Opens browser automatically
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - The app will create necessary data files automatically

## 📁 Project Structure

```
plemperer/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable Svelte components
│   │   │   ├── DatePicker.svelte
│   │   │   ├── ExpenseForm.svelte
│   │   │   ├── ExpensesTable.svelte
│   │   │   ├── MonthPicker.svelte
│   │   │   └── ThemeToggle.svelte
│   │   ├── stores/              # Svelte stores
│   │   │   └── theme.js
│   │   └── utils/               # Utility functions
│   │       ├── locale.js
│   │       ├── dataDirectory.js # Data directory utilities
│   │       └── migration.js     # Data migration utilities
│   ├── routes/                  # SvelteKit routes
│   │   ├── api/                 # API endpoints
│   │   │   ├── categories/
│   │   │   └── expenses/
│   │   ├── +layout.svelte       # Global layout
│   │   └── +page.svelte         # Main page
│   ├── hooks.server.js          # Server-side hooks (migration)
│   ├── app.html                 # HTML template
│   └── app.css                  # Global styles
├── static/                      # Static assets
├── data/                        # 📂 Data directory (configurable)
│   ├── categories.json          # Categories data
│   └── expenses_YYYY_MM.json    # Monthly expense data
└── package.json
```

### Data Directory

All application data is stored in the `./data/` directory by default. This can be customized using the `DATA_DIR` environment variable for flexible deployment scenarios.

## 🚀 Deployment

### 1. Direct Deployment (Static)

Build the application for static deployment:

```bash
npm run build
```

The built files will be in the `build` directory. Deploy to any static hosting service:

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository and deploy automatically
- **GitHub Pages**: Use GitHub Actions to deploy the `build` folder

### 2. Node.js Server Deployment

For server-side functionality (API routes), deploy to a Node.js hosting service:

```bash
# Build the application
npm run build

# Start the production server
npm run preview
```

**Recommended platforms:**

- **Vercel** (automatic SvelteKit support)
- **Netlify** (with serverless functions)
- **Railway**
- **Render**
- **DigitalOcean App Platform**

### 3. Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["node", "build"]
```

Build and run:

```bash
# Build the Docker image
docker build -t plemperer .

# Run the container with data volume mount
docker run -p 3000:3000 -v $(pwd)/data:/app/data plemperer
```

### 4. Docker Compose

Use the provided `docker-compose.yml`:

```yaml
services:
  plemperer:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data          # Mount local data directory
    environment:
      - NODE_ENV=production
      - DATA_DIR=/app/data        # Optional: customize data directory path
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
# Port for the application (default: 5173 in dev, 4173 in preview)
PORT=3000

# Data directory path (default: ./data)
# Can be absolute (/custom/path) or relative (./custom-data)
DATA_DIR=./data
```

#### DATA_DIR Configuration

The `DATA_DIR` environment variable allows you to customize where application data is stored:

- **Default**: `./data` (relative to project root)
- **Absolute paths**: `/custom/absolute/path`
- **Relative paths**: `./custom-data` or `../shared/data`
- **Docker**: Set to `/app/data` and use volume mounts for persistence

**Examples:**

```bash
# Development with custom data directory
DATA_DIR=./my-expenses npm run dev

# Production with absolute path
DATA_DIR=/var/lib/plemperer npm start

# Docker with environment variable
docker run -e DATA_DIR=/app/data -v ./data:/app/data plemperer
```

### Categories

Edit `data/categories.json` to customize expense categories:

```json
[
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Other"
]
```

**Note**: The categories file will be automatically created in your configured data directory on first run.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run prepare` - Prepare SvelteKit
- `npm test` - Run test suite
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once

### Code Style

The project follows standard JavaScript/Svelte conventions:

- Use Svelte 5 runes (`$state`, `$props`, `$effect`)
- Follow Tailwind CSS utility-first approach
- Use semantic HTML and proper accessibility attributes

### Adding New Features

1. **Components**: Add new components in `src/lib/components/`
2. **API Routes**: Create new endpoints in `src/routes/api/`
3. **Utilities**: Add helper functions in `src/lib/utils/`
4. **Styling**: Use Tailwind classes and CSS custom properties

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Data files not created**

   - Ensure write permissions in the data directory
   - The application will automatically create the data directory and files
   - Check your `DATA_DIR` environment variable if using a custom path

3. **Date picker not working**

   - Ensure Flatpickr is properly installed
   - Check browser console for JavaScript errors

4. **Dark mode not persisting**
   - Check if localStorage is available
   - Ensure JavaScript is enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS approach
- [Flatpickr](https://flatpickr.js.org/) for the date picker component
- The Svelte community for continuous inspiration

---

**Made with ❤️ and ☕ by Harald Fauland**

> 💡 **Tip**: Star this repository if you found it helpful!
