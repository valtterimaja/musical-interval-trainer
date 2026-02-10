<script>
  import { generateRandomInterval } from '../lib/intervals.js';
  import { currentQuestion, feedback, incrementScore, setFeedback, clearFeedback } from '../lib/stores.js';
  import PianoKeyboard from './PianoKeyboard.svelte';
  import IntervalButtons from './IntervalButtons.svelte';

  let selectedAnswer = null;

  function newQuestion() {
    const question = generateRandomInterval(48, 60); // C3 to C4 range for theory
    currentQuestion.set(question);
    selectedAnswer = null;
    clearFeedback();
  }

  function handleAnswer(interval) {
    if ($feedback) return;

    selectedAnswer = interval;
    const isCorrect = interval.semitones === $currentQuestion.interval.semitones;
    setFeedback(isCorrect);
    incrementScore(isCorrect);
  }

  // Initialize with a question
  newQuestion();
</script>

<div class="theory-mode">
  <p class="instruction">What interval is shown on the piano?</p>

  {#if $currentQuestion}
    <PianoKeyboard
      startMidi={48}
      numKeys={25}
      highlightedNotes={[$currentQuestion.baseNote, $currentQuestion.secondNote]}
    />
  {/if}

  <IntervalButtons
    onSelect={handleAnswer}
    correctAnswer={selectedAnswer}
    disabled={$feedback !== null}
  />

  {#if $feedback}
    <div class="feedback" class:correct={$feedback === 'correct'}>
      {#if $feedback === 'correct'}
        Correct! It's a {$currentQuestion.interval.name}
      {:else}
        Incorrect. It's a {$currentQuestion.interval.name}
      {/if}
    </div>

    <button class="next-btn" on:click={newQuestion}>
      Next Question
    </button>
  {/if}
</div>

<style>
  .theory-mode {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .instruction {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }

  .feedback {
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 12px;
    background: rgba(248, 113, 113, 0.2);
    color: #fca5a5;
  }

  .feedback.correct {
    background: rgba(74, 222, 128, 0.2);
    color: #86efac;
  }

  .next-btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .next-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
</style>
