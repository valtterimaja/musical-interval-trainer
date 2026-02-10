# Musical Interval Trainer

A browser-based ear training application for learning to recognize musical intervals. Built with Svelte and the Web Audio API.

## Features

- **Ear Training Mode**: Listen to intervals and identify them by clicking on a piano keyboard
- **Progressive Difficulty**: 11 stages from A Minor Pentatonic to full Chromatic scale
- **Two Attempt System**: Get a second chance on wrong answers before moving on
- **Melodic & Harmonic Modes**: Practice intervals played sequentially or simultaneously
- **Multilingual**: Available in English, Chinese, Hindi, Spanish, French, and Finnish
- **No Backend Required**: Runs entirely in the browser

## Stages

1. A Minor Pentatonic - 1 octave, from A, upward
2. A Minor Pentatonic - 1 octave, any note, upward
3. A Minor Pentatonic - 2 octaves, upward
4. A Minor Pentatonic - 2 octaves, up or down
5. A Natural Minor - 1 octave, upward
6. A Natural Minor - 1 octave, up or down
7. A Natural Minor - 2 octaves, upward
8. A Natural Minor - 2 octaves, up or down
9. A Harmonic Minor - 2 octaves, up or down
10. Chromatic - 1 octave, up or down
11. Chromatic - 2 octaves, up or down (master level)

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service.

## Tech Stack

- **Svelte** - UI framework
- **Vite** - Build tool
- **Web Audio API** - Sound synthesis

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Third-Party Licenses

This project uses open source dependencies with the following licenses:

| License | Packages |
|---------|----------|
| MIT | svelte, vite, @sveltejs/vite-plugin-svelte, and most dependencies |
| Apache-2.0 | @ampproject/remapping, aria-query, axobject-query |
| BSD-3-Clause | source-map-js |
| CC0-1.0 | mdn-data (public domain) |

All dependencies use permissive licenses that allow commercial use, modification, and distribution.

### License Summary

- **MIT**: Permission to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
- **Apache-2.0**: Similar to MIT with explicit patent rights grant
- **BSD-3-Clause**: Similar to MIT; prohibits using contributor names for endorsement
- **CC0-1.0**: Public domain dedication; no restrictions
