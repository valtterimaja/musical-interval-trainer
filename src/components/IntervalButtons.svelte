<script>
  import { INTERVALS } from '../lib/intervals.js';
  import { feedback } from '../lib/stores.js';

  export let onSelect;
  export let correctAnswer = null;
  export let disabled = false;
</script>

<div class="interval-buttons">
  {#each INTERVALS as interval}
    <button
      class="interval-btn"
      class:correct={$feedback && correctAnswer?.semitones === interval.semitones && $feedback === 'correct'}
      class:incorrect={$feedback && correctAnswer?.semitones === interval.semitones && $feedback === 'incorrect'}
      class:highlight-correct={$feedback === 'incorrect' && correctAnswer?.semitones === interval.semitones}
      disabled={disabled}
      on:click={() => onSelect(interval)}
    >
      <span class="name">{interval.name}</span>
      <span class="semitones">{interval.semitones} st</span>
    </button>
  {/each}
</div>

<style>
  .interval-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
    max-width: 700px;
    margin: 0 auto;
  }

  .interval-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .interval-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }

  .interval-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .interval-btn.correct {
    background: rgba(74, 222, 128, 0.3);
    border-color: #4ade80;
  }

  .interval-btn.incorrect {
    background: rgba(248, 113, 113, 0.3);
    border-color: #f87171;
  }

  .interval-btn.highlight-correct {
    background: rgba(74, 222, 128, 0.3);
    border-color: #4ade80;
  }

  .name {
    font-weight: 600;
    font-size: 1rem;
  }

  .semitones {
    font-size: 0.75rem;
    opacity: 0.7;
  }
</style>
