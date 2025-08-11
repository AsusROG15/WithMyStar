# WithMyStar - Agentic Widget for Gamified LLM Training

WithMyStar is a no-code/low-code Android widget project that gamifies Free LLMs into a visually evolving planet companion. The web component provides the interface layer that integrates with Android tools (KWGT widget maker and Tasker) for the complete experience.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Quick Start - Bootstrap and Test (2 minutes)
```bash
# Navigate to repository root
cd /home/runner/work/WithMyStar/WithMyStar

# Serve the web application for testing
python3 -m http.server 8000
# Opens on http://localhost:8000 - the server starts immediately (< 5 seconds)
```

### Validate JavaScript Functionality
```bash
# Create test HTML file to exercise the JavaScript
cat > test_index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WithMyStar Test</title>
</head>
<body>
    <h1>WithMyStar Test</h1>
    <div>
        <input type="text" id="queryInput" placeholder="Enter your query">
        <button id="submitQuery">Learn!</button>
    </div>
    <div id="results"></div>
    <script src="main.js"></script>
</body>
</html>
EOF

# Test the application (run in separate terminal)
curl -s http://localhost:8000/test_index.html | grep -q "WithMyStar Test" && echo "✅ HTML loads correctly"
curl -s http://localhost:8000/main.js | grep -q "submitQuery" && echo "✅ JavaScript loads correctly"
```

### Code Quality and Linting
```bash
# Lint JavaScript code (takes < 10 seconds)
cat > eslint.config.js << 'EOF'
export default [
    {
        languageOptions: {
            globals: {
                console: 'readonly',
                document: 'readonly',
                alert: 'readonly'
            },
            ecmaVersion: 2021,
            sourceType: "script"
        },
        rules: {}
    }
];
EOF

npx eslint main.js
# Should exit with code 0 (no errors) - takes 10-15 seconds on first run
```

## Critical Development Information

### What Works ✅
- **HTTP Server**: `python3 -m http.server 8000` serves the app instantly
- **JavaScript Execution**: main.js runs correctly in browser environment
- **Form Functionality**: Both button clicks and Enter key work as expected
- **Linting**: ESLint validates code quality successfully
- **No Build Process**: This is a static web app - no compilation needed

### What Doesn't Work ❌
- **Node.js Execution**: `node main.js` fails (main.js is client-side browser code)
- **Complex Build Tools**: No webpack, npm scripts, or build pipeline exists
- **Package Dependencies**: No package.json - this is intentional for simplicity

### File Structure
```
/home/runner/work/WithMyStar/WithMyStar/
├── main.js                    # Client-side JavaScript (core functionality)
├── README.md                  # Comprehensive project documentation
├── LICENSE                    # MIT license
└── .github/workflows/         # SLSA attestation workflow
```

## Validation Scenarios

### ALWAYS Run These After Making Changes:
1. **Start HTTP Server** (< 5 seconds):
   ```bash
   python3 -m http.server 8000 &
   SERVER_PID=$!
   ```

2. **Test Core Functionality** - Use browser automation or manual testing:
   - Load http://localhost:8000/test_index.html
   - Enter text in the query input field
   - Click "Learn!" button - should show "Query submitted: [your text]"
   - Test Enter key - should trigger same functionality
   - Check browser console for log: "Sending query to Tasker: [your text]"

3. **Verify Code Quality** (< 15 seconds):
   ```bash
   npx eslint main.js
   # Must exit with code 0
   ```

4. **Clean Up Test Files**:
   ```bash
   kill $SERVER_PID 2>/dev/null || true
   rm -f test_index.html eslint.config.js
   ```

### Manual Validation Checklist:
- [ ] HTTP server starts without errors
- [ ] test_index.html loads showing "WithMyStar Test" heading
- [ ] Input field accepts text entry
- [ ] "Learn!" button triggers JavaScript function
- [ ] Enter key in input field triggers same function
- [ ] Results div updates with confirmation message
- [ ] Browser console shows correct log messages
- [ ] ESLint passes without errors

## Integration Context

This web component is part of a larger Android ecosystem:
- **KWGT (Kustom Widget Maker)**: Creates the visual planet widget interface
- **Tasker**: Handles state management, automation, and logic
- **State Management**: JSON files store planet evolution, user progress
- **Web Interface**: This main.js provides the query submission interface

The JavaScript here handles user input that would be processed by Tasker tasks in the full Android implementation.

## Common Development Tasks

### Making JavaScript Changes:
1. Edit main.js directly (no compilation needed)
2. Refresh browser to see changes immediately
3. Test functionality using validation scenarios above
4. Run ESLint to verify code quality

### Testing User Interactions:
- **Query Submission**: Enter text, click "Learn!" or press Enter
- **Error Handling**: Try empty queries (should show alert)
- **Console Logging**: Check browser dev tools for debug output

### Debugging:
- Use browser developer tools (F12)
- Check console for JavaScript errors or log messages
- Network tab shows if main.js loads correctly
- Elements tab for DOM inspection

## Project-Specific Notes

- **No Timeouts Needed**: All operations complete in seconds
- **No Cancellation Warnings**: No long-running processes exist
- **Browser Testing**: Use Playwright or manual browser testing for validation
- **Mobile Context**: Designed for Android widget integration (KWGT/Tasker)
- **Simple Workflow**: Edit → Serve → Test → Lint - no complex build steps

## Available Tools and Versions

```bash
# Verified available tools:
node --version        # v20.19.4 (not used for execution)
npm --version         # 10.8.2 (used for npx eslint)
python3 --version     # Available (used for HTTP server)
curl --version        # Available (used for testing)
```

## Troubleshooting

**"document is not defined" error**: This means you're trying to run main.js with Node.js instead of in a browser. Use the HTTP server approach instead.

**Server won't start**: Check if port 8000 is already in use: `lsof -i :8000`

**ESLint errors about globals**: Make sure eslint.config.js includes browser globals (document, console, alert).

**File not found errors**: Ensure you're in the repository root directory before running commands.