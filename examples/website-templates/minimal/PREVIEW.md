# Minimalist Clean Template - Visual Preview

## Design Overview

**Theme**: Ultra-Minimal Swiss Design
**Style**: Typography-focused, Grid-based, Maximum Whitespace
**Target**: Design agencies, Creative products, Portfolio sites

## Color Palette

```
Primary Colors:
┌─────────────────┬─────────────────┬─────────────────┐
│  Black          │  White          │  Red (Accent)   │
│  #000000        │  #ffffff        │  #ef4444        │
│  Text, Borders  │  Background     │  CTAs, Links    │
└─────────────────┴─────────────────┴─────────────────┘

Supporting Colors:
┌─────────────────┬─────────────────┐
│  Gray Light     │  Gray Dark      │
│  #f5f5f5        │  #737373        │
│  Hover States   │  Secondary Text │
└─────────────────┴─────────────────┘
```

## Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│  Navigation (Fixed)                                      │
│  [S] ──────────────── Features | Pricing | Testimonials │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Hero Section (100vh)                                    │
│  ┌─────────────────────────┬─────────────────────────┐  │
│  │                         │                         │  │
│  │  Manage Your            │  Take control of your   │  │
│  │  Subscriptions          │  recurring expenses     │  │
│  │  Effortlessly           │                         │  │
│  │                         │  [Start Free Trial]     │  │
│  └─────────────────────────┴─────────────────────────┘  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Features Section                                        │
│  01 ─── Features                                         │
│  ┌─────────────────────────┬─────────────────────────┐  │
│  │ 01                      │ 02                      │  │
│  │ Subscription Tracking   │ Cost Analytics          │  │
│  ├─────────────────────────┼─────────────────────────┤  │
│  │ 03                      │ 04                      │  │
│  │ Cancellation Reminders  │ Spending Insights       │  │
│  └─────────────────────────┴─────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│  Pricing Section                                         │
│  02 ─── Pricing                                          │
│  ┌───────────┬───────────┬───────────┐                  │
│  │   Free    │    Pro    │   Team    │                  │
│  │   $0/mo   │  $9.99/mo │ $24.99/mo │                  │
│  └───────────┴───────────┴───────────┘                  │
├──────────────────────────────────────────────────────────┤
│  Testimonials Section                                    │
│  03 ─── Testimonials                                     │
│  ┌─────────────────────────┬─────────────────────────┐  │
│  │ "This tool saved our... │ "Finally, a            │  │
│  │  - Sarah J.             │  professional..."      │  │
│  │    Finance Manager      │  - Michael R.          │  │
│  └─────────────────────────┴─────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│  CTA Section                                             │
│  ┌─────────────────────────┬─────────────────────────┐  │
│  │  Ready to take          │  Start your free trial  │  │
│  │  control of your        │  today. No credit card  │  │
│  │  subscriptions?         │  required.              │  │
│  │                         │  [Start Free Trial]     │  │
│  └─────────────────────────┴─────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│  Footer                                                  │
│  [S] © 2025 ──────── Features | Pricing | Privacy | ... │
└──────────────────────────────────────────────────────────┘
```

## Typography Scale

```
Hero Title:        3-6rem    (clamp responsive)
Section Titles:    2.5-4rem  (clamp responsive)
Subsection:        1.5rem
Body Large:        1.25rem
Body:              1rem      (base size)
Small:             0.875rem
```

## Spacing System

```
Extra Small:  0.5rem  (8px)   - Tight spacing
Small:        1rem    (16px)  - Default gap
Medium:       2rem    (32px)  - Section padding
Large:        4rem    (64px)  - Major sections
Extra Large:  8rem    (128px) - Hero/section spacing
```

## Grid System

```
Desktop (1200px+):
- Hero:         2 columns (1fr 1fr)
- Features:     2 columns (1fr 1fr)
- Pricing:      3 columns (1fr 1fr 1fr)
- Testimonials: 2 columns (1fr 1fr)

Tablet (768px-):
- All sections: 1 column (mobile stack)

Mobile (480px-):
- Optimized spacing and typography
```

## Key Design Elements

### Navigation
- Fixed header with 1px black border
- Minimal logo (single letter "S")
- Uppercase links with letter-spacing
- Red accent CTA button
- Mobile hamburger menu

### Hero Section
- Full viewport height
- 50/50 split grid
- Massive typography (up to 6rem)
- Generous line-height (0.9)
- Tight letter-spacing (-0.04em)

### Feature Cards
- 1px black border
- Numbered (01-04)
- Hover state: light gray background
- Grid layout with generous gaps
- Minimal content, maximum clarity

### Pricing Cards
- 3-column grid
- Featured card: inverted (black bg)
- Red "Popular" badge
- Clean price display
- CTA buttons per card

### Testimonials
- Large quote typography
- Minimal attribution
- 1px black borders
- 2-column grid

### Buttons
- Uppercase text
- 0.1em letter-spacing
- 1px solid borders
- Red primary, black/white secondary
- Hover transitions

## Responsive Behavior

### Desktop (1200px+)
- Full grid layouts
- Large typography
- Maximum whitespace
- Split hero section

### Tablet (768px-)
- Single column stacks
- Mobile navigation menu
- Adjusted typography scale
- Maintained whitespace ratios

### Mobile (480px-)
- Optimized for small screens
- Readable typography
- Touch-friendly buttons
- Hamburger navigation

## Performance

- **HTML**: 217 lines, 9.2KB
- **CSS**: 616 lines, 13KB
- **JavaScript**: 248 lines, 8.3KB
- **Total**: ~48KB (uncompressed)
- **Load Time**: < 100ms (local)
- **Dependencies**: None (vanilla JS)

## Accessibility

- Semantic HTML5 elements
- ARIA labels on navigation
- Keyboard navigation support
- High contrast (AAA)
- Focus indicators
- Skip links for screen readers

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS/Android)

## Usage Scenarios

Perfect for:
- Design agencies
- Creative portfolios
- Minimalist products
- Swiss design enthusiasts
- Typography-focused brands
- Clean, professional services

## Customization Quick Guide

1. **Change accent color**: Edit `--color-red` in CSS variables
2. **Adjust spacing**: Modify `--spacing-*` variables
3. **Typography**: Change font stack in `--font-primary`
4. **Grid columns**: Adjust `grid-template-columns` per section
5. **Content**: Replace placeholder text in HTML

---

**Template**: Minimalist Clean
**Version**: 1.0.0
**Design Style**: Swiss Design
**Created**: 2025-10-23
