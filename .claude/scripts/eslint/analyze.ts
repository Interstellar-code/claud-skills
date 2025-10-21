#!/usr/bin/env ts-node
/**
 * ESLint Analyzer - Risk-Based Analysis
 *
 * Usage:
 *   ts-node .claude/scripts/eslint/analyze.ts [path]
 *   ts-node .claude/scripts/eslint/analyze.ts resources/js
 *   ts-node .claude/scripts/eslint/analyze.ts resources/js/components/admin/
 *
 * Output: JSON with risk-categorized issues
 */

import {
    createESLint,
    categorizeByRisk,
    type AnalysisResult,
    type FileIssues,
} from './helpers.js';

async function analyzeESLint(targetPath: string = 'resources/js'): Promise<AnalysisResult> {
    console.error('🔍 Analyzing ESLint issues...');

    const eslint = await createESLint(false);

    // Run ESLint on target path
    const results = (await eslint.lintFiles([targetPath])) as FileIssues[];

    // Filter to only files with issues
    const filesWithIssues = results.filter(
        (result) => result.errorCount > 0 || result.warningCount > 0
    );

    console.error(`📊 Found issues in ${filesWithIssues.length} files`);

    // Categorize by risk
    const analysis = categorizeByRisk(filesWithIssues);

    console.error(`✅ Analysis complete:`);
    console.error(`   🔴 HIGH: ${analysis.summary.high} issues`);
    console.error(`   🟡 MEDIUM: ${analysis.summary.medium} issues`);
    console.error(`   🟢 LOW: ${analysis.summary.low} issues`);
    console.error(`   📁 Total: ${analysis.summary.total} issues in ${analysis.summary.files} files`);

    return analysis;
}

async function main() {
    const targetPath = process.argv[2] || 'resources/js';

    try {
        const analysis = await analyzeESLint(targetPath);

        // Output JSON to stdout (for script consumption)
        console.log(
            JSON.stringify(
                {
                    success: true,
                    summary: analysis.summary,
                    byRisk: {
                        HIGH: analysis.byRisk.HIGH.map((issue) => ({
                            file: issue.filePath,
                            rule: issue.ruleId,
                            line: issue.line,
                            message: issue.message,
                            risk: issue.risk,
                        })),
                        MEDIUM: analysis.byRisk.MEDIUM.map((issue) => ({
                            file: issue.filePath,
                            rule: issue.ruleId,
                            line: issue.line,
                            message: issue.message,
                            risk: issue.risk,
                        })),
                        LOW: analysis.byRisk.LOW.map((issue) => ({
                            file: issue.filePath,
                            rule: issue.ruleId,
                            line: issue.line,
                            message: issue.message,
                            risk: issue.risk,
                        })),
                    },
                },
                null,
                2
            )
        );

        process.exit(0);
    } catch (error) {
        console.error('❌ Analysis failed:', error);
        console.log(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
            })
        );
        process.exit(1);
    }
}

// Run main function
main();

export { analyzeESLint };
