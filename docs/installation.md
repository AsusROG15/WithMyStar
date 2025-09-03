# Installation Guide

This guide will help you set up WithMyStar on your Android device using the no-code approach with KWGT and Tasker.

## Prerequisites

### Required Apps
- **Android device** (Android 7.0 or higher recommended)
- **KWGT Kustom Widget Maker** (free version works, Pro recommended)
- **Tasker** (paid app, essential for automation)

### Optional but Recommended
- **AutoTools** (Tasker plugin for enhanced JSON handling)
- **File manager app** (for manual state file management)
- **Cloud backup app** (Google Drive, Dropbox, etc.)

## Quick Setup (30 minutes)

### Step 1: Install Required Apps
1. Install KWGT from Google Play Store
2. Install KWGT Pro key (recommended for full features)
3. Install Tasker from Google Play Store
4. Grant all necessary permissions when prompted

### Step 2: Download WithMyStar Files
1. Download the project files from the [WithMyStar GitHub repository](https://github.com/WithMyStar/WithMyStar/releases) (or specific release/download page).
2. Extract to `/storage/emulated/0/WithMyStar/` (or your preferred location). If you choose a different location, ensure you update all relevant paths in Tasker tasks and KWGT formulas accordingly.
3. Ensure the following structure exists:
   ```
   WithMyStar/
   ├── state/
   ├── tasker/
   ├── kwgt/
   └── backups/
   ```

### Step 3: Set Up Basic Widget
1. Long-press on your home screen → Widgets
2. Find KWGT and add a 2×2 widget
3. Tap the widget to enter edit mode
4. Import the provided `planet_widget.kwgt` file from the `kwgt/` directory in the downloaded files.
5. OR follow the manual setup guide below

### Step 4: Configure Tasker
1. Open Tasker and grant accessibility permissions
2. Import the provided profiles and tasks from the `tasker/` directory in the downloaded files.
3. Enable the "WithMyStar State Manager" profile
4. Test by manually setting variables

## Manual Widget Setup

If automated files aren't available yet, create the widget manually: (Note: Exact menu names or steps might vary slightly with KWGT updates.)

### Basic Planet Widget in KWGT
1. Add a **Circle Shape** (planet base):
   - Size: 100% width/height
   - Color: Gradient from dark blue to cyan
   - Position: Center

2. Add **Progress Ring** (evolution):
   - Type: Progress shape, arc/ring style
   - Progress: `$withmystar_evolution$` (Tasker variable)
   - Color: Neon cyan (#00FFFF)
   - Thickness: 8dp

3. Add **Progress Ring** (streak):
   - Type: Progress shape, outer ring
   - Progress: `$withmystar_streak$` (calculated from streak days)
   - Color: Neon magenta (#FF00FF)
   - Thickness: 4dp

4. Add **Text Label**:
   - Text: `$withmystar_label$`
   - Font: Roboto, 12sp
   - Color: White
   - Position: Bottom center

### Basic Tasker Setup
1. Create **Global Variables**:
   - `%WITHMYSTAR_EVOLUTION` (0-100)
   - `%WITHMYSTAR_STREAK` (days)
   - `%WITHMYSTAR_LEVEL` (1-100)
   - `%WITHMYSTAR_LABEL` (status text)

2. Create **Load State Task**:
   - File → Read File: `/storage/emulated/0/WithMyStar/state/current.json`
   - Variable Set: Parse JSON and set globals (Requires AutoTools for robust JSON parsing. Use 'AutoTools JSON Read' action.)

3. Create **Save State Task**:
   - Variable Set: Build JSON from globals
   - File → Write File: Save to state file

4. Create **Update Widget Profile**:
   - Context: Variable Set (any WITHMYSTAR variable)
   - Task: Send variables to KWGT using Send Intent (Use 'Send Intent' action: Action: `org.kustom.action.UPDATE_WIDGET`, Package: `org.kustom.widget`, Class: `org.kustom.widget.Receiver`)

## Testing Your Setup

### Verify Widget Display
1. The planet should appear as a circular shape
2. Progress rings should be visible (even at 0%)
3. Label should show current status

### Test Tasker Integration
1. Manually set `%WITHMYSTAR_EVOLUTION` to 50
2. Widget should update to show 50% progress
3. Check that state file is created/updated

### Test Safe Mode
1. Create a quick tile for Safe Mode toggle (This can typically be done in Tasker by creating a task and assigning it to a Quick Settings Tile, or via Android's Quick Settings editor).
2. Verify it disables animations/motion
3. Confirm state is preserved

## Troubleshooting

### Widget Not Updating
- Check KWGT Tasker integration is enabled
- Verify variable names match exactly
- Restart KWGT if needed

### Tasker Permission Issues
- Grant accessibility service permission
- Allow Tasker to modify system settings
- Check notification access if using notifications

### File Access Problems
- Verify storage permissions for Tasker
- Check file paths are correct
- Use absolute paths in Tasker tasks

### Performance Issues
- Reduce update frequency if needed
- Enable Safe Mode to disable heavy animations
- Check Tasker battery optimization settings

## Next Steps

Once basic setup is working:

1. **Add Quest System**: Create daily check-in tasks
2. **Implement Backups**: Set up automated state backups
3. **Customize Visuals**: Modify colors and animations
4. **Add Safety Features**: Implement panic reset and recovery

## Getting Help

- Check the [Troubleshooting Guide](debug.md)
- Review [Safety Documentation](safety.md)
- Open an issue on GitHub with your setup details
- Include Android/KWGT/Tasker versions in bug reports

## Advanced Setup

For advanced users who want to customize further:

- **Custom Biomes**: Modify the state schema for new visual themes
- **Additional Sensors**: Integrate device sensors for planet data
- **Cloud Sync**: Set up automatic cloud backup of state files
- **Multiple Planets**: Create separate widget instances for different planets

See the technical documentation for detailed customization options.