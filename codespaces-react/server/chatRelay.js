// server/chatRelay.js

// Express route to relay messages to Google Chat webhook, with AI agent and org management
import express from 'express';
// No import needed for fetch in Node.js 18+

const router = express.Router();

// Replace with your Google Chat webhook URL
const GOOGLE_CHAT_WEBHOOK_URL = process.env.GOOGLE_CHAT_WEBHOOK_URL || '';

// In-memory logs for demo purposes (replace with persistent DB in production)
const logs = [];

// Organization roles and permissions (stub)
const orgRoles = {
  admin: ['debug', 'compliance', 'resource'],
  dev: ['debug', 'resource'],
  auditor: ['compliance'],
};

// AI agent logic
function getAgentReply(agentType, message) {
  // Guard rails: block unsafe/harmful content
  const unsafePatterns = [
    /\b(kill|suicide|self-harm|violence|attack|bomb|explosive|hate|racist|sexist|lewd|abuse|drugs|weapon|terror|harm)\b/i,
    /\b(password|secret|api[_-]?key|token|private|confidential)\b/i
  ];
  for (const pattern of unsafePatterns) {
    if (pattern.test(message)) {
      return 'Guard Rails: This content is blocked for safety and compliance.';
    }
  }
  switch (agentType) {
    case 'debug':
      if (/error|fail|exception/i.test(message)) {
        return 'Debug Agent: Error detected. Please check logs and stack trace.';
      }
      break;
    case 'compliance':
      if (/regulation|compliance|audit/i.test(message)) {
        return 'Compliance Agent: This event will be logged for audit.';
      }
      break;
    case 'resource':
      if (/cpu|memory|resource/i.test(message)) {
        return 'Resource Agent: Monitoring system resources.';
      }
      break;
    default:
      if (/hello|hi/i.test(message)) {
        return 'General Agent: Hi there! This is an automated reply.';
      }
  }
  return null;
}

// Organization management: role check (stub)
function getUserRole(sender) {
  // Example: map sender IP to role (replace with real auth)
  if (sender === '127.0.0.1' || sender === 'frontend') return 'admin';
  return 'dev';
}

// Helper functions for in-memory logging
function addLog(logEntry) {
  logs.push({ ...logEntry, id: logs.length + 1 });
  if (logs.length > 100) logs.shift(); // Keep only last 100 logs
}

function getRecentLogs(limit = 10) {
  return logs.slice(-limit).reverse();
}

function getCrashLogs(limit = 10) {
  return logs.filter(log => log.error).slice(-limit).reverse();
}

// Main relay endpoint
router.post('/send-chat', async (req, res) => {
  const { message, webhookUrl, agentType } = req.body;
  const targetWebhook = webhookUrl || GOOGLE_CHAT_WEBHOOK_URL;
  const timestamp = Date.now();
  const sender = req.ip || 'frontend';
  const userRole = getUserRole(sender);
  console.log(`[ChatRelay] Incoming message:`, message, `Agent:`, agentType, `Role:`, userRole);
  if (!message) {
    console.error('[ChatRelay] Missing message');
    return res.status(400).json({ error: 'Missing message' });
  }
  if (!targetWebhook) {
    console.error('[ChatRelay] Webhook URL not configured');
    return res.status(500).json({ error: 'Webhook URL not configured' });
  }

  // Role/permission check
  if (agentType && !orgRoles[userRole]?.includes(agentType)) {
    return res.status(403).json({ error: `Role '${userRole}' cannot use agent '${agentType}'` });
  }

  // AI-powered agent reply with guard rails
  let autoReply = getAgentReply(agentType, message);
  if (autoReply && autoReply.startsWith('Guard Rails:')) {
    // Log blocked message for compliance
    addLog({
      message,
      error: 'Blocked by guard rails',
      timestamp,
      sender,
      agentType,
      autoReply
    });
    return res.status(403).json({ error: autoReply });
  }

  // Compliance logging
  let complianceLog = null;
  if (agentType === 'compliance') {
    complianceLog = {
      event: 'compliance',
      message,
      timestamp,
      sender,
      status: 'logged',
    };
    // In production, save to audit DB
    console.log('[Compliance] Event logged:', complianceLog);
  }

  try {
    const chatRes = await fetch(targetWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
    let chatData;
    try {
      chatData = await chatRes.json();
    } catch (jsonErr) {
      chatData = { raw: await chatRes.text() };
    }
    // Log message
    addLog({ message, webhookUrl: targetWebhook, timestamp, sender, agentType, userName: userRole, chatData: JSON.stringify(chatData), autoReply, error: null });
    console.log(`[ChatRelay] Sent to webhook:`, targetWebhook);
    res.json({ success: true, chatData, autoReply, complianceLog });
  } catch (err) {
    addLog({ message, webhookUrl: targetWebhook, timestamp, sender, agentType, userName: userRole, chatData: null, autoReply, error: err.message });
    console.error('[ChatRelay] Error:', err);
    res.status(500).json({ error: err.message, autoReply, complianceLog });
  }
});

// Endpoint to get recent chat logs
router.get('/chat-log', (req, res) => {
  const recentLogs = getRecentLogs(20);
  res.json({ log: recentLogs });
});

// Endpoint to get recent crash logs
router.get('/crash-log', (req, res) => {
  const crashLogs = getCrashLogs(20);
  res.json({ crashLog: crashLogs });
});

export default router;
