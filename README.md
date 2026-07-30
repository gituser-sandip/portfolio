# Portfolio React + Tailwind Conversion

This is a React + Tailwind CSS conversion of the original portfolio website, maintaining the same UI, theme, and functionality.

## Project Structure

```
src/
├── App.jsx          # Main app component with all sections
├── main.jsx         # React entry point
└── index.css        # Global styles with Tailwind and custom animations

public/
├── images/          # Portfolio images
├── assets/          # CV and other assets
└── js/              # Old JS files (can be removed)

```

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

## Features Preserved

✓ Dark/Light theme toggle with localStorage persistence
✓ Smooth scroll navigation with active link highlighting
✓ Mobile responsive design
✓ Contact form with email fallback
✓ Hero animations and transitions
✓ Progress bars for skills
✓ All original sections (About, Journey, Skills, Projects, Services, Contact)
✓ Tailwind CSS styling
✓ Font Awesome icons
✓ Hero background effects

## What Changed

- **Framework**: Static HTML → React (Vite)
- **Styling**: Custom CSS → Tailwind CSS + custom animations
- **State Management**: DOM manipulation → React hooks (useState, useEffect)
- **Interactivity**: Vanilla JS → React event handlers
- **Build Tool**: None → Vite for fast development

## Notes

- All content, copy, and design remain identical
- Theme colors and animations preserved
- Backend endpoint: `http://127.0.0.1:8000/api/contact`
- Images and assets stored in `/public` folder
