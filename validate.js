// JavaScript Validation Test for ISONOMIA 2.0
// This file tests the critical parts of the implementation

const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('index.html', 'utf8');

// Extract JavaScript content (between <script> tags)
const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/g);

if (!scriptMatches) {
    console.error('❌ No script tags found');
    process.exit(1);
}

console.log(`✅ Found ${scriptMatches.length} script blocks`);

// Check for critical components
const checks = [
    { name: 'UserProfile', pattern: /const UserProfile\s*=\s*\{/ },
    { name: 'ObjectionHandler', pattern: /const ObjectionHandler\s*=\s*\{/ },
    { name: 'narrativeData', pattern: /const narrativeData\s*=\s*\{/ },
    { name: 'UserProfile.load()', pattern: /UserProfile\.load\(\)/ },
    { name: 'transition with optionData', pattern: /transition\(stepKey,\s*addToHistory\s*=\s*true,\s*optionData\s*=\s*null\)/ },
    { name: '_processOptionData', pattern: /_processOptionData\(optionData\)/ },
    { name: '_personalizeText', pattern: /_personalizeText\(text\)/ },
    { name: 'Commitment Bar', pattern: /commitment-bar/ },
    { name: 'ISONOMIA3D', pattern: /const ISONOMIA3D/ },
    { name: 'redirect handling', pattern: /redirect/ }
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
    if (check.pattern.test(html)) {
        console.log(`✅ ${check.name}`);
        passed++;
    } else {
        console.log(`❌ ${check.name}`);
        failed++;
    }
});

// Count narrative nodes
const nodeMatches = html.match(/"[\w_]+":\s*\{[\s\S]*?"text":/g);
console.log(`\n📊 Found approximately ${nodeMatches ? nodeMatches.length : 0} narrative nodes`);

// Check for potential issues
const issues = [];

// Check for JSON.parse without try-catch
if (!/try\s*\{[^}]*JSON\.parse/.test(html)) {
    issues.push('⚠️ JSON.parse without try-catch');
}

// Check for sessionStorage usage
if (!/sessionStorage/.test(html)) {
    issues.push('⚠️ No sessionStorage usage found');
}

// Check for potential undefined variables
if (/\bdata\._dynamicText\b/.test(html) && !/data\._dynamicText/.test(html)) {
    issues.push('⚠️ Potential undefined _dynamicText usage');
}

console.log('\n📋 Summary:');
console.log(`   Passed: ${passed}/${checks.length}`);
console.log(`   Failed: ${failed}/${checks.length}`);

if (issues.length > 0) {
    console.log('\n⚠️ Potential Issues:');
    issues.forEach(issue => console.log(`   ${issue}`));
}

// Final result
if (failed === 0) {
    console.log('\n✅ All critical components found!');
    process.exit(0);
} else {
    console.log('\n❌ Some components missing!');
    process.exit(1);
}
