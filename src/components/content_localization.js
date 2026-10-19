const { serializeForInlineScript } = require('../build/generator_utils');

// Runtime helper for source-controlled public records.  It never mutates the
// canonical Georgian data, so administrator editing and cloud synchronisation
// continue to work with their existing record shape.
function createContentLocalizationRuntime(translations) {
  const safeTranslations = serializeForInlineScript(translations);
  return `
    const SOURCE_CONTROLLED_TRANSLATIONS = ${safeTranslations};
    function getPublicContentLanguage() {
      try {
        return localStorage.getItem('gardabani_language') === 'az' ? 'az' : 'ka';
      } catch (error) {
        return 'ka';
      }
    }
    function localizePublicRecord(collection, record) {
      if (!record || getPublicContentLanguage() !== 'az') return record;
      const translation = SOURCE_CONTROLLED_TRANSLATIONS[collection] &&
        SOURCE_CONTROLLED_TRANSLATIONS[collection][String(record.id)] &&
        SOURCE_CONTROLLED_TRANSLATIONS[collection][String(record.id)].az;
      return translation ? Object.assign({}, record, translation) : record;
    }
    window.localizePublicRecord = localizePublicRecord;
`;
}

module.exports = { createContentLocalizationRuntime };
