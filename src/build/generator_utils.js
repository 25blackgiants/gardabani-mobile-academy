const fs = require('fs');
const path = require('path');

// Keeps inline JSON inert when it is embedded in a generated <script> block.
function serializeForInlineScript(value) {
  return JSON.stringify(value, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

const GENERATED_PAGE_NAMES = Object.freeze([
  'gardabani_map.html',
  'index.html',
  'calendar.html',
  'mentors.html',
  'settings.html'
]);

function writeGeneratedPages(rootDirectory, pages) {
  GENERATED_PAGE_NAMES.forEach((fileName) => {
    if (typeof pages[fileName] !== 'string') {
      throw new Error(`Missing generated page: ${fileName}`);
    }
    fs.writeFileSync(path.join(rootDirectory, fileName), pages[fileName], 'utf8');
  });
}

module.exports = { GENERATED_PAGE_NAMES, serializeForInlineScript, writeGeneratedPages };
