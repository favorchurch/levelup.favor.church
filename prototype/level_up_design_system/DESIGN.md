---
name: Level Up Design System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e5beb3'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#ac897f'
  outline-variant: '#5c4038'
  surface-tint: '#ffb5a0'
  primary: '#ffb5a0'
  on-primary: '#601500'
  primary-container: '#ff5723'
  on-primary-container: '#541100'
  inverse-primary: '#b12e00'
  secondary: '#a7c8ff'
  on-secondary: '#003060'
  secondary-container: '#2e91ff'
  on-secondary-container: '#002a54'
  tertiary: '#98cbff'
  on-tertiary: '#003354'
  tertiary-container: '#0e97ea'
  on-tertiary-container: '#002c49'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a0'
  on-primary-fixed: '#3b0900'
  on-primary-fixed-variant: '#872100'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a7c8ff'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#004787'
  tertiary-fixed: '#cee5ff'
  tertiary-fixed-dim: '#98cbff'
  on-tertiary-fixed: '#001d33'
  on-tertiary-fixed-variant: '#004a77'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '800'
    lineHeight: '1.2'
  title-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 48px
  margin-mobile: 20px
  gutter-mobile: 16px
---

## Brand & Style

This design system is engineered to capture the high-octane energy of youth culture while maintaining the spiritual intentionality of a verse challenge. The brand personality is **electric, motivating, and unapologetically bold**. It aims to evoke a sense of "digital adrenaline," making the daily habit of scripture reading feel like an epic quest rather than a chore.

The visual direction is a fusion of **High-Contrast Bold** and **Modern Gamification**. It utilizes massive, punchy typography and a restricted, high-intensity color palette to drive focus. Borrowing from "tactile" gamification, the UI features thick strokes and "squishy" physical metaphors for buttons and progress indicators to create a satisfying, toy-like interaction model similar to modern learning apps.

## Colors

The palette is rooted in the "YTH CAMP" DNA, prioritizing high-impact visibility. The primary engine of the design is **Vibrant Orange**, used for calls to action, active states, and brand-critical elements.

- **Primary:** Vibrant Orange (#FF5018) for momentum and energy.
- **Accent/Success:** Electric Blue (#188BFC) is used exclusively for "unlocked" states, achievements, and completed streaks to provide a cool contrast to the warm primary tone.
- **Backgrounds:** A pure "OLED" Black (#000000) serves as the canvas, with a slightly elevated Charcoal (#121212) for cards and containers to create depth without losing the high-contrast edge.
- **Text:** Stark White (#FFFFFF) ensures maximum readability and a clean, modern finish against the dark backgrounds.

## Typography

The typography strategy emphasizes hierarchy and impact. **Montserrat** is utilized for all display and headline roles, set at heavy weights (ExtraBold to Black) with tight letter spacing to mirror the YTH CAMP aesthetic. 

**Inter** provides the functional backbone for verse text and body copy, chosen for its exceptional legibility in dark mode. For gamified elements like "Day 01" labels or "Streak Count," use uppercase styles with increased tracking to give the UI a technical, sport-oriented feel.

## Layout & Spacing

This design system uses a **Fluid Grid** model with generous safe-area margins to accommodate modern mobile displays. 

- **Vertical Rhythm:** A strict 8px baseline grid is enforced. Components are separated by 20px (md) to 32px (lg) to prevent the UI from feeling cluttered, maintaining the "minimal but bold" aesthetic.
- **Safe Zones:** Content is inset by 20px from the screen edge on mobile to ensure tap targets are accessible and text doesn't feel cramped against the bezel.
- **Progress Tracking:** Vertical layouts dominate, leading the user's eye down a single path of progression (similar to a quest line).

## Elevation & Depth

To maintain a modern, "app-centric" feel, depth is communicated through **Tonal Layers** and **Subtle Inner Shadows** rather than heavy drop shadows.

- **Surface Levels:** The base layer is pure black. Secondary containers use a subtle #121212 tint.
- **Tactile Shadows:** For gamified buttons, a 4px solid bottom-border offset (color-matched to a darker shade of the button color) is used to create a 3D "pressable" effect, mimicking the tactile feel of physical buttons.
- **Glow Effects:** Success states and unlocked badges use a soft, vibrant outer glow (15-20% opacity) in Electric Blue to make them feel "powered on."

## Shapes

The shape language is consistently **Rounded (2xl)**. This softens the intensity of the high-contrast colors, making the app feel approachable and friendly rather than aggressive. 

Large corner radii (1.5rem for primary cards and 1rem for buttons) are a signature of the system, echoing the playful design patterns found in youth-focused social and educational apps. Badges and progress indicators should use full pill-shaping (100px+ radii) to distinguish them as interactive tokens.

## Components

### Buttons
- **Primary Action:** Vibrant Orange background, white bold text, with a 4px bottom shadow for a tactile feel.
- **Secondary Action:** Transparent background with a thick (2px) white border.

### Gamification Elements
- **Streak Icons:** A flame or lightning bolt icon that transitions from grayscale to Orange/Yellow as the user completes their daily verse.
- **Progress Bars:** Thick, 12px tall tracks. The "unfilled" portion is a dark charcoal, while the "filled" portion uses the primary Orange with a rounded leading edge.
- **Level Badges:** Circular or hexagonal containers with high-contrast icons. "Locked" badges are shown at 30% opacity; "Unlocked" badges glow with Electric Blue.

### Verse Cards
- High-contrast containers with thick padding (24px). Scripture text should be set in Inter (Body LG) with ample line height (1.6) to ensure focus and reflection.

### Input Fields
- Underlined or fully enclosed in a #121212 container with a 2px Orange border appearing only on "active" or "focused" states.