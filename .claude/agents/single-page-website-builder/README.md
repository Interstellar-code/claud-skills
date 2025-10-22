# single-page-website-builder

> Expert in building single-page websites using HTML, CSS, and JavaScript

**Category**: Web Development | **Version**: 1.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡⚡ (4/5) |
| **Complexity** | Medium |
| **Token Efficiency** | High |
| **Specialization** | Single-page websites, landing pages |

## Overview

The Single Page Website Builder is a specialist agent designed to create professional, modern single-page websites using vanilla HTML, CSS, and JavaScript. It excels at building landing pages, marketing sites, and portfolio pages with various theme variants.

## Key Features

- **Theme Support**: Light mode, Dark mode, Matrix style, and custom themes
- **Responsive Design**: Mobile-first approach with perfect cross-device compatibility
- **Performance Optimized**: Minimal dependencies, fast load times
- **Accessibility**: WCAG 2.1 AA compliant code
- **Modern CSS**: Flexbox, Grid, CSS variables, animations
- **Vanilla JavaScript**: No frameworks, pure JS for maximum performance

## Use Cases

1. **Landing Pages**: Marketing sites, product launches, SaaS homepages
2. **Portfolio Sites**: Personal portfolios, agency showcases
3. **Event Pages**: Conference sites, webinar landing pages
4. **Theme Variants**: Multiple design themes for A/B testing
5. **Prototypes**: Quick mockups and design prototypes

## Theme Variants

### Light Mode
- Clean, professional design
- White/light gray backgrounds
- High readability
- Business-friendly aesthetic

### Dark Mode
- Modern, eye-friendly design
- Dark backgrounds with vibrant accents
- Perfect for tech/SaaS products
- Reduced eye strain

### Matrix Style
- Retro-futuristic design
- Black and neon green color scheme
- Animated falling code background
- Glitch effects and neon borders

## Output Files

Each build produces:
- `index-{theme}.html` - Complete HTML structure
- `style-{theme}.css` - Theme-specific styling
- `script.js` - Interactive functionality
- `README.md` - Setup and usage instructions

## Installation

This agent is managed by the PM orchestrator (`csprojecttask`). It doesn't require manual installation.

### Usage via PM Orchestrator

```
User: "Build a landing page in dark mode"
PM: [Creates task and launches single-page-website-builder agent]
```

## Technical Specifications

### HTML
- Semantic HTML5 elements
- SEO-optimized meta tags
- Open Graph tags for social sharing
- Accessibility features (ARIA, alt text)

### CSS
- CSS variables for theming
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth transitions and animations
- Cross-browser compatibility

### JavaScript
- Vanilla JS (no frameworks)
- Smooth scrolling navigation
- Interactive components
- Form validation
- Performance optimizations

## Performance Metrics

- **Typical Page Size**: 50-100KB (total)
- **Load Time**: < 1 second on 3G
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## Code Quality

- W3C HTML5 compliant
- BEM methodology for CSS classes
- ESLint-compatible JavaScript
- Clean, well-commented code
- Consistent naming conventions

## Example Output

### Light Mode Landing Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SubsHero - Subscription Analytics</title>
    <link rel="stylesheet" href="style-light.css">
</head>
<body>
    <section class="hero">
        <h1>SubsHero</h1>
        <p>Subscription analytics made simple</p>
        <a href="#cta" class="btn">Get Started</a>
    </section>
    <!-- More sections... -->
    <script src="script.js"></script>
</body>
</html>
```

## Related Agents

- [ui-design-implementer](../ui-design-implementer/README.md) - Implements designs from Figma/Sketch
- [mockup-creation-agent](../mockup-creation-agent/README.md) - Creates design mockups

## Best Practices

1. **Start with Mobile**: Design mobile-first, enhance for desktop
2. **Optimize Images**: Compress and use modern formats (WebP, AVIF)
3. **Minimize Dependencies**: Use vanilla JS when possible
4. **Test Accessibility**: Use screen readers and keyboard navigation
5. **Performance First**: Keep total page size under 100KB

## Troubleshooting

### Common Issues

**Issue**: Layout breaks on mobile
**Solution**: Check viewport meta tag and use mobile-first CSS

**Issue**: JavaScript not working
**Solution**: Ensure script.js is loaded after DOM elements

**Issue**: Theme colors not applying
**Solution**: Verify CSS variables are defined in :root

## Future Enhancements

- [ ] Support for more theme variants (Neon, Minimalist, Retro)
- [ ] Built-in performance optimization tools
- [ ] Automatic accessibility testing
- [ ] Integration with design systems
- [ ] Animation library presets

## Version History

### 1.0.0 (2025-10-22)
- Initial release
- Light, Dark, and Matrix theme support
- Responsive design patterns
- State file integration
- PM orchestrator compatibility

---

**Maintainer**: PM Orchestrator (csprojecttask)
**Status**: Active
**Last Updated**: 2025-10-22
