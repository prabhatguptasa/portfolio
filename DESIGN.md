# Prabhat Gupta Portfolio - Design System

## Typography
- **Sans**: 'Inter', 'system-ui', 'sans-serif'
- **Mono**: 'Fira Code', 'monospace'
- **Display**: 'Space Grotesk', 'sans-serif'
- **Serif**: 'Playfair Display', 'serif'
- **Heading**: 'Poppins', 'sans-serif'

Font sizes are fluid using `clamp()` logic based on viewport width. Headings are prominent and bold with tight letter spacing. Body text is readable and light.

## Colors
The app supports both light and dark modes (indicated by `class` in Tailwind).
- **Primary**: Accentuate calls to actions, highlights.
- **Background**: `hsl(var(--background))`
- **Foreground**: `hsl(var(--foreground))`
- **Muted**: `hsl(var(--muted))` for secondary text

## Visual Style & Effects
- Dark, neural-interface inspired aesthetics.
- Extensive use of blur effects (`backdrop-blur-md`, `blur-2xl`, etc.).
- Subtle gradient backgrounds (`bg-gradient-radial`) and grid patterns with low opacity (`bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)...]`).
- Glowing animations on text and orbs (e.g., `animate-pulse`, `animate-gradient-x`).
- Buttons often have geometric, outline styles (`btn-outline`, `rounded-none`) with hover effects that fill the background or reveal borders.
- Badges with pinging dots to signify "live" or active status (e.g., `NEURAL_INTERFACE_ACTIVE`).
- "Glassmorphism" cards with subtle borders (`border-primary/10`) and translucent backgrounds (`bg-base-200/20`).
- Weather-based theme transitions overlay varying color gradients on the entire layout.

## Layout & Spacing
- Centered container layouts (`max-w-7xl`, `max-w-5xl`, etc.).
- Sections typically take up at least full viewport height (`min-h-screen`) and use generous padding (`py-20 md:py-32 px-6`).
