# Technical Specifications

This document provides detailed technical specifications for the WithMyStar project architecture, state management, and integration patterns.

## System Architecture

### Overview
WithMyStar uses a React web application for the UI, embedded within a custom Android App Widget via WebView. A local service/daemon handles business logic and state management. Standard JSON is used for data persistence.

```mermaid
graph TD
    RWA[React Web App (UI Layer)] <--> AW[Android App Widget (Container)]
    AW <--> LS[Local Service/Daemon (Logic)]
    UserInput[User Input (Touch/Voice)] --> RWA
    Commands[Commands (JSON)] --> LS
    StateJSON --> Backups[Backups (Cloud/Local)]
```

### Component Details

#### React Web Application (Presentation Layer)
- **Purpose**: Visual representation of planet state and user interaction
- **Technology**: React, React Three Fiber (running in WebView)
- **Data Source**: Android App Widget via JavaScript Interface
- **Update Mechanism**: State changes pushed from Android App Widget
- **Rendering**: Real-time based on application state within WebView

#### Local Service/Daemon (Business Logic Layer)
- **Purpose**: State management, automation, and safety features
- **Technology**: Node.js/Python (or similar, running as a background service)
- **Data Storage**: JSON files on device storage
- **Integration**: Inter-process communication (IPC) with Android App Widget, file I/O
- **Execution**: Event-driven or periodic tasks

#### State Management (Data Layer)
- **Format**: JSON following defined schema
- **Location**: `/storage/emulated/0/WithMyStar/state/`
- **Backup**: Local and optional cloud storage
- **Validation**: Schema-based validation in Tasker
- **History**: Audit log with timestamps

## State Schema Specification

### Core Structure
```typescript
type MoodType = "thriving" | "calm" | "recovering" | "growing" | "dormant";

interface CoreStructure {
  version: 1;           // Schema version for migrations
  safeMode: boolean;      // Global safety toggle
  planet: { ... };      // Planet visual state
  score: { ... };       // Progress and achievements
  mood: MoodType;           // Emotional state
  flags: { ... };       // User preferences
  logs: [ ... ];        // Audit trail
  lastBackup: 0;        // Backup timestamp
  created: 0;            // Creation timestamp
}
```

### Planet State Properties
```typescript
interface PlanetState {
  level: number;          // 0-100, overall advancement
  evolution: number;      // 0.0-1.0, primary progress
  biome: BiomeType;       // Visual theme
  cityTiers: number;      // 0-5, civilization level
  satellites: number;     // 0-4, orbital objects
  weather: WeatherType;   // Atmospheric effects
  season: SeasonType;     // Time-of-day cycle
}

type BiomeType = "neon-ocean" | "cyber-forest" | "crystal-desert" | "aurora-tundra" | "void-nebula";
type WeatherType = "clear" | "aurora" | "storm" | "nebula" | "eclipse";
type SeasonType = "dawn" | "day" | "dusk" | "night";
```

### Score and Progress
```typescript
interface ScoreState {
  daily: number;          // 0-100, today's progress
  streakDays: number;     // Consecutive active days
  questsCompleted: number;// Total completed quests
  benchmark?: number;     // 0.0-1.0, optional AI benchmark
}
```



## Command Protocol

### Command Structure
```json
{
  "cmd": "command_name",
  "path": "object.property",
  "value": "new_value",
  "source": "user|system|auto|recovery"
}
```

### Supported Commands
| Command | Parameters | Purpose |
|---------|------------|---------|
| `get` | `path` | Retrieve state value |
| `set` | `path`, `value` | Set state value |
| `inc` | `path`, `delta` | Increment numeric value |
| `toggle` | `path` | Toggle boolean value |
| `log` | `event`, `detail` | Add audit log entry |
| `backup` | none | Create state backup |
| `restore` | `backupName` | Restore from backup |
| `safe_mode` | `on|off` | Toggle safe mode |
| `simulate` | `scenario` | Run test scenario |
| `reset` | `scope` | Reset portions of state |

### Command Processing Flow
1. **Watch**: Tasker monitors `/WithMyStar/commands.json` (typically using a 'File Modified' event or a periodic check)
2. **Parse**: JSON parsed and validated
3. **Execute**: Command applied to state
4. **Log**: Action recorded in audit log
5. **Save**: Updated state written to disk
6. **Update**: React web application state refreshed via WebView JavaScript interface
7. **Clear**: Command file emptied (or processed command removed)

## File System Structure

### Directory Layout
```
/storage/emulated/0/WithMyStar/
├── state/
│   ├── current.json         // Active state
│   ├── schema.json          // Validation schema
│   └── samples/             // Example states
│       ├── new-planet.json
│       └── advanced-planet.json
├── backups/
│   ├── state-YYYY-MM-DD.json
│   └── auto-backup-*.json
├── codespaces-react/        // React Web Application source
├── logs/
│   └── debug.txt           // Debug information
└── commands.json           // Active command (temp, cleared after processing)
```

### File Permissions
- **State files**: 644 (owner can read/write, group/others can read)
- **Backup files**: 644 (owner can read/write, group/others can read)
- **Command file**: 666 (all users can read/write - temporary)
- **Log files**: 644 (owner can read/write, group/others can read)

## Integration Patterns

### React Web App (in WebView) ↔ Android App Widget ↔ Local Service Communication
```mermaid
sequenceDiagram
    participant U as User
    participant RWA as React Web App
    participant AW as Android App Widget
    participant LS as Local Service/Daemon
    participant F as Files
    
    U->>RWA: Interact with UI
    RWA->>AW: Send command/request (JavaScript Interface)
    AW->>LS: Send command/request (IPC)
    LS->>F: Read current state
    LS->>LS: Process action
    LS->>F: Write updated state
    LS->>AW: Notify state change (IPC)
    AW->>RWA: Update UI (JavaScript Interface)
    RWA->>RWA: Refresh display
```

### State Update Flow
1. **Trigger**: User action, timer, or external event
2. **Load**: Current state read from JSON file
3. **Validate**: State checked against schema
4. **Modify**: Changes applied with logging
5. **Save**: Updated state written atomically
6. **Propagate**: React web application state updated via WebView JavaScript interface for UI refresh
7. **Backup**: Automatic backup if significant change

### Error Handling
- **File corruption**: Restore from most recent backup
- **Schema mismatch**: Migrate to current version
- **Permission errors**: Guide user through fixes
- **Widget crash**: Rebuild from state data
- **Tasker failure**: Emergency safe mode activation

## Performance Specifications

### Update Frequency
- **Real-time**: Variable changes (immediate)
- **High frequency**: User interactions (< 100ms)
- **Medium frequency**: Progress updates (1-60 minutes)
- **Low frequency**: Daily maintenance (24 hours)

### Resource Usage
- **Storage**: < 10MB total (including backups)
- **RAM**: < 150MB (WebView, React app, local service)
- **CPU**: Moderate (WebView rendering, JavaScript execution, local service)
- **Battery**: Optimized for background operation, but WebView can be resource-intensive

### Scalability Limits
- **Maximum logs**: 1000 entries (auto-pruned)
- **Maximum backups**: 30 days retention
- **State file size**: < 1MB
- **Widget complexity**: Limited by WebView performance and device resources

## Security Model

### Threat Model
- **Local access**: Other apps reading state files
- **Data loss**: Device failure or corruption
- **Privacy**: Accidental cloud exposure
- **Tampering**: Malicious state modification

### Protection Mechanisms
- **File permissions**: Restrictive access controls
- **Input validation**: All data validated against schema
- **Backup integrity**: Checksums and validation
- **Safe restoration**: Backup validation before restore
- **Audit logging**: Complete change history

### Privacy Guarantees
- **Local by default**: No network communication required
- **Optional cloud**: User-controlled backup only
- **No analytics**: No usage tracking or telemetry
- **Data portability**: Export functionality always available

## Extension Points

### Future Enhancements
- **Web interface**: Browser-based planet viewer
- **API integration**: Connect to external services
- **Plugin system**: Custom quest types
- **Multi-device sync**: Cross-device state sharing
- **Advanced AI**: Local model integration

### Compatibility Considerations
- **Android versions**: 7.0+ (API level 24+)
- **WebView versions**: Latest Android System WebView recommended
- **Node.js versions**: (Specify compatible versions for React app development)
- **Storage requirements**: 50MB+ free space

This specification is versioned and will be updated as the project evolves. All changes will maintain backward compatibility with existing installations.