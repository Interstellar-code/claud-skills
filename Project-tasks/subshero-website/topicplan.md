# SubsHero Website - Topic Plan

**Topic ID**: subshero-website
**Created**: 2025-10-25
**Status**: Phase 1 - Requirements Analysis
**Estimated Duration**: 3-4 days

---

## Phase 1: Requirements Analysis ✅

### Project Overview

Build three self-contained, production-ready landing pages for SubsHero subscription management platform:
- **Version 1**: Simple light theme landing page
- **Version 2**: Enhanced light theme with animations and interactivity
- **Version 3**: Enhanced dark theme variant

### Key Requirements Extracted

#### 1. Technical Constraints (All Versions)
- ✅ **Self-contained single HTML files** (CSS and JS inline)
- ✅ **Vanilla JavaScript only** (no frameworks)
- ✅ **Framework-free CSS** (no Bootstrap/Tailwind)
- ✅ **Load time**: < 2 seconds on 3G
- ✅ **Browser support**: Chrome, Firefox, Safari, Edge (latest)
- ✅ **Mobile-responsive**: 320px minimum width
- ✅ **Semantic HTML5** elements
- ✅ **WCAG 2.1 AA** accessibility compliance
- ✅ **File size**: < 200KB per file

#### 2. Version 1 - Simple Landing Page (High Priority)

**Sections Required**:
1. **Hero Section**
   - Headline: "SubsHero manages your subscriptions from all the platforms under a single dashboard"
   - Subheading with value proposition
   - Yellow CTA button (#FFD63C with dark text)
   - Hero image/illustration placeholder
   - Mobile/tablet/desktop responsive

2. **Features Section**
   - 4-6 feature cards with icons
   - Grid layout (2 cols mobile, 3-4 cols desktop)
   - Features: Automated management, Smart reminders, Easy cancellation, Re-subscription, Centralized dashboard, Cost tracking

3. **Benefits Section**
   - "Why SubsHero?" heading
   - 3-4 key benefits with icons/images
   - Scannable, clean layout

4. **CTA Section**
   - Secondary call-to-action
   - Email signup form with validation
   - Mobile-friendly inputs

5. **Footer**
   - Newsletter signup (optional)
   - Social media links (placeholders)
   - Copyright notice
   - Basic navigation links

**Design Requirements - Matrix Style**:
- **Matrix aesthetic**: Digital rain effect, green monochrome palette with neon accents
- **Color palette**:
  - Primary: Matrix green (#00FF41, #008F11, #003B00)
  - Background: Deep black (#000000, #0D0208)
  - Accent: Neon green (#39FF14) for highlights
  - CTA: Matrix green glow effect instead of yellow
  - Text: Phosphor green (#00FF41) on dark backgrounds
- **Typography**:
  - Monospace/tech fonts (e.g., "Courier New", "Monaco", "Consolas")
  - Scanline/CRT effect (subtle)
  - Text shadow with green glow
- **Visual Effects**:
  - Falling code/digital rain background (subtle, performance-optimized)
  - Glitch effects on hover (minimal, respects motion preferences)
  - Terminal/console-inspired UI elements
  - Grid lines and wireframe aesthetics
  - Subtle screen flicker effect
- **Animations**: Smooth scrolling with fade-in effects
- **Atmosphere**: Cyberpunk, high-tech, mysterious but professional

#### 3. Version 2 - Enhanced Landing Page (Medium Priority)

**Additional Features Beyond V1 (Matrix Enhanced)**:
1. **Advanced Hero - Matrix Edition**
   - Typewriter/decoding effect for headline (like Matrix code decryption)
   - Digital rain background (falling green characters)
   - Glitch effect on CTA button hover
   - Matrix-style "Wake up, Neo" messaging theme
   - Respects prefers-reduced-motion

2. **Interactive Features - Cyberpunk Style**
   - Terminal/console-style tabbed interface for features
   - Hover effects: Neon green glow, scanline sweep
   - Icon animations: Glitch-in effect on scroll
   - Touch-friendly, keyboard navigable
   - Wireframe animations

3. **Statistics/Social Proof - Matrix Data Stream**
   - Animated counters with digital odometer effect
   - Terminal-style testimonial cards
   - Partner logos with scan-line reveal effect
   - "System stats" presentation

4. **FAQ Accordion - Terminal Interface**
   - 5-8 common questions in console-style format
   - Command-line expand/collapse ("> question" format)
   - Green cursor blink animation
   - Accessible (keyboard, screen readers)

5. **Advanced Footer - System Panel**
   - Multi-column layout with grid lines
   - Quick links with Matrix code hover reveal
   - Social icons with neon green glow
   - Newsletter styled as "Access Code" input
   - Terminal prompt aesthetic

6. **Interactive Elements - Cyberpunk UI**
   - Sticky navbar with scan-line effect on scroll
   - Back-to-top button (Matrix "↑" symbol with green glow)
   - Mobile hamburger menu with glitch animation
   - No layout shift/jank
   - Cursor trail effect (optional, subtle)

**Performance (Matrix Optimizations)**:
- Lazy loading for images
- Optimized CSS animations (transforms, GPU-accelerated)
- Minimal JavaScript (digital rain using requestAnimationFrame)
- Critical CSS inlined
- Canvas-based effects for performance
- Throttled scroll listeners

#### 4. Version 3 - "Redpill" Variant (Alternative Matrix Theme)

**Alternative Matrix Color Scheme**:
- **Primary background**: Pure black (#000000)
- **Code rain**: Brighter Matrix green (#00FF41)
- **Text**: High-contrast green (#39FF14)
- **Elevated surfaces**: Very dark green (#001A00, #002B00)
- **Borders**: Neon green glow (#00FF41 with opacity)
- **CTA buttons**: Red pill theme (deep red #8B0000 with glow)
- **Accent option**: Blue pill alternative (electric blue #00D9FF)

**Redpill Variant Requirements**:
- Text contrast ratio > 7:1 (WCAG AAA)
- Stronger green intensity for "deeper in the Matrix" feel
- More intense digital rain effect
- Red/blue pill themed CTAs ("Take the Red Pill" vs "Take the Blue Pill")
- Glitch effects more pronounced
- Scanline CRT effect more visible
- "System breach" aesthetic
- Comfortable for extended viewing with option to reduce effects
- Typography: Sharper, more digital

### Deliverables

**Primary (Matrix Editions)**:
1. `subshero-landing-v1-matrix.html` - Simple Matrix theme (green/black)
2. `subshero-landing-v2-matrix-enhanced.html` - Enhanced Matrix theme (digital rain, glitch effects)
3. `subshero-landing-v3-redpill.html` - "Redpill" variant (intense Matrix aesthetic)
4. `README.md` - Documentation with:
   - Feature comparison table (Matrix effects breakdown)
   - Browser compatibility
   - Customization guide (color schemes, effect intensity)
   - Performance metrics (canvas/animation optimization)
   - Accessibility notes (motion reduction, contrast)
   - Matrix design philosophy and easter eggs

**Secondary (Optional)**:
- Screenshots (desktop + mobile showing Matrix effects)
- Lighthouse performance audit results
- Side-by-side comparison (V1 vs V2 vs Redpill variant)
- GIF/video of digital rain and glitch effects

### Content Requirements

**Headlines (Matrix-Themed)**:
- Main: "SubsHero manages your subscriptions from all the platforms under a single dashboard"
- Matrix alternatives:
  - "Wake up. Your subscriptions are out of control."
  - "Free your mind. Control your subscriptions."
  - "The Matrix has you... but not your subscriptions."
  - "Follow the white rabbit to subscription freedom."
  - "What if I told you... you could manage all subscriptions in one place?"

**Feature Descriptions**:
1. Automated Management: "Manage all subscriptions from Netflix, Spotify, Adobe, and more in one place"
2. Smart Reminders: "Get notified before renewals, trials end, or price changes"
3. Easy Cancellation: "Cancel unwanted subscriptions with one click, no hassle"
4. Re-subscription: "Easily reactivate paused or cancelled subscriptions"
5. Centralized Dashboard: "See all your subscriptions, spending, and upcoming charges at a glance"
6. Cost Tracking: "Track monthly, yearly spending and find savings opportunities"

**CTA Text (Matrix-Themed)**:
- Primary: "Take the Red Pill" / "Enter the System" / "Jack In Now"
- Secondary: "See the Code" / "Download Consciousness" / "Access Mainframe"
- Alternative: "Wake Up" / "Free Your Mind" / "Escape the Loop"

### Success Criteria

**Version 1 (Simple Matrix)**:
- ✅ Single HTML file with embedded CSS/JS
- ✅ All 5 sections implemented
- ✅ Responsive (320px, 768px, 1024px+)
- ✅ Loads < 2 seconds
- ✅ No console errors
- ✅ Matrix color scheme (green/black palette)
- ✅ Functional CTA buttons with green glow on hover
- ✅ Monospace typography with subtle text glow
- ✅ Terminal/console-inspired UI elements
- ✅ Keyboard navigable, proper heading hierarchy
- ✅ Basic Matrix aesthetic (no heavy animations yet)

**Version 2 (Enhanced Matrix)**:
- ✅ All V1 requirements
- ✅ Digital rain effect (canvas-based, optimized)
- ✅ Animations smooth (60fps) - glitch, scanline, typewriter effects
- ✅ FAQ accordion working (terminal-style with cursor blink)
- ✅ Interactive elements functional (hover glows, wireframe reveals)
- ✅ Statistics/counters animate on scroll (digital odometer style)
- ✅ Mobile hamburger menu working with glitch animation
- ✅ Lazy loading implemented
- ✅ Respects prefers-reduced-motion (disables effects)
- ✅ File size < 200KB
- ✅ CRT scanline effect subtle and performant
- ✅ Green text glow effects not overwhelming

**Version 3 (Redpill Variant)**:
- ✅ All V2 requirements
- ✅ Pure black background (#000000) - "deeper Matrix" aesthetic
- ✅ Text contrast > 7:1 (AAA) with brighter greens
- ✅ Red pill / Blue pill themed CTAs (deep red #8B0000 or electric blue #00D9FF)
- ✅ High-intensity neon green text (#39FF14)
- ✅ Cards with dark green elevations (#001A00, #002B00)
- ✅ Neon green glowing borders
- ✅ More intense digital rain effect
- ✅ Enhanced glitch effects (still respects motion preferences)
- ✅ Stronger CRT scanline visibility
- ✅ "System breach" visual language
- ✅ Comfortable for extended viewing with effect toggles
- ✅ File size < 200KB
- ✅ Option to reduce effect intensity for accessibility

### Testing Requirements

**Functional (Matrix Features)**:
- All buttons clickable with green glow hover
- Forms validate email format (terminal-style feedback)
- Smooth scrolling works
- Back-to-top appears after scroll (Matrix "↑" symbol)
- Mobile menu opens/closes with glitch animation (v2)
- FAQ accordion expands/collapses terminal-style (v2)
- Digital rain animates smoothly (v2/v3)
- Glitch effects trigger appropriately (v2/v3)
- prefers-reduced-motion disables all effects
- Effect intensity toggle works (v3)

**Responsive**:
- 320px, 375px, 768px, 1024px, 1920px
- No horizontal scrolling

**Performance**:
- Lighthouse Performance > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s

**Accessibility**:
- Keyboard navigation (Tab, Enter, Space)
- Screen reader friendly
- Color contrast > 4.5:1 for text
- All images have alt text
- Form inputs have labels
- ARIA attributes correct

**Browsers**:
- Chrome, Firefox, Safari, Edge (latest)
- Mobile Safari, Mobile Chrome

### Risk Assessment

**Low Risk**:
- ✅ Single HTML file structure (simple deployment)
- ✅ Vanilla JS (no dependency issues)
- ✅ Well-defined color scheme
- ✅ Clear content requirements

**Medium Risk**:
- ⚠️ Performance on 3G (need optimization)
- ⚠️ WCAG AAA compliance for dark theme
- ⚠️ Animation performance (60fps target)
- ⚠️ File size < 200KB constraint

**Mitigation**:
- Use CSS transforms for animations (GPU-accelerated)
- Implement lazy loading aggressively
- Inline critical CSS only
- Minimize JavaScript payload
- Test contrast ratios with tools
- Test performance with Chrome DevTools throttling

---

## Phase 2: Agent Selection ✅

**Selected Agent**: `single-page-website-builder`

**Justification**:
- Specializes in SubsHero-style landing pages
- Optimized for single HTML file architecture
- Expertise in vanilla HTML/CSS/JS
- Proven track record with responsive design
- Accessibility compliance built-in
- Can implement Matrix-style effects with vanilla JS

**User Approved**: 2025-10-25 20:15

**Task Breakdown** (3 sequential tasks):
1. **Task 1**: Build Version 1 (Simple Matrix Theme - green/black, basic terminal UI)
2. **Task 2**: Build Version 2 (Enhanced Matrix - digital rain, glitch effects, full cyberpunk)
3. **Task 3**: Build Version 3 ("Redpill" Variant - intense Matrix, red/blue pill CTAs, system breach aesthetic)

---

## Phase 3: Execution Planning ✅

**Workflow**:
1. Launch `single-page-website-builder` for Task 1 (V1 - Simple Matrix)
2. Upon Task 1 completion, launch for Task 2 (V2 - Enhanced Matrix)
3. Upon Task 2 completion, launch for Task 3 (V3 - Redpill Variant)
4. Final QA and documentation

**User Approved**: 2025-10-25 20:15

**Estimated Timeline**:
- Task 1: 1 day (V1 - Simple Matrix - terminal UI, basic green/black styling)
- Task 2: 1.5-2 days (V2 - Enhanced Matrix - digital rain canvas, glitch effects, CRT scanlines)
- Task 3: 1 day (V3 - Redpill Variant - color adjustments, intensity controls, red/blue pill theme)
- Documentation: 0.5 days (Matrix design notes, effect customization guide)
- **Total**: 4-5 days (additional time for Matrix effects optimization)

**Status**: Ready to execute - launching Task 1

---

## Next Steps

**Phase Status**:
- ✅ Phase 1: Requirements analysis (Complete - Matrix theme approved)
- ✅ Phase 2: Agent selection (Complete - single-page-website-builder selected)
- ✅ Phase 3: Execution planning (Complete - User approved 2025-10-25 20:15)
- 🚀 **Execution**: Launching Task 1 now

**Current Action**:
Launching `single-page-website-builder` agent for Task 1 (V1 - Simple Matrix Theme)

---

## State Tracking

**Files**:
- Topic Plan: `Project-tasks/subshero-website/topicplan.md`
- Original Spec: `Project-tasks/subshero-website/spec/original-spec.md`
- Deliverables Directory: `Project-tasks/subshero-website/deliverables/`
- State Files: `.claude/agents/state/agenthero-ai/topics/subshero-website/`

**Progress**: 0% (Requirements Analysis Complete, Awaiting Approval)
