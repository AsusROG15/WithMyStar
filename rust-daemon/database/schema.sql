CREATE TABLE contributors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE, -- SECURITY: Sensitive data. Ensure proper access control and consider encryption.
    glyph TEXT
);

CREATE TABLE glyphs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contributor_id INTEGER,
    glyph TEXT NOT NULL,
    FOREIGN KEY (contributor_id) REFERENCES contributors (id)
);

CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    actor_fingerprint TEXT NOT NULL,
    ritual_type TEXT NOT NULL,
    inputs TEXT,
    outputs TEXT,
    signature TEXT,
    verification_result TEXT
);

CREATE TABLE rituals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    timestamp TEXT NOT NULL
);

CREATE TABLE releases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    version TEXT NOT NULL UNIQUE,
    timestamp TEXT NOT NULL,
    changelog TEXT,
    sbom_path TEXT,
    provenance_path TEXT
);

CREATE TABLE shields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    policy TEXT NOT NULL,
    description TEXT
);

CREATE TABLE artifacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    release_id INTEGER,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    hash TEXT NOT NULL,
    FOREIGN KEY (release_id) REFERENCES releases (id)
);

CREATE TABLE attestations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artifact_id INTEGER,
    signature TEXT NOT NULL,
    signer TEXT NOT NULL,
    FOREIGN KEY (artifact_id) REFERENCES artifacts (id)
);

CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE audit_findings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    scanner TEXT NOT NULL,
    finding TEXT NOT NULL,
    severity TEXT NOT NULL,
    remediated_at TEXT
);