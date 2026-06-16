# 🚀 Portfolio

A modern, responsive personal portfolio website built with **Angular 21**, **Tailwind CSS**, and **TypeScript**. Showcasing projects, skills, and contact information with smooth animations and a sleek dark theme.

## ✨ Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Navigation**: Custom smooth scroll animations with fixed header navigation
- **Standalone Components**: Built using Angular's latest standalone component architecture
- **Dark Theme**: Modern dark UI with gradient accents using Tailwind CSS
- **Fast & Lightweight**: Optimized performance with Vite and modern web standards
- **Accessible**: Semantic HTML and ARIA-compliant navigation
- **Type-Safe**: Full TypeScript support with strict mode enabled
- **Unit Tests**: Comprehensive test coverage with Vitest

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 21.0.0 | Frontend framework |
| **TypeScript** | 5.9.2 | Type-safe programming |
| **Tailwind CSS** | 4.1.12 | Utility-first styling |
| **Vitest** | 4.0.8 | Unit testing |
| **Bootstrap Icons** | 1.13.1 | Icon library |
| **RxJS** | 7.8.0 | Reactive programming |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout/              # Header & Footer components
│   │   ├── header/         # Navigation with smooth scrolling
│   │   └── footer/         # Footer section
│   ├── features/           # Page sections
│   │   ├── home/          # Hero section
│   │   ├── about-me/      # About section
│   │   ├── projects/      # Projects showcase
│   │   └── contact/       # Contact form
│   ├── core/              # Services & models
│   │   ├── services/
│   │   └── models/
│   └── shared/            # Reusable components & pipes
├── styles.css             # Global styles with Tailwind
└── main.ts               # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 11.6.2 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/steinerHD/Portafolio.git
cd portafolio
```

2. Install dependencies
```bash
npm install
```

### Development Server

Start the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application automatically reloads when you modify source files.

### Build for Production

```bash
npm run build
```

Build artifacts are stored in the `dist/` directory. The production build optimizes your application for performance and speed.

### Run Unit Tests

Execute tests with Vitest:
```bash
npm test
```

## 🎨 Key Features Explained

### Smooth Scroll Navigation
- Custom `requestAnimationFrame` animation for smooth scrolling
- Fixed header with dynamic styling based on scroll position
- Mobile-responsive hamburger menu with animations

### Responsive Grid Layout
- Mobile-first approach with Tailwind breakpoints
- Optimized for all screen sizes
- Touch-friendly interactive elements

### Performance Optimization
- Lazy loading of images and components
- Optimized CSS with Tailwind purging
- Minimal JavaScript bundle size

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on `localhost:4200` |
| `npm run build` | Build for production |
| `npm run watch` | Watch mode for development |
| `npm test` | Run unit tests |
| `ng generate component <name>` | Generate new component |

## 🔧 Configuration Files

- **angular.json** - Angular CLI configuration
- **tsconfig.json** - TypeScript compiler options
- **tailwind.config.js** - Tailwind CSS customization
- **.postcssrc.json** - PostCSS configuration

## 📦 Dependencies

### Production
- `@angular/*` - Core Angular packages
- `tailwindcss` - Utility-first CSS framework
- `bootstrap-icons` - Icon set
- `rxjs` - Reactive programming library

### Development
- `typescript` - JavaScript superset with types
- `vitest` - Unit test framework
- `postcss` - CSS transformations

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created with ❤️ by [Steiner Herrera](https://github.com/steinerHD)

## 📞 Support

For support, email soportestein1oficial@gmail.com or create an issue on GitHub.

---

**Built with Angular CLI** version 21.0.4
