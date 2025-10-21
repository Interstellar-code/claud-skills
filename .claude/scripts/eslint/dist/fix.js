#!/usr/bin/env ts-node
/**
 * ESLint Fixer - Selective Risk-Based Fixing
 *
 * Usage:
 *   ts-node .claude/scripts/eslint/fix.ts --risk=low [path]
 *   ts-node .claude/scripts/eslint/fix.ts --risk=medium --dry-run resources/js
 *   ts-node .claude/scripts/eslint/fix.ts --risk=high resources/js/components/
 *
 * Flags:
 *   --risk=low|medium|high  Fix only issues at or below this risk level
 *   --dry-run               Preview changes without writing files
 *   --force                 Skip confirmation prompt
 */
import { ESLint } from 'eslint';
import { createESLint, categorizeByRisk, parseArgs, getRiskEmoji, getRelativePath, } from './helpers.js';
async function fixESLint(options) {
    const { risk, dryRun, targetPath } = options;
    console.error(`\n🔧 ESLint Fixer - ${getRiskEmoji(risk)} ${risk} RISK ${dryRun ? '(DRY RUN)' : ''}`);
    console.error(`📁 Target: ${targetPath}\n`);
    // Step 1: Analyze current issues
    console.error('📊 Step 1: Analyzing current issues...');
    const eslintAnalyze = await createESLint(false);
    const results = (await eslintAnalyze.lintFiles([targetPath]));
    const filesWithIssues = results.filter((result) => result.errorCount > 0 || result.warningCount > 0);
    const analysis = categorizeByRisk(filesWithIssues);
    console.error(`   Total issues: ${analysis.summary.total}`);
    console.error(`   🔴 HIGH: ${analysis.summary.high}`);
    console.error(`   🟡 MEDIUM: ${analysis.summary.medium}`);
    console.error(`   🟢 LOW: ${analysis.summary.low}\n`);
    // Step 2: Filter issues by selected risk level
    const issuesToFix = filterIssuesByRisk(analysis, risk);
    if (issuesToFix.length === 0) {
        console.error(`✅ No ${risk} risk issues found. Nothing to fix!`);
        return;
    }
    console.error(`🎯 Step 2: Selected ${issuesToFix.length} issues to fix (${risk} risk and below)`);
    // Get unique files affected
    const affectedFiles = new Set(issuesToFix.map((i) => i.filePath));
    console.error(`   📄 Affected files: ${affectedFiles.size}\n`);
    affectedFiles.forEach((file) => {
        const fileIssues = issuesToFix.filter((i) => i.filePath === file);
        console.error(`   - ${getRelativePath(file)} (${fileIssues.length} issues)`);
    });
    // Step 3: Apply fixes
    console.error(`\n🔧 Step 3: Applying ESLint fixes...`);
    const eslintFixer = await createESLint(true); // fix: true
    const fixResults = await eslintFixer.lintFiles([targetPath]);
    // Filter to only files we want to fix based on risk
    const filesToWrite = fixResults.filter((result) => {
        const hasFixableIssues = result.messages.some((msg) => issuesToFix.some((issue) => issue.filePath === result.filePath && issue.ruleId === msg.ruleId));
        return result.output && hasFixableIssues;
    });
    if (dryRun) {
        console.error(`\n📋 DRY RUN - Would fix ${filesToWrite.length} files:`);
        filesToWrite.forEach((result) => {
            console.error(`   ✓ ${getRelativePath(result.filePath)}`);
        });
        console.error(`\n💡 Run without --dry-run to apply changes`);
        return;
    }
    // Step 4: Write fixed files
    console.error(`\n💾 Step 4: Writing ${filesToWrite.length} fixed files...`);
    await ESLint.outputFixes(filesToWrite);
    console.error(`\n✅ Fixed ${filesToWrite.length} files successfully!`);
    console.error(`\n📊 Summary:`);
    console.error(`   Issues fixed: ${issuesToFix.length}`);
    console.error(`   Files modified: ${filesToWrite.length}`);
    console.error(`   Risk level: ${getRiskEmoji(risk)} ${risk}`);
    console.error(`\n💡 Next steps:`);
    console.error(`   1. Review changes: git diff`);
    console.error(`   2. Run tests manually`);
    console.error(`   3. Commit if all looks good\n`);
}
function filterIssuesByRisk(analysis, maxRisk) {
    const issues = [];
    if (maxRisk === 'LOW') {
        issues.push(...analysis.byRisk.LOW);
    }
    else if (maxRisk === 'MEDIUM') {
        issues.push(...analysis.byRisk.LOW, ...analysis.byRisk.MEDIUM);
    }
    else if (maxRisk === 'HIGH') {
        issues.push(...analysis.byRisk.LOW, ...analysis.byRisk.MEDIUM, ...analysis.byRisk.HIGH);
    }
    return issues;
}
async function main() {
    const args = parseArgs(process.argv.slice(2));
    const options = {
        risk: args['risk'] || 'LOW',
        dryRun: Boolean(args['dry-run']),
        force: Boolean(args['force']),
        targetPath: args['path'] || 'resources/js',
    };
    // Validate risk level
    if (!['LOW', 'MEDIUM', 'HIGH'].includes(options.risk)) {
        console.error(`❌ Invalid risk level: ${options.risk}`);
        console.error(`   Valid options: low, medium, high`);
        process.exit(1);
    }
    try {
        await fixESLint(options);
        process.exit(0);
    }
    catch (error) {
        console.error('\n❌ Fix failed:', error);
        process.exit(1);
    }
}
// Run main function
main();
export { fixESLint };
