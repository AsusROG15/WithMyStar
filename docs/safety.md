# Safety Documentation

WithMyStar is designed with safety-first principles. This document outlines all safety features, accessibility considerations, and user protection mechanisms.

## Core Safety Principles

### 1. User Control and Consent
- **Always opt-in**: No features activate without explicit user consent
- **Transparent operation**: All automated changes are logged and visible
- **Reversible actions**: Every change can be undone or rolled back
- **User ownership**: Users own their data and planet state completely

### 2. No Dark Patterns
- **No addiction mechanics**: Gentle encouragement, never coercion
- **No FOMO tactics**: Missed days don't create irreversible loss
- **No manipulation**: Planet growth reflects genuine progress, not engagement metrics
- **Respectful notifications**: Optional, relevant, and easily disabled

### 3. Stress Reduction
- **Forgiving design**: Mistakes become part of the story, not punishments
- **Safe Mode**: One-tap access to simplified, calming interface
- **Recovery mechanics**: Planet can always recover from setbacks
- **Gentle pacing**: No time pressure or urgent demands

## Safety Features

### Safe Mode
**Purpose**: Provide immediate relief from any overwhelming interface elements.

**Activation**:
- Quick tile in Android notification panel
- Long-press widget → Safe Mode
- Voice command (if configured)
- Tasker scene button

**Safe Mode Effects**:
- Disables all animations and motion
- Reduces color saturation
- Hides complex visual elements
- Simplifies all interactions
- Pauses automated state changes
- Shows only essential information

**Exit Safe Mode**:
- Same methods as activation
- Automatically asks if you want to stay in Safe Mode after 24 hours
- Never exits automatically without user consent

### Accessibility Features

#### Visual Accessibility
- **High Contrast Mode**: Enhanced color contrast for visibility
- **Reduce Motion**: Disables all animations and parallax effects
- **Large Text**: All text scales with system accessibility settings
- **Color Independence**: Information never relies solely on color
- **Flashing Limits**: No elements flash faster than 3Hz

#### Cognitive Accessibility
- **Simple Language**: Clear, jargon-free communication
- **Consistent Interface**: Predictable layout and behavior
- **Gentle Learning Curve**: Progressive complexity introduction
- **Clear Feedback**: Immediate, understandable responses to actions
- **Undo Options**: Easy reversal of any action

#### Motor Accessibility
- **Large Touch Targets**: Minimum 44dp touch areas
- **No Precision Required**: Forgiving touch interaction zones
- **Voice Commands**: Optional voice control for all functions
- **Customizable Gestures**: Alternative input methods
- **No Time Pressure**: No actions require fast response

### Data Protection

#### Privacy
- **Local Storage**: All data stays on your device by default
- **No Tracking**: No analytics or usage tracking
- **No Account Required**: Works completely offline
- **Optional Cloud Backup**: User-controlled cloud storage only
- **Data Portability**: Export your data anytime

#### Security
- **State Encryption**: Local state files can be encrypted (optional)
- **Backup Integrity**: Checksums verify backup completeness
- **Access Control**: Tasker permission management
- **Audit Logs**: Complete history of all state changes
- **Safe Restoration**: Backups validated before restoration

### Recovery Mechanisms

#### Panic Reset
**When to use**: If the widget becomes unresponsive or overwhelming.

**How it works**:
1. Long-press widget for 3 seconds
2. Confirm panic reset dialog
3. Widget resets to safe, minimal state
4. Planet data is preserved in backups
5. Can restore previous state later when ready

#### State Recovery
- **Automatic Backups**: Daily snapshots of planet state
- **Manual Backups**: Create backup before major changes
- **Rollback Options**: Restore any previous state
- **Partial Recovery**: Restore specific aspects (visuals only, data only, etc.)
- **Emergency State**: Hardcoded safe state if all backups fail

#### System Recovery
- **Widget Rebuild**: Reconstruct widget from state data
- **Tasker Recovery**: Restore Tasker configuration from templates
- **File System Check**: Verify and repair file structure
- **Permission Reset**: Guide through permission re-granting
- **Clean Install**: Start fresh while preserving planet data

## User Protection Guidelines

### For Users

#### Recognize Overwhelm
Stop and activate Safe Mode if you experience:
- Anxiety about planet progress
- Compulsive checking of the widget
- Stress about missed days or low scores
- Feeling judged by planet appearance

#### Healthy Usage Patterns
- **Set Boundaries**: Use Safe Mode during stressful periods
- **Take Breaks**: Planet can handle dormant periods
- **Personalize**: Adjust all settings for your comfort
- **Ask for Help**: Use community support without shame

#### Emergency Actions
1. **Immediate Relief**: Activate Safe Mode
2. **Take a Step Back**: Disable all notifications
3. **Reset if Needed**: Use panic reset without guilt
4. **Seek Support**: Contact community or mental health resources

### For Developers

#### Safety-First Development
- **Test with disabled users**: Include accessibility testing
- **Validate safety features**: Ensure Safe Mode works in all scenarios
- **Document all changes**: Maintain clear change logs
- **Monitor for dark patterns**: Regular review of all features
- **User feedback priority**: Safety concerns take precedence

#### Code Review Checklist
- [ ] Does this respect user agency?
- [ ] Can this be overwhelming for anyone?
- [ ] Is this accessible to users with disabilities?
- [ ] Are the privacy implications clear?
- [ ] Can this be easily reversed?
- [ ] Does this work in Safe Mode?

## Crisis Resources

### If WithMyStar Becomes Problematic
1. **Immediate Action**: Activate Safe Mode
2. **Disable Completely**: Remove widget from home screen
3. **Preserve Data**: Export planet state for later
4. **Seek Support**: Mental health resources below

### Mental Health Resources
- **Crisis Text Line**: Text HOME to 741741 (US)
- **National Suicide Prevention Lifeline**: 988 (US)
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/
- **Local Resources**: Contact your local mental health services

### Community Support
- **GitHub Discussions**: Ask for help from the community
- **Safety Issues**: Report safety concerns immediately
- **Feature Requests**: Suggest safety improvements
- **Documentation**: Help improve safety documentation

## Reporting Safety Issues

### What to Report
- Features that feel manipulative or coercive
- Accessibility barriers for any disability
- Dark patterns or addictive mechanics
- Privacy or security concerns
- Any overwhelming or stressful aspects

### How to Report
1. **GitHub Issues**: Use the "Safety Concern" template
2. **Direct Contact**: Email project maintainers
3. **Anonymous Reports**: Use anonymous reporting tools
4. **Community Discussion**: Raise in GitHub Discussions

### Response Promise
- **Immediate triage**: Safety issues get highest priority
- **Transparent communication**: Clear updates on resolution
- **User involvement**: Affected users participate in solutions
- **Prevention focus**: Address root causes, not just symptoms

## Safety Roadmap

### Current Features
- [x] Safe Mode implementation
- [x] Accessibility features
- [x] Data protection
- [x] Recovery mechanisms

### Planned Improvements
- [ ] Enhanced voice control
- [ ] Better crisis detection
- [ ] Improved backup systems
- [ ] Professional accessibility audit
- [ ] User safety research
- [ ] Community safety guidelines

## Remember

WithMyStar is a tool for joy and growth, never stress or obligation. Your wellbeing is more important than any digital planet. When in doubt, prioritize your safety and peace of mind.

**The planet will always be there when you're ready.**