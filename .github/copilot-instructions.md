# WithMyStar Planet Companion

WithMyStar is an agentic widget system that gamifies interaction with LLMs through a visual planet companion. The project provides both an Android widget experience (via KWGT and Tasker) and a web interface for testing and development.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
- Clone the repository: `git clone https://github.com/AsusROG15/WithMyStar.git`
- Navigate to directory: `cd WithMyStar`
- **No build required** - this project uses direct file serving

### Web Interface Development and Testing
- Start development server: `python3 -m http.server 8000`
  - Server starts in 2 seconds. NEVER CANCEL.
  - Access at: `http://localhost:8000`
- **CRITICAL**: Always test the web interface after making changes to `main.js`
- Validate complete setup: `./e2e-test.sh` - takes 2-3 seconds. NEVER CANCEL.
- Validate JavaScript only: `node validate.js` - takes <0.1 seconds

### File Structure and Key Components
```
WithMyStar/
├── main.js           # Core JavaScript with Tasker integration hooks
├── index.html        # Web interface for testing
├── README.md         # Comprehensive project documentation
├── LICENSE           # MIT license
├── validate.js       # JavaScript validation script
├── e2e-test.sh       # End-to-end validation script
└── .github/
    └── workflows/    # SLSA workflow for artifact attestation
```

## Validation Scenarios

### CRITICAL: Manual Validation Requirements
After making ANY changes to the codebase:

1. **Web Interface Test** (REQUIRED):
   - Start server: `python3 -m http.server 8000`
   - Navigate to: `http://localhost:8000`
   - Enter test query: "Test query about planets"
   - Click "Learn!" button
   - Verify console message: `Sending query to Tasker: "Test query about planets"`
   - Verify UI update: `Query submitted: "Test query about planets". Awaiting planet response...`

2. **JavaScript Validation** (REQUIRED):
   - Run: `node validate.js`
   - Must show: "✅ Validation Complete"
   - All function and element checks must pass

3. **End-to-End Validation** (RECOMMENDED):
   - Run: `./e2e-test.sh`
   - Must complete in 2-3 seconds showing "🚀 WithMyStar is ready for development!"

## Build and Test Commands

### No Traditional Build Process
- **No package.json** - this is not a Node.js package
- **No npm commands** - project uses direct file serving
- **No compilation** - JavaScript and HTML served directly

### Validation Commands (ALWAYS run these)
```bash
# Quick JavaScript validation (0.1 seconds)
node validate.js

# Full end-to-end test (2-3 seconds) 
./e2e-test.sh

# Manual web server test
python3 -m http.server 8000
# Open http://localhost:8000 and test interface
```

### Timing Expectations
- **Web server startup**: 2 seconds - NEVER CANCEL
- **JavaScript validation**: <0.1 seconds
- **End-to-end test**: 2-3 seconds - NEVER CANCEL
- **Complete validation cycle**: <5 seconds total

## Project Context and Architecture

### Core Concept
WithMyStar is a **no-code/low-code Android widget** that creates a visual planet companion evolving based on user interactions. The web interface serves as a development and testing environment.

### Technology Stack
- **Primary Platform**: Android KWGT (Kustom Widget Maker) + Tasker
- **Development Interface**: HTML + Vanilla JavaScript
- **Backend**: File-based state management with JSON
- **CI/CD**: GitHub Actions with SLSA attestation

### Key Integration Points
- `main.js` contains hooks for Tasker system integration
- DOM elements: `queryInput`, `submitQuery`, `results`
- Console logging for debugging Tasker communication
- State management designed for Android widget system

## Common Tasks and Workflows

### Modifying JavaScript Functionality
1. Edit `main.js`
2. Run `node validate.js` to check syntax
3. Start test server: `python3 -m http.server 8000`
4. Test in browser at `http://localhost:8000`
5. Verify console logs show correct Tasker integration
6. Run `./e2e-test.sh` for full validation

### Adding New Features
1. **Always** check existing DOM element references in `main.js`
2. Update `index.html` if new UI elements are needed
3. Maintain Tasker integration compatibility
4. Update validation scripts if new functionality is added
5. Test complete user scenario end-to-end

### Debugging Issues
1. Run `node validate.js` first - catches syntax errors immediately
2. Check browser console for JavaScript errors
3. Verify server is serving files correctly: `curl http://localhost:8000/main.js`
4. Use `./e2e-test.sh` to validate entire system

## Android Widget Development (KWGT/Tasker)
While this repository focuses on the web interface, the complete WithMyStar system includes:
- KWGT widget for visual planet display
- Tasker profiles for state management and automation
- JSON-based state files for persistence
- Command protocol for AI agent interaction

Refer to README.md for detailed Android setup instructions.

## Critical Reminders

### NEVER CANCEL Operations
- Web server startup: Always wait 2+ seconds
- Validation scripts: Always wait for completion (<3 seconds)
- When in doubt, set timeouts to 10+ seconds for safety

### Always Validate Changes
- **JavaScript changes**: Run `node validate.js`
- **UI changes**: Test web interface manually
- **Complete changes**: Run `./e2e-test.sh`
- **Before committing**: Ensure all validation passes

### File Serving Notes
- No build artifacts to ignore
- All files are source files served directly
- Changes to HTML/JS are immediately visible after server restart
- No caching issues with development server

## Quick Command Reference

```bash
# Start development
python3 -m http.server 8000

# Validate JavaScript
node validate.js

# Full system test
./e2e-test.sh

# Check file structure
ls -la

# Verify Tasker integration
grep -n "Tasker" main.js

# Test server response
curl -s http://localhost:8000/ | head -5
```

This project prioritizes simplicity, direct file serving, and rapid iteration for the Android widget development workflow.