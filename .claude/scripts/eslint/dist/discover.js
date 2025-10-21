#!/usr/bin/env node
/**
 * Feature Discovery Script - Find all files related to a feature
 *
 * Usage:
 *   node dist/discover.js "subscription-form"
 *   node dist/discover.js "calendar" --type=component
 *   node dist/discover.js "settings" --include-tests
 *
 * Discovery strategies:
 *   1. Directory matching (e.g., resources/js/pages/app/subscriptions/)
 *   2. File name matching (e.g., *subscription*.tsx)
 *   3. Import graph analysis (files that import/are imported by feature files)
 *   4. Type/interface usage (files using same types)
 */
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { parseArgs, getRelativePath } from './helpers.js';
/**
 * Discover files by directory pattern
 */
async function discoverByDirectory(feature) {
    const patterns = [
        `resources/js/pages/app/${feature}/**/*.{ts,tsx}`,
        `resources/js/pages/app/**/${feature}*.{ts,tsx}`,
        `resources/js/components/app/${feature}/**/*.{ts,tsx}`,
        `resources/js/components/app/**/${feature}*.{ts,tsx}`,
        `resources/js/components/admin/${feature}/**/*.{ts,tsx}`,
        `resources/js/components/admin/**/${feature}*.{ts,tsx}`,
    ];
    const files = [];
    for (const pattern of patterns) {
        const matches = await glob(pattern, { cwd: process.cwd() });
        files.push(...matches);
    }
    return [...new Set(files)]; // Remove duplicates
}
/**
 * Discover files by filename pattern
 */
async function discoverByFilename(feature) {
    const patterns = [
        `resources/js/**/*${feature}*.{ts,tsx}`,
        `resources/js/**/${feature}-*.{ts,tsx}`,
        `resources/js/**/${feature}*.{ts,tsx}`,
    ];
    const files = [];
    for (const pattern of patterns) {
        const matches = await glob(pattern, { cwd: process.cwd() });
        files.push(...matches);
    }
    return [...new Set(files)];
}
/**
 * Discover related files by import analysis
 */
async function discoverByImports(coreFiles) {
    const related = [];
    const allTsFiles = await glob('resources/js/**/*.{ts,tsx}', { cwd: process.cwd() });
    for (const file of allTsFiles) {
        if (coreFiles.includes(file))
            continue; // Skip core files
        try {
            const content = fs.readFileSync(file, 'utf-8');
            // Check if this file imports any core files
            for (const coreFile of coreFiles) {
                const coreName = path.basename(coreFile, path.extname(coreFile));
                const coreDir = path.dirname(coreFile);
                // Check for various import patterns
                const importPatterns = [
                    new RegExp(`from ['"].*${coreName}['"]`),
                    new RegExp(`from ['"]${coreDir.replace(/\\/g, '/')}.*['"]`),
                    new RegExp(`import.*${coreName}`),
                ];
                if (importPatterns.some(pattern => pattern.test(content))) {
                    related.push(file);
                    break;
                }
            }
        }
        catch (error) {
            // Skip files that can't be read
        }
    }
    return [...new Set(related)];
}
/**
 * Discover type definition files
 */
async function discoverTypes(feature) {
    const patterns = [
        `resources/js/types/**/*${feature}*.ts`,
        `resources/js/**/${feature}*.types.ts`,
        `resources/js/**/${feature}-types.ts`,
    ];
    const files = [];
    for (const pattern of patterns) {
        const matches = await glob(pattern, { cwd: process.cwd() });
        files.push(...matches);
    }
    return [...new Set(files)];
}
/**
 * Discover test files
 */
async function discoverTests(feature) {
    const patterns = [
        `tests/**/*${feature}*.{ts,tsx}`,
        `resources/js/**/${feature}.test.{ts,tsx}`,
        `resources/js/**/${feature}.spec.{ts,tsx}`,
    ];
    const files = [];
    for (const pattern of patterns) {
        const matches = await glob(pattern, { cwd: process.cwd() });
        files.push(...matches);
    }
    return [...new Set(files)];
}
/**
 * Main discovery function
 */
async function discoverFeature(feature, options = {}) {
    const { includeRelated = true, includeTests = false, strategy = 'both', } = options;
    console.error(`🔍 Discovering files for feature: "${feature}"\n`);
    // Step 1: Discover core files
    let coreFiles = [];
    if (strategy === 'directory' || strategy === 'both') {
        console.error('📁 Searching by directory pattern...');
        const dirFiles = await discoverByDirectory(feature);
        console.error(`   Found ${dirFiles.length} files in feature directories`);
        coreFiles.push(...dirFiles);
    }
    if (strategy === 'filename' || strategy === 'both') {
        console.error('📄 Searching by filename pattern...');
        const nameFiles = await discoverByFilename(feature);
        console.error(`   Found ${nameFiles.length} files matching filename`);
        coreFiles.push(...nameFiles);
    }
    coreFiles = [...new Set(coreFiles)];
    console.error(`\n✅ Core files: ${coreFiles.length}`);
    // Step 2: Discover type files
    console.error('\n🔧 Discovering type definitions...');
    const typeFiles = await discoverTypes(feature);
    console.error(`   Found ${typeFiles.length} type files`);
    // Step 3: Discover related files (import analysis)
    let relatedFiles = [];
    if (includeRelated && coreFiles.length > 0) {
        console.error('\n🔗 Analyzing import graph for related files...');
        relatedFiles = await discoverByImports(coreFiles);
        console.error(`   Found ${relatedFiles.length} related files`);
    }
    // Step 4: Discover test files
    let testFiles = [];
    if (includeTests) {
        console.error('\n🧪 Discovering test files...');
        testFiles = await discoverTests(feature);
        console.error(`   Found ${testFiles.length} test files`);
    }
    const result = {
        feature,
        strategy: strategy,
        files: {
            core: coreFiles,
            related: relatedFiles,
            types: typeFiles,
            tests: testFiles,
            styles: [], // TODO: CSS discovery
        },
        total: coreFiles.length + relatedFiles.length + typeFiles.length + testFiles.length,
    };
    console.error(`\n📊 Total files discovered: ${result.total}\n`);
    return result;
}
/**
 * Format discovery result for display
 */
function formatResult(result, detailed = false) {
    console.log('\n' + '='.repeat(80));
    console.log(`FEATURE DISCOVERY RESULT: ${result.feature}`);
    console.log('='.repeat(80) + '\n');
    console.log(`Strategy: ${result.strategy}`);
    console.log(`Total Files: ${result.total}\n`);
    console.log('─'.repeat(80));
    console.log(`\n📦 CORE FILES (${result.files.core.length})`);
    if (detailed) {
        result.files.core.forEach(file => console.log(`   ${getRelativePath(file)}`));
    }
    else {
        result.files.core.slice(0, 5).forEach(file => console.log(`   ${getRelativePath(file)}`));
        if (result.files.core.length > 5) {
            console.log(`   ... and ${result.files.core.length - 5} more`);
        }
    }
    if (result.files.types.length > 0) {
        console.log(`\n🔧 TYPE FILES (${result.files.types.length})`);
        if (detailed) {
            result.files.types.forEach(file => console.log(`   ${getRelativePath(file)}`));
        }
        else {
            result.files.types.slice(0, 3).forEach(file => console.log(`   ${getRelativePath(file)}`));
            if (result.files.types.length > 3) {
                console.log(`   ... and ${result.files.types.length - 3} more`);
            }
        }
    }
    if (result.files.related.length > 0) {
        console.log(`\n🔗 RELATED FILES (${result.files.related.length})`);
        if (detailed) {
            result.files.related.forEach(file => console.log(`   ${getRelativePath(file)}`));
        }
        else {
            result.files.related.slice(0, 3).forEach(file => console.log(`   ${getRelativePath(file)}`));
            if (result.files.related.length > 3) {
                console.log(`   ... and ${result.files.related.length - 3} more`);
            }
        }
    }
    if (result.files.tests.length > 0) {
        console.log(`\n🧪 TEST FILES (${result.files.tests.length})`);
        if (detailed) {
            result.files.tests.forEach(file => console.log(`   ${getRelativePath(file)}`));
        }
        else {
            result.files.tests.slice(0, 3).forEach(file => console.log(`   ${getRelativePath(file)}`));
            if (result.files.tests.length > 3) {
                console.log(`   ... and ${result.files.tests.length - 3} more`);
            }
        }
    }
    console.log('\n' + '─'.repeat(80));
    console.log('\n💡 NEXT STEPS:\n');
    console.log('Run ESLint on these files:');
    console.log(`   node dist/report.js "${result.files.core.join(' ')}"`);
    console.log('\nOr save to file for later:');
    console.log(`   node dist/discover.js "${result.feature}" --json > feature-files.json\n`);
}
async function main() {
    const args = parseArgs(process.argv.slice(2));
    const feature = args['_'] || args['feature'] || process.argv[2];
    if (!feature || typeof feature !== 'string') {
        console.error('❌ Please provide a feature name\n');
        console.error('Usage: node dist/discover.js <feature-name>\n');
        console.error('Examples:');
        console.error('  node dist/discover.js subscription');
        console.error('  node dist/discover.js calendar --include-tests');
        console.error('  node dist/discover.js settings --strategy=directory\n');
        process.exit(1);
    }
    const options = {
        includeRelated: !args['no-related'],
        includeTests: Boolean(args['include-tests']),
        strategy: args['strategy'] || 'both',
    };
    try {
        const result = await discoverFeature(feature, options);
        if (args['json']) {
            // JSON output for programmatic use
            console.log(JSON.stringify(result, null, 2));
        }
        else {
            // Human-readable output
            formatResult(result, Boolean(args['detailed']));
        }
        process.exit(0);
    }
    catch (error) {
        console.error('\n❌ Discovery failed:', error);
        process.exit(1);
    }
}
// Run main function
main();
export { discoverFeature };
