/**
 * API Module - Fetch and parse V2.0 topics.json
 *
 * V2.0 Structure:
 * {
 *   "topics": {
 *     "topic-slug": {
 *       "slug": "topic-slug",
 *       "title": "Topic Title",
 *       "description": "Description",
 *       "status": "pending|in_progress|completed|blocked",
 *       "currentPhase": "phase-1|phase-2|phase-3|execution",
 *       "progress": 0-100,
 *       "tasks": [
 *         {
 *           "taskId": "task-001",
 *           "status": "pending|in_progress|completed|blocked",
 *           "progress": 0-100,
 *           "currentOperation": "Description"
 *         }
 *       ],
 *       "files": {
 *         "topicplan": "path/to/topicplan.md",
 *         "spec": "path/to/spec/",
 *         "deliverables": "path/to/deliverables/"
 *       },
 *       "metadata": {
 *         "createdAt": "ISO-8601",
 *         "lastUpdated": "ISO-8601"
 *       }
 *     }
 *   }
 * }
 */

const API = (() => {
    /**
     * Get topics data from loaded topics.js (works with file:// protocol)
     * @returns {Promise<Object>} Parsed topics data
     */
    async function fetchTopics() {
        try {
            // Use TOPICS_DATA loaded from data/topics.js (loaded in index.html)
            // This works with file:// protocol unlike fetch()
            if (typeof TOPICS_DATA === 'undefined') {
                throw new Error('TOPICS_DATA not loaded. Make sure data/topics.js is loaded before api.js');
            }

            const data = TOPICS_DATA;

            // Validate V2.0 structure
            if (!data.topics || !Array.isArray(data.topics)) {
                throw new Error('Invalid topics.json structure: topics should be an array');
            }

            return data;
        } catch (error) {
            console.error('Error loading topics:', error);
            throw error;
        }
    }

    /**
     * Get all topics as an array
     * @returns {Promise<Array>} Array of topic objects
     */
    async function getAllTopics() {
        try {
            const data = await fetchTopics();
            const topics = data.topics; // Already an array in V2.0

            // Sort by last updated (most recent first)
            topics.sort((a, b) => {
                const dateA = new Date(a.lastActiveAt || a.createdAt || 0);
                const dateB = new Date(b.lastActiveAt || b.createdAt || 0);
                return dateB - dateA;
            });

            return topics;
        } catch (error) {
            console.error('Error getting all topics:', error);
            throw error;
        }
    }

    /**
     * Get a single topic by slug
     * @param {string} slug - Topic slug
     * @returns {Promise<Object|null>} Topic object or null if not found
     */
    async function getTopicBySlug(slug) {
        try {
            const data = await fetchTopics();
            // topics is an array in V2.0, find by slug
            return data.topics.find(t => t.slug === slug) || null;
        } catch (error) {
            console.error(`Error getting topic ${slug}:`, error);
            throw error;
        }
    }

    /**
     * Get topic statistics
     * @returns {Promise<Object>} Statistics object
     */
    async function getTopicStats() {
        try {
            const topics = await getAllTopics();

            const stats = {
                total: topics.length,
                byStatus: {
                    pending: 0,
                    in_progress: 0,
                    completed: 0,
                    blocked: 0
                },
                byPhase: {
                    'phase-1': 0,
                    'phase-2': 0,
                    'phase-3': 0,
                    'execution': 0
                },
                totalTasks: 0,
                completedTasks: 0
            };

            topics.forEach(topic => {
                // Count by status
                if (topic.status && stats.byStatus.hasOwnProperty(topic.status)) {
                    stats.byStatus[topic.status]++;
                }

                // Count by phase
                if (topic.currentPhase && stats.byPhase.hasOwnProperty(topic.currentPhase)) {
                    stats.byPhase[topic.currentPhase]++;
                }

                // Count tasks
                if (topic.tasks && Array.isArray(topic.tasks)) {
                    stats.totalTasks += topic.tasks.length;
                    stats.completedTasks += topic.tasks.filter(t => t.status === 'completed').length;
                }
            });

            return stats;
        } catch (error) {
            console.error('Error getting topic stats:', error);
            throw error;
        }
    }

    /**
     * Calculate task completion ratio for a topic
     * @param {Object} topic - Topic object
     * @returns {Object} { completed, total, percentage }
     */
    function getTaskCompletionRatio(topic) {
        if (!topic.tasks || !Array.isArray(topic.tasks) || topic.tasks.length === 0) {
            return { completed: 0, total: 0, percentage: 0 };
        }

        const total = topic.tasks.length;
        const completed = topic.tasks.filter(task => task.status === 'completed').length;
        const percentage = Math.round((completed / total) * 100);

        return { completed, total, percentage };
    }

    /**
     * Format timestamp for display
     * @param {string} isoString - ISO-8601 timestamp
     * @returns {string} Formatted timestamp
     */
    function formatTimestamp(isoString) {
        if (!isoString) return 'N/A';

        try {
            const date = new Date(isoString);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            // Relative time for recent timestamps
            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

            // Absolute time for older timestamps
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting timestamp:', error);
            return 'Invalid date';
        }
    }

    /**
     * Get status display name
     * @param {string} status - Status code
     * @returns {string} Display name
     */
    function getStatusDisplayName(status) {
        const statusMap = {
            'pending': 'Pending',
            'in_progress': 'In Progress',
            'completed': 'Completed',
            'blocked': 'Blocked'
        };

        return statusMap[status] || status;
    }

    /**
     * Get phase display name
     * @param {string} phase - Phase code
     * @returns {string} Display name
     */
    function getPhaseDisplayName(phase) {
        const phaseMap = {
            'phase-1': 'Phase 1: Requirements',
            'phase-2': 'Phase 2: Agent Selection',
            'phase-3': 'Phase 3: Planning',
            'execution': 'Execution'
        };

        return phaseMap[phase] || phase;
    }

    /**
     * Validate topic object structure
     * @param {Object} topic - Topic object
     * @returns {boolean} True if valid
     */
    function validateTopic(topic) {
        if (!topic || typeof topic !== 'object') return false;

        const requiredFields = ['slug', 'title', 'status'];
        return requiredFields.every(field => topic.hasOwnProperty(field));
    }

    // Public API
    return {
        fetchTopics,
        getAllTopics,
        getTopicBySlug,
        getTopicStats,
        getTaskCompletionRatio,
        formatTimestamp,
        getStatusDisplayName,
        getPhaseDisplayName,
        validateTopic
    };
})();
