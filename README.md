```markdown
# WithMyStar  

**Reference Audio Notes**  
- <https://notebooklm.google.com/notebook/09bd6023-14b6-4dc6-9862-2c5fecb0e13b/audio>  
- <https://notebooklm.google.com/notebook/d63790e3-fe62-4dcf-95f5-f186f9ba0c71/audio>  

---

## Vision  

**WithMyStar** is a **gamified, agentic widget**: a neon-punk planet that evolves as you interact with it.  
It’s a **visual training companion** — a small world that reflects your growth, resilience, and rituals.  

We will build a **custom Android App Widget** embedding a React web application via WebView, providing full control over the user experience and ensuring a free and open-source development path.  

---

## Core Idea  

- **What it is:**  
  A home-screen widget showing your own cyberpunk planet that grows as you check in daily, complete quests, and keep streaks.  

- **How it works:**  
  - Daily check-ins, journaling prompts, or quests  
  - Streaks and lightweight benchmarks (puzzles, reflections)  
  - Optional later: tie into AI model responses (cloud or on-device)  

- **Why this path:**  
  Ship something alive today with a **custom Android App Widget embedding a React web application via WebView**, ensuring a free and flexible development path.  

---

## Starter Stack  

- **React Web Application (UI)**: For building the visual planet and interactive elements using React and React Three Fiber.
- **Android App Widget (Container)**: For embedding the React web application via a WebView on the Android home screen.
- **Local Service/Daemon:** For state handling, automations, and backups (potentially using existing `daemon/` or `codespaces-react/server/` components).
- **Optional helpers:**
  - Vector assets / neon icon packs
  - JSON file (single source of truth)
  - Cloud backup (Google Drive/Dropbox)  

---

## Roadmap  

| Phase | Goal | Tools | Output | Time |
|-------|------|-------|--------|------|
| 0 | Repo + safety rails | GitHub, Notion | PROMPT.md, safety checklist | 1–2 hrs |
| 1 | Static planet widget | React Web App + Android App Widget | Android App Widget (manual %) | 1–2 hrs |
| 2 | State + progress loop | React Web App + Android App Widget + Local Service | Auto updates, quests | 2–4 hrs |
| 3 | Debug + recovery kit | React Web App + Android App Widget + Local Service | Reset, backups, safe mode | 1–2 hrs |
| 4 | Civilization layers | React Web App + Android App Widget | Cities, satellites, seasons | 2–4 hrs |
| 5 | Agentic automations | React Web App + Android App Widget + Local Service | Self-diagnose, self-heal | 2–4 hrs |
| 6 | Optional LLM hook | Remote or on-device | Scored prompts/quests | 4–8 hrs |
| 7 | Polish + vibes | React Web App assets + sound | Themes, haptics, accessibility | 2–4 hrs |  

---

## Repo Structure  

```

/README.md        → vision + quickstart
/PROMPT.md        → reference prompt + agreements
/docs/            → vision.md, safety.md, debug.md, ui.md
/state/           → schema.json + sample snapshots
/codespaces-react/  → React Web Application source
/backups/         → auto JSON backups

````

---

## State Model  

```json
{
  "version": 1,
  "safeMode": false,
  "planet": {
    "level": 3,
    "evolution": 0.62,
    "biome": "neon-ocean",
    "cityTiers": 2,
    "satellites": 1,
    "weather": "aurora",
    "season": "dusk"
  },
  "score": {
    "daily": 58,
    "streakDays": 4,
    "questsCompleted": 7,
    "benchmark": 0.41
  },
  "mood": "recovering",
  "flags": {
    "reducedMotion": false,
    "highContrast": true
  },
  "logs": [
    {"ts": 1723152000, "event": "quest_complete", "detail": "Constellation Check-in"}
  ]
}
````

---

## Agentic Commands

Tasker watches a `commands.json` file for structured commands.

Example:

```json
{"cmd": "set", "path": "planet.evolution", "value": 0.70}
```

Supported commands:

* `get {path}`
* `set {path, value}`
* `inc {path, delta}`
* `toggle {path}`
* `log {event, detail}`
* `backup {}`
* `restore {backupName}`
* `safe_mode {on|off}`
* `simulate {scenario}`
* `reset {scope}`

---

## Safety-First Design

* **Safe Mode:** toggle via quick tile or widget
* **Reduce motion:** disables spin/particles
* **High contrast + no flashing** (>3Hz disabled)
* **Panic reset:** long-press widget → resets visuals only
* **Audit log:** timestamped, transparent changes
* **Backups:** daily JSON snapshots + optional cloud

---

## Planet UI (React Web App in WebView)

*   Base planet: neon gradient sphere
*   Progress rings: inner = evolution, outer = streak
*   City lights: dots that scale with cityTiers
*   Satellites: glyphs appearing at milestones (0.25, 0.5, 0.75, 1.0)
*   Weather/season: aurora arcs, dusk bands
*   Cyberpunk theme: neon cyan/magenta, dark violets

Accessibility: text labels, reduced motion, high contrast toggle.

---

## Debug + Recovery Playbooks

* **ResetUI:** redraw widget (no state loss)
* **RestoreLatestBackup:** replace with most recent backup
* **Diagnose:** file + state integrity check; auto-safe mode if anomalies
* **Simulate stress:** apply temporary setbacks, then auto-recover

---

## Gamification

* **Daily Constellation Check-in:** +3–5% evolution
* **Streaks:** multipliers, soft breaks (lose 1 day, not all)
* **Recovery ritual:** eclipse → single check-in relights planet
* **Mentor bonus:** mistakes convert into growth

---

## Optional LLM Integration

* **Cloud inference first:** score responses by length, coherence, rubric self-rating
* **Map scores → benchmark → planet growth**
* **On-device model later:** optional, secondary

---

## Respect + Joy

* **Respectful design:** no coercion, no dark patterns
* **Transparent + reversible:** planet is yours
* **Cyberpunk delight:** neon oceans, auroras, hidden “second moon” at 100% evolution

---

## First 90 Minutes

1.  Create GitHub repo + add this README + PROMPT.md
2.  Set up your React Native development environment (Node.js, npm/yarn, Android Studio, etc.).
3.  Navigate to the `codespaces-react/` directory.
4.  Install dependencies: `npm install` or `yarn install`.
5.  Run the Android application: `npm run android` or `yarn android`.

✅ By the end, you’ll have a **basic React Native application running** on your Android device or emulator, ready to be developed into the breathing neon planet.

```
```
