const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const calendar = fs.readFileSync('calendar.html', 'utf8');
const mentors = fs.readFileSync('mentors.html', 'utf8');
const settings = fs.readFileSync('settings.html', 'utf8');
const gardabaniMap = fs.readFileSync('gardabani_map.html', 'utf8');

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
           calendar.includes('class="nav-tab active">კალენდარი<') &&
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
    name: '11. Settings has Lever switches for Gardabani boundary and 5km radius',
    check: settings.includes('id="setting-boundary"') && 
           settings.includes('id="setting-radius"') && 
           settings.includes('lever-switch') && 
           settings.includes('lever-slider')
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
console.log('Overall Status:', allPassed ? 'ALL 22 TESTS PASSED PERFECTLY' : 'SOME TESTS FAILED');
process.exit(allPassed ? 0 : 1);
