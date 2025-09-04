// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Web Worker Initialization
let worker;
if (window.Worker) {
  worker = new Worker('/worker.js');
  worker.onmessage = function(e) {
    const result = `Result for: <strong>${e.data.result}</strong>`;
    elements.results.innerHTML = result;
    addToHistory(result);
    setLoading(false);
  };
  worker.onerror = function(error) {
    console.error('Worker error:', error);
    showError(ERROR_MESSAGES.generic);
    setLoading(false);
  };
}

// withmystar-ui.js
// Display settings optimization: theme, font, accessibility

export function setTheme(theme) {
  document.body.className = '';
  if (theme === 'cyberpunk') {
    document.body.classList.add('cyberpunk-theme');
  } else if (theme === 'dark') {
    document.body.style.background = '#181818';
    document.body.style.color = '#e0e0e0';
  } else {
    document.body.style.background = '';
    document.body.style.color = '';
  }
}

export function setFont(font) {
  document.body.style.fontFamily = font;
}

export function toggleAccessibility(enable) {
  if (enable) {
    document.body.setAttribute('aria-live', 'polite');
    document.body.setAttribute('tabindex', '0');
  } else {
    document.body.removeAttribute('aria-live');
    document.body.removeAttribute('tabindex');
  }
}

// Example usage (to be called from React or settings panel):
// setTheme('cyberpunk');
// setFont('Orbitron, Roboto Mono, Segoe UI, Arial, sans-serif');
// toggleAccessibility(true);
// Modularized UI logic for WithMyStar

const SELECTORS = {
  webhookInput: 'webhookInput',
  destinationSelect: 'destinationSelect',
  queryInput: 'queryInput',
  submitQuery: 'submitQuery',
  clearHistory: 'clearHistory',
  results: 'results',
  logResults: 'logResults'
};

const ERROR_MESSAGES = {
  emptyQuery: 'Please enter a query.',
  invalidWebhook: 'Webhook URLs must start with https://',
  generic: 'An error occurred. Please try again.'
};

const elements = {};
Object.keys(SELECTORS).forEach(key => {
  elements[key] = document.getElementById(SELECTORS[key]);
});

let isLoading = false;
let history = [];

function setLoading(loading) {
  isLoading = loading;
  elements.results.innerHTML = loading ? '<span style="color:#39ff14">Loading...</span>' : '';
}

function showError(msg) {
  elements.results.innerHTML = `<span style="color:red">${msg}</span>`;
}

function validateInput() {
  if (!elements.queryInput.value.trim()) {
    showError(ERROR_MESSAGES.emptyQuery);
    return false;
  }
  if (elements.webhookInput.value && !elements.webhookInput.value.split(',').every(url => url.trim().startsWith('https://'))) {
    showError(ERROR_MESSAGES.invalidWebhook);
    return false;
  }
  return true;
}

function addToHistory(result) {
  history.push(result);
  elements.logResults.innerHTML = history.map((h, i) => `<div>${i + 1}. ${h}</div>`).join('');
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

async function handleQuery() {
  if (!validateInput()) return;
  setLoading(true);
  try {
    if (worker) {
      worker.postMessage({ query: elements.queryInput.value });
    } else {
      // Fallback if Web Workers are not supported or initialized
      await new Promise(res => setTimeout(res, 800));
      const result = `Result for: <strong>${elements.queryInput.value}</strong>`;
      elements.results.innerHTML = result;
      addToHistory(result);
      setLoading(false);
    }
  } catch (err) {
    showError(ERROR_MESSAGES.generic);
  } finally {
    // setLoading(false); // Moved inside worker.onmessage or fallback
  }
}

elements.submitQuery.addEventListener('click', debounce(handleQuery, 300));
elements.clearHistory.addEventListener('click', () => {
  history = [];
  elements.logResults.innerHTML = '';
  elements.results.innerHTML = '';
});
