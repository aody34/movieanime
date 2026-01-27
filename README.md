# 🎬 StreamVerse - Cinematic Streaming Experience

> **A competition-winning React.js website with premium GSAP animations, delivering a Netflix/Crunchyroll-level streaming experience.**

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12.4-88CE02?logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel&logoColor=white)

## 🏆 Competition Features

### Cinematic Hero Experience
- **Letterbox Opening** - Movie-style black bars slide away on load
- **Video Background** - Fullscreen cinematic video with dark overlay
- **Floating Text** - Content follows mouse cursor (parallax effect)
- **Particles & Scanlines** - Film grain texture for authentic cinema feel

### Advanced GSAP Animations
- **ScrollTrigger** - Bidirectional animations (scroll up & down)
- **Stagger Reveals** - Cards animate one-by-one with `back.out` bounce
- **Magnetic Buttons** - CTAs pull toward cursor with elastic effect
- **3D Card Tilt** - Movie cards respond to mouse position with glow

### Premium Loading Screen
- **Animated Counter** - 0% → 100% with smooth easing
- **Pulsing Glow Rings** - Double ring expansion effect
- **Circle Wipe Exit** - Dramatic reveal transition

### Single-Page Navigation
- **Smooth Scroll** - GSAP ScrollToPlugin for buttery navigation
- **Active Section Detection** - Navbar highlights current section
- **Blurred Glass Navbar** - `backdrop-filter: blur()` over video

## ✨ All Features

| Feature | Description |
|---------|-------------|
| 🎬 Cinematic Hero | Letterbox intro, particles, Ken Burns zoom |
| 🃏 3D Movie Cards | Tilt, scale, glow effects on hover |
| 📜 Scroll Animations | Bidirectional entry/exit for all elements |
| 🖱️ Custom Cursor | Expands on hover, changes for play buttons |
| 🧲 Magnetic Buttons | Elastic pull effect on CTAs |
| ⏳ Loading Screen | Counter, particles, circle wipe |
| 📱 Fully Responsive | Mobile, tablet, desktop optimized |
| 🌙 Dark Theme | Premium glassmorphism design |
| ⚡ Performance | Low-end device detection, lazy loading |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/aody34/movieanime.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/           # Glass navbar with active section
│   ├── HeroSection/      # Cinematic video hero
│   ├── MovieCard/        # 3D animated cards
│   ├── CardSlider/       # Horizontal scroll with arrows
│   ├── ContentSection/   # Grid layout with stagger
│   ├── VideoPreview/     # YouTube trailer embeds
│   ├── MagneticButton/   # Cursor-following buttons
│   ├── CustomCursor/     # GSAP cursor follower
│   ├── LoadingScreen/    # Animated intro loader
│   └── Footer/           # Animated footer
├── pages/
│   └── Home.jsx          # Single-page layout
├── data/
│   └── mockData.js       # Movie/anime content
├── styles/
│   └── index.css         # Global styles & variables
├── App.jsx               # Main app component
└── main.jsx              # Entry point
```

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI components with hooks |
| **GSAP 3.12** | ScrollTrigger, animations |
| **Vite 5** | Fast build tool |
| **Vercel** | Deployment |

## 🎯 Animation Breakdown

### ScrollTrigger Configuration
```javascript
toggleActions: 'play reverse play reverse'
// = play on enter, reverse on leave, repeat behavior
```

### Card Stagger Effect
```javascript
stagger: 0.08,
ease: 'back.out(1.7)'
// = bouncy one-by-one reveal
```

### Mouse Parallax
```javascript
gsap.to(content, {
    x: mouseX * 20,
    y: mouseY * 15,
    duration: 1,
    ease: 'power2.out'
});
```

## 🔗 Live Demo

**[View on Vercel →](https://movieanime.vercel.app)**

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

<p align="center">
  Made with ❤️ for Movie & Anime lovers<br>
  <strong>Built for the $50 Competition 🏆</strong>
</p>
