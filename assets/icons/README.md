# WithMyStar Icons

This directory contains all icon assets for the WithMyStar project, designed following the cyberpunk aesthetic guidelines.

## Icon Files

### App Icons
- `app-icon.svg` - Main application icon (cyberpunk planet with rings)
- `app-icon-high-contrast.svg` - High contrast version for accessibility

### Widget Elements
- `satellite.svg` - Satellite indicator for widget (32x32)
- `city-light.svg` - City light dots for planet surface (16x16)

### Weather Effects
- `aurora.svg` - Aurora arc overlay for mood states (48x48)
- `storm.svg` - Lightning/storm effect for dramatic states (32x32)

## Design Specifications

### Color Palette
- **Primary**: Cyan `#00FFFF` - Main elements, active states
- **Secondary**: Electric Blue `#0080FF` - Supporting elements
- **Accent**: Magenta `#FF00FF` - Highlights, special indicators
- **Background**: Deep Navy `#001122` - Backgrounds, space
- **White**: `#FFFFFF` - City lights, high contrast elements

### Accessibility Features
- **High Contrast**: Alternative versions with enhanced contrast ratios
- **Scalability**: SVG format for infinite scaling
- **Clear Shapes**: Geometric designs that remain clear at small sizes
- **Color Independence**: Distinguishable without relying on color alone

### Technical Specifications
- **Format**: SVG (Scalable Vector Graphics)
- **Optimization**: Minimal code, efficient rendering
- **Compatibility**: Works in web browsers and can be converted to PNG
- **Effects**: Built-in glow and gradient effects

## Usage Examples

### KWGT Formulas
```
// Display satellite when count >= 1
$if(withmystar_satellites>=1, "/storage/emulated/0/WithMyStar/assets/icons/satellite.svg", "")$

// City lights based on tier
$if(withmystar_city>=1, "/storage/emulated/0/WithMyStar/assets/icons/city-light.svg", "")$
```

### Web Interface
```html
<!-- App icon in header -->
<img src="assets/icons/app-icon.svg" alt="WithMyStar" width="48" height="48">

<!-- High contrast mode -->
<img src="assets/icons/app-icon-high-contrast.svg" alt="WithMyStar" class="high-contrast">
```

### CSS Integration
```css
.satellite-indicator {
  background-image: url('assets/icons/satellite.svg');
  width: 32px;
  height: 32px;
}

.city-light {
  background-image: url('assets/icons/city-light.svg');
  width: 16px;
  height: 16px;
}
```

## Converting to PNG

For Android app icons or when PNG format is required:

```bash
# Convert SVG to PNG at different sizes
inkscape app-icon.svg --export-filename=app-icon-48.png --export-width=48
inkscape app-icon.svg --export-filename=app-icon-72.png --export-width=72
inkscape app-icon.svg --export-filename=app-icon-96.png --export-width=96
inkscape app-icon.svg --export-filename=app-icon-144.png --export-width=144
inkscape app-icon.svg --export-filename=app-icon-192.png --export-width=192
```

## Icon States

### App Icon Variations
The main app icon represents different planet states:
- **Default**: Cyan planet with evolution ring
- **Thriving**: Enhanced glow effects
- **Calm**: Softer blue tones
- **Recovering**: Purple accent colors
- **Safe Mode**: High contrast version

### Widget Elements
- **Satellites**: Appear based on progress milestones (0-4 satellites)
- **City Lights**: Increase in number with city tier progression
- **Weather Effects**: Overlay based on current mood state

## Performance Optimization

### File Sizes
- SVG files optimized for minimal bytes
- Remove unnecessary attributes and whitespace
- Use efficient gradient and filter definitions

### Rendering Performance
- Simple geometric shapes for fast rendering
- Minimal filter effects to reduce CPU usage
- Appropriate for background widget display

## Future Enhancements

### Planned Icons
- Eclipse overlay for dormant states
- Constellation patterns for advanced progress
- Seasonal variations (winter, summer themes)
- Custom user symbols/patterns

### Animated Versions
- Subtle pulsing city lights
- Rotating satellites
- Flowing aurora effects
- Breathing planet (size variation)

Note: All animations respect accessibility settings (reduce motion preference).