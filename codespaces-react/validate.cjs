#!/usr/bin/env node
/**
 * validate.js - JavaScript validation script for WithMyStar project
 * 
 * Provides immediate syntax checking and structure validation for:
 * - Frontend JavaScript files (React components, main.js, etc.)
 * - Backend JavaScript files (server/*.js)
 * - Configuration files (package.json, vite.config.js)
 * 
 * Usage: node validate.js
 * 
 * NEVER CANCEL - Validation completes in <1 second
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 WithMyStar JavaScript Validation Starting...');
console.log('⚡ NEVER CANCEL - Validation completes in <1 second');

let totalFiles = 0;
let validFiles = 0;
let errors = [];

/**
 * Validate JavaScript syntax by basic checks
 */
function validateJavaScript(filePath, content) {
  try {
    // JSON validation
    if (filePath.endsWith('.json')) {
      JSON.parse(content);
      return { valid: true };
    }
    
    // Basic syntax checks for JavaScript/JSX files
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      // Check for common syntax errors
      const lines = content.split('\n');
      let braceCount = 0;
      let parenCount = 0;
      let bracketCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip comments and empty lines
        if (line.startsWith('//') || line.startsWith('/*') || line === '') continue;
        
        // Count braces, parentheses, and brackets
        for (const char of line) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
          if (char === '(') parenCount++;
          if (char === ')') parenCount--;
          if (char === '[') bracketCount++;
          if (char === ']') bracketCount--;
        }
      }
      
      // Check for unmatched braces/parens/brackets
      if (braceCount !== 0) {
        return { valid: false, error: `Unmatched braces (${braceCount})` };
      }
      if (parenCount !== 0) {
        return { valid: false, error: `Unmatched parentheses (${parenCount})` };
      }
      if (bracketCount !== 0) {
        return { valid: false, error: `Unmatched brackets (${bracketCount})` };
      }
      
      // Check for basic syntax requirements
      if (content.trim().length < 5) {
        return { valid: false, error: 'File appears to be empty' };
      }
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/**
 * Check file structure and required elements
 */
function validateStructure(filePath, content) {
  const issues = [];
  
  if (filePath.includes('main.js')) {
    if (!content.includes('document.getElementById')) {
      issues.push('Missing DOM element access');
    }
    if (!content.includes('fetch(')) {
      issues.push('Missing API calls');
    }
  }
  
  if (filePath.includes('server/') && filePath.endsWith('.js')) {
    if (!content.includes('module.exports') && !content.includes('export') && !content.includes('app.')) {
      issues.push('Missing module exports or app definition');
    }
  }
  
  if (filePath.includes('App.jsx')) {
    if (!content.includes('function') && !content.includes('const')) {
      issues.push('Missing React component definition');
    }
  }
  
  return issues;
}

/**
 * Validate a single file
 */
function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    totalFiles++;
    
    // Syntax validation
    const syntaxResult = validateJavaScript(filePath, content);
    
    // Structure validation
    const structureIssues = validateStructure(filePath, content);
    
    if (syntaxResult.valid && structureIssues.length === 0) {
      validFiles++;
      console.log(`✅ ${path.relative(process.cwd(), filePath)}`);
    } else {
      const relativePath = path.relative(process.cwd(), filePath);
      console.log(`❌ ${relativePath}`);
      
      if (!syntaxResult.valid) {
        errors.push(`${relativePath}: Syntax Error - ${syntaxResult.error}`);
      }
      
      if (structureIssues.length > 0) {
        errors.push(`${relativePath}: Structure Issues - ${structureIssues.join(', ')}`);
      }
    }
  } catch (error) {
    errors.push(`${filePath}: File Read Error - ${error.message}`);
  }
}

/**
 * Find and validate all relevant files
 */
function validateProject() {
  const filesToCheck = [
    // Frontend files
    'main.js',
    'button.js',
    'button.jsx',
    'public/withmystar-ui.js',
    
    // React components
    'src/App.jsx',
    'src/AppLink.jsx',
    'src/GoogleAuth.jsx',
    'src/GearIcon.jsx',
    'src/SettingsTab.jsx',
    'src/index.jsx',
    
    // Backend files
    'server/index.js',
    'server/chatRelay.js',
    'server/logDB.js',
    
    // Configuration files
    'package.json',
    'vite.config.js',
    'jsconfig.json'
  ];
  
  console.log('\n📋 Validating Project Files:');
  
  filesToCheck.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      validateFile(fullPath);
    } else {
      console.log(`⚠️  ${file} (not found)`);
    }
  });
}

/**
 * Check for common issues
 */
function checkCommonIssues() {
  console.log('\n🔧 Checking Common Issues:');
  
  // Check if node_modules exists
  if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules directory exists');
  } else {
    console.log('❌ node_modules missing - run: npm install');
    errors.push('Dependencies not installed');
  }
  
  // Check if index.html exists and has required elements
  if (fs.existsSync('index.html')) {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    if (indexContent.includes('id="queryInput"') && indexContent.includes('id="submitQuery"')) {
      console.log('✅ index.html has required UI elements');
    } else {
      console.log('❌ index.html missing required UI elements');
      errors.push('index.html missing required UI elements');
    }
  }
  
  // Check if server files exist
  const serverFiles = ['server/index.js', 'server/chatRelay.js'];
  serverFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} exists`);
    } else {
      console.log(`❌ ${file} missing`);
      errors.push(`Missing server file: ${file}`);
    }
  });
}

/**
 * Main validation function
 */
function main() {
  const startTime = Date.now();
  
  validateProject();
  checkCommonIssues();
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log('\n📊 Validation Summary:');
  console.log(`⏱️  Completed in ${duration}ms`);
  console.log(`📁 Files checked: ${totalFiles}`);
  console.log(`✅ Valid files: ${validFiles}`);
  console.log(`❌ Issues found: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\n🚨 Issues Found:');
    errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
    console.log('\n💡 Fix these issues and run validation again');
    process.exit(1);
  } else {
    console.log('\n🎉 All checks passed! JavaScript structure is valid.');
    console.log('✨ Ready for development and testing');
    process.exit(0);
  }
}

// Only run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateFile, validateProject, checkCommonIssues };