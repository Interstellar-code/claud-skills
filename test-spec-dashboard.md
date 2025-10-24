# Project Specification: BTopic Monitor Dashboard

## Project Overview

**Name**: csprojecttask Browser Dashboard
**Type**: Web Application (HTML/CSS/JavaScript)
**Purpose**: Real-time browser-based monitoring system for csprojecttask topics, tasks, and project state

## Problem Statement

The current command-line menu system works but has limitations:
- Text-based interface can be frustrating to navigate
- No visual representation of project progress
- Requires running bash/batch scripts
- Limited real-time updates
- No charts or visual analytics

**Solution**: Create a modern, browser-based dashboard that:
- Reads JSON state files directly
- Provides real-time visual updates
- Shows progress charts and statistics
- Offers intuitive navigation
- Works offline (no backend required)

## Requirements

### 1. Functional Requirements

#### 1.1 Multi-Topic Dashboard View
- **Priority**: HIGH
- Display all topics in card/grid layout
- Show for each topic:
  - Title
  - Status (pending, in_progress, completed, blocked)
  - Current phase
  - Progress percentage
  - Task completion ratio (e.g., "3/5 tasks completed")
- Color-coded status indicators
- Click topic card to view details

#### 1.2 Topic Details View
- **Priority**: HIGH
- Show complete topic information:
  - Title, slug, description
  - Status and current phase
  - Progress bar
  - Task list with status icons
  - File locations (topicplan.md, spec/, deliverables/)
  - Timestamps (created, updated)
- Show all tasks under the topic:
  - Task ID
  - Status
  - Progress percentage
  - Current operation
- "Back to Dashboard" button

#### 1.3 Manual Refresh
- **Priority**: LOW
- Manual refresh button to reload data
- Show "Last updated: [timestamp]"
- Simple page reload to fetch latest data
- No auto-refresh or polling required

#### 1.4 Statistics & Analytics
- **Priority**: MEDIUM
- Overall project statistics:
  - Total topics
  - Topics by status (completed, in progress, pending, blocked)
  - Total tasks
  - Task completion rate
- Visual charts:
  - Pie chart: Topics by status
  - Bar chart: Tasks per topic
  - Progress timeline

#### 1.5 Search & Filter
- **Priority**: LOW
- Search topics by title/slug
- Filter by status (completed, in_progress, pending, blocked)
- Filter by phase

#### 1.6 Actions
- **Priority**: LOW (Future Enhancement)
- View topicplan.md (render markdown)
- View deliverables (list files)
- Delete topic (with confirmation)
- Archive completed topics

### 2. Technical Requirements

#### 2.1 Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **No frameworks required** - Vanilla JS for simplicity
- **No backend** - Static files only, read JSON via fetch on page load
- **No auto-refresh** - Manual refresh button only
- **Responsive design** - Works on desktop and tablet

#### 2.2 File Structure

**Dashboard Location** (follows csprojecttask conventions):
```
Project-tasks/                              # User-facing
└── csprojecttask-dashboard/                # Topic for this dashboard
    ├── topicplan.md                        # Topic plan (created by PM)
    ├── spec/
    │   └── original-spec.md                # This spec file
    └── deliverables/                       # DASHBOARD FILES (deliverables)
        ├── index.html                      # Main dashboard page
        ├── css/
        │   └── styles.css                  # All styles
        ├── js/
        │   ├── app.js                      # Main application logic
        │   ├── api.js                      # JSON state file reader
        │   └── components.js               # UI component builders
        └── README.md                       # Usage instructions

.claude/agents/state/csprojecttask/         # Internal state (dashboard reads from here)
├── topics.json                             # Single source of truth - ALL topics (V2.0)
└── topics/{slug}/
    ├── task-*.json                         # Task state files
    └── messages.json                       # Inter-agent messages
```

**Why this structure?**
- ✅ Dashboard is a **deliverable** created by a topic (like any other output)
- ✅ Follows csprojecttask agent's separation: `Project-tasks/` (user-facing) vs `.claude/agents/state/` (internal)
- ✅ Dashboard HTML/CSS/JS go in `deliverables/` folder
- ✅ topicplan.md tracks the dashboard's creation process
- ✅ Dashboard **reads from** `.claude/agents/state/` but **lives in** `Project-tasks/`

#### 2.3 Data Sources

Dashboard must read from **two locations**:

**1. State Files** (Internal - `.claude/agents/state/`) - **V2.0 Structure**:
- **All Topics**: `.claude/agents/state/csprojecttask/topics.json` (single source of truth)
- **Task Details**: `.claude/agents/state/csprojecttask/topics/{slug}/task-*.json`

**2. User Docs** (User-facing - `Project-tasks/`):
- Topic Plan: `Project-tasks/{slug}/topicplan.md`
- Spec: `Project-tasks/{slug}/spec/original-spec.md`
- Deliverables: `Project-tasks/{slug}/deliverables/`

**Key Change in V2.0**: Instead of reading individual topic.json and pm-state.json files for each topic, dashboard now reads ONE file (`topics.json`) which contains all topic metadata and task summaries. Task details are still in individual task-*.json files.

#### 2.4 Browser Compatibility
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Support file:// protocol (local file access)
- Responsive: Desktop (1920x1080), Laptop (1366x768), Tablet (768x1024)

#### 2.5 Performance
- Load all topics in < 500ms
- Auto-refresh without lag
- Smooth animations and transitions

### 3. Design Requirements

#### 3.1 Color Scheme
- **Primary**: Blue tones (trust, professionalism)
- **Status Colors**:
  - Completed: Green (#4CAF50)
  - In Progress: Yellow/Orange (#FFA726)
  - Pending: Blue (#2196F3)
  - Blocked: Red (#F44336)
- **Background**: Light gray (#F5F5F5)
- **Cards**: White (#FFFFFF)

#### 3.2 Layout
- **Header**: Project title, refresh button, last update time
- **Main Area**: Topic cards in responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- **Sidebar** (optional): Statistics summary, filters
- **Topic Details**: Modal or separate page view

#### 3.3 UI Components
- Topic cards with hover effects
- Progress bars with percentage
- Status badges with icons
- Charts (use Chart.js or pure CSS for simplicity)
- Modal dialogs for confirmations

### 4. Non-Functional Requirements

#### 4.1 Usability
- Intuitive navigation (no learning curve)
- Clear visual hierarchy
- Accessible (keyboard navigation, ARIA labels)

#### 4.2 Maintainability
- Clean, well-commented code
- Modular JavaScript (separate concerns)
- CSS organized by component

#### 4.3 Security
- Read-only access to state files
- No external API calls
- No data persistence (browser-based only)

## User Stories

### Story 1: View All Topics at a Glance
**As a** developer
**I want to** see all my topics in a visual dashboard
**So that** I can quickly assess project status without running scripts

**Acceptance Criteria**:
- Dashboard reads from `.claude/agents/state/csprojecttask/topics.json` (V2.0 single file)
- Each topic card shows title, status, phase, progress
- Manual refresh button to reload latest data

### Story 2: Monitor Topic Details
**As a** project manager
**I want to** click on a topic to see all its tasks and details
**So that** I can understand what's happening in that topic

**Acceptance Criteria**:
- Clicking topic card opens detail view
- Shows all tasks with status and progress
- Shows file locations and metadata
- "Back" button returns to dashboard

### Story 3: Track Progress Visually
**As a** stakeholder
**I want to** see visual charts of project progress
**So that** I can quickly understand completion status

**Acceptance Criteria**:
- Pie chart shows topics by status
- Bar chart shows tasks per topic
- Overall completion percentage displayed

## Technical Implementation Details

### API Module (api.js)

```javascript
// V2.0 - Read from single topics.json file
const TOPICS_FILE = '../../../.claude/agents/state/csprojecttask/topics.json';
const TOPICS_DIR = '../../../.claude/agents/state/csprojecttask/topics/';
const PROJECTS_DIR = '../../../Project-tasks/';

// Read all topics from topics.json (V2.0 - single source of truth)
async function getAllTopics() {
  // V2.0: Just read topics.json - contains all topic metadata
  const response = await fetch(TOPICS_FILE);
  const data = await response.json();
  return data.topics || [];
}

// Read specific topic with all tasks
async function getTopic(slug) {
  // V2.0: Topic data already in topics.json
  const topics = await getAllTopics();
  const topic = topics.find(t => t.slug === slug);

  // Optionally load detailed task logs if needed
  // (topics.json has task summaries, task-*.json has full details)

  return topic;
}

// Get project statistics
function getStatistics(topics) {
  // Calculate total topics, tasks, completion rates
  // V2.0: topics.json already has completedTasks/totalTasks/progress
  return {
    totalTopics: topics.length,
    completedTopics: topics.filter(t => t.status === 'completed').length,
    inProgressTopics: topics.filter(t => t.status === 'in_progress').length,
    totalTasks: topics.reduce((sum, t) => sum + (t.totalTasks || 0), 0),
    completedTasks: topics.reduce((sum, t) => sum + (t.completedTasks || 0), 0)
  };
}
```

### Components Module (components.js)

```javascript
// Build topic card HTML
function createTopicCard(topic) {
  // Return HTML string for topic card
}

// Build progress bar
function createProgressBar(percentage) {
  // Return HTML for progress bar
}

// Build status badge
function createStatusBadge(status) {
  // Return HTML for status badge with color
}
```

### App Module (app.js)

```javascript
// Initialize dashboard
async function init() {
  // Load topics
  // Render dashboard
  // Setup manual refresh button
}

// Manual refresh dashboard
async function refresh() {
  // Reload topics
  // Update DOM
  // Update timestamp
}

// Show topic details
function showTopicDetails(slug) {
  // Load topic data
  // Render detail view
}
```

## File Serving Options

### Option 1: File Protocol
Open `index.html` directly in browser:
```
file:///C:/laragon/www/claud-skills/Project-tasks/csprojecttask-dashboard/deliverables/index.html
```

**Limitation**: May have CORS issues reading JSON files from `.claude/` directory

### Option 2: Simple HTTP Server (Recommended)
Use Python or Node.js to serve from project root:

**Python:**
```bash
# Run from project root (C:/laragon/www/claud-skills/)
python -m http.server 8080
# Open http://localhost:8080/Project-tasks/csprojecttask-dashboard/deliverables/
```

**Node.js:**
```bash
# Run from project root
npx http-server . -p 8080
# Open http://localhost:8080/Project-tasks/csprojecttask-dashboard/deliverables/
```

### Recommended: Option 2 (HTTP Server)
- More reliable for reading JSON files across directories
- No CORS issues
- Can access both `Project-tasks/` and `.claude/` directories

## Success Criteria

### Minimum Viable Product (MVP)
- ✅ Shows all topics in card layout
- ✅ Click topic to view details with tasks
- ✅ Manual refresh button
- ✅ Responsive design (desktop + tablet)
- ✅ Status color coding
- ✅ Progress bars

### Nice to Have
- Statistics dashboard with charts
- Search and filter functionality
- Markdown rendering for topicplan.md
- Delete/archive actions
- Dark mode toggle

## Deliverables

All files will be created in `Project-tasks/csprojecttask-dashboard/deliverables/`:

1. **index.html** - Main dashboard page
2. **css/styles.css** - Complete stylesheet
3. **js/app.js** - Main application logic
4. **js/api.js** - JSON state file reader
5. **js/components.js** - UI component builders
6. **README.md** - Setup and usage instructions

**Access the dashboard**: Open `Project-tasks/csprojecttask-dashboard/deliverables/index.html` in browser

## Testing Requirements

### Manual Testing Checklist
- [ ] Dashboard loads and shows all topics from topics.json (V2.0)
- [ ] Topic cards display correct status and progress
- [ ] Clicking topic opens detail view
- [ ] Detail view shows all tasks correctly
- [ ] Manual refresh button updates data and timestamp
- [ ] Responsive design works on different screen sizes
- [ ] Status colors match specification
- [ ] Progress bars show accurate percentages

### Test Data
Use existing topics in `.claude/agents/state/csprojecttask/topics.json` for testing (V2.0 structure)

## Timeline Estimate

- **Setup & Structure**: 30 minutes
- **API Module**: 1 hour
- **Dashboard View**: 2 hours
- **Topic Detail View**: 1.5 hours
- **Styling & Responsive**: 1.5 hours
- **Auto-refresh & Polish**: 1 hour
- **Testing**: 30 minutes

**Total**: ~8 hours

## Future Enhancements

1. WebSocket support for real-time updates
2. Dark mode
3. Export reports (PDF/CSV)
4. Task editing capabilities
5. Integration with GitHub (show commits, PRs)
6. Notifications for status changes
7. Performance metrics and analytics

## Notes

- Keep it simple - no build process, no frameworks
- Focus on clarity and usability over fancy features
- Ensure it works offline (no external dependencies)
- Make it a good test of the csprojecttask agent's capabilities!
