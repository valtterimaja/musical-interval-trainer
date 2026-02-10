// All 12 chromatic intervals
export const INTERVALS = [
  { name: 'Minor 2nd', semitones: 1, shortName: 'm2' },
  { name: 'Major 2nd', semitones: 2, shortName: 'M2' },
  { name: 'Minor 3rd', semitones: 3, shortName: 'm3' },
  { name: 'Major 3rd', semitones: 4, shortName: 'M3' },
  { name: 'Perfect 4th', semitones: 5, shortName: 'P4' },
  { name: 'Tritone', semitones: 6, shortName: 'TT' },
  { name: 'Perfect 5th', semitones: 7, shortName: 'P5' },
  { name: 'Minor 6th', semitones: 8, shortName: 'm6' },
  { name: 'Major 6th', semitones: 9, shortName: 'M6' },
  { name: 'Minor 7th', semitones: 10, shortName: 'm7' },
  { name: 'Major 7th', semitones: 11, shortName: 'M7' },
  { name: 'Octave', semitones: 12, shortName: 'P8' }
];

// Note names for display
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Scale family definitions
const SCALE_FAMILIES = [
  { prefix: 'penta', name: 'A Minor Pentatonic', root: 9, semitones: [0, 3, 5, 7, 10] },
  { prefix: 'minor', name: 'A Natural Minor', root: 9, semitones: [0, 2, 3, 5, 7, 8, 10] },
  { prefix: 'harmonic', name: 'A Harmonic Minor', root: 9, semitones: [0, 2, 3, 5, 7, 8, 11] },
  { prefix: 'chromatic', name: 'Chromatic', root: 9, semitones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
];

// Stage pattern: for each scale, 8 stages (4 × 1-octave, then 4 × 2-octave)
// Direction: 'up' = ascending, 'down' = descending, 'both' = random
// startFromRoot: true = always start from A, false = any note in scale
// maxInterval: limits interval size in semitones (prevents extreme jumps in 2-oct)
const STAGE_VARIANTS = [
  { suffix: 'root-up', direction: 'up', startFromRoot: true },
  { suffix: 'any-up', direction: 'up', startFromRoot: false },
  { suffix: 'down', direction: 'down', startFromRoot: false },
  { suffix: 'both', direction: 'both', startFromRoot: false },
];

export const SCALES = SCALE_FAMILIES.flatMap((family, fi) => {
  const isLastFamily = fi === SCALE_FAMILIES.length - 1;
  return [1, 2].flatMap(octaves => {
    const requiredCorrect = octaves === 1 ? 5 : 3;
    return STAGE_VARIANTS.map(v => ({
      id: `${family.prefix}-${octaves}-${v.suffix}`,
      name: family.name,
      root: family.root,
      semitones: family.semitones,
      octaves,
      direction: v.direction,
      startFromRoot: v.startFromRoot,
      requiredCorrect,
      ...(octaves === 2 ? { maxInterval: 12 } : {}),
    }));
  });
});

// A4 = 440 Hz reference
const A4_FREQUENCY = 440;
const A4_MIDI = 69;

/**
 * Calculate frequency from MIDI note number
 * @param {number} midiNote - MIDI note number (60 = C4, 69 = A4)
 * @returns {number} Frequency in Hz
 */
export function midiToFrequency(midiNote) {
  return A4_FREQUENCY * Math.pow(2, (midiNote - A4_MIDI) / 12);
}

/**
 * Get note name from MIDI number
 * @param {number} midiNote - MIDI note number
 * @returns {string} Note name with octave (e.g., "C4")
 */
export function midiToNoteName(midiNote) {
  const octave = Math.floor(midiNote / 12) - 1;
  const noteIndex = midiNote % 12;
  return NOTE_NAMES[noteIndex] + octave;
}

/**
 * Get all MIDI notes that belong to a scale within a range
 * @param {object} scale - Scale object from SCALES
 * @param {number} startMidi - Start of range
 * @param {number} endMidi - End of range
 * @returns {number[]} Array of MIDI note numbers in the scale
 */
export function getScaleNotes(scale, startMidi, endMidi) {
  const notes = [];
  for (let midi = startMidi; midi <= endMidi; midi++) {
    const noteInOctave = midi % 12;
    const semitoneFromRoot = (noteInOctave - scale.root + 12) % 12;
    if (scale.semitones.includes(semitoneFromRoot)) {
      notes.push(midi);
    }
  }
  return notes;
}

/**
 * Get the root notes (A) within a range
 * @param {number} root - Root note (0-11, where A=9)
 * @param {number} startMidi - Start of range
 * @param {number} endMidi - End of range
 * @returns {number[]} Array of root MIDI note numbers
 */
export function getRootNotes(root, startMidi, endMidi) {
  const notes = [];
  for (let midi = startMidi; midi <= endMidi; midi++) {
    if (midi % 12 === root) {
      notes.push(midi);
    }
  }
  return notes;
}

/**
 * Generate a random interval question within a scale.
 * Picks interval size first, then a valid starting note — this ensures
 * all interval types are equally likely (avoids bias toward highest/lowest notes).
 * @param {object} scale - Scale object from SCALES
 * @param {number} startMidi - Start of piano range
 * @param {number} endMidi - End of piano range
 * @param {object|null} previousQuestion - Previous question to avoid repeating
 * @returns {{ baseNote: number, interval: object, secondNote: number, direction: string }}
 */
export function generateScaleInterval(scale, startMidi, endMidi, previousQuestion = null) {
  const scaleNotes = getScaleNotes(scale, startMidi, endMidi);

  if (scaleNotes.length < 2) {
    throw new Error('Not enough notes in range for this scale');
  }

  // Determine direction
  let direction;
  if (scale.direction === 'up') {
    direction = 'up';
  } else if (scale.direction === 'down') {
    direction = 'down';
  } else {
    direction = Math.random() < 0.5 ? 'up' : 'down';
  }

  // Build all valid (base, second) pairs
  function buildPairs(dir) {
    const baseNotes = scale.startFromRoot
      ? getRootNotes(scale.root, startMidi, endMidi)
      : scaleNotes;
    const pairs = [];
    for (const base of baseNotes) {
      for (const second of scaleNotes) {
        const diff = second - base;
        if (dir === 'up' && diff > 0) pairs.push({ base, second });
        else if (dir === 'down' && diff < 0) pairs.push({ base, second });
      }
    }
    // Limit interval size (avoids extreme jumps in 2-octave mode)
    if (scale.maxInterval) {
      return pairs.filter(p => Math.abs(p.second - p.base) <= scale.maxInterval);
    }
    return pairs;
  }

  let pairs = buildPairs(direction);

  // If no pairs in chosen direction for 'both' mode, try the other
  if (pairs.length === 0 && scale.direction === 'both') {
    direction = direction === 'up' ? 'down' : 'up';
    pairs = buildPairs(direction);
  }

  // Don't repeat the same pair of notes
  if (previousQuestion && pairs.length > 1) {
    pairs = pairs.filter(p =>
      p.base !== previousQuestion.baseNote || p.second !== previousQuestion.secondNote
    );
  }

  if (pairs.length === 0) {
    throw new Error('No valid interval pairs for this scale configuration');
  }

  // Group by interval size, then pick interval first for even distribution
  const intervalGroups = {};
  for (const pair of pairs) {
    const size = Math.abs(pair.second - pair.base);
    if (!intervalGroups[size]) intervalGroups[size] = [];
    intervalGroups[size].push(pair);
  }

  const sizes = Object.keys(intervalGroups);
  const chosenSize = sizes[Math.floor(Math.random() * sizes.length)];
  const chosenPairs = intervalGroups[chosenSize];
  const { base: baseNote, second: secondNote } = chosenPairs[Math.floor(Math.random() * chosenPairs.length)];

  const semitones = Math.abs(secondNote - baseNote);
  const interval = getIntervalBySemitones(semitones) || {
    name: `${semitones} semitones`,
    semitones,
    shortName: `${semitones}st`
  };

  return {
    baseNote,
    interval,
    secondNote,
    direction,
    baseFrequency: midiToFrequency(baseNote),
    secondFrequency: midiToFrequency(secondNote)
  };
}

/**
 * Generate a random interval question (legacy, for chromatic)
 * @param {number} minMidi - Minimum base MIDI note (default: C3 = 48)
 * @param {number} maxMidi - Maximum base MIDI note (default: C5 = 72)
 * @returns {{ baseNote: number, interval: object, secondNote: number }}
 */
export function generateRandomInterval(minMidi = 48, maxMidi = 72) {
  // Random base note
  const baseNote = Math.floor(Math.random() * (maxMidi - minMidi + 1)) + minMidi;

  // Random interval
  const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];

  // Calculate second note
  const secondNote = baseNote + interval.semitones;

  return {
    baseNote,
    interval,
    secondNote,
    baseFrequency: midiToFrequency(baseNote),
    secondFrequency: midiToFrequency(secondNote)
  };
}

/**
 * Get interval by semitones
 * @param {number} semitones - Number of semitones
 * @returns {object | undefined} Interval object
 */
export function getIntervalBySemitones(semitones) {
  return INTERVALS.find(i => i.semitones === semitones);
}
