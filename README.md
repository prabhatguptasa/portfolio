# Prabhat Gupta - Portfolio Website

A creative, interactive portfolio website showcasing my journey as a Senior Software Engineer, built with React and HeroUI.

## Features

- 🎨 **Modern Design**: Beautiful UI built with HeroUI components and Tailwind CSS
- 🎯 **Interactive Challenges**: Solve coding puzzles and technical challenges
- 🗺️ **Journey Tour**: Interactive timeline showcasing my 8+ year career journey
- 📱 **Responsive**: Fully responsive design for all devices
- ⚡ **Fast**: Built with Vite for optimal performance
- 🎭 **Animations**: Smooth animations using Framer Motion

## Tech Stack

- **React 18** - Latest React version
- **HeroUI** - Beautiful React component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Vite** - Next-generation frontend tooling
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

**Note:** All packages are updated to their latest versions compatible with Node 24, including Tailwind CSS v4 which is required by HeroUI.

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── About.jsx          # About section with skills
│   │   ├── Challenges.jsx     # Interactive coding challenges
│   │   ├── Contact.jsx        # Contact form and information
│   │   ├── Experience.jsx    # Work experience timeline
│   │   ├── Hero.jsx           # Hero section
│   │   ├── JourneyTour.jsx    # Interactive journey tour modal
│   │   └── Navigation.jsx     # Navigation bar
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Key Features Explained

### Journey Tour
An interactive modal that guides visitors through my career journey from 2017 to present. Features:
- Auto-play functionality
- Step-by-step navigation
- Visual timeline with achievements
- Progress tracking

### Interactive Challenges
Visitors can solve coding puzzles and technical challenges related to:
- Code patterns
- AWS architecture
- Python programming
- GraphQL queries

Points are awarded for correct answers, encouraging engagement.

### Contact Form
A beautiful contact form with validation, allowing visitors to reach out directly.

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
themes: {
  light: {
    colors: {
      primary: "#0ea5e9",
      secondary: "#8b5cf6",
    },
  },
  dark: {
    colors: {
      primary: "#38bdf8",
      secondary: "#a78bfa",
    },
  },
}
```

### Content
Update the content in each component file:
- `src/components/Hero.jsx` - Hero section content
- `src/components/About.jsx` - About section and skills
- `src/components/Experience.jsx` - Work experience
- `src/components/Challenges.jsx` - Challenge questions
- `src/components/Contact.jsx` - Contact information

## Deployment

### Vercel
1. Push your code to GitHub
2. Import your repository on Vercel
3. Deploy with default settings

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### GitHub Pages
1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## License

This project is open source and available under the MIT License.

## Contact

- **Email**: prabhug22@gmail.com
- **LinkedIn**: [linkedin.com/in/prabhat-gupta](https://www.linkedin.com/in/prabhat-gupta)
- **Website**: prabhatgupta.in
- **Phone**: +91 8989516041

---

Built with ❤️ by Prabhat Gupta
