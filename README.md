# Advanced Stopwatch

A modern, feature-rich stopwatch application built with vanilla HTML, CSS, and JavaScript. Features high-precision timing, lap tracking, sound effects, and keyboard shortcuts.

## Features

### ⏱️ **High-Precision Timing**
- Millisecond accuracy using `performance.now()`
- Smooth 60fps updates with `requestAnimationFrame`
- Displays hours, minutes, seconds, and milliseconds

### 🎵 **Sound Effects**
- Per-second tick sound when running
- Click sounds for start/pause/reset/lap actions
- Volume control slider
- Mute toggle
- Tick sound toggle

### ⌨️ **Keyboard Shortcuts**
- **Space** - Start/Pause stopwatch
- **L** - Add lap
- **R** - Reset stopwatch
- **M** - Toggle mute

### 📊 **Lap Tracking**
- Record unlimited laps with split times
- Shows lap number, split time, and total time
- Lap history with scrollable list
- Split time calculation between laps

### 🎨 **Modern UI**
- Clean, light theme design
- Responsive layout
- Smooth animations and transitions
- Accessible with proper ARIA labels
- Professional gradient backgrounds

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start using the stopwatch!

### File Structure
```
StopWatch/
├── index.html      # Main HTML structure
├── style.css       # Styling and theme
├── script.js       # Stopwatch logic and functionality
└── README.md       # This documentation
```

## Usage

### Basic Controls
1. **Start**: Click the "Start" button or press Space to begin timing
2. **Pause**: Click "Pause" or press Space again to pause
3. **Lap**: Click "Lap" or press L to record a lap time
4. **Reset**: Click "Reset" or press R to clear all data

### Sound Controls
- **Mute**: Toggle to disable all sounds
- **Tick**: Toggle to disable per-second tick sounds
- **Volume**: Adjust overall volume level (0-100%)

### Lap Management
- Each lap shows:
  - **Lap Number**: Sequential lap counter
  - **Split Time**: Time for that specific lap
  - **Total Time**: Cumulative time from start
- Laps are displayed in reverse chronological order (newest first)
- Scrollable list for many laps

## Technical Details

### Timing Precision
- Uses `performance.now()` for high-resolution timing
- Accumulates time across pause/resume cycles
- Maintains precision even with browser tab switching

### Audio System
- Web Audio API for sound generation
- Programmatic oscillator creation for clicks and ticks
- Volume and mute controls with real-time adjustment

### Performance
- Efficient animation loop with `requestAnimationFrame`
- Minimal DOM manipulation for smooth updates
- Optimized event handling and memory usage

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile browsers**: Responsive design works on all devices

## Customization

### Themes
The CSS uses CSS custom properties (variables) for easy theming:
```css
:root {
    --bg: #f8fafc;
    --surface: #ffffff;
    --text: #1e293b;
    --primary: #3b82f6;
    --accent: #10b981;
    /* ... more variables */
}
```

### Sound Frequencies
Modify the `beep()` function calls in `script.js` to change sound frequencies:
```javascript
beep(frequency, duration, gain)
```

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the stopwatch.

## License

This project is open source and available under the MIT License.

## Future Enhancements

Potential features for future versions:
- Dark/light theme toggle
- Export lap data to CSV
- Countdown timer mode
- Multiple stopwatch instances
- Custom sound uploads
- Lap statistics (fastest/slowest lap)
- Preset timer intervals
