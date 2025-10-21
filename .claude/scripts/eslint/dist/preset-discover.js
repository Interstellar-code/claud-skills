#!/usr/bin/env node
/**
 * Preset-Based Feature Discovery
 *
 * Usage:
 *   node dist/preset-discover.js subscription-form
 *   node dist/preset-discover.js calendar --with-eslint
 *   node dist/preset-discover.js --list
 *
 * Uses predefined patterns from feature-presets.json for common SubsHero features
 */
import fs from 'fs';
import { glob } from 'glob';
import { parseArgs, getRelativePath } from './helpers.js';
/**
 * Load feature presets from JSON file
 */
function loadPresets() {
    // Use path relative to current script location
    const scriptDir = new URL('.', import.meta.url).pathname;
    const presetsPath = scriptDir.replace(/^\/([A-Z]:)/, '$1') + 'feature-presets.json';
    try {
        const content = fs.readFileSync(presetsPath, 'utf-8');
        return JSON.parse(content);
    }
    catch (error) {
        console.error('❌ Failed to load feature presets:', error);
        console.error(`   Looking for: ${presetsPath}`);
        process.exit(1);
    }
}
/**
 * Discover files using preset patterns
 */
async function discoverFromPreset(presetName) {
    const presets = loadPresets();
    const preset = presets.presets[presetName];
    if (!preset) {
        throw new Error(`Unknown preset: ${presetName}`);
    }
    console.error(`🔍 Discovering files for: ${presetName}`);
    console.error(`📝 ${preset.description}\n`);
    const allFiles = [];
    // Discover files for each pattern
    for (const pattern of preset.patterns) {
        console.error(`   Searching: ${pattern}`);
        try {
            const matches = await glob(pattern, {
                cwd: process.cwd(),
                ignore: preset.excludes || [],
            });
            console.error(`   → Found ${matches.length} files`);
            allFiles.push(...matches);
        }
        catch (error) {
            console.error(`   → Error: ${error}`);
        }
    }
    // Remove duplicates
    const uniqueFiles = [...new Set(allFiles)];
    console.error(`\n✅ Total files: ${uniqueFiles.length}\n`);
    return {
        feature: presetName,
        description: preset.description,
        files: uniqueFiles,
    };
}
/**
 * List all available presets
 */
function listPresets() {
    const presets = loadPresets();
    console.log('\n' + '='.repeat(80));
    console.log('AVAILABLE FEATURE PRESETS');
    console.log('='.repeat(80) + '\n');
    console.log(`Version: ${presets.meta.version}`);
    console.log(`Total Presets: ${presets.meta.total_presets}\n`);
    console.log('─'.repeat(80) + '\n');
    Object.entries(presets.presets).forEach(([name, preset]) => {
        console.log(`📦 ${name}`);
        console.log(`   ${preset.description}`);
        console.log(`   Patterns: ${preset.patterns.length}`);
        console.log('');
    });
    console.log('─'.repeat(80));
    console.log('\nUsage:');
    console.log('  node dist/preset-discover.js <preset-name>');
    console.log('  node dist/preset-discover.js subscription-form --with-eslint\n');
}
/**
 * Format discovery result
 */
function formatResult(result, detailed = false) {
    console.log('\n' + '='.repeat(80));
    console.log(`FEATURE: ${result.feature}`);
    console.log('='.repeat(80) + '\n');
    console.log(result.description);
    console.log(`\nTotal Files: ${result.files.length}\n`);
    console.log('─'.repeat(80));
    console.log('\n📄 FILES:\n');
    if (detailed) {
        result.files.forEach(file => console.log(`   ${getRelativePath(file)}`));
    }
    else {
        result.files.slice(0, 20).forEach(file => console.log(`   ${getRelativePath(file)}`));
        if (result.files.length > 20) {
            console.log(`\n   ... and ${result.files.length - 20} more files`);
            console.log(`   (use --detailed to see all)\n`);
        }
    }
    console.log('\n' + '─'.repeat(80));
    console.log('\n💡 NEXT STEPS:\n');
    // Create file list for ESLint
    const fileList = result.files.join(' ');
    console.log('1. Run ESLint analysis:');
    console.log(`   node dist/report.js ${fileList.substring(0, 100)}...`);
    console.log('\n2. Fix ESLint issues:');
    console.log(`   node dist/fix.js --risk=low ${fileList.substring(0, 100)}...`);
    console.log('\n3. Or save file list:');
    console.log(`   node dist/preset-discover.js ${result.feature} --json > ${result.feature}-files.json\n`);
}
async function main() {
    const args = parseArgs(process.argv.slice(2));
    // List presets
    if (args['list']) {
        listPresets();
        process.exit(0);
    }
    const presetName = args['_'] || process.argv[2];
    if (!presetName || typeof presetName !== 'string') {
        console.error('❌ Please provide a preset name\n');
        console.error('Usage: node dist/preset-discover.js <preset-name>\n');
        console.error('Run with --list to see available presets:\n');
        console.error('  node dist/preset-discover.js --list\n');
        process.exit(1);
    }
    try {
        const result = await discoverFromPreset(presetName);
        if (args['json']) {
            // JSON output
            console.log(JSON.stringify(result, null, 2));
        }
        else if (args['with-eslint']) {
            // Run ESLint analysis immediately
            formatResult(result, Boolean(args['detailed']));
            console.log('\n🔧 Running ESLint analysis...\n');
            // Dynamic import to avoid circular dependency
            const { analyzeESLint } = await import('./analyze.js');
            const fileList = result.files.join(' ');
            await analyzeESLint(fileList);
        }
        else {
            // Human-readable output
            formatResult(result, Boolean(args['detailed']));
        }
        process.exit(0);
    }
    catch (error) {
        console.error('\n❌ Discovery failed:', error);
        if (error instanceof Error && error.message.includes('Unknown preset')) {
            console.error('\nRun with --list to see available presets:\n');
            console.error('  node dist/preset-discover.js --list\n');
        }
        process.exit(1);
    }
}
// Run main function
main();
export { discoverFromPreset, listPresets };
