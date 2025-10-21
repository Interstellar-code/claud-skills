/**
 * ESLint Helper Utilities
 *
 * Shared utilities for ESLint analysis, fixing, and reporting
 */
import { ESLint } from 'eslint';
/**
 * Risk classification rules based on ESLint rule IDs
 */
export const RISK_RULES = {
    LOW: [
        '@typescript-eslint/no-unused-vars',
        'no-unused-vars',
        '@typescript-eslint/no-unused-imports',
        'no-console',
        'semi',
        'comma-dangle',
        'quotes',
        'indent',
        'no-trailing-spaces',
        'eol-last',
        'max-len',
    ],
    MEDIUM: [
        '@typescript-eslint/no-explicit-any',
        '@typescript-eslint/no-inferrable-types',
        'react/prop-types',
        'react/default-props-match-prop-types',
        '@typescript-eslint/explicit-module-boundary-types',
        '@typescript-eslint/no-non-null-assertion',
    ],
    HIGH: [
        'react-hooks/exhaustive-deps',
        'react/no-unescaped-entities',
        '@typescript-eslint/ban-types',
        'react/no-children-prop',
        'react-hooks/rules-of-hooks',
        'no-unsafe-optional-chaining',
    ],
};
/**
 * Classify an ESLint issue by risk level
 */
export function classifyRisk(ruleId) {
    if (!ruleId)
        return 'MEDIUM'; // Default for unknown rules
    if (RISK_RULES.LOW.includes(ruleId))
        return 'LOW';
    if (RISK_RULES.MEDIUM.includes(ruleId))
        return 'MEDIUM';
    if (RISK_RULES.HIGH.includes(ruleId))
        return 'HIGH';
    // Default to MEDIUM for unclassified rules
    return 'MEDIUM';
}
/**
 * Categorize ESLint results by risk level
 */
export function categorizeByRisk(results) {
    const byRisk = {
        HIGH: [],
        MEDIUM: [],
        LOW: [],
    };
    const byFile = new Map();
    for (const file of results) {
        const fileIssues = [];
        for (const issue of file.messages) {
            const risk = classifyRisk(issue.ruleId);
            const categorized = {
                ...issue,
                filePath: file.filePath,
                risk,
            };
            byRisk[risk].push(categorized);
            fileIssues.push(categorized);
        }
        if (fileIssues.length > 0) {
            byFile.set(file.filePath, fileIssues);
        }
    }
    const summary = {
        total: byRisk.HIGH.length + byRisk.MEDIUM.length + byRisk.LOW.length,
        high: byRisk.HIGH.length,
        medium: byRisk.MEDIUM.length,
        low: byRisk.LOW.length,
        files: byFile.size,
    };
    return { summary, byRisk, byFile };
}
/**
 * Get relative path from project root
 */
export function getRelativePath(filePath) {
    const cwd = process.cwd();
    return filePath.replace(cwd, '').replace(/^[\\\/]/, '');
}
/**
 * Format file path for display (shorten if too long)
 */
export function formatFilePath(filePath, maxLength = 60) {
    const relative = getRelativePath(filePath);
    if (relative.length <= maxLength)
        return relative;
    const parts = relative.split(/[\\\/]/);
    if (parts.length <= 2)
        return relative;
    // Show first and last parts with ... in middle
    const first = parts[0];
    const last = parts[parts.length - 1];
    return `${first}/.../${last}`;
}
/**
 * Get risk emoji indicator
 */
export function getRiskEmoji(risk) {
    switch (risk) {
        case 'LOW':
            return '🟢';
        case 'MEDIUM':
            return '🟡';
        case 'HIGH':
            return '🔴';
    }
}
/**
 * Create ESLint instance with project config
 */
export async function createESLint(fix = false) {
    return new ESLint({
        fix,
        cache: false,
        errorOnUnmatchedPattern: false,
    });
}
/**
 * Filter results to only include fixable issues
 */
export function filterFixable(results) {
    return results
        .map((result) => ({
        ...result,
        messages: result.messages.filter((msg) => msg.ruleId !== null),
    }))
        .filter((result) => result.messages.length > 0);
}
/**
 * Estimate fix time based on issue count and risk
 */
export function estimateFixTime(issues) {
    const counts = {
        HIGH: issues.filter((i) => i.risk === 'HIGH').length,
        MEDIUM: issues.filter((i) => i.risk === 'MEDIUM').length,
        LOW: issues.filter((i) => i.risk === 'LOW').length,
    };
    // Time estimates (minutes per issue)
    const timePerIssue = {
        HIGH: 3,
        MEDIUM: 1,
        LOW: 0.5,
    };
    const totalMinutes = counts.HIGH * timePerIssue.HIGH +
        counts.MEDIUM * timePerIssue.MEDIUM +
        counts.LOW * timePerIssue.LOW;
    if (totalMinutes < 1)
        return '<1 min';
    if (totalMinutes < 60)
        return `${Math.round(totalMinutes)} min`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
}
/**
 * Group issues by file
 */
export function groupByFile(issues) {
    const grouped = new Map();
    for (const issue of issues) {
        const existing = grouped.get(issue.filePath) || [];
        grouped.set(issue.filePath, [...existing, issue]);
    }
    return grouped;
}
/**
 * Parse command-line arguments
 */
export function parseArgs(args) {
    const parsed = {};
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            const nextArg = args[i + 1];
            if (nextArg && !nextArg.startsWith('--')) {
                parsed[key] = nextArg;
                i++; // Skip next arg
            }
            else {
                parsed[key] = true;
            }
        }
        else if (!parsed['path']) {
            // First non-flag argument is the path
            parsed['path'] = arg;
        }
    }
    return parsed;
}
