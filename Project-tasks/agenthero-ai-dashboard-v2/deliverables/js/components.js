/**
 * Components Module - UI component generators
 */

const Components = (() => {
    /**
     * Create a topic card element
     * @param {Object} topic - Topic object
     * @returns {HTMLElement} Topic card element
     */
    function createTopicCard(topic) {
        const card = document.createElement('article');
        card.className = `topic-card topic-card--${topic.status || 'pending'}`;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View details for ${topic.title}`);
        card.dataset.slug = topic.slug;

        const taskRatio = API.getTaskCompletionRatio(topic);
        const progress = topic.progress || 0;

        card.innerHTML = `
            <div class="topic-card__header">
                <h3 class="topic-card__title">${escapeHtml(topic.title)}</h3>
                <p class="topic-card__description">${escapeHtml(topic.description || 'No description provided')}</p>
            </div>
            <div class="topic-card__meta">
                <span class="topic-card__badge badge--${topic.status || 'pending'}">
                    ${API.getStatusDisplayName(topic.status || 'pending')}
                </span>
                ${topic.currentPhase ? `
                    <span class="topic-card__badge badge--in_progress">
                        ${API.getPhaseDisplayName(topic.currentPhase)}
                    </span>
                ` : ''}
            </div>
            <div class="topic-card__stats">
                <span>Progress: ${progress}%</span>
                <span>Tasks: ${taskRatio.completed}/${taskRatio.total}</span>
            </div>
            <div class="topic-card__progress-bar">
                <div class="topic-card__progress-fill progress-fill--${topic.status || 'pending'}"
                     style="width: ${progress}%"
                     role="progressbar"
                     aria-valuenow="${progress}"
                     aria-valuemin="0"
                     aria-valuemax="100">
                </div>
            </div>
        `;

        // Add click handler
        card.addEventListener('click', () => {
            window.App.showTopicDetail(topic.slug);
        });

        // Add keyboard support
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.App.showTopicDetail(topic.slug);
            }
        });

        return card;
    }

    /**
     * Create topic detail view
     * @param {Object} topic - Topic object
     * @returns {HTMLElement} Detail view element
     */
    function createTopicDetail(topic) {
        const container = document.createElement('div');
        const taskRatio = API.getTaskCompletionRatio(topic);
        const progress = topic.progress || 0;

        container.innerHTML = `
            <div class="detail__topic-header">
                <h2 class="detail__title">${escapeHtml(topic.title)}</h2>
                <p class="detail__slug">${escapeHtml(topic.slug)}</p>
                <p class="detail__description">${escapeHtml(topic.description || 'No description provided')}</p>

                <div class="detail__meta-grid">
                    <div class="detail__meta-item">
                        <span class="detail__meta-label">Status</span>
                        <span class="detail__meta-value">
                            <span class="topic-card__badge badge--${topic.status || 'pending'}">
                                ${API.getStatusDisplayName(topic.status || 'pending')}
                            </span>
                        </span>
                    </div>
                    <div class="detail__meta-item">
                        <span class="detail__meta-label">Current Phase</span>
                        <span class="detail__meta-value">${topic.currentPhase ? API.getPhaseDisplayName(topic.currentPhase) : 'N/A'}</span>
                    </div>
                    <div class="detail__meta-item">
                        <span class="detail__meta-label">Task Completion</span>
                        <span class="detail__meta-value">${taskRatio.completed} / ${taskRatio.total} tasks (${taskRatio.percentage}%)</span>
                    </div>
                </div>

                <div class="detail__progress">
                    <div class="detail__progress-label">
                        <span>Overall Progress</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="detail__progress-bar">
                        <div class="detail__progress-fill progress-fill--${topic.status || 'pending'}"
                             style="width: ${progress}%"
                             role="progressbar"
                             aria-valuenow="${progress}"
                             aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                    </div>
                </div>
            </div>

            ${topic.tasks && topic.tasks.length > 0 ? `
                <div class="detail__section">
                    <h3 class="detail__section-title">Tasks (${topic.tasks.length})</h3>
                    <div class="detail__tasks">
                        ${topic.tasks.map(task => createTaskItem(task)).join('')}
                    </div>
                </div>
            ` : `
                <div class="detail__section">
                    <h3 class="detail__section-title">Tasks</h3>
                    <p class="detail__meta-value" style="color: var(--color-text-light);">No tasks available</p>
                </div>
            `}

            ${topic.files ? `
                <div class="detail__section">
                    <h3 class="detail__section-title">File Locations</h3>
                    <div class="detail__files">
                        ${topic.files.topicplan ? `
                            <div class="file-item">
                                <svg class="file-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                                <span class="file-item__path">${escapeHtml(topic.files.topicplan)}</span>
                            </div>
                        ` : ''}
                        ${topic.files.spec ? `
                            <div class="file-item">
                                <svg class="file-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                                </svg>
                                <span class="file-item__path">${escapeHtml(topic.files.spec)}</span>
                            </div>
                        ` : ''}
                        ${topic.files.deliverables ? `
                            <div class="file-item">
                                <svg class="file-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                                </svg>
                                <span class="file-item__path">${escapeHtml(topic.files.deliverables)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}

            ${topic.metadata ? `
                <div class="detail__timestamps">
                    ${topic.metadata.createdAt ? `
                        <div>
                            <strong>Created:</strong> ${API.formatTimestamp(topic.metadata.createdAt)}
                        </div>
                    ` : ''}
                    ${topic.metadata.lastUpdated ? `
                        <div>
                            <strong>Last Updated:</strong> ${API.formatTimestamp(topic.metadata.lastUpdated)}
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        `;

        return container;
    }

    /**
     * Get friendly task name from task ID
     * @param {Object} task - Task object
     * @returns {string} Friendly task name
     */
    function getTaskName(task) {
        // Use name if available
        if (task.name && task.name.trim()) {
            return task.name;
        }

        // Extract from ID: "task-001-dashboard" → "Dashboard"
        const taskId = task.id || task.taskId || 'unknown-task';
        const parts = taskId.split('-');

        // Remove "task" and number prefix (e.g., "001")
        const nameParts = parts.filter(part =>
            part !== 'task' && !/^\d+$/.test(part)
        );

        // Capitalize and join
        return nameParts
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') || 'Task';
    }

    /**
     * Create a task item HTML string
     * @param {Object} task - Task object
     * @returns {string} Task item HTML
     */
    function createTaskItem(task) {
        const progress = task.progress || 0;
        const status = task.status || 'pending';
        const taskName = getTaskName(task);

        return `
            <div class="task-item task-item--${status}">
                <div class="task-item__header">
                    <div>
                        <h4 class="task-item__title">${escapeHtml(taskName)}</h4>
                        ${task.currentOperation ? `
                            <p class="task-item__operation">${escapeHtml(task.currentOperation)}</p>
                        ` : ''}
                    </div>
                    <span class="topic-card__badge badge--${status}">
                        ${API.getStatusDisplayName(status)}
                    </span>
                </div>
                <div class="task-item__meta">
                    <span>Progress: ${progress}%</span>
                </div>
                <div class="topic-card__progress-bar">
                    <div class="topic-card__progress-fill progress-fill--${status}"
                         style="width: ${progress}%"
                         role="progressbar"
                         aria-valuenow="${progress}"
                         aria-valuemin="0"
                         aria-valuemax="100">
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create empty state message
     * @returns {string} Empty state HTML
     */
    function createEmptyState() {
        return `
            <div class="dashboard__empty" id="emptyState">
                <svg class="empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <h3 class="empty__title">No Topics Found</h3>
                <p class="empty__message">There are no topics to display. Create a new topic to get started.</p>
            </div>
        `;
    }

    /**
     * Create error state message
     * @param {string} message - Error message
     * @returns {string} Error state HTML
     */
    function createErrorState(message) {
        return `
            <div class="error__container">
                <svg class="error__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h3 class="error__title">Error Loading Data</h3>
                <p class="error__message">${escapeHtml(message)}</p>
                <button class="btn btn--primary" onclick="location.reload()">Retry</button>
            </div>
        `;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    function escapeHtml(text) {
        if (text === null || text === undefined) return '';

        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    /**
     * Update last updated timestamp
     */
    function updateLastUpdatedTimestamp() {
        const timestampEl = document.getElementById('lastUpdated');
        if (timestampEl) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timestampEl.textContent = `Last updated: ${timeString}`;
        }
    }

    /**
     * Show loading state
     */
    function showLoading() {
        const loadingEl = document.getElementById('loadingState');
        if (loadingEl) {
            loadingEl.style.display = 'flex';
        }
    }

    /**
     * Hide loading state
     */
    function hideLoading() {
        const loadingEl = document.getElementById('loadingState');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    }

    /**
     * Show error state
     * @param {string} message - Error message
     */
    function showError(message) {
        const errorEl = document.getElementById('errorState');
        const errorMessageEl = document.getElementById('errorMessage');
        if (errorEl && errorMessageEl) {
            errorMessageEl.textContent = message;
            errorEl.style.display = 'flex';
        }
    }

    /**
     * Hide error state
     */
    function hideError() {
        const errorEl = document.getElementById('errorState');
        if (errorEl) {
            errorEl.style.display = 'none';
        }
    }

    // Public API
    return {
        createTopicCard,
        createTopicDetail,
        createTaskItem,
        createEmptyState,
        createErrorState,
        escapeHtml,
        updateLastUpdatedTimestamp,
        showLoading,
        hideLoading,
        showError,
        hideError
    };
})();
