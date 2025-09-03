
const resultsDiv = document.getElementById('results');
const logResultsDiv = document.getElementById('logResults');
let messageHistory = [];
// Poll backend for error logs and important info
function renderLogs(logs) {
  logResultsDiv.innerHTML = `<h3>Error Logs & Important Info</h3>` + logs.map(log => {
    const time = log.timestamp ? new Date(log.timestamp).toLocaleString() : '';
    let type = log.error ? 'Error' : 'Info';
    let color = log.error ? 'red' : 'blue';
    // Show sender name if available, fallback to IP or 'Unknown'
    const sender = log.sender || log.userName || 'Unknown';
    return `
      <div style="margin-bottom:1em;display:flex;align-items:flex-start;">
        <img src="/public/Octocat.png" alt="avatar" style="width:24px;height:24px;margin-right:8px;border-radius:50%;">
        <div>
          <div style="font-size:0.9em;color:#888;">${time} <span style="color:${color};font-weight:bold;">${type}</span> <span style="margin-left:8px;color:#555;">User: <strong>${sender}</strong></span></div>
          <div><strong>Message:</strong> ${log.message}</div>
          ${log.error ? `<div style="color:red;"><strong>Error:</strong> ${log.error}</div>` : ''}
          ${log.autoReply ? `<div style="color:green;"><strong>AutoReply:</strong> ${log.autoReply}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function pollLogs() {
  try {
    const res = await fetch('/api/chat/chat-log');
    const data = await res.json();
    if (data.log) {
      renderLogs(data.log.slice(-10)); // show last 10 logs
    }
  } catch (err) {
    logResultsDiv.innerHTML = `<div style='color:red;'>Failed to load logs: ${err.message}</div>`;
  }
}

setInterval(pollLogs, 5000); // poll every 5 seconds
pollLogs();

const webhookInput = document.getElementById('webhookInput');
const destinationSelect = document.getElementById('destinationSelect');

function updateDestinationOptions() {
  const urls = webhookInput.value.split(',').map(u => u.trim()).filter(u => u);
  destinationSelect.innerHTML = urls.map(url => `<option value="${url}">${url}</option>`).join('');
}

webhookInput.addEventListener('input', updateDestinationOptions);

function renderHistory() {
  resultsDiv.innerHTML = messageHistory.map(msg => {
    const time = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
    let status = '';
    if (msg.status === 'sent') {
      status = '<span style="color:green;font-size:0.9em;">✔ Sent</span>';
    } else if (msg.status === 'failed') {
      status = '<span style="color:red;font-size:0.9em;">✖ Failed</span>';
    }
    // Show user name if available, fallback to 'You'
    const userName = msg.userName || 'You';
    return `
      <div style="margin-bottom:1em;display:flex;align-items:flex-start;">
        <img src="/public/Octocat.png" alt="avatar" style="width:32px;height:32px;margin-right:8px;border-radius:50%;">
        <div>
          <div style="font-size:0.9em;color:#888;">${time} ${status} <span style="margin-left:8px;color:#555;">User: <strong>${userName}</strong></span></div>
          <div><strong>Message:</strong> ${msg.query}</div>
          <div><strong>Response:</strong> ${msg.response}</div>
        </div>
      </div>
    `;
  }).join('');
}

document.getElementById('submitQuery').addEventListener('click', async () => {
  const query = document.getElementById('queryInput').value;
  const destination = destinationSelect.value;
  resultsDiv.innerHTML = '<em>Sending to Google Chat...</em>';

  try {
    const response = await fetch('/api/chat/send-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, webhookUrl: destination })
    });
    const data = await response.json();
    let respText, status;
    if (data.success) {
      respText = `Message sent! Labels: ${data.chatData.labels ? data.chatData.labels.join(', ') : 'N/A'}`;
      status = 'sent';
    } else {
      respText = `Error: ${data.error}`;
      status = 'failed';
    }
    messageHistory.push({ query, response: respText, timestamp: Date.now(), status });
    renderHistory();
  } catch (err) {
    messageHistory.push({ query, response: `Error: ${err.message}`, timestamp: Date.now(), status: 'failed' });
    renderHistory();
  }
});

document.getElementById('clearHistory').addEventListener('click', () => {
  messageHistory = [];
  renderHistory();
});

// Initialize with example URLs for demo
webhookInput.value = 'https://chat.googleapis.com/v1/webhook1, https://chat.googleapis.com/v1/webhook2';
updateDestinationOptions();
