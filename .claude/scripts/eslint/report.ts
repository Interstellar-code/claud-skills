#!/usr/bin/env ts-node
/**
 * ESLint Reporter - Human-Readable CLI Reports
 *
 * Usage:
 *   ts-node .claude/scripts/eslint/report.ts [path]
 *   ts-node .claude/scripts/eslint/report.ts resources/js
 *   ts-node .claude/scripts/eslint/report.ts --detailed
 *
 * Flags:
 *   --detailed    Show full file paths and all issue details
 *   --json        Output as JSON instead of table
 */

import {
    createESLint,
    categorizeByRisk,
    parseArgs,
    getRiskEmoji,
    formatFilePath,
    estimateFixTime,
    getRelativePath,
    type FileIssues,
} from './helpers.js';

async function generateReport(targetPath: string, detailed: boolean = false): Promise<void> {
    console.log('\n🔍 ESLint Analysis Report\n');
    console.log(`📁 Target: ${targetPath}\n`);
    console.log('─'.repeat(80));

    // Run ESLint analysis
    const eslint = await createESLint(false);
    const results = (await eslint.lintFiles([targetPath])) as FileIssues[];

    const filesWithIssues = results.filter(
        (result) => result.errorCount > 0 || result.warningCount > 0
    );

    if (filesWithIssues.length === 0) {
        console.log('\n✅ No ESLint issues found! Your code is clean.\n');
        return;
    }

    const analysis = categorizeByRisk(filesWithIssues);

    // Summary Section
    console.log('\n📊 SUMMARY\n');
    console.log(`Total Issues:    ${analysis.summary.total}`);
    console.log(`Affected Files:  ${analysis.summary.files}`);
    console.log(`Estimated Time:  ${estimateFixTime([...analysis.byRisk.HIGH, ...analysis.byRisk.MEDIUM, ...analysis.byRisk.LOW])}\n`);

    // Risk Breakdown
    console.log('─'.repeat(80));
    console.log('\n🎯 RISK BREAKDOWN\n');

    if (analysis.summary.high > 0) {
        console.log(`${getRiskEmoji('HIGH')} HIGH RISK:    ${analysis.summary.high} issues - Critical, may break functionality`);
    }
    if (analysis.summary.medium > 0) {
        console.log(`${getRiskEmoji('MEDIUM')} MEDIUM RISK:  ${analysis.summary.medium} issues - Type safety improvements`);
    }
    if (analysis.summary.low > 0) {
        console.log(`${getRiskEmoji('LOW')} LOW RISK:     ${analysis.summary.low} issues - Safe cleanup (unused vars, formatting)`);
    }

    // HIGH RISK Issues (always show details)
    if (analysis.summary.high > 0) {
        console.log('\n' + '─'.repeat(80));
        console.log(`\n🔴 HIGH RISK ISSUES (${analysis.summary.high}) - REQUIRES CAREFUL REVIEW\n`);

        const highRiskByFile = new Map<string, typeof analysis.byRisk.HIGH>();
        analysis.byRisk.HIGH.forEach((issue) => {
            const existing = highRiskByFile.get(issue.filePath) || [];
            highRiskByFile.set(issue.filePath, [...existing, issue]);
        });

        highRiskByFile.forEach((issues, filePath) => {
            console.log(`\n📄 ${getRelativePath(filePath)} (${issues.length} critical issues)`);
            issues.forEach((issue) => {
                console.log(`   Line ${issue.line}: [${issue.ruleId}]`);
                console.log(`   → ${issue.message}`);
            });
        });
    }

    // MEDIUM RISK Issues
    if (analysis.summary.medium > 0) {
        console.log('\n' + '─'.repeat(80));
        console.log(`\n🟡 MEDIUM RISK ISSUES (${analysis.summary.medium})\n`);

        if (detailed) {
            const mediumRiskByFile = new Map<string, typeof analysis.byRisk.MEDIUM>();
            analysis.byRisk.MEDIUM.forEach((issue) => {
                const existing = mediumRiskByFile.get(issue.filePath) || [];
                mediumRiskByFile.set(issue.filePath, [...existing, issue]);
            });

            mediumRiskByFile.forEach((issues, filePath) => {
                console.log(`\n📄 ${getRelativePath(filePath)} (${issues.length} issues)`);
                issues.forEach((issue) => {
                    console.log(`   Line ${issue.line}: [${issue.ruleId}]`);
                    console.log(`   → ${issue.message}`);
                });
            });
        } else {
            // Group by file and show counts
            const fileGroups = new Map<string, number>();
            analysis.byRisk.MEDIUM.forEach((issue) => {
                fileGroups.set(issue.filePath, (fileGroups.get(issue.filePath) || 0) + 1);
            });

            const sortedFiles = Array.from(fileGroups.entries()).sort((a, b) => b[1] - a[1]);
            sortedFiles.forEach(([filePath, count]) => {
                console.log(`   📄 ${formatFilePath(filePath)} (${count} issues)`);
            });
            console.log(`\n   💡 Use --detailed flag to see all issue details`);
        }
    }

    // LOW RISK Issues
    if (analysis.summary.low > 0) {
        console.log('\n' + '─'.repeat(80));
        console.log(`\n🟢 LOW RISK ISSUES (${analysis.summary.low})\n`);

        // Group by file
        const fileGroups = new Map<string, number>();
        analysis.byRisk.LOW.forEach((issue) => {
            fileGroups.set(issue.filePath, (fileGroups.get(issue.filePath) || 0) + 1);
        });

        const sortedFiles = Array.from(fileGroups.entries()).sort((a, b) => b[1] - a[1]);
        sortedFiles.forEach(([filePath, count]) => {
            console.log(`   📄 ${formatFilePath(filePath)} (${count} issues)`);
        });
    }

    // Recommendations Section
    console.log('\n' + '─'.repeat(80));
    console.log('\n💡 RECOMMENDATIONS\n');

    if (analysis.summary.low > 0) {
        console.log(`🟢 Start with LOW RISK fixes (${analysis.summary.low} issues):`);
        console.log(`   ts-node .claude/scripts/eslint/fix.ts --risk=low\n`);
    }

    if (analysis.summary.medium > 0) {
        console.log(`🟡 Then address MEDIUM RISK (${analysis.summary.medium} issues):`);
        console.log(`   ts-node .claude/scripts/eslint/fix.ts --risk=medium --dry-run`);
        console.log(`   (Review changes, then run without --dry-run)\n`);
    }

    if (analysis.summary.high > 0) {
        console.log(`🔴 HIGH RISK issues (${analysis.summary.high}) require manual review:`);
        console.log(`   These may affect component behavior or cause infinite loops.`);
        console.log(`   Review each issue carefully before fixing.\n`);
    }

    console.log('─'.repeat(80) + '\n');
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const targetPath = (args['path'] as string) || 'resources/js';
    const detailed = Boolean(args['detailed']);
    const json = Boolean(args['json']);

    try {
        if (json) {
            // JSON output for script consumption
            const eslint = await createESLint(false);
            const results = (await eslint.lintFiles([targetPath])) as FileIssues[];
            const filesWithIssues = results.filter(
                (result) => result.errorCount > 0 || result.warningCount > 0
            );
            const analysis = categorizeByRisk(filesWithIssues);

            console.log(
                JSON.stringify(
                    {
                        summary: analysis.summary,
                        byRisk: {
                            HIGH: analysis.byRisk.HIGH.map((i) => ({
                                file: getRelativePath(i.filePath),
                                rule: i.ruleId,
                                line: i.line,
                                message: i.message,
                            })),
                            MEDIUM: analysis.byRisk.MEDIUM.map((i) => ({
                                file: getRelativePath(i.filePath),
                                rule: i.ruleId,
                                line: i.line,
                                message: i.message,
                            })),
                            LOW: analysis.byRisk.LOW.map((i) => ({
                                file: getRelativePath(i.filePath),
                                rule: i.ruleId,
                                line: i.line,
                                message: i.message,
                            })),
                        },
                    },
                    null,
                    2
                )
            );
        } else {
            // Human-readable table output
            await generateReport(targetPath, detailed);
        }

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Report generation failed:', error);
        process.exit(1);
    }
}

// Run main function
main();

export { generateReport };
