# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Musical Interval Trainer — a browser-based ear training SPA built with Svelte 4 and Vite 5. Users learn to recognize musical intervals through interactive listening exercises with a virtual piano keyboard. No backend; all audio is synthesized client-side via Web Audio API.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at localhost:5173
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

No linting, testing, or formatting tools are configured.

## Architecture

**Entry flow:** `index.html` → `src/main.js` → `App.svelte` (mounts to `#app`)

### State Management (`src/lib/stores.js`)
All app state lives in Svelte writable/derived stores. Key stores: `currentLang`, `currentMode`, `currentStage`, `score`, `settings`, `currentQuestion`, `feedback`. Derived stores (`currentScale`, `scorePercentage`, `canAdvance`) compute values reactively. Helper functions (`resetScore`, `incrementScore`, `advanceStage`) mutate stores.

### Musical Theory (`src/lib/intervals.js`)
MIDI-based note system (60=C4, 69=A4=440Hz). Defines 12 chromatic intervals and 11 progressive stages from A Minor Pentatonic to Chromatic. `generateScaleInterval()` produces random practice questions. Stages control which notes/intervals are available and how many correct answers are needed to advance.

### Audio (`src/lib/audio.js`)
Web Audio API wrapper with ADSR envelope shaping. Dual oscillator synthesis (sine + triangle). Supports melodic (sequential) and harmonic (simultaneous) interval playback.

### Components (`src/components/`)
- **EarTraining.svelte** — Main ear training mode: listen to intervals, identify notes on piano. Two-attempt system.
- **TheoryMode.svelte** — Visual interval identification quiz mode.
- **PianoKeyboard.svelte** — Interactive piano visualization. Emits `keyclick` events.
- **IntervalButtons.svelte** — Interval selection UI for theory mode.
- **ScoreDisplay.svelte** — Score tracking widget.

### i18n (`src/lib/translations.js`)
6 languages: English, Chinese, Hindi, Spanish, French, Finnish. Translation keys accessed via `currentLang` store.

## Conventions

- Vanilla JavaScript (no TypeScript)
- Component-scoped CSS in `<style>` blocks
- Dark theme with gradient backgrounds (#1a1a2e, #16213e)
- Components communicate via Svelte event dispatching (`dispatch`) and store subscriptions (`$store` syntax)
- No runtime dependencies beyond Svelte — audio uses native Web Audio API
