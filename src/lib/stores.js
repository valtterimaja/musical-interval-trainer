import { writable, derived } from 'svelte/store';
import { SCALES } from './intervals.js';

// Current language
export const currentLang = writable('en');

// Current mode: 'ear-training' or 'theory'
export const currentMode = writable('ear-training');

// Current stage index
export const currentStage = writable(0);

// Stage progress (correct answers in current stage)
export const stageProgress = writable(0);

// Score tracking (overall)
export const score = writable({ correct: 0, total: 0 });

// Settings
export const settings = writable({
  intervalType: 'melodic' // 'melodic' or 'harmonic'
});

// Current question state
export const currentQuestion = writable(null);

// Feedback state: null, 'correct', or 'incorrect'
export const feedback = writable(null);

// Game completed state
export const gameCompleted = writable(false);

// Derived store for current scale
export const currentScale = derived(currentStage, ($stage) => SCALES[$stage]);

// Derived store for score percentage
export const scorePercentage = derived(score, ($score) => {
  if ($score.total === 0) return 0;
  return Math.round(($score.correct / $score.total) * 100);
});

// Test mode: add ?test to URL to require only 1 correct answer per stage
export const testMode = writable(
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('test')
);

// Derived store to check if can advance to next stage
export const canAdvance = derived(
  [currentStage, stageProgress, testMode],
  ([$stage, $progress, $testMode]) => {
    const scale = SCALES[$stage];
    const required = $testMode ? 1 : scale.requiredCorrect;
    return required !== null && $progress >= required;
  }
);

// Helper functions
export function resetScore() {
  score.set({ correct: 0, total: 0 });
}

export function resetStageProgress() {
  stageProgress.set(0);
}

export function incrementScore(isCorrect) {
  score.update(s => ({
    correct: s.correct + (isCorrect ? 1 : 0),
    total: s.total + 1
  }));

  if (isCorrect) {
    stageProgress.update(p => p + 1);
  }
}

export function decrementScore() {
  score.update(s => ({
    correct: s.correct,
    total: s.total + 1
  }));
  // Optionally reduce stage progress (but don't go below 0)
  stageProgress.update(p => Math.max(0, p - 1));
}

export function advanceStage() {
  currentStage.update(s => {
    if (s < SCALES.length - 1) {
      return s + 1;
    }
    return s;
  });
  stageProgress.set(0);
}

export function completeGame() {
  gameCompleted.set(true);
}

export function resetToFirstStage() {
  currentStage.set(0);
  stageProgress.set(0);
  score.set({ correct: 0, total: 0 });
  gameCompleted.set(false);
}

export function clearFeedback() {
  feedback.set(null);
}

export function setFeedback(value) {
  feedback.set(value);
}
