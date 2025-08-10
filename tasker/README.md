# Tasker Configuration Files

This directory contains the Tasker profiles and tasks for WithMyStar.

## Files

### profiles.xml
Export of all Tasker profiles related to WithMyStar:
- **WithMyStar State Manager**: Main profile for state management
- **Command Watcher**: Monitors command file for agentic interactions
- **Daily Maintenance**: Handles backups and cleanup
- **Safe Mode Manager**: Manages safe mode toggles

### tasks.xml
Export of all Tasker tasks:
- **Load State**: Read current state from JSON file
- **Save State**: Write state to JSON file
- **Update Variables**: Sync state to KWGT variables
- **Backup State**: Create timestamped backup
- **Restore State**: Restore from backup file
- **Safe Mode Toggle**: Enable/disable safe mode
- **Panic Reset**: Emergency reset functionality

## Installation

1. Import profiles.xml into Tasker
2. Import tasks.xml into Tasker
3. Grant necessary permissions
4. Enable the "WithMyStar State Manager" profile
5. Test by manually triggering tasks

## Configuration

### Required Variables
Create these global variables in Tasker:
- `%WITHMYSTAR_EVOLUTION` (0-100)
- `%WITHMYSTAR_LEVEL` (0-100)
- `%WITHMYSTAR_STREAK` (days)
- `%WITHMYSTAR_MOOD` (mood string)
- `%WITHMYSTAR_SAFEMODE` (0/1)

### File Paths
Ensure these paths exist and are accessible:
- `/storage/emulated/0/WithMyStar/state/current.json`
- `/storage/emulated/0/WithMyStar/backups/`
- `/storage/emulated/0/WithMyStar/commands.json`

## Troubleshooting

### Common Issues
- **Permission denied**: Grant storage permissions to Tasker
- **Variables not updating**: Check KWGT Tasker integration
- **File not found**: Verify file paths and create directories
- **Profile not triggering**: Check profile contexts and constraints

### Debug Mode
Enable Tasker's run log to see detailed execution information for troubleshooting.

## Customization

### Adding New Variables
1. Define the variable in the state schema
2. Add to Load/Save state tasks
3. Create KWGT formula binding
4. Test the integration

### Creating Custom Commands
1. Add command handling to Command Watcher profile
2. Update command documentation
3. Test command execution and logging