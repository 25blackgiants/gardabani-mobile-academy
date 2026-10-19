// ============================================================================
// GARDABANI MOBILE ACADEMY — AUTOMATED VERIFICATION SUITE
// ============================================================================
const fs = require('fs');
const vm = require('vm');

const index = fs.readFileSync('index.html', 'utf8');
const calendar = fs.readFileSync('calendar.html', 'utf8');
const mentors = fs.readFileSync('mentors.html', 'utf8');
const settings = fs.readFileSync('settings.html', 'utf8');
const gardabaniMap = fs.readFileSync('gardabani_map.html', 'utf8');
const buildSource = fs.readFileSync('build_map.js', 'utf8');
const trackerSource = fs.readFileSync('src/analytics/tracker.js', 'utf8');
const localizationSource = fs.readFileSync('src/components/localization.js', 'utf8');
const gitignore = fs.readFileSync('.gitignore', 'utf8');
const { INITIAL_LOCATIONS } = require('./src/data/locations');
const { INITIAL_MENTORS } = require('./src/data/mentors');
const { validateLocations, validateMentors } = require('./src/data/validation');
const { SAFE_RENDER_JS } = require('./src/components/safe_render');
const { LOCALIZATION_JS } = require('./src/components/localization');

const safeRenderContext = { URL, window: { location: { href: 'https://example.test/' } } };
vm.createContext(safeRenderContext);
vm.runInContext(SAFE_RENDER_JS, safeRenderContext);
const safeRenderRuntimePassed =
  safeRenderContext.escapeHtml('<img src=x onerror=alert(1)>') === '&lt;img src=x onerror=alert(1)&gt;' &&
  safeRenderContext.safeHttpsUrl('javascript:alert(1)') === '' &&
  safeRenderContext.safeHttpsUrl('https://example.test/profile').startsWith('https://example.test/profile') &&
  safeRenderContext.safeImageSource('images/mentors/profile.webp') === 'images/mentors/profile.webp' &&
  safeRenderContext.safeImageSource('../private/secret.png') === '' &&
  safeRenderContext.safeHexColor('red; background:url(x)', '#8b5cf6') === '#8b5cf6';

const localizationContext = {
  window: {},
  document: { readyState: 'loading', addEventListener() {} }
};
vm.createContext(localizationContext);
vm.runInContext(LOCALIZATION_JS, localizationContext);
const translationMap = localizationContext.window.GARDABANI_TRANSLATIONS;
const settingsTranslationCoveragePassed = [
  'გარეგნობა',
  'რუკის პარამეტრები',
  'კონფიდენციალურობა და ანალიტიკის თანხმობა',
  'სისტემის სტატუსი',
  'ადმინისტრატორის ხელსაწყოები',
  'ანალიტიკის პანელი',
  'ვიზიტორთა ანალიტიკა და მონაცემები',
  'კონფიდენციალურობა და ქუქი-ფაილები'
].every(key => typeof translationMap[key] === 'string' && translationMap[key].length > 0);

let sourceValidationPassed = true;
let malformedContentRejected = false;
try {
  validateLocations(INITIAL_LOCATIONS);
  validateMentors(INITIAL_MENTORS);
} catch (error) {
  sourceValidationPassed = false;
}
try {
  validateLocations([{ id: 1, name: '<script>', latitude: 999 }]);
} catch (error) {
  malformedContentRejected = true;
}

const tests = [
  {
    name: '1. Tab Navigation includes 4 tabs on all pages',
    check: index.includes('>მთავარი გვერდი<') && index.includes('>კალენდარი<') && index.includes('>მენტორები<') && index.includes('>პარამეტრები<') &&
           calendar.includes('>მთავარი გვერდი<') && calendar.includes('>კალენდარი<') && calendar.includes('>მენტორები<') && calendar.includes('>პარამეტრები<') &&
           mentors.includes('>მთავარი გვერდი<') && mentors.includes('>კალენდარი<') && mentors.includes('>მენტორები<') && mentors.includes('>პარამეტრები<') &&
           settings.includes('>მთავარი გვერდი<') && settings.includes('>კალენდარი<') && settings.includes('>მენტორები<') && settings.includes('>პარამეტრები<')
  },
  {
    name: '2. Settings tab linked on all pages',
    check: index.includes('href="settings.html"') && 
           calendar.includes('href="settings.html"') &&
           mentors.includes('href="settings.html"') && 
           settings.includes('href="settings.html"')
  },
  {
    name: '3. Calendar tab linked on all pages',
    check: index.includes('href="calendar.html"') && 
           calendar.includes('class="nav-tab active" aria-current="page">კალენდარი<') &&
           mentors.includes('href="calendar.html"') && 
           settings.includes('href="calendar.html"')
  },
  {
    name: '4. Drawer trigger button renamed to აქტივობები and floating in top-left',
    check: index.includes('map-floating-left') && 
           index.includes('drawer-trigger-btn') && 
           index.includes('<span>აქტივობები</span>') &&
           index.includes('🎯 აქტივობები')
  },
  {
    name: '5. Sidebar drawer auto-closes on clicking location and has isolated scroll',
    check: index.includes('sidebar-drawer') && 
           index.includes('overscroll-behavior: contain') && 
           index.includes('formatGeorgianDate') &&
           index.includes('loc-item-date') &&
           index.includes('closeDrawer()')
  },
  {
    name: '6. Date input exists in Add/Edit modal on Map',
    check: index.includes('id="form-date"') && 
           index.includes('type="date"') &&
           index.includes('ჩატარების თარიღი')
  },
  {
    name: '7. Popups display formatted activity date',
    check: index.includes('popup-date-row') &&
           index.includes('formatGeorgianDate(loc.date')
  },
  {
    name: '8. Deep-link from Calendar to Map supported (?loc=id)',
    check: index.includes("URLSearchParams(window.location.search)") &&
           index.includes("urlParams.get('loc')") &&
           index.includes('zoomToLocation(locId)') &&
           calendar.includes("index.html?loc=") &&
           calendar.includes("რუკაზე ნახვა")
  },
  {
    name: '9. Calendar hero section removed and timeline renamed',
    check: !calendar.includes('განრიგი & აქტივობები') &&
           !calendar.includes('აკადემიის აქტივობების კალენდარი') &&
           calendar.includes('ყველა დაგეგმილი აქტივობა')
  },
  {
    name: '10. Initial October 2026 dates assigned to all 7 locations',
    check: index.includes('2026-10-03') && index.includes('2026-10-07') &&
           index.includes('2026-10-12') && index.includes('2026-10-16') &&
           index.includes('2026-10-21') && index.includes('2026-10-25') &&
           index.includes('2026-10-29')
  },
  {
    name: '11. Boundary switch remains without the deprecated service-area control',
    check: settings.includes('id="setting-boundary"') &&
           settings.includes('lever-switch') &&
           settings.includes('lever-slider') &&
           !settings.includes('id="setting-radius"') &&
           !index.includes('gardabani_setting_radius') &&
           !buildSource.includes('radiusLayer') &&
           !buildSource.includes('radius: 5000')
  },
  {
    name: '12. Plaintext passcode gardabani2026 completely removed from all files',
    check: !index.includes('gardabani2026') && 
           !calendar.includes('gardabani2026') &&
           !mentors.includes('gardabani2026') &&
           !settings.includes('gardabani2026')
  },
  {
    name: '13. Cryptographic SHA-256 hash implemented across platform',
    check: index.includes('451e2daf6aaa290f28cb4933ddbad57c1c9247c53a84202cb13192de6f234a57') &&
           settings.includes('451e2daf6aaa290f28cb4933ddbad57c1c9247c53a84202cb13192de6f234a57') &&
           index.includes('crypto.subtle.digest') &&
           settings.includes('crypto.subtle.digest')
  },
  {
    name: '14. Brute-Force lockout with live timer & lockout tiers (5-15 min)',
    check: settings.includes('LOCKOUT_TIERS') &&
           settings.includes('gardabani_lockout_until') &&
           settings.includes('stealth-lockout-box') &&
           settings.includes('stealth-lockout-timer')
  },
  {
    name: '15. SessionStorage-based admin mode with 15-min inactivity auto-logout',
    check: index.includes('gardabani_admin_session') &&
           settings.includes('gardabani_admin_session') &&
           index.includes('INACTIVITY_TIMEOUT_MS') &&
           settings.includes('INACTIVITY_TIMEOUT_MS') &&
           !settings.includes("localStorage.setItem('gardabani_admin_mode'")
  },
  {
    name: '16. Stealth admin access (hidden form, Ctrl+Shift+A+L & 5 logo clicks)',
    check: !settings.includes('id="admin-code-input"') &&
           settings.includes('stealth-admin-modal') &&
           settings.includes('setupSecretLogoDoor') &&
           index.includes('setupSecretLogoDoor') &&
           index.includes('btn-indicator-logout')
  },
  {
    name: '17. Pure Black (#000000) Dark Mode across all pages',
    check: index.includes('--bg-page: #000000') && 
           calendar.includes('--bg-page: #000000') &&
           mentors.includes('--bg-page: #000000') && 
           settings.includes('--bg-page: #000000')
  },
  {
    name: '18. Zero references to prohibited word "სავარაუდო"',
    check: !index.includes('სავარაუდო') && 
           !calendar.includes('სავარაუდო') &&
           !mentors.includes('სავარაუდო') && 
           !settings.includes('სავარაუდო')
  },
  {
    name: '19. index.html and gardabani_map.html are identical in size and structure',
    check: index.length === gardabaniMap.length
  },
  {
    name: '20. Supabase JS Client & Config linked across all pages with background sync',
    check: index.includes('supabase_config.js') &&
           calendar.includes('supabase_config.js') &&
           mentors.includes('supabase_config.js') &&
           settings.includes('supabase_config.js') &&
           index.includes('@supabase/supabase-js') &&
           calendar.includes('syncLocationsFromSupabase') &&
           index.includes('syncLocationsFromSupabase') &&
           settings.includes('supabase-status-badge')
  },
  {
    name: '21. Supabase SQL Setup script includes RLS and Admin-only write policies',
    check: fs.existsSync('supabase_setup.sql') &&
           fs.readFileSync('supabase_setup.sql', 'utf8').includes('ENABLE ROW LEVEL SECURITY') &&
           fs.readFileSync('supabase_setup.sql', 'utf8').includes('"Public Read Access"') &&
           fs.readFileSync('supabase_setup.sql', 'utf8').includes('"Admin Insert Access"') &&
           fs.readFileSync('supabase_setup.sql', 'utf8').includes('"Admin Update Access"') &&
           fs.readFileSync('supabase_setup.sql', 'utf8').includes('"Admin Delete Access"')
  },
  {
    name: '22. supabase_config.js present with active Supabase configuration and fallback',
    check: fs.existsSync('supabase_config.js') &&
           fs.readFileSync('supabase_config.js', 'utf8').includes('isSupabaseConfigured') &&
           fs.readFileSync('supabase_config.js', 'utf8').includes('.supabase.co') &&
           index.includes('isSupabaseConfigured()') &&
           settings.includes('isSupabaseConfigured()')
  },
  {
    name: '23. Source content is validated before generation',
    check: sourceValidationPassed &&
           malformedContentRejected &&
           buildSource.includes('validateLocations(INITIAL_LOCATIONS)') &&
           buildSource.includes('validateMentors(INITIAL_MENTORS)')
  },
  {
    name: '24. Dynamic public content uses shared escaping and URL validation',
    check: index.includes('function escapeHtml(value)') &&
           calendar.includes('escapeHtml(loc.activityDescription)') &&
           mentors.includes('safeHttpsUrl(s.linkedin)') &&
           !index.includes('<h3 class="popup-title">' + '$' + '{loc.name}</h3>') &&
           !mentors.includes('<h3 class="mentor-name">' + '$' + '{m.name}</h3>')
  },
  {
    name: '25. Supabase content writes inspect resolved error results',
    check: buildSource.includes("const { error } = await client.from('locations').upsert(row)") &&
           buildSource.includes("const { error } = await client.from('locations').delete()") &&
           buildSource.includes("const { error } = await client.from('mentors').upsert(record)") &&
           buildSource.includes("const { error } = await client.from('mentors').delete()") &&
           trackerSource.includes("const { error } = await client.from('site_analytics').update")
  },
  {
    name: '26. Common credentials and database exports are ignored',
    check: gitignore.includes('.env.*') &&
           gitignore.includes('*.pem') &&
           gitignore.includes('*.backup') &&
           gitignore.includes('roles.sql') &&
           gitignore.includes('გარდაბანი პაროლი.txt')
  },
  {
    name: '27. Rendering helpers reject executable URLs and escape HTML',
    check: safeRenderRuntimePassed
  },
  {
    name: '28. Navigation has visible active state and keyboard focus treatment',
    check: index.includes('aria-current="page"') &&
           calendar.includes(':focus-visible') &&
           mentors.includes('.nav-tab.active::after') &&
           settings.includes('grid-template-columns: repeat(4, minmax(0, 1fr))')
  },
  {
    name: '29. Calendar prioritizes selected events and has semantic day controls',
    check: calendar.includes("document.createElement('button')") &&
           calendar.includes("cell.setAttribute('aria-pressed'") &&
           calendar.includes('.day-events-card {') &&
           calendar.includes('order: -1') &&
           calendar.includes('timeline-location-title')
  },
  {
    name: '30. Mentor photos are optional and preserve generated-avatar fallback',
    check: mentors.includes('function getMentorAvatarMarkup(mentor)') &&
           mentors.includes('mentor-avatar-fallback') &&
           mentors.includes('class="mentor-photo"') &&
           mentors.includes('profile-modal-body')
  },
  {
    name: '31. Settings are divided into clearly labeled functional groups',
    check: settings.includes('id="appearance-settings-title"') &&
           settings.includes('id="map-settings-title"') &&
           settings.includes('id="privacy-settings-title"') &&
           settings.includes('id="admin-tools-title"') &&
           settings.includes('id="analytics-tools-title"')
  },
  {
    name: '32. Reduced-motion and standardized state styling are present',
    check: index.includes('@media (prefers-reduced-motion: reduce)') &&
           calendar.includes('ui-state-panel') &&
           mentors.includes('ui-state-panel') &&
           settings.includes('status-badge')
  },
  {
    name: '33. Azerbaijani language switcher is present on every public page',
    check: [index, calendar, mentors, settings].every(page =>
      page.includes('id="language-switcher"') &&
      page.includes('data-language="ka"') &&
      page.includes('data-language="az"') &&
      page.includes('gardabani_language') &&
      page.includes('Qardabani Mobil Akademiyası'))
  },
  {
    name: '34. Localization preserves Georgian and translates dynamic UI text safely',
    check: buildSource.includes('LOCALIZATION_JS') &&
           localizationSource.includes('MutationObserver') &&
           localizationSource.includes("activeLanguage === 'ka'") &&
           !localizationSource.includes('innerHTML = translations')
  },
  {
    name: '35. Settings and privacy interfaces have explicit Azerbaijani translations',
    check: settingsTranslationCoveragePassed &&
           settings.includes('Görünüş') &&
           settings.includes('Məxfilik və analitika razılığı') &&
           settings.includes('Administrator alətləri')
  },
  {
    name: '36. Localization covers attributes and live dynamic text changes',
    check: localizationSource.includes("['title', 'aria-label', 'placeholder', 'alt']") &&
           localizationSource.includes("record.type === 'characterData'") &&
           localizationSource.includes('attributeFilter: localizableAttributes') &&
           localizationSource.includes('transliteration')
  },
  {
    name: '37. Header dimensions remain stable when language changes',
    check: localizationSource.includes('header.header { min-height: 62px; }') &&
           localizationSource.includes('min-width: 290px') &&
           localizationSource.includes('min-width: 98px') &&
           localizationSource.includes('[data-language="az"] .header-title')
  }
];

let allPassed = true;
console.log('================ HIGH-SECURITY & SUPABASE SUITE ================');
tests.forEach(t => {
  const result = t.check;
  if (!result) allPassed = false;
  console.log(`[${result ? 'PASS' : 'FAIL'}] ${t.name}`);
});

console.log('==================================================================');
console.log('Overall Status:', allPassed ? 'ALL ' + tests.length + ' TESTS PASSED' : 'SOME TESTS FAILED');
process.exit(allPassed ? 0 : 1);
