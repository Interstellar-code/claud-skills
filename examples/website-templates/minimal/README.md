# Minimalist Clean Landing Page Template

Ultra-minimal, Swiss design-inspired landing page template with typography-focused layout and maximum whitespace.

## Design Philosophy

**Swiss Design Principles:**
- Grid-based layout system
- Typography as primary visual element
- Generous whitespace
- Minimal color palette (Black, White, Red accent)
- Clean, rational structure
- No unnecessary ornamentation

## Features

- **Ultra-Minimal Design**: Clean, distraction-free interface
- **Typography-Focused**: Large, bold typography with Helvetica-based font stack
- **Fully Responsive**: Mobile-first design with seamless tablet/desktop scaling
- **Grid-Based Layout**: Precise, mathematical grid system
- **Single Accent Color**: Strategic use of red for CTAs and highlights
- **Vanilla JavaScript**: No dependencies, lightweight, fast loading
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels
- **Performance Optimized**: Minimal CSS/JS, fast page load

## Color Palette

```css
Black:       #000000 (Primary text, borders)
White:       #ffffff (Background)
Red:         #ef4444 (Accent, CTAs)
Gray Light:  #f5f5f5 (Hover states)
Gray Dark:   #737373 (Secondary text)
```

## Typography

- **Font Family**: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif
- **Hero Title**: 3-6rem (clamp responsive)
- **Section Titles**: 2.5-4rem (clamp responsive)
- **Body Text**: 1rem base, 1.6 line-height
- **Letter Spacing**: Tight (-0.04em to -0.02em for headings)

## File Structure

```
minimal/
├── index.html          # Clean semantic HTML5
├── style.css           # Swiss design CSS (grid, typography)
├── script.js           # Minimal vanilla JavaScript
└── README.md           # This file
```

## Sections

1. **Navigation**: Fixed header with minimal links, mobile hamburger menu
2. **Hero**: Large typography, split grid layout, clear CTA
3. **Features**: 2-column grid with numbered features (01-04)
4. **Pricing**: 3-column pricing cards with featured highlight
5. **Testimonials**: 2-column testimonial quotes
6. **CTA**: Final call-to-action with large typography
7. **Footer**: Minimal footer with links and copyright

## Customization

### Change Colors

Edit CSS variables in `style.css`:

```css
:root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-red: #ef4444;    /* Change accent color */
}
```

### Adjust Spacing

Modify spacing variables:

```css
:root {
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 8rem;
}
```

### Typography Scale

Adjust font sizes for sections:

```css
.hero__title {
    font-size: clamp(3rem, 8vw, 6rem);  /* min, preferred, max */
}
```

### Grid Layout

Customize grid columns:

```css
.hero__grid {
    grid-template-columns: 1fr 1fr;  /* 50/50 split */
}

.features__grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns */
}
```

## Responsive Breakpoints

- **Desktop**: 1200px+ (default)
- **Tablet**: 768px and below
- **Mobile**: 480px and below

## Performance Metrics

- **HTML Size**: ~6KB
- **CSS Size**: ~10KB
- **JavaScript Size**: ~4KB
- **Total Size**: ~20KB (uncompressed)
- **Load Time**: < 100ms (local)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels on navigation and interactive elements
- Keyboard navigation support
- Focus indicators on interactive elements
- Skip links for screen readers
- High contrast ratio (WCAG AAA)
- Responsive text sizing

## Usage

1. **Clone or download** the template files
2. **Open index.html** in a browser to preview
3. **Customize content** in HTML file
4. **Adjust styling** in CSS file
5. **Deploy** to your hosting platform

## Deployment

This template works with any static hosting:

- **GitHub Pages**: Push to gh-pages branch
- **Netlify**: Drag & drop folder
- **Vercel**: Connect repository
- **Cloudflare Pages**: Connect Git repo
- **Traditional hosting**: Upload via FTP

## License

MIT License - Free to use for personal and commercial projects.

## Credits

- Design inspired by Swiss Design principles (Josef Müller-Brockmann, Massimo Vignelli)
- Built with vanilla HTML, CSS, JavaScript
- No external dependencies or frameworks

## Support

For issues or questions, please open an issue in the repository.

---

**Version**: 1.0.0
**Last Updated**: 2025-10-23
**Template Type**: Minimalist Clean (Swiss Design)
