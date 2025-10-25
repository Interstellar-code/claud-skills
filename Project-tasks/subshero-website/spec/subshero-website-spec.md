# SubsHero Website - Landing Page Development

**Three self-contained website versions for subscription management platform**

---

## Overview

Create three versions of the SubsHero.com landing page as self-contained single-file websites (HTML, CSS, JavaScript). Version 1 will be a clean, minimal landing page. Version 2 will be an enhanced version with additional interactive features and animations. Version 3 will be a dark theme variant of Version 2 with optimized colors for dark mode.

All versions should capture the essence of SubsHero's subscription management platform with proper branding, color scheme, and messaging from the original website.

---

## Goals & Objectives

- Create three standalone, production-ready landing pages
- Maintain SubsHero's brand identity (colors, messaging, tone)
- Build responsive, mobile-first designs
- Ensure fast load times (< 2 seconds)
- Provide clear call-to-action for subscription management
- Demonstrate professional web development standards
- Showcase both light and dark theme capabilities

---

## Features / Functionality

### Version 1: Simple Landing Page (Priority: High)

**Core Sections**:
1. **Hero Section**
   - Main headline: "SubsHero manages your subscriptions from all the platforms under a single dashboard"
   - Subheading with value proposition
   - Primary CTA button (yellow with dark text)
   - Hero image or illustration placeholder
   - Acceptance Criteria:
     - Above-the-fold content loads instantly
     - CTA button is prominently visible
     - Responsive on mobile, tablet, desktop

2. **Features Section**
   - 4-6 feature cards with icons
   - Features to highlight:
     - Automated subscription management
     - Reminder setup functionality
     - Subscription cancellation assistance
     - Re-subscription management
     - Centralized dashboard
   - Acceptance Criteria:
     - Cards arranged in grid (2 cols mobile, 3-4 cols desktop)
     - Icons are clear and relevant
     - Descriptions are concise (1-2 sentences)

3. **Benefits Section**
   - "Why SubsHero?" or similar heading
   - 3-4 key benefits with supporting text
   - Visual elements (icons or images)
   - Acceptance Criteria:
     - Benefits are clearly differentiated
     - Layout is scannable and clean

4. **CTA Section**
   - Secondary call-to-action
   - Email signup form or "Get Started" button
   - Acceptance Criteria:
     - Form validates email format
     - Button has hover effects
     - Mobile-friendly input fields

5. **Footer**
   - Newsletter signup (optional)
   - Social media links placeholder
   - Copyright notice
   - Basic navigation links
   - Acceptance Criteria:
     - Footer sticks to bottom
     - Links are functional (can be #anchors)

**Design Requirements**:
- Clean, modern aesthetic
- Proper spacing and typography
- Smooth scrolling between sections
- Accessible (WCAG 2.1 AA minimum)

---

### Version 2: Enhanced Landing Page (Priority: Medium)

**Additional Features Beyond Version 1**:

1. **Advanced Hero Section**
   - Animated headline (fade-in or typewriter effect)
   - Background gradient or subtle animation
   - Video background option (muted, looping)
   - Acceptance Criteria:
     - Animations are smooth (60fps)
     - Video (if used) doesn't impact load time significantly
     - Animations can be disabled (prefers-reduced-motion)

2. **Interactive Features Showcase**
   - Tabbed interface or carousel for features
   - Hover effects on feature cards (lift, shadow, etc.)
   - Icon animations on scroll
   - Acceptance Criteria:
     - Tabs/carousel work without JavaScript errors
     - Touch-friendly on mobile
     - Keyboard navigable

3. **Statistics/Social Proof Section**
   - Animated counters (e.g., "10,000+ subscriptions managed")
   - Testimonials or trust badges
   - Partner logos (placeholder)
   - Acceptance Criteria:
     - Counters animate only when visible (Intersection Observer)
     - Section adds credibility

4. **FAQ Accordion**
   - 5-8 common questions
   - Smooth expand/collapse animations
   - One question open at a time
   - Acceptance Criteria:
     - Accordion is fully accessible (keyboard, screen readers)
     - Animations are smooth

5. **Advanced Footer**
   - Multi-column layout
   - Quick links to sections (smooth scroll)
   - Social media icons with hover effects
   - Newsletter signup with validation
   - Acceptance Criteria:
     - Footer is well-organized
     - All links functional

6. **Interactive Elements**:
   - Smooth scroll to sections
   - Back-to-top button (appears after scroll)
   - Navbar that becomes sticky on scroll
   - Mobile hamburger menu
   - Acceptance Criteria:
     - All interactive elements work smoothly
     - No layout shift or jank

**Performance Enhancements**:
- Lazy loading for images
- Optimized animations (CSS transforms)
- Minimal JavaScript for interactivity
- Critical CSS inlined

---

### Version 3: Dark Theme Enhanced (Priority: Medium)

**Same Features as Version 2, Plus**:

1. **Dark Color Scheme**
   - Inverted color palette optimized for dark mode
   - Proper contrast ratios for WCAG compliance in dark theme
   - Reduced eye strain with softer contrasts
   - Acceptance Criteria:
     - Text contrast ratio > 7:1 for AAA compliance
     - No pure white (#FFFFFF) text (use softer whites)
     - All colors comfortable for extended viewing

2. **Dark Theme Optimizations**
   - Yellow accent adjusted for dark backgrounds
   - Shadows replaced with subtle glows
   - Border colors adjusted for dark theme
   - Images/icons with dark-friendly styling
   - Acceptance Criteria:
     - Yellow CTA buttons remain vibrant and accessible
     - Card shadows visible but not harsh
     - All sections clearly separated visually

3. **Theme-Specific Enhancements**
   - Gradient overlays optimized for dark backgrounds
   - Icon colors adjusted for dark theme
   - Hover effects that work well in dark mode
   - Optional: Theme toggle button (light/dark switch)
   - Acceptance Criteria:
     - All interactive elements clearly visible
     - Hover states provide clear feedback
     - Theme toggle (if included) persists preference

4. **Typography Adjustments**
   - Slightly reduced font weights for dark theme
   - Adjusted letter spacing for better readability
   - Softer text colors (off-white instead of pure white)
   - Acceptance Criteria:
     - Text is comfortable to read for extended periods
     - Headings stand out clearly
     - No harsh contrast causing eye strain

**Dark Theme Design Guidelines**:
- Use #0D1117 or similar for main background
- Use #1C2128 for cards/elevated surfaces
- Text: #E6EDF3 (soft white) for primary, #8B949E for secondary
- Accent yellow: #FFD63C (same) but may need slight adjustments
- Borders: Use subtle borders (#30363D) instead of shadows where appropriate

---

## Technical Constraints

### All Three Versions Must:
- Be **self-contained single HTML files** (CSS and JS inline or embedded)
- Use **vanilla JavaScript only** (no frameworks like React, Vue)
- Be **framework-free CSS** (no Bootstrap, Tailwind - custom CSS only)
- Load in **under 2 seconds** on 3G connection
- Work on **all modern browsers** (Chrome, Firefox, Safari, Edge)
- Be **mobile-responsive** (320px minimum width)
- Use **semantic HTML5** elements
- Be **accessibility compliant** (WCAG 2.1 AA)
- Have **no external dependencies** (fonts can be Google Fonts CDN)

### Color Palette - Light Theme (Version 1 & 2):
```css
/* Primary Colors */
--color-primary: #004547;        /* Dark teal */
--color-accent: #FFD63C;         /* Bright yellow */
--color-secondary: #0A3638;      /* Light blue */

/* Backgrounds */
--color-bg-light: #F3FEFF;       /* Light cyan */
--color-bg-lighter: #F7FAFC;     /* Light gray */
--color-white: #FFFFFF;

/* Text */
--color-text-dark: #2C2F32;      /* Dark gray */
--color-text-medium: #2D3748;    /* Medium gray */

/* Accent Hover */
--color-accent-hover: #FFBE00;   /* Darker yellow */
```

### Color Palette - Dark Theme (Version 3):
```css
/* Primary Colors */
--color-primary: #0A9396;        /* Bright teal (lighter than light theme) */
--color-accent: #FFD63C;         /* Bright yellow (same, works well) */
--color-secondary: #005F73;      /* Medium teal */

/* Backgrounds */
--color-bg-dark: #0D1117;        /* Main dark background */
--color-bg-elevated: #161B22;    /* Cards/elevated surfaces */
--color-bg-subtle: #1C2128;      /* Subtle backgrounds */

/* Text */
--color-text-light: #E6EDF3;     /* Soft white (primary text) */
--color-text-muted: #8B949E;     /* Muted gray (secondary text) */
--color-text-subtle: #6E7681;    /* Subtle gray (tertiary) */

/* Borders & Dividers */
--color-border: #30363D;         /* Subtle borders */
--color-border-muted: #21262D;   /* Very subtle dividers */

/* Accent Hover */
--color-accent-hover: #FFBE00;   /* Darker yellow */

/* Shadows (use glows instead) */
--glow-accent: rgba(255, 214, 60, 0.15);  /* Yellow glow */
--glow-primary: rgba(10, 147, 150, 0.15); /* Teal glow */
```

### Typography:
- Headings: Sans-serif (System font stack or Google Font)
- Body: Sans-serif, 16px base, 1.6 line-height
- Ensure readability on all devices

### File Structure:
```
Version 1: subshero-landing-v1.html        (single file - Simple Light)
Version 2: subshero-landing-v2.html        (single file - Enhanced Light)
Version 3: subshero-landing-v3-dark.html   (single file - Enhanced Dark)
```

---

## Success Criteria

### Version 1 (Simple):
- [ ] Single HTML file with embedded CSS and JS
- [ ] All 5 sections implemented (Hero, Features, Benefits, CTA, Footer)
- [ ] Responsive on mobile (320px), tablet (768px), desktop (1024px+)
- [ ] Loads in under 2 seconds
- [ ] No console errors
- [ ] Color scheme matches SubsHero brand
- [ ] CTA buttons functional with hover effects
- [ ] Clean, professional design
- [ ] Accessibility: keyboard navigable, proper heading hierarchy

### Version 2 (Enhanced):
- [ ] All Version 1 requirements met
- [ ] Single HTML file with embedded CSS and JS
- [ ] Animations smooth and performant (60fps)
- [ ] FAQ accordion working without errors
- [ ] Interactive elements (tabs/carousel, back-to-top, sticky nav) functional
- [ ] Statistics/counters animate on scroll
- [ ] Mobile hamburger menu working
- [ ] Lazy loading implemented for images
- [ ] Respects prefers-reduced-motion
- [ ] No accessibility regressions
- [ ] File size < 200KB (HTML + inline assets)

### Version 3 (Dark Theme):
- [ ] All Version 2 requirements met
- [ ] Dark color scheme implemented throughout
- [ ] Text contrast ratio > 7:1 (AAA compliance)
- [ ] Yellow accent buttons remain vibrant and accessible
- [ ] No pure white text (use soft whites #E6EDF3)
- [ ] Card backgrounds clearly elevated from main background
- [ ] Borders visible but subtle (#30363D)
- [ ] Hover effects work well in dark theme
- [ ] Icons and images adjusted for dark backgrounds
- [ ] Shadows replaced with subtle glows where appropriate
- [ ] Theme is comfortable for extended viewing (no eye strain)
- [ ] Optional: Theme toggle functional if included
- [ ] File size < 200KB (HTML + inline assets)

---

## Deliverables

### Primary Deliverables:
1. **subshero-landing-v1.html** - Simple light theme (self-contained)
2. **subshero-landing-v2.html** - Enhanced light theme (self-contained)
3. **subshero-landing-v3-dark.html** - Enhanced dark theme (self-contained)
4. **README.md** - Documentation with:
   - Feature comparison table (v1 vs v2 vs v3)
   - Browser compatibility notes
   - How to customize/deploy
   - Performance metrics
   - Accessibility notes
   - Dark theme design notes

### Secondary Deliverables (Optional):
- Screenshots of all three versions (desktop + mobile)
- Performance audit results (Lighthouse scores for each version)
- Side-by-side comparison images (light vs dark theme)

---

## Content Guidelines

### Headline & Messaging:
- **Main headline**: "SubsHero manages your subscriptions from all the platforms under a single dashboard"
- **Alternative headlines** (choose one):
  - "Never miss a subscription again"
  - "All your subscriptions, one dashboard"
  - "Take control of your subscriptions"

### Feature Descriptions:
1. **Automated Management**: "Manage all subscriptions from Netflix, Spotify, Adobe, and more in one place"
2. **Smart Reminders**: "Get notified before renewals, trials end, or price changes"
3. **Easy Cancellation**: "Cancel unwanted subscriptions with one click, no hassle"
4. **Re-subscription**: "Easily reactivate paused or cancelled subscriptions"
5. **Centralized Dashboard**: "See all your subscriptions, spending, and upcoming charges at a glance"
6. **Cost Tracking**: "Track monthly, yearly spending and find savings opportunities"

### Call-to-Action Text:
- Primary CTA: "Get Started Free" or "Start Managing Now"
- Secondary CTA: "See How It Works" or "Watch Demo"

---

## Design Reference

### Layout Inspiration:
- Clean, modern SaaS landing page style
- Cards with rounded corners (8px border-radius)
- Subtle shadows on cards (box-shadow: 0 4px 6px rgba(0,0,0,0.1))
- Generous white space between sections
- Smooth transitions on interactive elements

### Button Styles (Light Theme):
```css
/* Primary CTA */
background: #FFD63C;
color: #2C2F32;
padding: 14px 32px;
border-radius: 6px;
font-weight: 600;
transition: background 0.3s ease;

/* Hover */
background: #FFBE00;
transform: translateY(-2px);
box-shadow: 0 6px 12px rgba(255, 214, 60, 0.4);
```

### Button Styles (Dark Theme):
```css
/* Primary CTA */
background: #FFD63C;
color: #0D1117;  /* Dark background color for contrast */
padding: 14px 32px;
border-radius: 6px;
font-weight: 600;
transition: all 0.3s ease;

/* Hover */
background: #FFBE00;
transform: translateY(-2px);
box-shadow: 0 0 24px rgba(255, 214, 60, 0.4);  /* Glow effect instead of drop shadow */
```

### Section Spacing:
- Section padding: 80px 0 (desktop), 60px 0 (mobile)
- Container max-width: 1200px
- Container padding: 0 24px (mobile), 0 48px (desktop)

---

## Timeline (Optional)

- **Day 1-2**: Version 1 development and testing
- **Day 3-4**: Version 2 development and enhancement
- **Day 5**: Version 3 dark theme development
- **Day 6**: Final testing, accessibility audit, documentation
- **Total Duration**: 6 days maximum

---

## References & Context

### Original Website:
- URL: https://subshero.com
- Design inspiration and brand colors extracted from live site

### Design Assets:
- Use icon libraries like Heroicons, Feather Icons, or FontAwesome (CDN)
- Placeholder images from Unsplash or similar (via CDN)

### Accessibility Standards:
- WCAG 2.1 Level AA: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM Checklist: https://webaim.org/standards/wcag/checklist

---

## Open Questions

1. **Email Signup**:
   - Should the email form be functional (submit to backend)?
   - Or just client-side validation with console log?
   - **Recommendation**: Client-side validation + console log for demo

2. **Video Background** (Version 2):
   - Should we include actual video or placeholder?
   - **Recommendation**: Placeholder with note on how to add video

3. **Social Media Links**:
   - Should links go to SubsHero's actual social profiles?
   - Or just be # placeholders?
   - **Recommendation**: # placeholders with comment where to add real URLs

4. **Testimonials** (Version 2 & 3):
   - Use real testimonials if available or create placeholder content?
   - **Recommendation**: Placeholder testimonials with realistic names/companies

5. **Analytics**:
   - Should we include Google Analytics placeholder?
   - **Recommendation**: Add commented-out GA code template

6. **Theme Toggle** (Version 3):
   - Should Version 3 include a theme toggle switch (light/dark)?
   - Or should it be purely dark theme only?
   - **Recommendation**: Pure dark theme only (keep versions separate for clarity)

---

## Acceptance Testing Checklist

### Functional Testing:
- [ ] All buttons clickable and have hover effects
- [ ] Forms validate input (email format)
- [ ] Smooth scrolling to sections works
- [ ] Back-to-top button appears after scroll
- [ ] Mobile menu opens/closes correctly (v2)
- [ ] FAQ accordion expands/collapses (v2)
- [ ] Tabs/carousel work smoothly (v2)

### Responsive Testing:
- [ ] Test on 320px (small mobile)
- [ ] Test on 375px (iPhone)
- [ ] Test on 768px (tablet)
- [ ] Test on 1024px (small desktop)
- [ ] Test on 1920px (large desktop)
- [ ] No horizontal scrolling at any breakpoint

### Performance Testing:
- [ ] Lighthouse Performance score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Total file size < 200KB

### Accessibility Testing:
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Screen reader friendly (test with NVDA/VoiceOver)
- [ ] Color contrast ratio > 4.5:1 for text
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] ARIA attributes used correctly

### Browser Testing:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Notes for Developer

### Best Practices:
- Use CSS Grid and Flexbox for layouts (not floats)
- Mobile-first CSS (start with mobile, add desktop with @media)
- Use CSS custom properties (variables) for colors
- Minimize JavaScript - prefer CSS for animations
- Comment code sections clearly
- Use semantic HTML (header, nav, main, section, article, footer)

### Example Structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SubsHero - Manage All Your Subscriptions</title>
    <style>
        /* CSS Variables */
        :root { --color-primary: #004547; ... }

        /* Reset & Base Styles */
        /* Layout Styles */
        /* Component Styles */
        /* Responsive Styles */
    </style>
</head>
<body>
    <!-- Header/Nav -->
    <!-- Hero Section -->
    <!-- Features Section -->
    <!-- Benefits Section -->
    <!-- CTA Section -->
    <!-- Footer -->

    <script>
        // Vanilla JavaScript for interactivity
    </script>
</body>
</html>
```

---

**Spec Version**: 1.1.0
**Created**: 2025-10-25
**Updated**: 2025-10-25 (Added Version 3 - Dark Theme)
**Target Agent**: single-page-website-builder
**Estimated Effort**: 3-4 days (all three versions)
