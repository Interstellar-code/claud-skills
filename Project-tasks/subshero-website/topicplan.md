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

**Design Requirements**:
- Clean, modern SaaS aesthetic
- Proper spacing and typography
- Smooth scrolling between sections
- Light theme color palette (dark teal #004547, yellow #FFD63C)

#### 3. Version 2 - Enhanced Landing Page (Medium Priority)

**Additional Features Beyond V1**:
1. **Advanced Hero**
   - Animated headline (fade-in/typewriter)
   - Background gradient or animation
   - Optional video background (muted, looping)
   - Respects prefers-reduced-motion

2. **Interactive Features**
   - Tabbed interface/carousel for features
   - Hover effects (lift, shadow)
   - Icon animations on scroll
   - Touch-friendly, keyboard navigable

3. **Statistics/Social Proof**
   - Animated counters (Intersection Observer)
   - Testimonials or trust badges
   - Partner logos (placeholder)

4. **FAQ Accordion**
   - 5-8 common questions
   - Smooth expand/collapse animations
   - Accessible (keyboard, screen readers)

5. **Advanced Footer**
   - Multi-column layout
   - Quick links with smooth scroll
   - Social icons with hover effects
   - Newsletter with validation

6. **Interactive Elements**
   - Sticky navbar on scroll
   - Back-to-top button (appears after scroll)
   - Mobile hamburger menu
   - No layout shift/jank

**Performance**:
- Lazy loading for images
- Optimized CSS animations (transforms)
- Minimal JavaScript
- Critical CSS inlined

#### 4. Version 3 - Dark Theme Enhanced (Medium Priority)

**Same as V2, Plus Dark Theme Optimizations**:

**Dark Color Scheme**:
- Main background: #0D1117
- Elevated surfaces: #161B22 or #1C2128
- Primary text: #E6EDF3 (soft white)
- Secondary text: #8B949E (muted gray)
- Borders: #30363D (subtle)
- Accent yellow: #FFD63C (same)
- Teal accent: #0A9396 (brighter than light theme)

**Dark Theme Requirements**:
- Text contrast ratio > 7:1 (WCAG AAA)
- No pure white text (#FFFFFF)
- Shadows replaced with subtle glows
- Yellow CTA buttons remain vibrant
- Comfortable for extended viewing
- Typography adjustments (reduced font weights)

### Deliverables

**Primary**:
1. `subshero-landing-v1.html` - Simple light theme
2. `subshero-landing-v2.html` - Enhanced light theme
3. `subshero-landing-v3-dark.html` - Enhanced dark theme
4. `README.md` - Documentation with:
   - Feature comparison table
   - Browser compatibility
   - Customization guide
   - Performance metrics
   - Accessibility notes
   - Dark theme design notes

**Secondary (Optional)**:
- Screenshots (desktop + mobile)
- Lighthouse performance audit results
- Side-by-side comparison (light vs dark)

### Content Requirements

**Headlines**:
- Main: "SubsHero manages your subscriptions from all the platforms under a single dashboard"
- Alternatives: "Never miss a subscription again" / "All your subscriptions, one dashboard"

**Feature Descriptions**:
1. Automated Management: "Manage all subscriptions from Netflix, Spotify, Adobe, and more in one place"
2. Smart Reminders: "Get notified before renewals, trials end, or price changes"
3. Easy Cancellation: "Cancel unwanted subscriptions with one click, no hassle"
4. Re-subscription: "Easily reactivate paused or cancelled subscriptions"
5. Centralized Dashboard: "See all your subscriptions, spending, and upcoming charges at a glance"
6. Cost Tracking: "Track monthly, yearly spending and find savings opportunities"

**CTA Text**:
- Primary: "Get Started Free" / "Start Managing Now"
- Secondary: "See How It Works" / "Watch Demo"

### Success Criteria

**Version 1**:
- ✅ Single HTML file with embedded CSS/JS
- ✅ All 5 sections implemented
- ✅ Responsive (320px, 768px, 1024px+)
- ✅ Loads < 2 seconds
- ✅ No console errors
- ✅ SubsHero brand colors
- ✅ Functional CTA buttons with hover
- ✅ Clean, professional design
- ✅ Keyboard navigable, proper heading hierarchy

**Version 2**:
- ✅ All V1 requirements
- ✅ Animations smooth (60fps)
- ✅ FAQ accordion working
- ✅ Interactive elements functional
- ✅ Statistics/counters animate on scroll
- ✅ Mobile hamburger menu working
- ✅ Lazy loading implemented
- ✅ Respects prefers-reduced-motion
- ✅ File size < 200KB

**Version 3**:
- ✅ All V2 requirements
- ✅ Dark color scheme throughout
- ✅ Text contrast > 7:1 (AAA)
- ✅ Yellow buttons vibrant and accessible
- ✅ Soft whites (not pure white)
- ✅ Cards elevated from background
- ✅ Subtle borders visible
- ✅ Hover effects work in dark
- ✅ Icons/images adjusted for dark
- ✅ Glows instead of shadows
- ✅ Comfortable for extended viewing
- ✅ File size < 200KB

### Testing Requirements

**Functional**:
- All buttons clickable with hover
- Forms validate email format
- Smooth scrolling works
- Back-to-top appears after scroll
- Mobile menu opens/closes (v2)
- FAQ accordion expands/collapses (v2)

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

## Phase 2: Agent Selection (Pending User Approval)

**Recommended Agent**: `single-page-website-builder`

**Justification**:
- Specializes in SubsHero-style landing pages
- Optimized for single HTML file architecture
- Expertise in vanilla HTML/CSS/JS
- Proven track record with responsive design
- Accessibility compliance built-in

**Alternative Approach**:
- Could use `frontend-architect` for more complex requirements
- But `single-page-website-builder` is better suited for this specific use case

**Task Breakdown Preview** (3 tasks):
1. **Task 1**: Build Version 1 (Simple Light Theme)
2. **Task 2**: Build Version 2 (Enhanced Light Theme)
3. **Task 3**: Build Version 3 (Enhanced Dark Theme)

---

## Phase 3: Execution Planning (Pending User Approval)

**Workflow**:
1. Launch `single-page-website-builder` for Task 1
2. Upon Task 1 completion, launch for Task 2
3. Upon Task 2 completion, launch for Task 3
4. Final QA and documentation

**Estimated Timeline**:
- Task 1: 1 day (V1 - Simple)
- Task 2: 1.5 days (V2 - Enhanced)
- Task 3: 1 day (V3 - Dark Theme)
- Documentation: 0.5 days
- **Total**: 3-4 days

---

## Next Steps

**Awaiting User Approval for**:
- ✅ Phase 1 requirements analysis (current)
- ⏳ Phase 2 agent selection
- ⏳ Phase 3 execution planning
- ⏳ Task execution

**User Decision Required**:
1. Does this requirements analysis look correct?
2. Should we proceed to Phase 2 (Agent Selection)?

---

## State Tracking

**Files**:
- Topic Plan: `Project-tasks/subshero-website/topicplan.md`
- Original Spec: `Project-tasks/subshero-website/spec/original-spec.md`
- Deliverables Directory: `Project-tasks/subshero-website/deliverables/`
- State Files: `.claude/agents/state/agenthero-ai/topics/subshero-website/`

**Progress**: 0% (Requirements Analysis Complete, Awaiting Approval)
