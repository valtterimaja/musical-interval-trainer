<script>
  import { playInterval, resumeAudioContext } from '../lib/audio.js';
  import { generateScaleInterval, getIntervalBySemitones, getScaleNotes, SCALES } from '../lib/intervals.js';
  import {
    currentQuestion, feedback, settings, currentScale, currentStage,
    stageProgress, canAdvance, incrementScore, setFeedback, clearFeedback,
    advanceStage, resetToFirstStage, currentLang, decrementScore,
    gameCompleted, completeGame, score, scorePercentage, testMode
  } from '../lib/stores.js';
  import { t, getIntervalName, getScaleName, getScaleDescription } from '../lib/translations.js';
  import PianoKeyboard from './PianoKeyboard.svelte';

  let hasPlayed = false;
  let guessedNote = null;
  let wrongGuessNote = null; // Track first wrong guess to show it
  let showAdvancePrompt = false;
  let audioUnlocked = false;
  let attemptCount = 0; // 0 = no attempt, 1 = first try, 2 = second try
  let autoAdvanceTimer = null;
  let feedbackIntervalName = ''; // Captured at answer time to avoid reactive timing issues

  // Piano range based on scale's octave setting
  const PIANO_START = 57; // A3
  $: pianoKeys = ($currentScale?.octaves === 2) ? 25 : 13;
  $: pianoEnd = PIANO_START + pianoKeys - 1;

  // Get active notes for current scale
  $: activeNotes = $currentScale ? getScaleNotes($currentScale, PIANO_START, pianoEnd) : null;

  function clearAutoAdvance() {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
  }

  async function newQuestion() {
    if (!$currentScale) return;

    clearAutoAdvance();
    const question = generateScaleInterval($currentScale, PIANO_START, pianoEnd, $currentQuestion);
    currentQuestion.set(question);
    hasPlayed = false;
    guessedNote = null;
    wrongGuessNote = null;
    showAdvancePrompt = false;
    attemptCount = 0;
    clearFeedback();

    // Auto-play if audio is unlocked
    if (audioUnlocked) {
      setTimeout(() => playCurrentInterval(), 100);
    }
  }

  async function startTraining() {
    await resumeAudioContext();
    audioUnlocked = true;
    playCurrentInterval();
  }

  async function playCurrentInterval() {
    await resumeAudioContext();
    if ($currentQuestion) {
      playInterval(
        $currentQuestion.baseFrequency,
        $currentQuestion.secondFrequency,
        $settings.intervalType
      );
      hasPlayed = true;
    }
  }

  function handleKeyClick(event) {
    if (!hasPlayed) return;
    if ($feedback === 'correct') return; // Already correct, waiting for auto-advance
    if (attemptCount >= 2) return; // Already failed twice

    const clickedMidi = event.detail.midi;
    const isCorrect = clickedMidi === $currentQuestion.secondNote;

    attemptCount++;

    if (isCorrect) {
      guessedNote = clickedMidi;
      feedbackIntervalName = getIntervalName($currentQuestion.interval.shortName, $currentLang);
      setFeedback('correct');
      incrementScore(true);

      // Check if we should show advance prompt or complete game
      if ($canAdvance && isFinalStage) {
        completeGame();
      } else if ($canAdvance) {
        showAdvancePrompt = true;
      } else {
        // Auto-advance after delay
        autoAdvanceTimer = setTimeout(() => {
          newQuestion();
        }, 1200);
      }
    } else {
      // Wrong answer
      if (attemptCount === 1) {
        // First wrong attempt - show "try again" and replay
        wrongGuessNote = clickedMidi;
        setFeedback('tryagain');
        // Replay the interval to help them
        setTimeout(() => playCurrentInterval(), 500);
      } else {
        // Second wrong attempt - show correct answer, deduct point, move on
        guessedNote = clickedMidi;
        feedbackIntervalName = getIntervalName($currentQuestion.interval.shortName, $currentLang);
        setFeedback('incorrect');
        decrementScore();

        // Auto-advance after showing correct answer
        autoAdvanceTimer = setTimeout(() => {
          newQuestion();
        }, 2000);
      }
    }
  }

  function handleAdvance() {
    clearAutoAdvance();
    advanceStage();
    // newQuestion() is called automatically by the reactive block when $currentScale changes
  }

  function handleRestart() {
    clearAutoAdvance();
    resetToFirstStage();
    // newQuestion() is called automatically by the reactive block when $currentScale changes
  }

  function toggleIntervalType() {
    settings.update(s => ({
      ...s,
      intervalType: s.intervalType === 'melodic' ? 'harmonic' : 'melodic'
    }));
  }

  // Get interval name from the guessed note
  $: guessedInterval = guessedNote && $currentQuestion
    ? getIntervalBySemitones(Math.abs(guessedNote - $currentQuestion.baseNote))
    : null;

  // Progress percentage for current stage
  $: stageRequired = $testMode ? 1 : $currentScale?.requiredCorrect;
  $: progressPercent = stageRequired
    ? Math.min(100, ($stageProgress / stageRequired) * 100)
    : 100;

  // Is this the final stage?
  $: isFinalStage = $currentStage === SCALES.length - 1;

  $: guessedIntervalName = guessedInterval ? getIntervalName(guessedInterval.shortName, $currentLang) : '';

  // Initialize with a question
  $: if ($currentScale) {
    newQuestion();
  }
</script>

<div class="ear-training">
  {#if $gameCompleted}
    <div class="congratulations">
      <h1 class="congrats-title">{t('ui', 'congratulations', $currentLang)}</h1>
      <p class="congrats-subtitle">{t('ui', 'youCompleted', $currentLang)}</p>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{$score.correct}</span>
          <span class="stat-label">{t('ui', 'statsCorrect', $currentLang)}</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{$score.total}</span>
          <span class="stat-label">{t('ui', 'statsTotal', $currentLang)}</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{$scorePercentage}%</span>
          <span class="stat-label">{t('ui', 'statsAccuracy', $currentLang)}</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{SCALES.length}</span>
          <span class="stat-label">{t('ui', 'stagesCompleted', $currentLang)}</span>
        </div>
      </div>

      <button class="play-again-btn" on:click={handleRestart}>
        {t('ui', 'playAgain', $currentLang)}
      </button>
    </div>
  {:else}
    <!-- Stage info -->
    <div class="stage-info">
      <div class="stage-header">
        <span class="stage-label">{t('ui', 'stage', $currentLang)} {$currentStage + 1}/{SCALES.length}</span>
        <h2 class="stage-name">{getScaleName($currentScale?.id, $currentLang)}</h2>
        <p class="stage-desc">{getScaleDescription($currentScale?.id, $currentLang)}</p>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" style="width: {progressPercent}%"></div>
        <span class="progress-text">{$stageProgress}/{stageRequired}</span>
      </div>
    </div>

    <div class="controls">
      {#if !audioUnlocked}
        <button class="play-btn start-btn" on:click={startTraining}>
          {t('ui', 'startTraining', $currentLang)}
        </button>
      {:else}
        <button class="play-btn replay-btn" on:click={playCurrentInterval}>
          {t('ui', 'replay', $currentLang)}
        </button>
      {/if}

      <button class="type-toggle" on:click={toggleIntervalType}>
        {$settings.intervalType === 'melodic' ? t('ui', 'melodic', $currentLang) : t('ui', 'harmonic', $currentLang)}
      </button>
    </div>

    {#if !audioUnlocked}
      <p class="instruction">{t('ui', 'clickToStart', $currentLang)}</p>
    {:else if $feedback === 'tryagain'}
      <p class="instruction try-again">{t('ui', 'tryAgain', $currentLang)}</p>
    {:else if !$feedback}
      <p class="instruction">{t('ui', 'clickTheKey', $currentLang)}</p>
    {/if}

    {#if $currentQuestion}
      <PianoKeyboard
        startMidi={PIANO_START}
        numKeys={pianoKeys}
        highlightedNotes={[$currentQuestion.baseNote]}
        {activeNotes}
        correctNote={($feedback === 'correct' || $feedback === 'incorrect') ? $currentQuestion.secondNote : null}
        guessedNote={$feedback === 'incorrect' ? guessedNote : null}
        wrongGuessNote={$feedback === 'tryagain' ? wrongGuessNote : null}
        interactive={true}
        disabled={!audioUnlocked || !hasPlayed || $feedback === 'correct' || $feedback === 'incorrect'}
        on:keyclick={handleKeyClick}
      />
    {/if}

    {#if $feedback === 'correct'}
      <div class="feedback correct">
        {t('ui', 'correct', $currentLang)} {feedbackIntervalName}
      </div>
    {:else if $feedback === 'incorrect'}
      <div class="feedback incorrect">
        {t('ui', 'incorrect', $currentLang)} {t('ui', 'itWas', $currentLang)} {feedbackIntervalName}
      </div>
    {/if}

    {#if showAdvancePrompt && !isFinalStage}
      {@const nextScale = SCALES[$currentStage + 1]}
      {@const nextName = getScaleName(nextScale?.id, $currentLang)}
      {@const nextDesc = getScaleDescription(nextScale?.id, $currentLang)}
      {@const currName = getScaleName($currentScale?.id, $currentLang)}
      {@const scaleChanged = nextName !== currName}
      <div class="advance-prompt">
        <p>{t('ui', 'youveMastered', $currentLang)} {getScaleDescription($currentScale?.id, $currentLang)}!</p>
        <button class="advance-btn" on:click={handleAdvance}>
          {t('ui', 'continueTo', $currentLang)}
          {#if scaleChanged}<strong>{nextName}</strong> &mdash; {/if}{nextDesc}
        </button>
      </div>
    {/if}

    {#if $currentStage > 0}
      <button class="restart-btn" on:click={handleRestart}>
        {t('ui', 'restartFromStage1', $currentLang)}
      </button>
    {/if}
  {/if}
</div>

<style>
  .ear-training {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .stage-info {
    text-align: center;
    width: 100%;
    max-width: 400px;
  }

  .stage-header {
    margin-bottom: 0.75rem;
  }

  .stage-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
  }

  .stage-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0.25rem 0;
    background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stage-desc {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  .progress-bar {
    position: relative;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }

  .progress-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #6366f1 0%, #a78bfa 100%);
    border-radius: 12px;
    transition: width 0.3s ease;
  }

  .progress-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .controls {
    display: flex;
    gap: 1rem;
  }

  .play-btn {
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .play-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  }

  .play-btn.replay-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .play-btn.replay-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: none;
  }

  .type-toggle {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .type-toggle:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .instruction {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }

  .instruction.try-again {
    color: #fbbf24;
    font-weight: 600;
  }

  .feedback {
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 12px;
  }

  .feedback.correct {
    background: rgba(74, 222, 128, 0.2);
    color: #86efac;
  }

  .feedback.incorrect {
    background: rgba(248, 113, 113, 0.2);
    color: #fca5a5;
  }

  .advance-prompt {
    text-align: center;
    padding: 1.5rem;
    background: rgba(99, 102, 241, 0.1);
    border: 2px solid rgba(99, 102, 241, 0.3);
    border-radius: 16px;
  }

  .advance-prompt p {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: #a5b4fc;
  }

  .advance-btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .advance-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  }

  .restart-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s;
  }

  .restart-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
  }

  .congratulations {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    padding: 2rem 1rem;
  }

  .congrats-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .congrats-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
    max-width: 360px;
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #a78bfa;
  }

  .stat-label {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .play-again-btn {
    padding: 1rem 2.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .play-again-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  }
</style>
