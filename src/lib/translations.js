// Translations for the app
// Languages: English, Chinese (Mandarin), Hindi, Spanish, French, Finnish

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'zh', name: '中文', flag: 'ZH' },
  { code: 'hi', name: 'हिन्दी', flag: 'HI' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'fi', name: 'Suomi', flag: 'FI' }
];

export const translations = {
  // Interval names
  intervals: {
    'm2': {
      en: 'Minor 2nd',
      zh: '小二度',
      hi: 'लघु द्वितीय',
      es: '2ª menor',
      fr: 'Seconde mineure',
      fi: 'Pieni sekunti'
    },
    'M2': {
      en: 'Major 2nd',
      zh: '大二度',
      hi: 'बड़ा द्वितीय',
      es: '2ª mayor',
      fr: 'Seconde majeure',
      fi: 'Suuri sekunti'
    },
    'm3': {
      en: 'Minor 3rd',
      zh: '小三度',
      hi: 'लघु तृतीय',
      es: '3ª menor',
      fr: 'Tierce mineure',
      fi: 'Pieni terssi'
    },
    'M3': {
      en: 'Major 3rd',
      zh: '大三度',
      hi: 'बड़ा तृतीय',
      es: '3ª mayor',
      fr: 'Tierce majeure',
      fi: 'Suuri terssi'
    },
    'P4': {
      en: 'Perfect 4th',
      zh: '纯四度',
      hi: 'शुद्ध चतुर्थ',
      es: '4ª justa',
      fr: 'Quarte juste',
      fi: 'Puhdas kvartti'
    },
    'TT': {
      en: 'Tritone',
      zh: '三全音',
      hi: 'त्रिस्वर',
      es: 'Tritono',
      fr: 'Triton',
      fi: 'Tritonus'
    },
    'P5': {
      en: 'Perfect 5th',
      zh: '纯五度',
      hi: 'शुद्ध पंचम',
      es: '5ª justa',
      fr: 'Quinte juste',
      fi: 'Puhdas kvintti'
    },
    'm6': {
      en: 'Minor 6th',
      zh: '小六度',
      hi: 'लघु षष्ठ',
      es: '6ª menor',
      fr: 'Sixte mineure',
      fi: 'Pieni seksti'
    },
    'M6': {
      en: 'Major 6th',
      zh: '大六度',
      hi: 'बड़ा षष्ठ',
      es: '6ª mayor',
      fr: 'Sixte majeure',
      fi: 'Suuri seksti'
    },
    'm7': {
      en: 'Minor 7th',
      zh: '小七度',
      hi: 'लघु सप्तम',
      es: '7ª menor',
      fr: 'Septième mineure',
      fi: 'Pieni septimi'
    },
    'M7': {
      en: 'Major 7th',
      zh: '大七度',
      hi: 'बड़ा सप्तम',
      es: '7ª mayor',
      fr: 'Septième majeure',
      fi: 'Suuri septimi'
    },
    'P8': {
      en: 'Octave',
      zh: '八度',
      hi: 'सप्तक',
      es: 'Octava',
      fr: 'Octave',
      fi: 'Oktaavi'
    }
  },

  // Scale family names (looked up by prefix of stage ID)
  scaleFamilies: {
    penta: {
      en: 'A Minor Pentatonic',
      zh: 'A小调五声音阶',
      hi: 'A लघु पेंटाटोनिक',
      es: 'La menor pentatónica',
      fr: 'La mineur pentatonique',
      fi: 'A-molli pentatoninen'
    },
    minor: {
      en: 'A Natural Minor',
      zh: 'A自然小调',
      hi: 'A प्राकृतिक लघु',
      es: 'La menor natural',
      fr: 'La mineur naturel',
      fi: 'A-luonnollinen molli'
    },
    harmonic: {
      en: 'A Harmonic Minor',
      zh: 'A和声小调',
      hi: 'A हार्मोनिक लघु',
      es: 'La menor armónica',
      fr: 'La mineur harmonique',
      fi: 'A-harmoninen molli'
    },
    chromatic: {
      en: 'Chromatic',
      zh: '半音阶',
      hi: 'क्रोमैटिक',
      es: 'Cromática',
      fr: 'Chromatique',
      fi: 'Kromaattinen'
    }
  },

  // Stage descriptions (looked up by suffix of stage ID, e.g. '1-root-up')
  stagePatterns: {
    '1-root-up': {
      en: '1 octave, from A, upward',
      zh: '1个八度，从A开始，向上',
      hi: '1 सप्तक, A से, ऊपर',
      es: '1 octava, desde La, ascendente',
      fr: '1 octave, depuis La, montant',
      fi: '1 oktaavi, A:sta, ylöspäin'
    },
    '1-any-up': {
      en: '1 octave, any note, upward',
      zh: '1个八度，任意音符，向上',
      hi: '1 सप्तक, कोई भी स्वर, ऊपर',
      es: '1 octava, cualquier nota, ascendente',
      fr: '1 octave, toute note, montant',
      fi: '1 oktaavi, mikä tahansa sävel, ylöspäin'
    },
    '1-down': {
      en: '1 octave, downward',
      zh: '1个八度，向下',
      hi: '1 सप्तक, नीचे',
      es: '1 octava, descendente',
      fr: '1 octave, descendant',
      fi: '1 oktaavi, alaspäin'
    },
    '1-both': {
      en: '1 octave, up or down',
      zh: '1个八度，上或下',
      hi: '1 सप्तक, ऊपर या नीचे',
      es: '1 octava, ascendente o descendente',
      fr: '1 octave, montant ou descendant',
      fi: '1 oktaavi, ylös tai alas'
    },
    '2-root-up': {
      en: '2 octaves, from A, upward',
      zh: '2个八度，从A开始，向上',
      hi: '2 सप्तक, A से, ऊपर',
      es: '2 octavas, desde La, ascendente',
      fr: '2 octaves, depuis La, montant',
      fi: '2 oktaavia, A:sta, ylöspäin'
    },
    '2-any-up': {
      en: '2 octaves, any note, upward',
      zh: '2个八度，任意音符，向上',
      hi: '2 सप्तक, कोई भी स्वर, ऊपर',
      es: '2 octavas, cualquier nota, ascendente',
      fr: '2 octaves, toute note, montant',
      fi: '2 oktaavia, mikä tahansa sävel, ylöspäin'
    },
    '2-down': {
      en: '2 octaves, downward',
      zh: '2个八度，向下',
      hi: '2 सप्तक, नीचे',
      es: '2 octavas, descendente',
      fr: '2 octaves, descendant',
      fi: '2 oktaavia, alaspäin'
    },
    '2-both': {
      en: '2 octaves, up or down',
      zh: '2个八度，上或下',
      hi: '2 सप्तक, ऊपर या नीचे',
      es: '2 octavas, ascendente o descendente',
      fr: '2 octaves, montant ou descendant',
      fi: '2 oktaavia, ylös tai alas'
    }
  },

  // UI strings
  ui: {
    title: {
      en: 'Musical Interval Trainer',
      zh: '音程训练器',
      hi: 'संगीत अंतराल प्रशिक्षक',
      es: 'Entrenador de Intervalos',
      fr: 'Entraîneur d\'Intervalles',
      fi: 'Intervallien harjoittelija'
    },
    earTraining: {
      en: 'Ear Training',
      zh: '听音训练',
      hi: 'कान प्रशिक्षण',
      es: 'Entrenamiento auditivo',
      fr: 'Entraînement auditif',
      fi: 'Kuulonharjoitus'
    },
    theoryMode: {
      en: 'Theory Mode',
      zh: '理论模式',
      hi: 'सिद्धांत मोड',
      es: 'Modo teoría',
      fr: 'Mode théorie',
      fi: 'Teoriatila'
    },
    startTraining: {
      en: 'Start Training',
      zh: '开始训练',
      hi: 'प्रशिक्षण शुरू करें',
      es: 'Iniciar entrenamiento',
      fr: 'Commencer',
      fi: 'Aloita harjoitus'
    },
    replay: {
      en: 'Replay',
      zh: '重播',
      hi: 'फिर से चलाएं',
      es: 'Repetir',
      fr: 'Rejouer',
      fi: 'Toista'
    },
    melodic: {
      en: 'Melodic',
      zh: '旋律',
      hi: 'मधुर',
      es: 'Melódico',
      fr: 'Mélodique',
      fi: 'Melodinen'
    },
    harmonic: {
      en: 'Harmonic',
      zh: '和声',
      hi: 'हार्मोनिक',
      es: 'Armónico',
      fr: 'Harmonique',
      fi: 'Harmoninen'
    },
    stage: {
      en: 'Stage',
      zh: '阶段',
      hi: 'चरण',
      es: 'Etapa',
      fr: 'Étape',
      fi: 'Taso'
    },
    masterLevel: {
      en: 'Master Level',
      zh: '大师级',
      hi: 'मास्टर स्तर',
      es: 'Nivel maestro',
      fr: 'Niveau maître',
      fi: 'Mestaritaso'
    },
    clickToStart: {
      en: 'Click "Start Training" to begin',
      zh: '点击"开始训练"开始',
      hi: '"प्रशिक्षण शुरू करें" पर क्लिक करें',
      es: 'Haz clic en "Iniciar" para comenzar',
      fr: 'Cliquez sur "Commencer"',
      fi: 'Klikkaa "Aloita harjoitus"'
    },
    clickTheKey: {
      en: 'Click the key where you think the second note is',
      zh: '点击你认为第二个音符所在的键',
      hi: 'उस कुंजी पर क्लिक करें जहां आपको लगता है दूसरा स्वर है',
      es: 'Haz clic en la tecla del segundo tono',
      fr: 'Cliquez sur la touche de la 2ème note',
      fi: 'Klikkaa kosketinta, jossa toinen sävel on'
    },
    tryAgain: {
      en: 'Try again!',
      zh: '再试一次！',
      hi: 'फिर से प्रयास करें!',
      es: '¡Inténtalo de nuevo!',
      fr: 'Essayez encore !',
      fi: 'Yritä uudelleen!'
    },
    correct: {
      en: 'Correct!',
      zh: '正确！',
      hi: 'सही!',
      es: '¡Correcto!',
      fr: 'Correct !',
      fi: 'Oikein!'
    },
    incorrect: {
      en: 'Incorrect.',
      zh: '错误。',
      hi: 'गलत।',
      es: 'Incorrecto.',
      fr: 'Incorrect.',
      fi: 'Väärin.'
    },
    itWas: {
      en: 'It was',
      zh: '答案是',
      hi: 'यह था',
      es: 'Era',
      fr: 'C\'était',
      fi: 'Se oli'
    },
    youGuessed: {
      en: 'You guessed',
      zh: '你猜的是',
      hi: 'आपने अनुमान लगाया',
      es: 'Adivinaste',
      fr: 'Vous avez deviné',
      fi: 'Arvasit'
    },
    butItWas: {
      en: 'but it was',
      zh: '但答案是',
      hi: 'लेकिन यह था',
      es: 'pero era',
      fr: 'mais c\'était',
      fi: 'mutta se oli'
    },
    youveMastered: {
      en: "You've mastered",
      zh: '你已掌握',
      hi: 'आपने महारत हासिल की',
      es: 'Has dominado',
      fr: 'Vous maîtrisez',
      fi: 'Olet hallinnut'
    },
    continueTo: {
      en: 'Continue to',
      zh: '继续到',
      hi: 'जारी रखें',
      es: 'Continuar a',
      fr: 'Continuer vers',
      fi: 'Jatka tasoon'
    },
    nextQuestion: {
      en: 'Next Question',
      zh: '下一题',
      hi: 'अगला प्रश्न',
      es: 'Siguiente',
      fr: 'Suivant',
      fi: 'Seuraava'
    },
    restartFromStage1: {
      en: 'Restart from Stage 1',
      zh: '从第1阶段重新开始',
      hi: 'चरण 1 से पुनः आरंभ करें',
      es: 'Reiniciar desde etapa 1',
      fr: 'Recommencer à l\'étape 1',
      fi: 'Aloita alusta'
    },
    reset: {
      en: 'Reset',
      zh: '重置',
      hi: 'रीसेट',
      es: 'Reiniciar',
      fr: 'Réinitialiser',
      fi: 'Nollaa'
    },
    footer: {
      en: 'Learn to recognize musical intervals through practice',
      zh: '通过练习学习识别音程',
      hi: 'अभ्यास के माध्यम से संगीत अंतराल पहचानना सीखें',
      es: 'Aprende a reconocer intervalos musicales',
      fr: 'Apprenez à reconnaître les intervalles',
      fi: 'Opi tunnistamaan intervallit harjoittelemalla'
    },
    congratulations: {
      en: 'Congratulations!',
      zh: '恭喜！',
      hi: 'बधाई हो!',
      es: '¡Felicidades!',
      fr: 'Félicitations !',
      fi: 'Onnittelut!'
    },
    youCompleted: {
      en: 'You completed all stages!',
      zh: '你完成了所有阶段！',
      hi: 'आपने सभी चरण पूरे कर लिए!',
      es: '¡Has completado todas las etapas!',
      fr: 'Vous avez terminé toutes les étapes !',
      fi: 'Olet suorittanut kaikki tasot!'
    },
    statsCorrect: {
      en: 'Correct answers',
      zh: '正确答案',
      hi: 'सही उत्तर',
      es: 'Respuestas correctas',
      fr: 'Réponses correctes',
      fi: 'Oikeat vastaukset'
    },
    statsTotal: {
      en: 'Total attempts',
      zh: '总尝试次数',
      hi: 'कुल प्रयास',
      es: 'Intentos totales',
      fr: 'Tentatives totales',
      fi: 'Yrityksiä yhteensä'
    },
    statsAccuracy: {
      en: 'Accuracy',
      zh: '准确率',
      hi: 'सटीकता',
      es: 'Precisión',
      fr: 'Précision',
      fi: 'Tarkkuus'
    },
    stagesCompleted: {
      en: 'Stages completed',
      zh: '已完成阶段',
      hi: 'पूर्ण चरण',
      es: 'Etapas completadas',
      fr: 'Étapes terminées',
      fi: 'Suoritetut tasot'
    },
    playAgain: {
      en: 'Play Again',
      zh: '再玩一次',
      hi: 'फिर से खेलें',
      es: 'Jugar de nuevo',
      fr: 'Rejouer',
      fi: 'Pelaa uudelleen'
    }
  }
};

// Helper function to get translation
export function t(category, key, lang) {
  return translations[category]?.[key]?.[lang] || translations[category]?.[key]?.['en'] || key;
}

// Get interval name by shortName
export function getIntervalName(shortName, lang) {
  return translations.intervals[shortName]?.[lang] || translations.intervals[shortName]?.['en'] || shortName;
}

// Get scale name by id (extracts family prefix, e.g. 'penta' from 'penta-1-root-up')
export function getScaleName(scaleId, lang) {
  const prefix = scaleId?.split('-')[0];
  const family = translations.scaleFamilies[prefix];
  return family?.[lang] || family?.['en'] || scaleId;
}

// Get scale description by id (extracts stage pattern, e.g. '1-root-up' from 'penta-1-root-up')
export function getScaleDescription(scaleId, lang) {
  const suffix = scaleId?.split('-').slice(1).join('-');
  const pattern = translations.stagePatterns[suffix];
  return pattern?.[lang] || pattern?.['en'] || '';
}
