<script>
  import { midiToNoteName } from '../lib/intervals.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let startMidi = 48; // C3
  export let numKeys = 25; // 2 octaves + 1
  export let highlightedNotes = []; // MIDI note numbers to highlight (first note)
  export let activeNotes = null; // MIDI notes that are playable (null = all active)
  export let correctNote = null; // The correct answer note (shown after guess)
  export let guessedNote = null; // The note the user guessed (final wrong guess)
  export let wrongGuessNote = null; // First wrong guess (shown in yellow for "try again")
  export let interactive = false; // Whether keys are clickable
  export let disabled = false; // Disable clicking

  // Generate key data
  $: keys = Array.from({ length: numKeys }, (_, i) => {
    const midi = startMidi + i;
    const noteIndex = midi % 12;
    const isBlack = [1, 3, 6, 8, 10].includes(noteIndex);
    const isActive = activeNotes === null || activeNotes.includes(midi);
    return {
      midi,
      isBlack,
      noteName: midiToNoteName(midi),
      isHighlighted: highlightedNotes.includes(midi),
      isCorrect: correctNote === midi,
      isGuessed: guessedNote === midi,
      isWrong: guessedNote === midi && correctNote !== midi,
      isWrongFirst: wrongGuessNote === midi, // First wrong attempt
      isActive
    };
  });

  $: whiteKeys = keys.filter(k => !k.isBlack);
  $: blackKeys = keys.filter(k => k.isBlack);

  function getBlackKeyOffset(midi) {
    // Find the neighboring white keys and center the black key on their boundary
    const aboveIndex = whiteKeys.findIndex(k => k.midi === midi + 1);
    if (aboveIndex === -1) return 0;
    return aboveIndex * (100 / whiteKeys.length);
  }

  function handleKeyClick(key) {
    if (interactive && !disabled && key.isActive) {
      dispatch('keyclick', { midi: key.midi });
    }
  }
</script>

<div class="piano-container">
  <div class="piano" style="--white-key-count: {whiteKeys.length}">
    {#each whiteKeys as key}
      <button
        class="key white"
        class:highlighted={key.isHighlighted}
        class:correct={key.isCorrect}
        class:wrong={key.isWrong}
        class:wrong-first={key.isWrongFirst}
        class:inactive={!key.isActive}
        class:interactive={interactive && !disabled && key.isActive}
        disabled={!interactive || disabled || !key.isActive}
        on:click={() => handleKeyClick(key)}
      >
        <span class="note-label">{key.noteName}</span>
      </button>
    {/each}

    {#each blackKeys as key}
      <button
        class="key black"
        class:highlighted={key.isHighlighted}
        class:correct={key.isCorrect}
        class:wrong={key.isWrong}
        class:wrong-first={key.isWrongFirst}
        class:inactive={!key.isActive}
        class:interactive={interactive && !disabled && key.isActive}
        disabled={!interactive || disabled || !key.isActive}
        style="left: {getBlackKeyOffset(key.midi)}%"
        on:click={() => handleKeyClick(key)}
      >
      </button>
    {/each}
  </div>
</div>

<style>
  .piano-container {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    overflow-x: auto;
  }

  .piano {
    position: relative;
    display: flex;
    height: 180px;
    min-width: 600px;
  }

  .key {
    position: relative;
    border-radius: 0 0 6px 6px;
    transition: all 0.2s;
    cursor: default;
    font-family: inherit;
  }

  .key.interactive {
    cursor: pointer;
  }

  .key.interactive:hover {
    filter: brightness(0.95);
    transform: scale(1.02);
  }

  .key.white {
    flex: 1;
    background: linear-gradient(to bottom, #fff 0%, #e8e8e8 100%);
    border: 1px solid #ccc;
    margin-right: 2px;
    z-index: 1;
  }

  .key.white:last-child {
    margin-right: 0;
  }

  .key.white.inactive {
    background: linear-gradient(to bottom, #9ca3af 0%, #6b7280 100%);
    border-color: #4b5563;
  }

  .key.white.inactive .note-label {
    color: #374151;
  }

  .key.white.highlighted {
    background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
    border-color: #2563eb;
  }

  .key.white.correct {
    background: linear-gradient(to bottom, #4ade80 0%, #22c55e 100%);
    border-color: #16a34a;
  }

  .key.white.wrong {
    background: linear-gradient(to bottom, #f87171 0%, #ef4444 100%);
    border-color: #dc2626;
  }

  .key.white.wrong-first {
    background: linear-gradient(to bottom, #fbbf24 0%, #f59e0b 100%);
    border-color: #d97706;
  }

  .key.black {
    position: absolute;
    width: calc(100% / var(--white-key-count) * 0.6);
    height: 110px;
    background: linear-gradient(to bottom, #333 0%, #000 100%);
    border: 1px solid #000;
    z-index: 2;
    transform: translateX(-50%);
    padding: 0;
  }

  .key.black.inactive {
    background: linear-gradient(to bottom, #4b5563 0%, #374151 100%);
    border-color: #1f2937;
  }

  .key.black.highlighted {
    background: linear-gradient(to bottom, #3b82f6 0%, #1d4ed8 100%);
    border-color: #1e40af;
  }

  .key.black.correct {
    background: linear-gradient(to bottom, #22c55e 0%, #16a34a 100%);
    border-color: #15803d;
  }

  .key.black.wrong {
    background: linear-gradient(to bottom, #ef4444 0%, #dc2626 100%);
    border-color: #b91c1c;
  }

  .key.black.wrong-first {
    background: linear-gradient(to bottom, #f59e0b 0%, #d97706 100%);
    border-color: #b45309;
  }

  .note-label {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: #666;
    white-space: nowrap;
  }

  .key.white.highlighted .note-label,
  .key.white.correct .note-label,
  .key.white.wrong .note-label,
  .key.white.wrong-first .note-label {
    color: white;
    font-weight: 600;
  }
</style>
