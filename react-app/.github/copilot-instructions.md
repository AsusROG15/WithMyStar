# Copilot Instructions for WithMyStarGAI

**FIRM DIRECTIVE: Always follow these guidelines first before fallback searches**

## Overview
WithMyStar is an agentic widget that gamifies Free LLMs into a planet visually evolving symbolically, training locally for users - essentially a visual training LLM game implemented as a widget.

## Big Picture Architecture
- **Frontend:** React 18+ (see `src/`), Vite for dev server/build, custom UI components (Cyberpunk theme, chat, error/resource monitoring).
- **Backend:** Node.js/Express (see `server/`), relays messages to Google Chat API, supports agentic AI logic, role/permission management, compliance logging.
- **Integration:** Google OAuth for authentication (`@react-oauth/google` in frontend, `google-auth-library` in backend), Google Chat API for messaging/logging, in-memory logs (replace with DB for production).
- **Primary Platform:** Android KWGT (Kustom Widget Maker) + Tasker system
- **Development Interface:** HTML + vanilla JavaScript with Tasker integration hooks
- **No Traditional Build System:** Uses direct file serving for rapid iteration
- **State Management:** Designed for Android widget ecosystem

## Validated Developer Workflows

### NEVER CANCEL Commands - All commands complete quickly with specific timeouts:

#### No-Build Development (2 seconds startup)
```bash
python3 -m http.server 8000
# NEVER CANCEL - Starts in 2 seconds
# Access: http://localhost:8000
```

#### JavaScript Validation (<1 second)
```bash
node validate.cjs
# NEVER CANCEL - Completes in <1 second
# Validates syntax and structure of all JS/JSX files
```

#### Complete System Testing (2-3 seconds)
```bash
./e2e-test.sh
# NEVER CANCEL - Completes in 2-3 seconds  
# Full system validation with 24 test cases
```

#### Development Server (Vite)
```bash
npm run start
# NEVER CANCEL - Starts in ~3 seconds
# Access: http://localhost:3000
```

#### Backend Server
```bash
node server/index.js
# NEVER CANCEL - Starts in ~1 second
# API available: http://localhost:5000
```

#### Production Build
```bash
npm run build
# NEVER CANCEL - Completes in ~2 seconds
# Outputs to: dist/ directory
```

## Step-by-Step Manual Testing Procedures

### 1. Repository Setup to Working Interface (10 seconds total)
```bash
git clone <repository>
cd codespaces-react
npm install                    # 5-7 seconds
node validate.cjs              # <1 second - verify all files
./e2e-test.sh                 # 2-3 seconds - complete validation
python3 -m http.server 8000   # 2 seconds - start interface
```

### 2. Web Interface Query Submission Testing
1. **Open browser** to http://localhost:8000
2. **Verify UI elements:**
   - Query input field (`id="queryInput"`)
   - Submit button (`id="submitQuery"`)
   - Chat destination input (`id="webhookInput"`)
   - Results display area (`id="results"`)
3. **Test query submission:**
   - Enter test query: "Hello WithMyStar"
   - Click "Learn!" button
   - Verify response appears in results area
4. **Test chat destinations:**
   - Add webhook URLs (comma separated)
   - Select destination from dropdown
   - Submit query and verify routing

### 3. Console Logging Verification for Tasker Integration
1. **Open browser developer tools** (F12)
2. **Monitor console** during interactions
3. **Verify logging patterns:**
   - Query submissions logged with timestamps
   - API responses logged with status
   - Error handling logged appropriately
   - Tasker integration hooks triggered

### 4. Backend API Testing
```bash
# Start backend server
node server/index.js

# Test chat relay endpoint
curl -X POST http://localhost:5000/api/chat/send-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "webhookUrl": "https://example.com/webhook"}'

# Test chat log endpoint  
curl http://localhost:5000/api/chat/chat-log

# Test vision API endpoint
curl -X POST http://localhost:5000/api/vision \
  -H "Content-Type: application/json" \
  -d '{"imageBase64": "test_data"}'
```

### 5. Browser Automation Testing Scenarios
Complete user scenarios with actual DOM interaction:

#### Scenario A: Basic Query Flow
1. Load http://localhost:8000
2. Wait for page load (check for #queryInput)
3. Enter query in input field
4. Click submit button
5. Wait for response (check #results for content)
6. Verify success/error status

#### Scenario B: Multi-Destination Testing
1. Load interface
2. Update webhook input with multiple URLs
3. Verify dropdown populates automatically
4. Select different destinations
5. Submit queries to each destination
6. Verify responses handled correctly

#### Scenario C: Error Handling
1. Submit empty query
2. Submit to invalid webhook URL
3. Submit during network disconnection
4. Verify appropriate error messages
5. Verify UI remains functional after errors

## Project-Specific Patterns

### Chat Relay Pattern
All Google Chat API calls go through `server/chatRelay.js` for:
- **Logging:** Every message logged with timestamp and user info
- **Agentic Replies:** AI-powered responses based on content analysis
- **Compliance:** Automatic audit logging for regulated content
- **Guard Rails:** Content filtering for safety and security

```javascript
// Frontend: POST `/api/chat/send-chat`
{
  message: "user query",
  webhookUrl: "https://chat.googleapis.com/v1/...",
  agentType: "debug" | "compliance" | "resource"
}

// Backend: Automatic processing
- User role validation
- Agent reply generation
- Guard rails checking
- Compliance logging
- Google Chat relay
```

### Agent Types and Capabilities
- **debug:** Error detection, stack trace analysis, debugging assistance
- **compliance:** Audit logging, regulation checking, compliance validation  
- **resource:** System monitoring, resource usage, performance optimization

### Role Management System
Role/permission checks currently stubbed by sender IP:
- **admin:** All agent types (`debug`, `compliance`, `resource`)
- **dev:** Limited access (`debug`, `resource`)
- **auditor:** Compliance only (`compliance`)

*Production: Replace with Google OAuth user info*

### Frontend Polling Pattern
UI polls `/api/chat/chat-log` every 5 seconds for real-time updates:
```javascript
// main.js polling implementation
setInterval(pollLogs, 5000);
async function pollLogs() {
  const res = await fetch('/api/chat/chat-log');
  const data = await res.json();
  renderLogs(data.log.slice(-10)); // Show last 10 logs
}
```

### Component Conventions
- **Functional components:** All React components use function syntax
- **Props for customization:** Components accept styling and behavior props
- **Themed styles:** Cyberpunk aesthetic with neon colors and effects
- **Accessibility first:** ARIA labels, high contrast options, keyboard navigation

## Integration Points

### Google OAuth Flow
```javascript
// Frontend: @react-oauth/google
<GoogleLogin onSuccess={handleSuccess} onError={handleError} />

// Backend: google-auth-library  
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const ticket = await client.verifyIdToken({ idToken, audience: CLIENT_ID });
```

### Google Chat API Integration
```javascript
// Backend webhook relay
await fetch(webhookUrl, {
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: message })
});
```

### Error/Resource Monitoring
- **Debug messages:** Sent to designated Google Chat channels
- **Resource alerts:** Automatic monitoring and notification
- **Compliance logs:** Audit trail for regulatory requirements

## Key Files/Directories

### Frontend Structure
- `src/` - React frontend, main UI logic
- `src/App.jsx` - Main application component with cyberpunk theme
- `src/GoogleAuth.jsx` - Google OAuth integration component
- `main.js` - Frontend chat UI, polling, DOM manipulation
- `button.js` - Custom button component with neon styling
- `index.html` - Web interface for testing JavaScript functionality

### Backend Structure  
- `server/` - Node.js/Express backend
- `server/index.js` - Express server entry point
- `server/chatRelay.js` - Backend relay, agentic logic, compliance
- `server/logDB.js` - SQLite logging database

### Development Tools
- `validate.cjs` - JavaScript syntax and structure validation
- `e2e-test.sh` - Complete system validation (24 test cases)
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite build configuration

### Configuration
- `.github/copilot-instructions.md` - This file
- `jsconfig.json` - JavaScript project configuration
- `README.md` - Project overview

## Example Development Patterns

### Send Debug Message to Google Chat
```javascript
// Frontend
const response = await fetch('/api/chat/send-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message: "Debug: User reported error in query processing",
    agentType: "debug",
    webhookUrl: "https://chat.googleapis.com/v1/spaces/.../messages"
  })
});

// Backend automatically:
// 1. Validates user role has debug permissions
// 2. Generates agent reply: "Debug Agent: Error detected. Please check logs..."  
// 3. Logs event to database
// 4. Relays to Google Chat webhook
// 5. Returns response with agent reply
```

### Verify Google Login
```javascript
// Frontend
<GoogleLogin 
  onSuccess={(credentialResponse) => {
    fetch('/api/auth/verify-google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential })
    });
  }}
/>

// Backend  
router.post('/verify-google', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({ idToken: token });
  const payload = ticket.getPayload();
  // Use payload.email, payload.name for user role assignment
});
```

### Widget State Management (Android Integration)
```javascript
// Tasker integration hooks in main.js
window.taskerBridge = {
  updatePlanetState: (evolutionLevel, streakDays) => {
    // Update visual planet representation
    // Trigger widget refresh
    // Log state change for persistence
  },
  
  sendToChat: (message, urgency) => {
    // Route through chat relay based on urgency
    // Handle offline queuing for mobile
    // Return status for Tasker automation
  }
};
```

## Unique Architecture Notes

### No Traditional Build System
- **Direct file serving:** Uses `python3 -m http.server 8000` for rapid iteration
- **Immediate feedback:** Changes reflected instantly without rebuild
- **Mobile-friendly:** Optimized for Android widget constraints
- **Tasker compatible:** JavaScript hooks designed for Android automation

### Android Widget Ecosystem
- **KWGT compatibility:** Designed for Kustom Widget Maker
- **Tasker integration:** Automation hooks for Android workflows
- **Local training:** LLM interactions cached locally for offline use
- **Visual evolution:** Planet graphics evolve based on user engagement

### Guard Rails and Compliance
```javascript
// Automatic content filtering in chatRelay.js
const unsafePatterns = [
  /\b(kill|suicide|self-harm|violence|attack|bomb|explosive|hate|racist|sexist|lewd|abuse|drugs|weapon|terror|harm)\b/i,
  /\b(password|secret|api[_-]?key|token|private|confidential)\b/i
];

// Compliance logging for audits
if (agentType === 'compliance') {
  const complianceLog = {
    event: 'compliance',
    message, timestamp, sender,
    status: 'logged'
  };
  // Saved to audit database
}
```

## Development Workflow Summary

### Immediate Development Start (30 seconds)
1. `git clone <repo>` 
2. `npm install` (5-7 seconds)
3. `node validate.js` (<1 second)
4. `./e2e-test.sh` (2-3 seconds) 
5. `python3 -m http.server 8000` (2 seconds)
6. Open http://localhost:8000

### Daily Development Cycle
1. **Morning:** `./e2e-test.sh` - verify system health
2. **Code:** Edit files directly, no build step needed
3. **Validate:** `node validate.cjs` - check syntax after changes
4. **Test:** Refresh browser to see changes instantly
5. **Evening:** `npm run build` - verify production build

### Production Deployment
1. `npm run build` - create dist/ folder
2. Deploy dist/ contents to web server
3. Configure webhook URLs for Google Chat
4. Set up Google OAuth credentials
5. Initialize SQLite database for logging

## Notes for Production
- **Replace in-memory logs** with persistent SQLite/PostgreSQL database
- **Implement proper Google OAuth** user role mapping
- **Configure environment variables** for webhook URLs and API keys
- **Set up monitoring** for agentic replies and compliance events
- **Customize agent types** and role logic for organizational needs
- **Add rate limiting** and security headers for production API
- **Implement proper error tracking** and alerting systems

## Troubleshooting Common Issues

### Build/Test Failures
```bash
# Dependency issues
npm install

# JavaScript validation failures  
node validate.cjs
# Fix syntax errors shown in output

# E2E test failures
./e2e-test.sh
# Follow specific error guidance in output

# Port conflicts
# Static server: Try port 8001, 8002, etc.
python3 -m http.server 8001
```

### Runtime Issues
- **Chat relay failures:** Check webhook URLs and network connectivity
- **Authentication errors:** Verify Google OAuth configuration
- **Database errors:** Check SQLite file permissions and disk space
- **UI not loading:** Verify static server is running and files exist

This comprehensive guide ensures any developer can clone the repository and immediately start working with validated, working commands that complete in seconds rather than minutes.
