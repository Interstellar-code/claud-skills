/**
 * Main Application Module - Routing, state management, and view switching
 */

const App = (() => {
    // State
    let currentView = 'dashboard'; // 'dashboard' | 'detail'
    let currentTopicSlug = null;
    let allTopics = [];

    // DOM Elements
    let dashboardView;
    let detailView;
    let topicsGrid;
    let detailContent;
    let refreshBtn;
    let backBtn;

    /**
     * Initialize the application
     */
    async function init() {
        console.log('Initializing agenthero-ai Dashboard V2...');

        // Get DOM references
        dashboardView = document.getElementById('dashboardView');
        detailView = document.getElementById('detailView');
        topicsGrid = document.getElementById('topicsGrid');
        detailContent = document.getElementById('detailContent');
        refreshBtn = document.getElementById('refreshBtn');
        backBtn = document.getElementById('backBtn');

        // Validate DOM elements
        if (!dashboardView || !detailView || !topicsGrid || !detailContent) {
            console.error('Critical DOM elements not found');
            Components.showError('Failed to initialize dashboard. Please check the console for errors.');
            return;
        }

        // Setup event listeners
        setupEventListeners();

        // Handle browser back/forward buttons
        window.addEventListener('popstate', handlePopState);

        // Initial load
        await loadDashboard();

        // Handle deep linking (if URL has hash)
        handleInitialRoute();

        console.log('Dashboard initialized successfully');
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Refresh button
        if (refreshBtn) {
            refreshBtn.addEventListener('click', handleRefresh);
        }

        // Back button
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                showDashboard();
            });
        }
    }

    /**
     * Handle refresh button click
     */
    async function handleRefresh() {
        console.log('Refreshing dashboard...');

        // Add loading state to button
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = `
            <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Refreshing...
        `;

        try {
            if (currentView === 'dashboard') {
                await loadDashboard();
            } else if (currentView === 'detail' && currentTopicSlug) {
                await loadTopicDetail(currentTopicSlug);
            }

            Components.updateLastUpdatedTimestamp();
        } catch (error) {
            console.error('Refresh failed:', error);
            Components.showError(`Failed to refresh: ${error.message}`);
        } finally {
            // Restore button state
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = `
                <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
                Refresh
            `;
        }
    }

    /**
     * Load dashboard view with all topics
     */
    async function loadDashboard() {
        console.log('Loading dashboard...');
        Components.hideError();
        Components.showLoading();

        try {
            // Fetch all topics
            allTopics = await API.getAllTopics();
            console.log(`Loaded ${allTopics.length} topics`);

            // Render topics
            renderTopics(allTopics);

            Components.hideLoading();
            Components.updateLastUpdatedTimestamp();
        } catch (error) {
            console.error('Failed to load dashboard:', error);
            Components.hideLoading();
            Components.showError(`Failed to load topics: ${error.message}. Make sure topics.json exists at .claude/agents/state/agenthero-ai/topics.json`);
        }
    }

    /**
     * Render topics to the grid
     * @param {Array} topics - Array of topic objects
     */
    function renderTopics(topics) {
        // Clear existing content
        topicsGrid.innerHTML = '';

        // Show empty state if no topics
        if (!topics || topics.length === 0) {
            const emptyState = document.getElementById('emptyState');
            if (emptyState) {
                emptyState.style.display = 'block';
            }
            return;
        }

        // Hide empty state
        const emptyState = document.getElementById('emptyState');
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        // Create and append topic cards
        topics.forEach(topic => {
            if (API.validateTopic(topic)) {
                const card = Components.createTopicCard(topic);
                topicsGrid.appendChild(card);
            } else {
                console.warn('Invalid topic object:', topic);
            }
        });
    }

    /**
     * Show topic detail view
     * @param {string} slug - Topic slug
     */
    async function showTopicDetail(slug) {
        console.log(`Showing detail view for topic: ${slug}`);

        currentView = 'detail';
        currentTopicSlug = slug;

        // Update URL without page reload
        history.pushState({ view: 'detail', slug }, '', `#${slug}`);

        // Load topic detail
        await loadTopicDetail(slug);

        // Switch views
        dashboardView.style.display = 'none';
        detailView.style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Load topic detail data and render
     * @param {string} slug - Topic slug
     */
    async function loadTopicDetail(slug) {
        console.log(`Loading topic detail: ${slug}`);
        Components.hideError();
        Components.showLoading();

        try {
            const topic = await API.getTopicBySlug(slug);

            if (!topic) {
                throw new Error(`Topic not found: ${slug}`);
            }

            // Render detail view
            const detailElement = Components.createTopicDetail(topic);
            detailContent.innerHTML = '';
            detailContent.appendChild(detailElement);

            Components.hideLoading();
            Components.updateLastUpdatedTimestamp();
        } catch (error) {
            console.error('Failed to load topic detail:', error);
            Components.hideLoading();
            Components.showError(`Failed to load topic: ${error.message}`);
        }
    }

    /**
     * Show dashboard view
     */
    function showDashboard() {
        console.log('Showing dashboard view');

        currentView = 'dashboard';
        currentTopicSlug = null;

        // Update URL
        history.pushState({ view: 'dashboard' }, '', '#');

        // Switch views
        dashboardView.style.display = 'block';
        detailView.style.display = 'none';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Handle browser back/forward buttons
     * @param {PopStateEvent} event - PopState event
     */
    function handlePopState(event) {
        console.log('PopState event:', event.state);

        if (event.state) {
            if (event.state.view === 'dashboard') {
                currentView = 'dashboard';
                dashboardView.style.display = 'block';
                detailView.style.display = 'none';
            } else if (event.state.view === 'detail' && event.state.slug) {
                showTopicDetail(event.state.slug);
            }
        } else {
            // No state - show dashboard
            showDashboard();
        }
    }

    /**
     * Handle initial route based on URL hash
     */
    function handleInitialRoute() {
        const hash = window.location.hash.slice(1); // Remove '#'

        if (hash) {
            // Deep link to topic detail
            console.log(`Deep link detected: ${hash}`);
            showTopicDetail(hash);
        } else {
            // Default dashboard view
            history.replaceState({ view: 'dashboard' }, '', '#');
        }
    }

    /**
     * Get current view
     * @returns {string} Current view name
     */
    function getCurrentView() {
        return currentView;
    }

    /**
     * Get current topic slug
     * @returns {string|null} Current topic slug
     */
    function getCurrentTopicSlug() {
        return currentTopicSlug;
    }

    /**
     * Get all loaded topics
     * @returns {Array} All topics
     */
    function getAllTopics() {
        return allTopics;
    }

    // Public API
    return {
        init,
        loadDashboard,
        showDashboard,
        showTopicDetail,
        getCurrentView,
        getCurrentTopicSlug,
        getAllTopics
    };
})();

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    // DOM already loaded
    App.init();
}

// Export to window for component access
window.App = App;
