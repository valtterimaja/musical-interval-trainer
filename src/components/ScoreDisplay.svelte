<script>
  import { score, scorePercentage, resetScore, currentLang } from '../lib/stores.js';
  import { t } from '../lib/translations.js';
</script>

<div class="score-display">
  <div class="score-main">
    <span class="correct">{$score.correct}</span>
    <span class="divider">/</span>
    <span class="total">{$score.total}</span>
  </div>
  <div class="percentage">{$scorePercentage}%</div>
  {#if $score.total > 0}
    <button class="reset-btn" on:click={resetScore}>{t('ui', 'reset', $currentLang)}</button>
  {/if}
</div>

<style>
  .score-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 1.25rem;
  }

  .score-main {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .correct {
    color: #4ade80;
    font-weight: 600;
  }

  .divider {
    color: rgba(255, 255, 255, 0.5);
  }

  .total {
    color: rgba(255, 255, 255, 0.8);
  }

  .percentage {
    color: #60a5fa;
    font-weight: 500;
    padding-left: 0.5rem;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }

  .reset-btn {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.2s;
  }

  .reset-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
</style>
