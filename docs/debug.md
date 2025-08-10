# Debug and Troubleshooting Guide

This guide provides comprehensive troubleshooting steps for WithMyStar issues and debug procedures.

## Quick Diagnostic Commands

### Check System Status
```json
// Command to get complete system status
{
  "cmd": "get",
  "path": "system_status"
}
```

### Safe Mode Emergency
```json
// Immediate safe mode activation
{
  "cmd": "safe_mode",
  "value": "on",
  "source": "emergency"
}
```

### State Validation
```json
// Validate current state integrity
{
  "cmd": "validate",
  "scope": "full"
}
```

## Common Issues and Solutions

### Widget Not Displaying

#### Symptoms
- Widget appears blank or shows default KWGT placeholder
- No planet or progress rings visible
- Text elements missing

#### Diagnosis
1. **Check KWGT Status**:
   - Open KWGT app
   - Verify widget is loaded and not showing errors
   - Check if Tasker integration is enabled

2. **Verify Variables**:
   - Open Tasker → Variables tab
   - Look for `%WITHMYSTAR_*` variables
   - Check if values are reasonable (not null or error)

3. **Test Variable Update**:
   - Manually set `%WITHMYSTAR_EVOLUTION` to 50
   - Widget should show 50% evolution ring
   - If no change, KWGT-Tasker connection is broken

#### Solutions
1. **Reload Widget**:
   - Long-press widget → Edit
   - Save without changes to force reload
   - Check if elements appear

2. **Reset Tasker Integration**:
   - KWGT → Settings → Tasker Integration → Off
   - Wait 10 seconds
   - Enable Tasker Integration again

3. **Rebuild Widget**:
   - Remove widget from home screen
   - Re-add and configure from scratch
   - Import backup configuration if available

### Variables Not Updating

#### Symptoms
- Widget shows static values
- Changes in Tasker don't reflect in widget
- Old values persist after state changes

#### Diagnosis
1. **Check Tasker Profile Status**:
   - Open Tasker → Profiles tab
   - Verify "WithMyStar State Manager" is ON (green)
   - Check profile last run time

2. **Test Manual Variable Set**:
   - Set variable manually in Tasker
   - Use Variable Set action with global variable
   - Check if KWGT updates immediately

3. **Monitor Tasker Logs**:
   - Enable run log in Tasker preferences
   - Trigger a state change
   - Review log for errors or unexpected behavior

#### Solutions
1. **Restart State Manager**:
   - Turn OFF "WithMyStar State Manager" profile
   - Wait 5 seconds
   - Turn profile back ON

2. **Force Variable Refresh**:
   - Run "Update Variables" task manually
   - Check if this resolves the issue
   - If yes, profile triggering is the problem

3. **Check Variable Names**:
   - Verify exact spelling of variable names
   - KWGT formulas must match Tasker variable names exactly
   - Case sensitive matching required

### State File Corruption

#### Symptoms
- Error messages about invalid JSON
- Planet resets to default state unexpectedly
- Backup restoration fails

#### Diagnosis
1. **Validate JSON Syntax**:
   - Copy `/WithMyStar/state/current.json` content
   - Paste into online JSON validator
   - Look for syntax errors (missing commas, brackets)

2. **Check File Permissions**:
   - Verify Tasker can read/write state directory
   - Test by manually creating a file in the directory
   - Check if storage permissions are granted

3. **Review Recent Changes**:
   - Check audit logs for recent state modifications
   - Look for patterns before corruption occurred
   - Identify potential cause (command, update, crash)

#### Solutions
1. **Restore from Backup**:
   ```json
   {
     "cmd": "restore",
     "value": "state-[recent-date].json",
     "source": "recovery"
   }
   ```

2. **Manual JSON Repair**:
   - Open corrupted file in text editor
   - Fix obvious syntax errors
   - Validate repaired JSON
   - Test with minimal state first

3. **Emergency Reset**:
   - Delete corrupted state file
   - Let system create new default state
   - Manually restore important values
   - Resume from safe known state

### Performance Issues

#### Symptoms
- Widget updates slowly or freezes
- Tasker tasks take long time to complete
- Device performance degrades

#### Diagnosis
1. **Check Update Frequency**:
   - Review how often profiles trigger
   - Look for excessive file I/O operations
   - Monitor Tasker CPU usage

2. **Analyze State File Size**:
   - Check if state file is unusually large
   - Look for excessive log entries
   - Review backup file sizes

3. **Profile Conflicts**:
   - Check for overlapping profile contexts
   - Look for infinite loops in task logic
   - Review variable dependencies

#### Solutions
1. **Optimize Update Frequency**:
   - Reduce profile trigger frequency
   - Use "Cooldown" in profile contexts
   - Batch multiple updates together

2. **Clean Up State**:
   - Prune old log entries (keep last 100)
   - Remove unnecessary state properties
   - Optimize JSON structure

3. **Safe Mode for Performance**:
   - Enable Safe Mode to reduce complexity
   - Disable animations and frequent updates
   - Use minimal widget configuration

## Advanced Debugging

### Tasker Debug Mode

1. **Enable Run Log**:
   - Preferences → Misc → Run Log → On
   - Set appropriate log level (Info or Verbose)

2. **Monitor Execution**:
   - More → Run Log
   - Watch task execution in real-time
   - Look for error messages or unexpected values

3. **Variable Monitoring**:
   - Use Flash action to show variable values
   - Add temporary Variable Set actions for debugging
   - Monitor variable changes over time

### State File Analysis

1. **JSON Structure Validation**:
   ```bash
   # If you have access to command line tools
   jq '.' /path/to/current.json
   ```

2. **Backup Comparison**:
   - Compare current state with recent backup
   - Look for unexpected changes
   - Identify corrupted or missing properties

3. **Log Analysis**:
   - Review audit logs chronologically
   - Look for patterns before issues
   - Identify automated vs manual changes

### Network and Permissions

1. **File System Access**:
   - Test file creation in WithMyStar directory
   - Verify read/write permissions for Tasker
   - Check storage space availability

2. **Android Permissions**:
   - Review granted permissions for Tasker and KWGT
   - Check for recent permission changes
   - Verify accessibility service is enabled

## Emergency Recovery Procedures

### Complete System Reset

When all else fails, use this nuclear option:

1. **Backup Current State** (if possible):
   - Copy current.json to safe location
   - Export KWGT widget configuration
   - Note current Tasker setup

2. **Clean Slate Reset**:
   - Remove widget from home screen
   - Disable all WithMyStar Tasker profiles
   - Delete /WithMyStar directory contents
   - Clear KWGT cache if needed

3. **Rebuild from Scratch**:
   - Follow installation guide from beginning
   - Import backed up configurations
   - Restore state data if recoverable

### Selective Recovery

For partial issues:

1. **Widget Only Reset**:
   - Keep Tasker configuration
   - Remove and re-add widget
   - Reconfigure KWGT settings

2. **Tasker Only Reset**:
   - Keep widget configuration
   - Disable problematic profiles
   - Re-import task configurations

3. **State Only Reset**:
   - Restore from known good backup
   - Keep widget and Tasker setup
   - Verify state integrity after restore

## Diagnostic Tools

### Built-in Diagnostics

1. **System Status Command**:
   ```json
   {
     "cmd": "diagnose",
     "scope": "full"
   }
   ```

2. **File Integrity Check**:
   ```json
   {
     "cmd": "validate",
     "path": "files",
     "fix": true
   }
   ```

3. **Variable Consistency**:
   ```json
   {
     "cmd": "sync",
     "source": "state_file"
   }
   ```

### External Tools

1. **JSON Validators**:
   - Online: jsonlint.com, jsonformatter.org
   - Apps: JSON Viewer, JSON Editor

2. **File Managers**:
   - For manual file inspection
   - Verify permissions and locations
   - Check file sizes and timestamps

3. **Log Viewers**:
   - Android log viewers for system-level issues
   - Tasker run log for execution details

## Prevention Best Practices

### Regular Maintenance

1. **Weekly Health Checks**:
   - Verify backups are being created
   - Check state file integrity
   - Monitor performance metrics

2. **Monthly Deep Clean**:
   - Review and prune logs
   - Update documentation
   - Test recovery procedures

3. **Before Major Changes**:
   - Create manual backup
   - Document current configuration
   - Test changes in safe environment

### Monitoring Setup

1. **Automated Alerts**:
   - Set up Tasker alerts for errors
   - Monitor file sizes and permissions
   - Track backup success/failure

2. **Performance Tracking**:
   - Log update frequencies
   - Monitor battery usage
   - Track memory consumption

## Getting Help

### Information to Collect

When reporting issues, include:

1. **System Information**:
   - Android version
   - Device model
   - KWGT version
   - Tasker version

2. **State Information**:
   - Current planet state (sanitized)
   - Recent state changes
   - Error messages or unexpected behavior

3. **Configuration**:
   - Active Tasker profiles
   - KWGT widget settings
   - File permissions and locations

### Support Channels

1. **GitHub Issues**:
   - Use appropriate issue template
   - Include diagnostic information
   - Attach relevant files (sanitized)

2. **Community Forums**:
   - KWGT community forums
   - Tasker user groups
   - Android automation communities

3. **Documentation**:
   - Review all documentation first
   - Check FAQ and common issues
   - Try suggested solutions before reporting

Remember: When in doubt, activate Safe Mode and work from there. It's always better to have a simplified working system than a complex broken one.