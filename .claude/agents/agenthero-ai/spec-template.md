# Spec Document Template

This template shows the recommended structure for a specification document that can be provided to the PM orchestrator.

---

## Project Name

**Brief one-line description of the project**

---

## Overview

A high-level summary of what this project/topic is about.

**Example**:
```
This project aims to research the competitive landscape for SubsHero,
a subscription management platform. The research will inform our market
positioning and feature prioritization.
```

---

## Goals & Objectives

What this project aims to achieve.

**Example**:
- Understand our competitive positioning
- Identify feature gaps
- Inform pricing strategy
- Discover market opportunities

---

## Features / Functionality

The core features or deliverables for this project.

### Format Option 1: Simple List

- Feature 1: User authentication system
- Feature 2: Analytics dashboard
- Feature 3: API endpoints for data access

### Format Option 2: Detailed with Priorities

1. **User Authentication System** (Priority: High)
   - JWT-based authentication
   - Login, logout, password reset flows
   - Session management
   - Acceptance Criteria:
     - Users can register and login
     - Passwords are securely hashed
     - Sessions expire after 24 hours

2. **Analytics Dashboard** (Priority: Medium)
   - Real-time metrics display
   - Date range filtering
   - Export to CSV
   - Acceptance Criteria:
     - Dashboard loads in under 2 seconds
     - All metrics update in real-time

### Format Option 3: User Stories

**As a** user
**I want** to authenticate securely
**So that** my data is protected

**As a** admin
**I want** to view analytics
**So that** I can make informed decisions

---

## Technical Constraints

Any technical limitations or requirements.

**Examples**:
- Must use Laravel 10+
- Database: MySQL 8.0
- Must be compatible with existing API
- Maximum response time: 200ms
- Must support 10,000 concurrent users

---

## Success Criteria

How to measure if this project is successful.

**Examples**:
- [ ] All features implemented and tested
- [ ] API documentation complete
- [ ] Performance benchmarks met
- [ ] User acceptance testing passed
- [ ] Deployed to production

---

## Deliverables

What specific outputs are expected.

**Examples**:
- Source code (Laravel application)
- API documentation (Swagger/OpenAPI)
- Database migration scripts
- User guide (Markdown)
- Deployment instructions

---

## Timeline (Optional)

If there are deadlines or milestones.

**Examples**:
- Week 1: Authentication system
- Week 2: Analytics dashboard
- Week 3: Testing and deployment
- Final deadline: 2025-11-15

---

## References & Context

Any additional context, links, or references.

**Examples**:
- Existing documentation: https://docs.example.com
- Design mockups: /designs/mockups.fig
- Competitor analysis: /research/competitors.md
- Previous version: https://github.com/org/repo/v1

---

## Open Questions

Questions that need answers before starting.

**Examples**:
- Should we support OAuth providers (Google, GitHub)?
- What's the expected user volume (affects infrastructure)?
- Do we need multi-tenant support?
- Which payment gateway should we use?

---

## Example Spec Documents

### Example 1: Simple Research Project

```markdown
# SubsHero Competitor Research

## Overview
Research competitors in the subscription management space to inform
our product roadmap and market positioning.

## Features
- Market positioning analysis
- Feature comparison across 8-10 competitors
- Pricing model analysis

## Deliverables
- Market analysis report (Markdown)
- Feature comparison matrix (CSV/Markdown)
- Pricing strategy recommendations (Markdown)

## Success Criteria
- [ ] At least 8 competitors analyzed
- [ ] All reports completed
- [ ] Actionable insights provided
```

### Example 2: Detailed Development Project

```markdown
# E-commerce Platform - User Authentication

## Overview
Build a secure authentication system for our e-commerce platform.

## Features

1. **User Registration** (High Priority)
   - Email/password signup
   - Email verification
   - Password strength validation
   - Acceptance: Users can register with valid email

2. **Login System** (High Priority)
   - Email/password login
   - "Remember me" functionality
   - Account lockout after 5 failed attempts
   - Acceptance: Secure login with rate limiting

3. **Password Reset** (Medium Priority)
   - Email-based password reset
   - Reset token expires after 1 hour
   - Acceptance: Users can reset forgotten passwords

## Technical Constraints
- Laravel 10+
- MySQL 8.0
- Must integrate with existing user table
- Response time < 200ms

## Deliverables
- Authentication controllers and routes
- Migration scripts
- Unit and integration tests
- API documentation

## Success Criteria
- [ ] All features implemented
- [ ] 95%+ test coverage
- [ ] Security audit passed
- [ ] Performance benchmarks met
```

---

## Tips for Writing Good Specs

### ✅ DO:
- Be specific about requirements
- Include priorities (High/Medium/Low)
- Define acceptance criteria
- Mention technical constraints
- Provide context and background
- List expected deliverables

### ❌ DON'T:
- Be too vague ("build a website")
- Skip acceptance criteria
- Omit priorities (everything seems urgent)
- Forget to mention constraints
- Assume context (explain the "why")

---

## What If I Don't Have a Spec?

**No problem!** You can provide just a description:

```
User: "I want to research SubsHero competitors, focusing on
their pricing models and key features."
```

The PM orchestrator will:
1. Extract requirements from your description
2. Ask clarifying questions for missing details
3. Generate a topic plan based on your input
4. Present it for your approval

---

## Spec File Location

When you have a spec document:

1. **Create it anywhere** (e.g., `~/specs/my-project.md`)
2. **Reference it when creating topic**:
   ```
   User: "Create a topic using spec at ~/specs/my-project.md"
   ```
3. **PM will**:
   - Read the spec file
   - Parse requirements
   - Copy it to `Project-tasks/{topic-slug}/spec/original-spec.md`
   - Generate topic plan from it

---

**Template Version**: 1.0.0
**Last Updated**: 2025-10-23
