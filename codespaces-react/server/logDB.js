// logDB.js
// Simple SQLite log/event/crash persistence for WithMyStar backend

import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'withmystar_logs.db');
const db = new sqlite3.verbose().Database(dbPath);

// Create logs table if not exists
const initDB = () => {
  db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER,
    sender TEXT,
    userName TEXT,
    message TEXT,
    error TEXT,
    autoReply TEXT,
    agentType TEXT
  )`);
};

// Insert a log entry
function addLog({ timestamp, sender, userName, message, error, autoReply, agentType }) {
  db.run(
    `INSERT INTO logs (timestamp, sender, userName, message, error, autoReply, agentType) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [timestamp, sender, userName, message, error, autoReply, agentType]
  );
}

// Get recent logs
function getRecentLogs(limit = 10, callback) {
  db.all(`SELECT * FROM logs ORDER BY timestamp DESC LIMIT ?`, [limit], (err, rows) => {
    callback(err, rows);
  });
}

// Get recent crash logs
function getCrashLogs(limit = 10, callback) {
  db.all(`SELECT * FROM logs WHERE error IS NOT NULL ORDER BY timestamp DESC LIMIT ?`, [limit], (err, rows) => {
    callback(err, rows);
  });
}

initDB();

export { addLog, getRecentLogs, getCrashLogs };
