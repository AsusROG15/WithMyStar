
// Simple validation script for main.js functionality
const fs = require('fs');
const path = require('path');

console.log('=== WithMyStar Validation Script ===');

// Check if main.js exists and is readable
const mainJsPath = path.join(__dirname, 'main.js');
if (!fs.existsSync(mainJsPath)) {
    console.error('❌ main.js not found');
    process.exit(1);
}

console.log('✅ main.js exists');

// Read and validate main.js content
const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

// Check for essential functions
const requiredFunctions = ['submitQuery', 'updateUI'];
const requiredElements = ['queryInput', 'submitQuery', 'results'];

console.log('\n=== Function Validation ===');
requiredFunctions.forEach(func => {
    if (mainJsContent.includes(`function ${func}(`)) {
        console.log(`✅ Function ${func} found`);
    } else {
        console.log(`❌ Function ${func} missing`);
    }
});

console.log('\n=== DOM Element Reference Validation ===');
requiredElements.forEach(element => {
    if (mainJsContent.includes(`getElementById("${element}")`)) {
        console.log(`✅ Element reference ${element} found`);
    } else {
        console.log(`❌ Element reference ${element} missing`);
    }
});

// Check for Tasker integration references
console.log('\n=== Tasker Integration Validation ===');
if (mainJsContent.includes('Tasker')) {
    console.log('✅ Tasker integration references found');
} else {
    console.log('❌ No Tasker integration references found');
}

// Validate JavaScript syntax
try {
    new Function(mainJsContent);
    console.log('✅ JavaScript syntax is valid');
} catch (e) {
    console.log(`❌ JavaScript syntax error: ${e.message}`);
}

console.log('\n=== Validation Complete ===');