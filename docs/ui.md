# UI and Visual Design Guidelines

This document outlines the visual design principles, color schemes, typography, and UI patterns for WithMyStar.

## Design Philosophy

### Cyberpunk Aesthetic
WithMyStar embraces a **cyberpunk visual language** that feels futuristic yet accessible:
- **Neon accents** against dark backgrounds
- **Geometric shapes** with clean edges
- **Glowing effects** that feel energetic but not overwhelming
- **High-tech minimalism** avoiding visual clutter

### Emotional Design Principles
1. **Calm by default**: Base state should feel peaceful
2. **Joyful progression**: Growth should feel rewarding
3. **Forgiving appearance**: Setbacks look temporary, not punishing
4. **Personal connection**: Planet feels alive and responsive

### Accessibility First
- **High contrast** options for visibility
- **Reduce motion** respect for motion sensitivity
- **Clear hierarchy** for cognitive accessibility
- **Large touch targets** for motor accessibility

## Color Palette

### Primary Colors

#### Neon Ocean Theme (Default)
- **Primary**: Cyan `#00FFFF` - Evolution rings, active elements
- **Secondary**: Electric Blue `#0080FF` - Planet base, secondary rings
- **Accent**: Magenta `#FF00FF` - Streak indicators, highlights
- **Background**: Deep Navy `#001122` - Space background, containers

#### Mood-Based Variations (These CSS-like variables are conceptual guidelines for React Native theming or for use in web-based UI components.)
```css
/* Thriving State */
--primary: #00FFFF;    /* Bright cyan */
--glow: #00FFFF80;     /* Cyan with alpha */

/* Calm State */
--primary: #0080FF;    /* Softer blue */
--glow: #0080FF60;     /* Muted glow */

/* Recovering State */
--primary: #8000FF;    /* Purple */
--glow: #8000FF40;     /* Gentle purple glow */

/* Growing State */
--primary: #00FF80;    /* Green-cyan */
--glow: #00FF8060;     /* Fresh green glow */

/* Dormant State */
--primary: #404040;    /* Muted gray */
--glow: #40404020;     /* Minimal glow */
```

### Biome Color Schemes

#### Neon Ocean
- Base: Deep blue to cyan gradient
- Accents: Electric blue, bright cyan
- Effects: Ripple patterns, aurora-like sweeps

#### Cyber Forest
- Base: Dark green to teal gradient
- Accents: Neon green, forest teal
- Effects: Pulse patterns, organic flows

#### Crystal Desert
- Base: Purple to pink gradient
- Accents: Magenta, crystal blue
- Effects: Geometric patterns, sharp lines

#### Aurora Tundra
- Base: White to ice blue gradient
- Accents: Cool white, aurora colors
- Effects: Flowing aurora, ice crystals

#### Void Nebula
- Base: Deep purple to black gradient
- Accents: Purple, cosmic magenta
- Effects: Nebula clouds, star field

### Accessibility Colors

#### High Contrast Mode
```css
/* High contrast overrides */
--primary-hc: #FFFFFF;     /* Pure white */
--secondary-hc: #000000;   /* Pure black */
--accent-hc: #FFFF00;      /* High contrast yellow */
--background-hc: #000000;  /* Pure black background */
```

#### Colorblind-Friendly Alternatives
- **Deuteranopia**: Use blue/yellow instead of red/green (e.g., specific palette if defined)
- **Protanopia**: Emphasize blue/purple spectrum (e.g., specific palette if defined)
- **Tritanopia**: Focus on red/cyan contrast (e.g., specific palette if defined)

## Typography

### Font Selection

#### Primary Font
- **System Default**: Respects user's accessibility settings
- **Fallback**: Roboto, Arial, sans-serif
- **Weight**: 400 (normal) for body, 500 (medium) for emphasis

#### Accent Font (Optional)
- **Cyberpunk Style**: Orbitron, Exo 2, or similar geometric fonts
- **Usage**: Headers, special labels only
- **Fallback**: Always include system font fallback

### Text Hierarchy

#### Widget Text Sizes
```css
/* Base sizes - scale with system text size */
--text-small: 10sp;    /* Secondary info */
--text-normal: 12sp;   /* Main labels */
--text-large: 14sp;    /* Important status */
--text-huge: 16sp;     /* Primary information */
```

#### Responsive Scaling
- **2x2 Widget**: Use normal to large sizes
- **3x3 Widget**: Can use larger text hierarchy
- **Accessibility**: Respect system text scaling up to 200%

### Text Treatment

#### Standard Text
- **Color**: High contrast against background
- **Shadow**: Subtle drop shadow for readability
- **Outline**: Optional stroke for visibility over varied backgrounds

#### Glowing Text Effects (This CSS example can be simulated in a React Native application using appropriate styling.)
```css
/* Cyberpunk glow effect */
text-shadow: 
  0 0 5px currentColor,
  0 0 10px currentColor,
  0 0 15px currentColor;
```

## Visual Components

### Planet Visualization

#### Base Planet
- **Shape**: Perfect circle, responsive to widget size
- **Fill**: Gradient based on biome and mood
- **Border**: Optional thin border in accent color
- **Shadow**: Subtle drop shadow for depth

#### Planet States (These CSS examples are conceptual guidelines for React Native styling.)
```css
/* Normal state */
border-radius: 50%;
background: radial-gradient(circle, var(--secondary), var(--primary));

/* Thriving state - enhanced glow */
box-shadow: 0 0 20px var(--glow);

/* Safe mode - simplified */
background: var(--primary);
box-shadow: none;
```

### Progress Indicators

#### Evolution Ring
- **Type**: Circular progress indicator
- **Position**: Inner ring around planet
- **Thickness**: 8dp for visibility
- **Animation**: Smooth transitions (1-2 seconds)
- **Color**: Primary theme color

#### Streak Ring
- **Type**: Circular progress indicator  
- **Position**: Outer ring around evolution ring
- **Thickness**: 4dp (thinner than evolution)
- **Color**: Accent color (magenta family)
- **Max Value**: Converts days to percentage (e.g., 30 days = 100%)

### Decorative Elements

#### City Lights
- **Type**: Small circular dots
- **Size**: 2-4dp diameter
- **Color**: Warm white or theme accent
- **Pattern**: Scattered around planet surface
- **Animation**: Gentle pulsing (1-3 second cycle)
- **Accessibility**: Static in reduce motion mode

#### Satellites
- **Type**: Small geometric shapes or icons
- **Size**: 6-8dp
- **Position**: Orbital paths around planet
- **Count**: 0-4 based on progress
- **Animation**: Slow rotation (30+ second cycle)
- **Style**: Minimal, geometric design

#### Weather Effects

##### Aurora
- **Type**: Curved arc overlay
- **Position**: Top portion of widget
- **Colors**: Cool blues/greens or theme colors
- **Animation**: Gentle shimmer or flow
- **Opacity**: 60-80% to not obscure planet

##### Storm
- **Type**: Lightning or energy patterns
- **Color**: Bright white or electric blue
- **Duration**: Brief flashes, not constant
- **Accessibility**: Respects flashing sensitivity

##### Eclipse
- **Type**: Partial dark overlay
- **Effect**: Reduces overall brightness
- **Duration**: Temporary mood indicator
- **Recovery**: Gradual brightening

## Layout and Spacing

### Widget Layouts

#### 2x2 Standard Layout
```
┌─────────────────┐
│  ┌─────────┐    │
│  │ PLANET  │    │
│  │ + RINGS │    │
│  └─────────┘    │
│   Status Text   │
└─────────────────┘
```

#### 3x3 Extended Layout
```
┌─────────────────────┐
│ ┌─────────────────┐ │
│ │     PLANET      │ │
│ │   + RINGS +     │ │
│ │   SATELLITES    │ │
│ └─────────────────┘ │
│  Detailed Status    │
│  Secondary Info     │
└─────────────────────┘
```

### Spacing Guidelines
- **Padding**: 8dp minimum from widget edges
- **Element spacing**: 4dp between related elements
- **Touch targets**: 44dp minimum for interactive elements
- **Safe areas**: Account for rounded corners on widgets

## Animation Guidelines

### Normal Mode Animations

#### Smooth Transitions
- **Duration**: 1-2 seconds for most changes
- **Easing**: Ease-out for natural feeling
- **Properties**: Transform, opacity, color changes
- **Frequency**: Not more than one animation per 3 seconds

#### Ambient Motion
- **Subtle pulse**: City lights, gentle glow effects
- **Slow rotation**: Satellites, orbital elements
- **Breathing**: Planet size variation (1-2% max)
- **Aurora flow**: Weather effect movement

### Reduced Motion Mode
- **No animations**: All motion effects disabled
- **Instant transitions**: Changes happen immediately
- **Static indicators**: Progress shows as static fills
- **Clear states**: Distinct visual states without animation

### Safe Mode Overrides
- **All animations off**: Regardless of motion settings
- **Simplified visuals**: Remove complex layered effects
- **High contrast**: Override theme colors if needed
- **Minimal processing**: Reduce visual complexity

## Responsive Design

### Widget Size Adaptations

#### Small Widgets (1x1, 2x1)
- **Planet only**: No additional elements
- **Essential text**: Single status line
- **Simplified colors**: Reduced complexity
- **No animations**: Static display only

#### Medium Widgets (2x2, 3x2)
- **Full planet**: Evolution and streak rings
- **City lights**: If space permits
- **Status text**: 1-2 lines of information
- **Minimal satellites**: 1-2 maximum

#### Large Widgets (3x3, 4x4)
- **Full feature set**: All visual elements
- **Extended info**: Multiple status lines
- **Rich animations**: Full animation suite
- **All decorations**: Satellites, weather, cities

### Device Adaptations

#### High DPI Screens
- **Vector graphics**: Scale cleanly
- **Crisp text**: Avoid blur at high resolutions
- **Fine details**: Can include more intricate elements

#### Low-End Devices
- **Simplified rendering**: Reduce visual complexity
- **Static mode**: Disable animations for performance
- **Minimal effects**: Basic shapes and colors only

## Theme Customization

### User Customization Options

#### Basic Themes
- **Color scheme selection**: 5 biome options
- **Mood preferences**: Calm vs energetic defaults
- **Contrast level**: Normal vs high contrast
- **Motion level**: Full, reduced, or none

#### Advanced Customization
- **Custom colors**: User-defined color values
- **Element visibility**: Hide/show specific components
- **Layout options**: Compact vs detailed layouts
- **Personal symbols**: Custom icons or patterns

### Implementation Guidelines



## Brand Guidelines

### Logo and Identity
- **No formal logo required**: The planet itself is the identity
- **Consistent styling**: Maintain cyberpunk aesthetic
- **Color recognition**: Neon cyan as primary brand color
- **Shape language**: Circles, clean geometry

### Voice and Tone
- **Visual communication**: Optimistic, futuristic, calm
- **Error states**: Gentle, recoverable, not alarming
- **Success states**: Celebratory but not overwhelming
- **Information**: Clear, helpful, respectful

This design system ensures WithMyStar maintains visual consistency while remaining accessible and joyful for all users.