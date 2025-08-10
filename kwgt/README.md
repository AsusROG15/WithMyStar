# KWGT Widget Files

This directory contains the KWGT widget configurations and assets for WithMyStar.

## Files

### planet_widget.kwgt
The main widget export file containing:
- Planet visual elements (circle, gradients, textures)
- Progress rings (evolution, streak)
- City lights and satellite indicators
- Text labels and status displays
- Tasker variable bindings
- Accessibility features

## Installation

1. Download `planet_widget.kwgt` to your device
2. Open KWGT app
3. Import the widget file
4. Add a 2×2 widget to your home screen
5. Select the imported WithMyStar widget
6. Ensure Tasker integration is enabled

## Widget Components

### Main Planet
- **Shape**: Circle with gradient fill
- **Colors**: Dynamic based on mood and biome
- **Size**: Responsive to widget dimensions
- **Texture**: Optional overlay for biome themes

### Progress Rings
- **Inner Ring**: Evolution progress (0-100%)
- **Outer Ring**: Streak progress (days to percentage)
- **Colors**: Neon cyan and magenta
- **Animation**: Smooth transitions (respects reduce motion)

### City Lights
- **Type**: Small circle shapes
- **Visibility**: Based on cityTiers variable
- **Pattern**: Scattered around planet surface
- **Animation**: Gentle pulsing (in normal mode)

### Satellites
- **Type**: Small icons or shapes
- **Count**: Based on satellites variable (0-4)
- **Position**: Orbital around planet
- **Animation**: Slow rotation (if motion enabled)

### Text Display
- **Content**: Dynamic label from Tasker
- **Font**: System default (accessibility friendly)
- **Size**: Scales with system text size
- **Position**: Below planet or overlay

## Variable Bindings

### Required Tasker Variables
```
$withmystar_evolution$ → Inner ring progress
$withmystar_streak$ → Outer ring progress (calculated)
$withmystar_mood$ → Planet colors and effects
$withmystar_biome$ → Color scheme and textures
$withmystar_city$ → City lights visibility
$withmystar_satellites$ → Satellite count
$withmystar_safemode$ → Animation and complexity
$withmystar_label$ → Text display
```

### Formulas Examples
```
// Evolution ring progress
Progress: $withmystar_evolution$

// Planet color based on mood
Color: $if(withmystar_mood=thriving, #00FFFF, if(withmystar_mood=calm, #0080FF, #004080))$

// City lights visibility
Visibility: $if(withmystar_city>=1, ALWAYS, NEVER)$

// Safe mode opacity reduction
Opacity: $if(withmystar_safemode=1, 50, 100)$
```

## Accessibility Features

### High Contrast Mode
- Alternative color schemes
- Increased contrast ratios
- Bold outlines and borders

### Reduce Motion
- Disables all animations
- Static progress indicators
- No rotating or pulsing elements

### Text Scaling
- All text respects system font size
- Minimum touch target sizes
- Clear visual hierarchy

## Customization

### Color Schemes
Edit these color values for different themes:
- **Neon Ocean**: Cyan (#00FFFF) and blue gradients
- **Cyber Forest**: Green (#00FF00) and teal
- **Crystal Desert**: Purple (#8000FF) and pink
- **Aurora Tundra**: White (#FFFFFF) and ice blue
- **Void Nebula**: Deep purple and magenta

### Layout Options
- **Compact**: Minimal elements for smaller widgets
- **Detailed**: Full feature set for larger widgets
- **Accessible**: High contrast, large elements

### Animation Settings
- **Normal**: Full animations and effects
- **Reduced**: Limited motion
- **Static**: No animations (safe mode default)

## Troubleshooting

### Widget Not Updating
1. Check KWGT Tasker integration is enabled
2. Verify variable names match exactly
3. Restart KWGT if variables don't update
4. Check Tasker variable values manually

### Visual Issues
1. Check device performance settings
2. Verify KWGT Pro features if used
3. Test with different launcher apps
4. Clear KWGT cache if rendering issues

### Performance
1. Reduce animation complexity for older devices
2. Lower update frequency for battery saving
3. Use static mode on low-end hardware
4. Monitor CPU and memory usage

## Assets Directory

### Icons
- `satellite.png` - Satellite indicator icons
- `city-light.png` - City light indicators
- Weather effect icons

### Textures
- `ocean-texture.png` - Ocean biome overlay
- `forest-texture.png` - Forest biome overlay
- Background patterns for different biomes

### Fonts (if custom)
- Cyberpunk-themed fonts
- High-contrast accessible fonts
- Icon fonts for UI elements

## Version History

Track changes to widget configuration:
- v0.1.0: Initial basic planet and rings
- v0.1.1: Added city lights and satellites
- v0.1.2: Accessibility improvements
- v0.1.3: Safe mode visual changes