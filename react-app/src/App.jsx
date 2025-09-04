  // Evolution system
  const [evolutionStage, setEvolutionStage] = useState(1);
  const [evolutionProgress, setEvolutionProgress] = useState(0);
  const evolutionStages = [
    { stage: 1, name: 'Star Seed', unlock: 'Basic Features' },
    { stage: 2, name: 'Neon Sprout', unlock: 'Custom Themes' },
    { stage: 3, name: 'Cyber Bloom', unlock: 'Advanced AI' },
    { stage: 4, name: 'Galactic Core', unlock: 'Full Integration' }
  ];
  // Gamification settings
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [userBadges, setUserBadges] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  // Guard rail settings
  const [guardRailsEnabled, setGuardRailsEnabled] = useState(true);
  const [blockedKeywords, setBlockedKeywords] = useState('kill,suicide,self-harm,violence,attack,bomb,explosive,hate,racist,sexist,lewd,abuse,drugs,weapon,terror,harm,password,secret,api_key,token,private,confidential');
  // Crucial settings
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import GearIcon from './GearIcon.jsx';

function Planet() {
  const mesh = useRef();
  // Removed useFrame for now to simplify
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
}

function App() {
  console.log("App component rendered!");
  const [showSettings, setShowSettings] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Orbitron');
  // Accessibility settings
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('1em');
  // API settings
  const [apiEndpoint, setApiEndpoint] = useState('https://api.withmystar.com');
  const [apiToken, setApiToken] = useState('');
  const fontOptions = [
    { label: 'Orbitron', value: 'Orbitron, monospace' },
    { label: 'Audiowide', value: 'Audiowide, monospace' },
    { label: 'Share Tech Mono', value: 'Share Tech Mono, monospace' },
    { label: 'Roboto Mono', value: 'Roboto Mono, monospace' },
    { label: 'VT323', value: 'VT323, monospace' },
    { label: 'Monospace', value: 'monospace' },
  ];

  const [showLogViewer, setShowLogViewer] = useState(false);
  const [logs, setLogs] = useState([]);

  // Poll backend for logs/events
  useEffect(() => {
    let interval;
    if (showLogViewer) {
      const fetchLogs = async () => {
        try {
          const res = await fetch('/api/chat/chat-log');
          const data = await res.json();
          setLogs(data.log ? data.log.slice(-10) : []);
        } catch (err) {
          setLogs([{ message: 'Failed to load logs', error: err.message, timestamp: Date.now() }]);
        }
      };
      fetchLogs();
      interval = setInterval(fetchLogs, 5000);
    }
    return () => interval && clearInterval(interval);
  }, [showLogViewer]);

  return (
    <div
      className={`app-container neon-animate${highContrast ? ' high-contrast' : ''}`}
      style={{ position: 'relative', overflow: 'hidden', minHeight: '600px', backdropFilter: 'blur(8px)', boxShadow: '0 0 48px #00fff7, 0 0 24px #ff00c8', border: '1px solid #00fff7', transition: 'box-shadow 0.5s', fontSize }}
      aria-label="WithMyStar Main UI"
    >
      {/* Settings tab toggle button */}
      <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 10, cursor: 'pointer', filter: 'drop-shadow(0 0 12px #ff00c8)' }} onClick={() => setShowSettings(s => !s)}>
        <GearIcon size={44} color={showSettings ? '#ff00c8' : '#00fff7'} />
      </div>
      {/* Settings/options tab */}
      {showSettings && (
        <div style={{
          position: 'absolute',
          top: 70,
          right: 32,
          zIndex: 20,
          background: 'rgba(44,83,100,0.85)',
          border: '2px solid #ff00c8',
          borderRadius: '18px',
          boxShadow: '0 0 32px #00fff7, 0 0 16px #ff00c8',
          padding: '2em 1.5em',
          minWidth: '280px',
          color: '#fff',
          fontFamily: 'Orbitron, Roboto, Arial, sans-serif',
          backdropFilter: 'blur(12px)',
          transition: 'box-shadow 0.5s',
          animation: 'fadeIn 0.7s',
        }}>
          <h2 className="neon-heading" style={{ fontFamily: selectedFont }}>Settings & Options</h2>
          <div style={{ margin: '1em 0' }}>
            <label htmlFor="font-select" style={{ color: '#39ff14', marginRight: '0.5em' }}>Font:</label>
            <select
              id="font-select"
              value={selectedFont}
              onChange={e => setSelectedFont(e.target.value)}
              style={{ background: '#222', color: '#39ff14', border: '1px solid #39ff14', borderRadius: '6px', padding: '0.3em 1em', fontFamily: selectedFont }}
            >
              {fontOptions.map(opt => (
                <option key={opt.label} value={opt.value} style={{ fontFamily: opt.value }}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* Evolution System */}
          <div style={{ marginBottom: '1em', background: 'rgba(20,20,40,0.8)', borderRadius: '12px', padding: '1em', boxShadow: '0 0 12px #ff00c8', border: '1px solid #00fff7' }}>
            <h3 style={{ color: '#39ff14', margin: 0 }}>Evolution System</h3>
            <div><strong>Stage:</strong> {evolutionStages[evolutionStage - 1].name}</div>
            <div><strong>Next Unlock:</strong> {evolutionStages[evolutionStage]?.unlock || 'Max Stage'}</div>
            <div style={{ margin: '0.7em 0' }}>
              <label htmlFor="evolution-progress" style={{ color: '#39ff14', marginRight: '0.5em' }}>Progress:</label>
              <progress id="evolution-progress" value={evolutionProgress} max={100} style={{ width: '70%' }} />
              <span style={{ marginLeft: '0.5em', color: '#00fff7' }}>{evolutionProgress}%</span>
            </div>
            <button className="neon-button" style={{ marginTop: '0.5em' }} onClick={() => {
              if (evolutionStage < evolutionStages.length && evolutionProgress >= 100) {
                setEvolutionStage(evolutionStage + 1);
                setEvolutionProgress(0);
              } else {
                setEvolutionProgress(Math.min(evolutionProgress + 20, 100));
              }
            }}>
              {evolutionProgress >= 100 && evolutionStage < evolutionStages.length ? 'Evolve!' : 'Gain Progress'}
            </button>
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="gamification-toggle" style={{ color: '#39ff14', marginRight: '0.5em' }}>Enable Gamification:</label>
            <input
              id="gamification-toggle"
              type="checkbox"
              checked={gamificationEnabled}
              onChange={e => setGamificationEnabled(e.target.checked)}
              aria-label="Toggle gamification"
              style={{ marginLeft: '0.5em' }}
            />
          </div>
          {gamificationEnabled && (
            <div style={{ marginBottom: '1em', color: '#39ff14' }}>
              <div><strong>Points:</strong> {userPoints}</div>
              <div><strong>Level:</strong> {userLevel}</div>
              <div><strong>Badges:</strong> {userBadges.length > 0 ? userBadges.join(', ') : 'None yet'}</div>
              <button className="neon-button" style={{ marginTop: '0.5em' }} onClick={() => setShowLeaderboard(s => !s)}>
                {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
              </button>
              {showLeaderboard && (
                <div style={{ marginTop: '1em', background: 'rgba(20,20,40,0.8)', borderRadius: '12px', padding: '1em', boxShadow: '0 0 12px #ff00c8', border: '1px solid #00fff7' }}>
                  <strong>Leaderboard (coming soon)</strong>
                  <ul style={{ margin: '0.5em 0 0 1em', color: '#00fff7' }}>
                    <li>User1 - 1200 pts</li>
                    <li>User2 - 950 pts</li>
                    <li>User3 - 800 pts</li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="guard-rails-toggle" style={{ color: '#39ff14', marginRight: '0.5em' }}>Enable Guard Rails:</label>
            <input
              id="guard-rails-toggle"
              type="checkbox"
              checked={guardRailsEnabled}
              onChange={e => setGuardRailsEnabled(e.target.checked)}
              aria-label="Toggle guard rails"
              style={{ marginLeft: '0.5em' }}
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="blocked-keywords" style={{ color: '#39ff14', marginRight: '0.5em' }}>Blocked Keywords (comma separated):</label>
            <input
              id="blocked-keywords"
              type="text"
              value={blockedKeywords}
              onChange={e => setBlockedKeywords(e.target.value)}
              style={{ background: '#222', color: '#39ff14', border: '1px solid #39ff14', borderRadius: '6px', padding: '0.3em 1em', width: '100%' }}
              aria-label="Blocked keywords"
            />
          </div>
          <div style={{ marginBottom: '1em', color: guardRailsEnabled ? '#39ff14' : '#ff00c8' }}>
            Guard Rails are <strong>{guardRailsEnabled ? 'ENABLED' : 'DISABLED'}</strong>
          </div>
          {/* Crucial Settings */}
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="language-select" style={{ color: '#39ff14', marginRight: '0.5em' }}>Language:</label>
            <select
              id="language-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ background: '#222', color: '#39ff14', border: '1px solid #39ff14', borderRadius: '6px', padding: '0.3em 1em' }}
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="timezone-select" style={{ color: '#39ff14', marginRight: '0.5em' }}>Time Zone:</label>
            <input
              id="timezone-select"
              type="text"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              style={{ background: '#222', color: '#39ff14', border: '1px solid #39ff14', borderRadius: '6px', padding: '0.3em 1em', width: '100%' }}
              aria-label="Set time zone"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="notifications-toggle" style={{ color: '#39ff14', marginRight: '0.5em' }}>Enable Notifications:</label>
            <input
              id="notifications-toggle"
              type="checkbox"
              checked={notificationsEnabled}
              onChange={e => setNotificationsEnabled(e.target.checked)}
              aria-label="Toggle notifications"
              style={{ marginLeft: '0.5em' }}
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="privacy-toggle" style={{ color: '#39ff14', marginRight: '0.5em' }}>Privacy Mode:</label>
            <input
              id="privacy-toggle"
              type="checkbox"
              checked={privacyMode}
              onChange={e => setPrivacyMode(e.target.checked)}
              aria-label="Toggle privacy mode"
              style={{ marginLeft: '0.5em' }}
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="autosave-toggle" style={{ color: '#39ff14', marginRight: '0.5em' }}>Auto-Save:</label>
            <input
              id="autosave-toggle"
              type="checkbox"
              checked={autoSave}
              onChange={e => setAutoSave(e.target.checked)}
              aria-label="Toggle auto-save"
              style={{ marginLeft: '0.5em' }}
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="contrast-toggle" style={{ color: '#39ff14', marginRight: '0.5em' }}>High Contrast:</label>
            <input
              id="contrast-toggle"
              type="checkbox"
              checked={highContrast}
              onChange={e => setHighContrast(e.target.checked)}
              aria-label="Toggle high contrast mode"
              style={{ marginLeft: '0.5em' }}
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="font-size-select" style={{ color: '#39ff14', marginRight: '0.5em' }}>Font Size:</label>
            <select
              id="font-size-select"
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
              style={{ background: '#222', color: '#39ff14', border: '1px solid #39ff14', borderRadius: '6px', padding: '0.3em 1em' }}
              aria-label="Select font size"
            >
              <option value="0.9em">Small</option>
              <option value="1em">Medium</option>
              <option value="1.2em">Large</option>
              <option value="1.5em">Extra Large</option>
            </select>
          </div>
          {/* API Settings */}
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="api-endpoint" style={{ color: '#39ff14', marginRight: '0.5em' }}>API Endpoint:</label>
            <input
              id="api-endpoint"
              type="text"
              value={apiEndpoint}
              onChange={e => setApiEndpoint(e.target.value)}
              style={{ background: '#222', color: '#39ff14', border: '1px solid #39ff14', borderRadius: '6px', padding: '0.3em 1em', width: '100%' }}
              aria-label="API endpoint URL"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label htmlFor="api-token" style={{ color: '#39ff14', marginRight: '0.5em' }}>API Token:</label>
            <input
              id="api-token"
              type="password"
              value={apiToken}
              onChange={e => setApiToken(e.target.value)}
              style={{ background: '#222', color: '#39ff14', border: '1px solid #39ff14', borderRadius: '6px', padding: '0.3em 1em', width: '100%' }}
              aria-label="API token"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label style={{ color: '#ff00c8' }}>Theme:</label>
            <select style={{ marginLeft: '1em', background: '#232526', color: '#00fff7', border: '1px solid #ff00c8', borderRadius: '6px', padding: '0.3em' }}>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="classic">Classic</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label style={{ color: '#ff00c8' }}>Planet Animation:</label>
            <input type="checkbox" defaultChecked style={{ marginLeft: '1em' }} />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label style={{ color: '#ff00c8' }}>Show Avatars:</label>
            <input type="checkbox" defaultChecked style={{ marginLeft: '1em' }} />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <label style={{ color: '#ff00c8' }}>Enable Chat AI:</label>
            <input type="checkbox" defaultChecked style={{ marginLeft: '1em' }} />
          </div>
          {/* Crash Log Section */}
          <div style={{ marginBottom: '1em', background: 'rgba(20,20,40,0.8)', borderRadius: '12px', padding: '1em', boxShadow: '0 0 12px #ff00c8', border: '1px solid #00fff7', animation: 'fadeIn 1.2s' }}>
            <h3 style={{ color: '#ff00c8', margin: 0, textShadow: '0 0 8px #00fff7' }}>Crash Log</h3>
            {logs.filter(l => l.error).length === 0 ? (
              <div style={{ color: '#00fff7' }}>No recent crashes.</div>
            ) : (
              logs.filter(l => l.error).map((log, idx) => (
                <div key={idx} style={{ marginBottom: '0.7em' }}>
                  <div style={{ fontSize: '0.9em', color: '#00fff7' }}>{log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}</div>
                  <div style={{ color: 'red' }}><strong>Error:</strong> {log.error}</div>
                  <div><strong>Message:</strong> {log.message}</div>
                </div>
              ))
            )}
          </div>
          <button className="neon-button" style={{ marginTop: '1em', width: '100%' }} onClick={() => setShowLogViewer(s => !s)}>
            {showLogViewer ? 'Hide Log/Event Viewer' : 'Show Log/Event Viewer'}
          </button>
        </div>
      )}
      {/* Log/Event Viewer Panel */}
      {showLogViewer && (
        <div style={{
          position: 'absolute',
          top: 70,
          left: 32,
          zIndex: 20,
          background: 'rgba(44,83,100,0.92)',
          border: '2px solid #00fff7',
          borderRadius: '18px',
          boxShadow: '0 0 32px #ff00c8, 0 0 16px #00fff7',
          padding: '2em 1.5em',
          minWidth: '360px',
          maxHeight: '420px',
          overflowY: 'auto',
          color: '#fff',
          fontFamily: 'Orbitron, Roboto, Arial, sans-serif',
          backdropFilter: 'blur(12px)',
          transition: 'box-shadow 0.5s',
          animation: 'fadeIn 0.7s',
        }}>
          <h2 className="neon-heading" style={{ fontFamily: selectedFont }}>Log & Event Viewer</h2>
          {logs.length === 0 ? (
            <div style={{ color: '#ff00c8' }}>No logs/events found.</div>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} style={{ marginBottom: '1em', padding: '0.7em', background: 'rgba(20,20,40,0.9)', borderRadius: '12px', boxShadow: '0 0 12px #00fff7', border: '1px solid #ff00c8', animation: 'fadeIn 1.2s' }}>
                <div style={{ fontSize: '0.9em', color: '#00fff7' }}>{log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}</div>
                <div style={{ color: '#ff00c8', fontWeight: 'bold' }}>{log.sender || log.userName || 'System'}</div>
                <div><strong>Message:</strong> {log.message}</div>
                {log.error && <div style={{ color: 'red' }}><strong>Error:</strong> {log.error}</div>}
                {log.autoReply && <div style={{ color: 'green' }}><strong>AutoReply:</strong> {log.autoReply}</div>}
              </div>
            ))
          )}
        </div>
      )}
      {/* 3D Planet WithMyStar */}
      <div style={{ width: '400px', height: '400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Canvas>
          <Planet />
        </Canvas>
        {/* Overlay logo */}
        <img src="Octocat.png" alt="logo" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', filter: 'drop-shadow(0 0 40px #00fff7) drop-shadow(0 0 20px #ff00c8)', pointerEvents: 'none', zIndex: 2 }} />
        {/* Overlay buttons */}
        <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: '1em' }}>
          <Button />
          <AppLink />
        </div>
      </div>
      <header className="App-header" style={{ position: 'relative', zIndex: 4, background: 'none', boxShadow: 'none' }}>
      <h1 className="neon-heading" style={{ marginTop: '420px', textAlign: 'center', fontFamily: selectedFont }}>
        Welcome to Planet WithMyStar
      </h1>
        <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#fff', textShadow: '0 0 2px #00fff7' }}>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small" style={{ textAlign: 'center', color: '#ff00c8', fontSize: '1em' }}>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
