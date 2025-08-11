# WithMyStar Assets

This directory contains all visual assets for the WithMyStar project, including icons, textures, and other visual elements used in the KWGT widgets and web interface.

## Directory Structure

```
assets/
├── icons/          # Icon files for UI elements
├── textures/       # Background textures and overlays
├── fonts/          # Custom fonts (if any)
└── README.md       # This file
```

## Design Guidelines

All assets follow the cyberpunk aesthetic defined in `/docs/ui.md`:
- **Colors**: Neon cyan (#00FFFF), electric blue (#0080FF), magenta (#FF00FF)
- **Style**: Geometric shapes, clean edges, glowing effects
- **Accessibility**: High contrast options, scalable designs
- **Performance**: Optimized file sizes for mobile widgets

## Icon Specifications

### App Icon
- **Sizes**: 48px, 72px, 96px, 144px, 192px (Android densities)
- **Format**: PNG with transparency
- **Design**: Circular planet with evolution ring
- **Colors**: Neon cyan planet with electric blue ring

### Widget Icons
- **Satellites**: 16px, 24px, 32px geometric shapes
- **City Lights**: 8px, 12px, 16px circular dots
- **Weather Effects**: 32px, 48px overlay patterns

### Accessibility
- **High Contrast**: Alternative versions with enhanced contrast
- **Scalability**: Vector-based designs when possible
- **Color Blind**: Tested with deuteranopia/protanopia simulators

## Usage

### KWGT Integration
Icons are referenced in KWGT formulas using file paths:
```
$if(satellites>=1, icons/satellite.png, "")$
```

### Web Interface
Icons can be used in HTML/CSS:
```html
<img src="assets/icons/app-icon-96.png" alt="WithMyStar">
```

## Optimization

All assets are optimized for:
- **File Size**: Minimal bytes for mobile performance
- **Loading Speed**: Quick display on widgets
- **Battery Impact**: Efficient rendering
- **Memory Usage**: Appropriate for background widgets

## Contributing

When adding new assets:
1. Follow the cyberpunk design aesthetic
2. Include multiple sizes for responsive design
3. Test with high contrast accessibility settings
4. Optimize file sizes before committing
5. Update this README with new assets