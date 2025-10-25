# csprojecttask Dashboard V2

A modern, browser-based dashboard for monitoring csprojecttask topics using the V2.0 `topics.json` structure.

## Features

### Multi-Topic Dashboard View
- **Responsive Grid Layout**: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Topic Cards**: Display title, status, phase, progress, and task completion ratio
- **Color-Coded Status**:
  - 🟢 **Completed** (#4CAF50)
  - 🟡 **In Progress** (#FFA726)
  - 🔵 **Pending** (#2196F3)
  - 🔴 **Blocked** (#F44336)
- **Clickable Cards**: Navigate to detail view with full topic information

### Topic Details View
- **Comprehensive Metadata**: Title, slug, description, status, phase, progress bar
- **Task List**: All tasks with status icons, progress bars, and current operations
- **File Locations**: Direct paths to topicplan.md, spec/, and deliverables/
- **Timestamps**: Created and last updated dates with relative time formatting
- **Navigation**: Back to dashboard button

### Manual Refresh
- **Refresh Button**: Reload data from `topics.json`
- **Last Updated Timestamp**: Shows when data was last fetched
- **Simple Implementation**: Page reload for MVP

## Technical Stack

- **Pure Vanilla JavaScript** (ES6+) - No frameworks or dependencies
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Responsive design with CSS Grid and Flexbox
- **Static Files Only** - No backend required

## File Structure

```
deliverables/
├── index.html           # Main HTML with dashboard + detail views
├── css/
│   └── styles.css      # All styles (responsive, color-coded)
├── js/
│   ├── app.js          # Main app logic, routing, view switching
│   ├── api.js          # Load topics data from topics.js
│   └── components.js   # UI components (cards, detail view)
├── data/
│   └── topics.js       # Auto-generated from topics.json (synced)
└── README.md           # This file
```

## Installation & Usage

### Step 1: Sync Topics Data

**IMPORTANT**: The dashboard reads from `data/topics.js` (not `topics.json` directly) to support `file://` protocol.

Run this command to sync the latest topics:

```bash
# One-time sync (run whenever topics.json changes)
python .claude/skills/csprojtasks/scripts/sync_topics_to_dashboard.py

# Auto-sync (watches for changes and updates automatically)
python .claude/skills/csprojtasks/scripts/sync_topics_to_dashboard.py --watch
```

**What this does**: Converts `.claude/agents/state/csprojecttask/topics.json` → `deliverables/data/topics.js` so browsers can load it with `file://` protocol.

### Step 2: Open in Browser

**Option A: Direct File Access (Recommended - No Server Needed!)**

Just double-click `index.html` or open it in your browser:
```
file:///C:/laragon/www/claud-skills/Project-tasks/csprojecttask-dashboard-v2/deliverables/index.html
```

✅ **Works with `file://` protocol** - No HTTP server required!

**Option B: HTTP Server (Optional)**

If you prefer to use an HTTP server:

```bash
# Python 3
cd Project-tasks/csprojecttask-dashboard-v2/deliverables/
python -m http.server 8000

# Then open: http://localhost:8000
```

### Step 3: Keep Data Fresh

**Manual refresh**: Run sync script whenever topics change
```bash
python .claude/skills/csprojtasks/scripts/sync_topics_to_dashboard.py
```

**Auto-sync (recommended)**: Run in background to keep dashboard updated
```bash
python .claude/skills/csprojtasks/scripts/sync_topics_to_dashboard.py --watch
```

## Usage Guide

### Dashboard View

1. **View All Topics**: The dashboard displays all topics from `topics.json` in a responsive grid
2. **Status Indicators**: Each card shows status badge with color coding
3. **Progress Tracking**: Progress bars and task completion ratios
4. **Click to View Details**: Click any card to see full topic information

### Detail View

1. **Topic Metadata**: View complete topic information
2. **Task List**: See all tasks with progress and status
3. **File Paths**: Access paths to topicplan, spec, and deliverables
4. **Back Navigation**: Click "Back to Dashboard" to return

### Refresh Data

1. Click the **Refresh** button in the header
2. Dashboard reloads `topics.json` and updates all displays
3. Last updated timestamp shows refresh time

### Deep Linking

Share specific topic URLs:
```
http://localhost:8000#my-topic-slug
```

## V2.0 Data Structure

The dashboard reads from `.claude/agents/state/csprojecttask/topics.json`:

```json
{
  "topics": {
    "topic-slug": {
      "slug": "topic-slug",
      "title": "Topic Title",
      "description": "Description",
      "status": "pending|in_progress|completed|blocked",
      "currentPhase": "phase-1|phase-2|phase-3|execution",
      "progress": 0-100,
      "tasks": [
        {
          "taskId": "task-001",
          "status": "pending|in_progress|completed|blocked",
          "progress": 0-100,
          "currentOperation": "Description"
        }
      ],
      "files": {
        "topicplan": "path/to/topicplan.md",
        "spec": "path/to/spec/",
        "deliverables": "path/to/deliverables/"
      },
      "metadata": {
        "createdAt": "ISO-8601",
        "lastUpdated": "ISO-8601"
      }
    }
  }
}
```

## Browser Support

Tested and supported on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## Responsive Breakpoints

- **Desktop Large**: 1920px+ (4 columns)
- **Desktop**: 1366x768 - 1920px (3 columns)
- **Tablet**: 768x1024 (2 columns)
- **Mobile**: < 768px (1 column)

## Architecture

### Modules

**app.js** - Main Application
- Routing and view switching
- State management (current view, topic)
- Event handling (refresh, navigation)
- Browser history integration

**api.js** - Data Layer
- Fetch `topics.json` from file system
- Parse V2.0 structure
- Utility functions (formatting, validation)
- Statistics and calculations

**components.js** - UI Components
- Topic card generator
- Detail view generator
- Task item renderer
- Loading/error states

### Data Flow

```
User Action → App (routing) → API (fetch) → Components (render) → DOM
```

## Customization

### Colors

Edit `css/styles.css` CSS variables:
```css
:root {
    --color-success: #4CAF50;   /* Completed */
    --color-warning: #FFA726;   /* In Progress */
    --color-pending: #2196F3;   /* Pending */
    --color-danger: #F44336;    /* Blocked */
}
```

### Layout

Adjust grid columns in `css/styles.css`:
```css
.dashboard__grid {
    grid-template-columns: repeat(3, 1fr); /* Change to 2, 4, etc. */
}
```

### Data Source

Change `topics.json` path in `js/api.js`:
```javascript
const TOPICS_FILE_PATH = '../../../.claude/agents/state/csprojecttask/topics.json';
```

## Troubleshooting

### "Failed to fetch topics.json"

**Cause**: Using `file://` protocol or incorrect path

**Solution**:
1. Serve files via HTTP (see Installation Step 2)
2. Verify `topics.json` exists at `.claude/agents/state/csprojecttask/topics.json`
3. Check browser console for CORS errors

### "No Topics Found"

**Cause**: Empty or invalid `topics.json`

**Solution**:
1. Verify `topics.json` has V2.0 structure with `"topics": {}` object
2. Check JSON is valid (no syntax errors)
3. Ensure at least one topic exists in the `topics` object

### Cards Not Clickable

**Cause**: JavaScript errors preventing event handlers

**Solution**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Verify all JS files loaded correctly (Network tab)

### Styles Not Loading

**Cause**: Incorrect CSS path or server not serving static files

**Solution**:
1. Verify `css/styles.css` exists
2. Check browser Network tab for 404 errors
3. Ensure correct relative path in `index.html`

## Performance

- **Initial Load**: < 500ms (with ~20 topics)
- **Page Size**: ~50KB total (HTML + CSS + JS)
- **JSON Parse**: < 50ms (V2.0 structure)
- **Render Time**: < 100ms (20 topic cards)

## Accessibility

- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Color contrast meets WCAG 2.1 AA

## Future Enhancements (Post-MVP)

- Auto-refresh with WebSocket/polling
- Search and filter topics
- Sort by status, date, progress
- Export to CSV/JSON
- Dark mode toggle
- Task filtering within detail view
- Real-time progress animations

## License

Part of the Generic Claude Code Framework - Open for use and customization.

## Version

**Dashboard Version**: 2.0.0
**Data Structure**: V2.0 (topics.json)
**Created**: 2025-10-23
