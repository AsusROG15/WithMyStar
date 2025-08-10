# Backup Directory

This directory stores automatic and manual backups of planet state.

## Backup Types

### Automatic Daily Backups
- **Filename**: `state-YYYY-MM-DD.json`
- **Frequency**: Once per day at midnight
- **Retention**: 30 days (older backups auto-deleted)
- **Content**: Complete planet state

### Manual Backups
- **Filename**: `manual-YYYY-MM-DD-HH-MM.json`
- **Trigger**: User-initiated backup command
- **Retention**: Indefinite (user managed)
- **Content**: Complete planet state with metadata

### Milestone Backups
- **Filename**: `milestone-[event]-YYYY-MM-DD.json`
- **Trigger**: Significant events (level up, biome change, etc.)
- **Retention**: Indefinite
- **Content**: State snapshot at achievement

## File Format

All backup files use the same JSON schema as the main state file:

```json
{
  "version": 1,
  "safeMode": false,
  "planet": { ... },
  "score": { ... },
  "mood": "...",
  "flags": { ... },
  "logs": [ ... ],
  "lastBackup": 1704240000,
  "created": 1704067200,
  "backup_metadata": {
    "backup_time": 1704240000,
    "backup_type": "automatic|manual|milestone",
    "backup_reason": "daily|user_request|level_up|...",
    "original_file": "current.json",
    "checksum": "sha256_hash"
  }
}
```

## Restoration

### Via Command System
```json
{
  "cmd": "restore",
  "value": "state-2024-01-15.json",
  "source": "user"
}
```

### Manual Restoration
1. Copy desired backup file
2. Rename to `current.json`
3. Place in `/state/` directory
4. Restart WithMyStar system

### Partial Restoration
Restore only specific aspects:
- Planet visuals only
- Score/progress only
- User preferences only
- Complete state

## Backup Validation

Each backup includes:
- **Checksum**: SHA-256 hash for integrity
- **Schema validation**: Ensures valid JSON structure
- **Timestamp verification**: Confirms backup timing
- **Size limits**: Prevents corrupted oversized files

## Cloud Backup (Optional)

### Setup
1. Install cloud storage app (Google Drive, Dropbox, etc.)
2. Configure automatic sync of backup directory
3. Set up encryption if desired
4. Test restore from cloud

### Security Considerations
- **Encryption**: Encrypt backups before cloud upload
- **Access control**: Limit cloud folder permissions
- **Privacy**: Review cloud provider privacy policies
- **Retention**: Set cloud retention policies

## Troubleshooting

### Backup Not Created
- Check Tasker permissions for file access
- Verify backup directory exists and is writable
- Check available storage space
- Review Tasker logs for errors

### Restoration Failed
- Validate backup file integrity
- Check JSON syntax is valid
- Verify file permissions
- Ensure backup matches current schema version

### Large Backup Files
- Review log entries (may be excessive)
- Check for corrupted data
- Consider log pruning
- Verify normal file growth patterns

## Maintenance

### Automatic Cleanup
- Daily task removes backups older than 30 days
- Log entries pruned to prevent bloat
- Temporary files cleaned up
- Checksums verified periodically

### Manual Maintenance
- Review backup sizes periodically
- Archive important milestones separately
- Clean up failed backup attempts
- Update backup preferences as needed

## Best Practices

### Regular Verification
- Test restoration process monthly
- Verify cloud sync is working
- Check backup file integrity
- Review retention policies

### Important Moments
- Create manual backup before major changes
- Backup before system updates
- Save milestones separately
- Export important achievements

### Recovery Planning
- Keep multiple backup locations
- Document restoration procedures
- Test emergency recovery
- Maintain offline backup copies