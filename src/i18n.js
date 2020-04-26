import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import englishTranslation from 'local/en.json';

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      radar: englishTranslation,
    },
    nl: {
      radar: {
        welcome: 'Hello translation (Dutch)',
      },
    },
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['radar'],
  defaultNS: 'radar',

  // keySeparator: false,

  interpolation: {
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
