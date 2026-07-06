# @qwertyuii7 // Mayank Chaudhary — Advanced MERN Stack Developer & Student

A state-of-the-art, high-performance, and interactive developer portfolio built with modern web technologies. Featuring rich aesthetics, 3D scroll animations, frosted glassmorphism navigation, interactive pendulum physics, and a custom dual-theme engine.

---

## ✨ Key Features

- **🖥️ 3D MacBook Scroll Showcase**: Dynamic scroll-driven 3D MacBook perspective animation displaying an integrated GitHub profile showcase.
- **💎 Frosted Glassmorphism Navigation**: An intelligent resizable pill navbar with real-time backdrop blur, auto-collapsing logo/mode indicators on scroll, and a responsive slide-in side navigation drawer for mobile devices.
- **🎴 Interactive Pendulum Hire Badge**: A custom physics-driven lanyard ID card (`<HangingDevCard />`) that swings, responds to drag gestures, and remains pinned across responsive layouts.
- **🌗 Dual-Theme Architecture**: Instant switching between **Night Mode** (sleek, high-contrast dark aesthetic) and **Draft Mode** (warm, editorial paper-journal aesthetic) with tailored color palettes and CSS variable tokenization.
- **⚡ Blazing Fast Performance**: Powered by Vite 7, React 19, and Tailwind CSS for instant hot-module replacement and optimized production bundles.

---

## 🛠️ Technology Stack

- **Core**: [React 19](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) · [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) · Custom Vanilla CSS Token System
- **Animations & UI**: [Framer Motion](https://www.framer.com/motion/) · [Aceternity UI](https://ui.aceternity.com/) · Lucide Icons
- **Physics & Effects**: Custom DOM Physics & Canvas Animations

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/qwertyuii7/octo-portfolio.git
   cd octo-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application live.

### Building for Production

To create an optimized, minified production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
├── public/
│   └── assets/               # Static showcase assets & combined profile imagery
├── src/
│   ├── components/           # Core layout sections & UI components
│   │   ├── ui/               # Aceternity UI components (resizable navbar, macbook scroll)
│   │   ├── Navigation.tsx    # Intelligent responsive navigation & side drawer
│   │   ├── HangingDevCard.tsx # Physics-driven interactive developer lanyard badge
│   │   ├── HeroSection.tsx   # Minimalist hero showcase with 3D MacBook display
│   │   └── AboutSection.tsx  # Bento grid layout & scroll-docked macbook landing
│   ├── data/                 # Mock data, project lists & GitHub profile metadata
│   ├── styles.css            # Design system tokens, glassmorphism rules & themes
│   ├── App.tsx               # Root application wrapper & section routing
│   └── main.tsx              # React DOM entry point
├── components.json           # Shadcn / Aceternity UI configuration
├── tailwind.config.ts        # Tailwind CSS styling extensions & custom breakpoints
└── vite.config.ts            # Vite bundler configuration
```

---

## 🌐 Connect with Me

- **GitHub**: [@qwertyuii7](https://github.com/qwertyuii7)
- **Role**: MERN Stack Developer & Student

---

*Designed and engineered with precision and modern aesthetics.*
