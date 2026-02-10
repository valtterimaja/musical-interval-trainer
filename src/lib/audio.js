let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function resumeAudioContext() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    return ctx.resume();
  }
  return Promise.resolve();
}

/**
 * Play a note with a piano-like ADSR envelope
 * @param {number} frequency - Frequency in Hz
 * @param {number} duration - Duration in seconds
 * @param {number} startTime - Start time (relative to audioContext.currentTime)
 */
export function playNote(frequency, duration = 0.8, startTime = 0) {
  const ctx = getAudioContext();
  const now = ctx.currentTime + startTime;

  // Create oscillators for richer sound
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Main oscillator - sine wave
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(frequency, now);

  // Second oscillator - adds harmonics for piano-like quality
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(frequency * 2, now);

  // Gain nodes for mixing
  const gain1 = ctx.createGain();
  const gain2 = ctx.createGain();
  gain1.gain.setValueAtTime(0.6, now);
  gain2.gain.setValueAtTime(0.15, now);

  // Connect oscillators through individual gains
  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(gainNode);
  gain2.connect(gainNode);
  gainNode.connect(ctx.destination);

  // ADSR envelope
  const attack = 0.01;
  const decay = 0.1;
  const sustainLevel = 0.5;
  const release = 0.3;

  // Attack
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.4, now + attack);

  // Decay to sustain
  gainNode.gain.linearRampToValueAtTime(0.4 * sustainLevel, now + attack + decay);

  // Sustain
  const sustainDuration = Math.max(0, duration - attack - decay - release);
  gainNode.gain.setValueAtTime(0.4 * sustainLevel, now + attack + decay + sustainDuration);

  // Release
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  // Start and stop
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + duration + 0.1);
  osc2.stop(now + duration + 0.1);
}

/**
 * Play an interval (two notes)
 * @param {number} baseFrequency - Base note frequency in Hz
 * @param {number} secondFrequency - Second note frequency in Hz
 * @param {'melodic' | 'harmonic'} type - Type of interval
 */
export function playInterval(baseFrequency, secondFrequency, type = 'melodic') {
  if (type === 'harmonic') {
    // Play both notes simultaneously
    playNote(baseFrequency, 1.2, 0);
    playNote(secondFrequency, 1.2, 0);
  } else {
    // Play notes sequentially (melodic)
    playNote(baseFrequency, 0.7, 0);
    playNote(secondFrequency, 0.7, 0.75);
  }
}
