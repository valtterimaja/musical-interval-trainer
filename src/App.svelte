<script>
  import { currentLang } from './lib/stores.js';
  import { LANGUAGES, t } from './lib/translations.js';
  import EarTraining from './components/EarTraining.svelte';
  import ScoreDisplay from './components/ScoreDisplay.svelte';
</script>

<main>
  <header>
    <h1>{t('ui', 'title', $currentLang)}</h1>
    <div class="header-controls">
      <div class="lang-selector">
        {#each LANGUAGES as lang}
          <button
            class="lang-btn"
            class:active={$currentLang === lang.code}
            on:click={() => currentLang.set(lang.code)}
          >
            {lang.flag}
          </button>
        {/each}
      </div>
      <ScoreDisplay />
    </div>
  </header>

  <section class="content">
    <EarTraining />
  </section>

  <footer>
    <p>{t('ui', 'footer', $currentLang)}</p>
  </footer>
</main>

<style>
  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .lang-selector {
    display: flex;
    gap: 0.25rem;
  }

  .lang-btn {
    padding: 0.35rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s;
  }

  .lang-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
  }

  .lang-btn.active {
    background: rgba(99, 102, 241, 0.3);
    border-color: #6366f1;
    color: white;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .content {
    flex: 1;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  footer {
    margin-top: 2rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.875rem;
  }

  @media (max-width: 600px) {
    header {
      flex-direction: column;
      text-align: center;
    }

    .header-controls {
      flex-direction: column;
    }

    h1 {
      font-size: 1.5rem;
    }
  }
</style>
