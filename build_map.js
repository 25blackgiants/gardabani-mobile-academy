const fs = require('fs');
const path = require('path');

// 1. Read Gardabani boundary compact GeoJSON
const boundaryGeoJson = fs.readFileSync(path.join(__dirname, 'gardabani_boundary_compact.json'), 'utf8');

// Modular Data Sources from src/data/
const { INITIAL_LOCATIONS } = require('./src/data/locations');
const { INITIAL_MENTORS } = require('./src/data/mentors');
const INITIAL_LOCATIONS_JS = JSON.stringify(INITIAL_LOCATIONS, null, 2);
const INITIAL_MENTORS_JS = JSON.stringify(INITIAL_MENTORS, null, 2);

// Modular Cookie Consent Component
const { COOKIE_CONSENT_CSS, COOKIE_CONSENT_HTML, COOKIE_CONSENT_JS } = require('./src/components/cookie_consent');

// Modular Analytics Tracker from src/analytics/
const analyticsTrackerJs = fs.readFileSync(path.join(__dirname, 'src', 'analytics', 'tracker.js'), 'utf8');
const SITE_ANALYTICS_TRACKER_HTML = `
  <!-- Privacy-First Analytics Tracker -->
  <script>
${analyticsTrackerJs}
  </script>
`;

const COOKIE_CONSENT_FULL_BLOCK = `
${COOKIE_CONSENT_HTML}
  <script>
${COOKIE_CONSENT_JS}
  </script>
`;

// ============================================================================
// STEALTH ADMIN ACCESS CONFIG & COMPONENT (SHA-256, RATE LIMIT, INACTIVITY)
// ============================================================================
const ADMIN_SHA256_HASH = '451e2daf6aaa290f28cb4933ddbad57c1c9247c53a84202cb13192de6f234a57';

const STEALTH_ADMIN_CSS = `
    /* Stealth Admin Modal - Perfectly Centered in Viewport */
    .stealth-modal-backdrop {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: rgba(0, 0, 0, 0.85) !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      z-index: 9999999 !important;
      display: none;
      align-items: center !important;
      justify-content: center !important;
      padding: 16px !important;
      margin: 0 !important;
      box-sizing: border-box !important;
      animation: stealthFadeIn 0.2s ease-out;
    }
    .stealth-modal-backdrop.show {
      display: flex !important;
    }
    @keyframes stealthFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .stealth-modal-window {
      background: var(--bg-card);
      border: 1px solid #2563eb;
      border-radius: 16px;
      width: 100%;
      max-width: 440px;
      margin: auto !important;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(37, 99, 235, 0.3);
      overflow: hidden;
      animation: stealthSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    [data-theme="dark"] .stealth-modal-window {
      background: #0a0a0a;
      border-color: #3b82f6;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 25px rgba(59, 130, 246, 0.25);
    }
    @keyframes stealthSlideUp {
      from { transform: translateY(20px) scale(0.96); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }
    .stealth-modal-header {
      padding: 18px 20px;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .stealth-header-title {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .stealth-shield-icon {
      font-size: 1.5rem;
    }
    .stealth-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0;
    }
    .stealth-badge {
      display: block;
      font-size: 0.70rem;
      color: #3b82f6;
      font-family: monospace;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .stealth-close-btn {
      background: transparent;
      border: none;
      color: var(--text-subtle);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }
    .stealth-close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-main);
    }
    .stealth-modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .stealth-desc {
      font-size: 0.82rem;
      color: var(--text-subtle);
      line-height: 1.45;
      margin: 0;
    }
    .stealth-lockout-box {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #ef4444;
    }
    .lockout-icon {
      font-size: 1.6rem;
    }
    .lockout-heading {
      font-size: 0.85rem;
      font-weight: 800;
      color: #f87171;
    }
    .lockout-sub {
      font-size: 0.80rem;
      font-family: monospace;
      font-weight: 700;
      margin-top: 2px;
      color: #ef4444;
    }
    .stealth-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .stealth-input-wrapper .form-input {
      width: 100%;
      padding-right: 40px;
      box-sizing: border-box;
    }
    .stealth-toggle-pw {
      position: absolute;
      right: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      font-size: 1rem;
      opacity: 0.7;
      color: var(--text-main);
    }
    .stealth-toggle-pw:hover {
      opacity: 1;
    }
    .stealth-attempts-info {
      font-size: 0.75rem;
      color: var(--text-subtle);
      margin-top: 4px;
      font-weight: 600;
    }
    .stealth-error-alert {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 0.80rem;
      margin-top: 6px;
      font-weight: 600;
      animation: shake 0.35s ease;
    }
    .stealth-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 6px;
    }
    .btn-indicator-logout {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #ef4444;
      border-radius: 4px;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 1px 6px;
      cursor: pointer;
      margin-left: 4px;
      transition: all 0.15s ease;
    }
    .btn-indicator-logout:hover {
      background: #ef4444;
      color: #ffffff;
    }
`;

const STEALTH_ADMIN_HTML = `
  <!-- STEALTH ADMIN ACCESS MODAL (TRIGGERED ONLY BY CTRL+SHIFT+A+L OR 5 CLICKS ON LOGO) -->
  <div class="stealth-modal-backdrop" id="stealth-admin-modal" style="display:none;">
    <div class="stealth-modal-window">
      <div class="stealth-modal-header">
        <div class="stealth-header-title">
          <span class="stealth-shield-icon">🛡️</span>
          <div>
            <h3 class="stealth-title">ადმინისტრატორის დაცული წვდომა</h3>
            <span class="stealth-badge" id="stealth-security-badge">SHA-256 დაცული • Rate-Limited</span>
          </div>
        </div>
        <button class="stealth-close-btn" id="stealth-close-btn" title="დახურვა">✕</button>
      </div>

      <div class="stealth-modal-body">
        <p class="stealth-desc" id="stealth-desc-text">
          შეიყვანეთ ადმინისტრატორის საიდუმლო კოდი. კოდი მოწმდება კლიენტის კრიპტოგრაფიული ჰეშით. 3 არასწორი მცდელობის შემდეგ სისტემა დროებით დაიბლოკება.
        </p>

        <!-- Lockout Banner (shown during lockout) -->
        <div class="stealth-lockout-box" id="stealth-lockout-box" style="display:none;">
          <div class="lockout-icon">🔒</div>
          <div class="lockout-info">
            <div class="lockout-heading">სისტემა დროებით დაბლოკილია!</div>
            <div class="lockout-sub" id="stealth-lockout-timer">დარჩენილი დრო: 05:00</div>
          </div>
        </div>

        <!-- Optional Email Input (visible in Supabase mode) -->
        <div class="stealth-input-group" id="stealth-email-group" style="display:none; margin-bottom:12px;">
          <label class="form-label" for="stealth-email-input">ადმინისტრატორის ელ-ფოსტა</label>
          <div class="stealth-input-wrapper">
            <input type="email" class="form-input" id="stealth-email-input" placeholder="admin@gardabani.ge" autocomplete="username">
          </div>
        </div>

        <!-- Input Row -->
        <div class="stealth-input-group" id="stealth-input-group">
          <label class="form-label" for="stealth-pass-input" id="stealth-pass-label">ადმინისტრატორის კოდი</label>
          <div class="stealth-input-wrapper">
            <input type="password" class="form-input" id="stealth-pass-input" placeholder="შეიყვანეთ კოდი..." autocomplete="current-password">
            <button class="stealth-toggle-pw" id="stealth-toggle-pw" type="button" title="პაროლის ჩვენება/დამალვა">👁️</button>
          </div>
          <div class="stealth-attempts-info" id="stealth-attempts-info">
            დარჩენილია 3 მცდელობა
          </div>
          <div class="stealth-error-alert" id="stealth-error-alert" style="display:none;"></div>
        </div>

        <div class="stealth-modal-footer">
          <button class="btn btn-outline" id="stealth-cancel-btn">გაუქმება</button>
          <button class="btn btn-primary" id="stealth-submit-btn">
            <span>🔑</span> შესვლა
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const STEALTH_ADMIN_JS = `
    // ==========================================================================
    // STEALTH ADMIN ACCESS LOGIC (SHA-256, RATE LIMIT, INACTIVITY TIMEOUT & SUPABASE)
    // ==========================================================================
    const ADMIN_HASH = '${ADMIN_SHA256_HASH}';
    const LOCKOUT_TIERS = [5, 10, 15]; // Minutes: 1st lockout = 5m, 2nd = 10m, 3rd+ = 15m
    const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

    let lockoutTimerInterval = null;
    let inactivityTimeoutId = null;
    let supabaseClient = null;

    // Cryptographic SHA-256 via Web Crypto API
    async function computeSHA256(str) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuf = await crypto.subtle.digest('SHA-256', data);
      const hashArr = Array.from(new Uint8Array(hashBuf));
      return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function isSupabaseConfigured() {
      return typeof SUPABASE_CONFIG !== 'undefined' &&
             typeof SUPABASE_CONFIG.url === 'string' &&
             SUPABASE_CONFIG.url.startsWith('https://') &&
             !SUPABASE_CONFIG.url.includes('YOUR_SUPABASE') &&
             typeof SUPABASE_CONFIG.anonKey === 'string' &&
             SUPABASE_CONFIG.anonKey.length > 20 &&
             !SUPABASE_CONFIG.anonKey.includes('YOUR_SUPABASE') &&
             typeof supabase !== 'undefined' &&
             typeof supabase.createClient === 'function';
    }

    function initSupabase() {
      if (isSupabaseConfigured() && !supabaseClient) {
        try {
          supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        } catch (e) {
          console.warn('Supabase init error:', e);
          supabaseClient = null;
        }
      }
      return supabaseClient;
    }

    function isAdminMode() {
      return sessionStorage.getItem('gardabani_admin_session') === 'true';
    }

    function getLockoutUntil() {
      const val = parseInt(localStorage.getItem('gardabani_lockout_until') || '0', 10);
      return isNaN(val) ? 0 : val;
    }

    function isLockedOut() {
      return Date.now() < getLockoutUntil();
    }

    function getFailedAttempts() {
      const val = parseInt(localStorage.getItem('gardabani_failed_attempts') || '0', 10);
      return isNaN(val) ? 0 : val;
    }

    function getLockoutLevel() {
      const val = parseInt(localStorage.getItem('gardabani_lockout_level') || '0', 10);
      return isNaN(val) ? 0 : val;
    }

    function recordFailedAttempt() {
      const attempts = getFailedAttempts() + 1;
      localStorage.setItem('gardabani_failed_attempts', attempts.toString());

      if (attempts >= 3) {
        const level = getLockoutLevel() + 1;
        localStorage.setItem('gardabani_lockout_level', level.toString());
        const minutes = LOCKOUT_TIERS[Math.min(level - 1, LOCKOUT_TIERS.length - 1)];
        const until = Date.now() + minutes * 60 * 1000;
        localStorage.setItem('gardabani_lockout_until', until.toString());
        return { locked: true, minutes: minutes, remaining: 0 };
      }

      return { locked: false, remaining: 3 - attempts };
    }

    function resetAdminLockout() {
      localStorage.removeItem('gardabani_failed_attempts');
      localStorage.removeItem('gardabani_lockout_until');
      localStorage.removeItem('gardabani_lockout_level');
    }

    function updateLockoutUI() {
      const until = getLockoutUntil();
      const now = Date.now();
      const box = document.getElementById('stealth-lockout-box');
      const timerEl = document.getElementById('stealth-lockout-timer');
      const passInput = document.getElementById('stealth-pass-input');
      const emailInput = document.getElementById('stealth-email-input');
      const submitBtn = document.getElementById('stealth-submit-btn');
      const attemptsEl = document.getElementById('stealth-attempts-info');

      if (now < until) {
        const diffSec = Math.ceil((until - now) / 1000);
        const m = Math.floor(diffSec / 60).toString().padStart(2, '0');
        const s = (diffSec % 60).toString().padStart(2, '0');
        if (box) box.style.display = 'flex';
        if (timerEl) timerEl.textContent = 'დარჩენილი დრო: ' + m + ':' + s;
        if (emailInput) emailInput.disabled = true;
        if (passInput) passInput.disabled = true;
        if (submitBtn) submitBtn.disabled = true;
        if (attemptsEl) attemptsEl.style.display = 'none';

        if (!lockoutTimerInterval) {
          lockoutTimerInterval = setInterval(updateLockoutUI, 1000);
        }
      } else {
        if (lockoutTimerInterval) {
          clearInterval(lockoutTimerInterval);
          lockoutTimerInterval = null;
        }
        if (until > 0) {
          localStorage.removeItem('gardabani_lockout_until');
          localStorage.setItem('gardabani_failed_attempts', '0');
        }
        if (box) box.style.display = 'none';
        if (emailInput) emailInput.disabled = false;
        if (passInput) passInput.disabled = false;
        if (submitBtn) submitBtn.disabled = false;
        if (attemptsEl) {
          attemptsEl.style.display = 'block';
          const rem = 3 - getFailedAttempts();
          attemptsEl.textContent = 'დარჩენილია ' + rem + ' მცდელობა';
        }
      }
    }

    function openStealthAdminModal() {
      const modal = document.getElementById('stealth-admin-modal');
      if (!modal) return;
      document.body.style.overflow = 'hidden';
      modal.classList.add('show');
      modal.style.display = 'flex';
      const errorAlert = document.getElementById('stealth-error-alert');
      if (errorAlert) errorAlert.style.display = 'none';
      updateLockoutUI();

      const emailGroup = document.getElementById('stealth-email-group');
      const emailInput = document.getElementById('stealth-email-input');
      const passInput = document.getElementById('stealth-pass-input');
      const passLabel = document.getElementById('stealth-pass-label');
      const badgeEl = document.getElementById('stealth-security-badge');
      const descEl = document.getElementById('stealth-desc-text');

      if (isSupabaseConfigured()) {
        if (emailGroup) emailGroup.style.display = 'block';
        if (passLabel) passLabel.textContent = 'ადმინისტრატორის პაროლი';
        if (badgeEl) badgeEl.textContent = 'Supabase Cloud Auth • RLS დაცული';
        if (descEl) descEl.textContent = 'შეიყვანეთ Supabase ადმინისტრატორის ელ-ფოსტა და პაროლი სრული ღრუბლოვანი წვდომისთვის.';
        if (emailInput) {
          const savedEmail = localStorage.getItem('gardabani_admin_saved_email') || (typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.adminEmail : '') || '';
          emailInput.value = savedEmail;
        }
      } else {
        if (emailGroup) emailGroup.style.display = 'none';
        if (passLabel) passLabel.textContent = 'ადმინისტრატორის კოდი';
        if (badgeEl) badgeEl.textContent = 'SHA-256 დაცული • Rate-Limited';
        if (descEl) descEl.textContent = 'შეიყვანეთ ადმინისტრატორის საიდუმლო კოდი. კოდი მოწმდება კლიენტის კრიპტოგრაფიული ჰეშით. 3 არასწორი მცდელობის შემდეგ სისტემა დროებით დაიბლოკება.';
      }

      if (passInput && !isLockedOut()) {
        passInput.value = '';
        setTimeout(() => {
          if (isSupabaseConfigured() && emailInput && !emailInput.value) {
            emailInput.focus();
          } else {
            passInput.focus();
          }
        }, 150);
      }
    }

    function closeStealthAdminModal() {
      const modal = document.getElementById('stealth-admin-modal');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
      document.body.style.overflow = '';
      if (lockoutTimerInterval) {
        clearInterval(lockoutTimerInterval);
        lockoutTimerInterval = null;
      }
    }

    async function handleStealthLogin() {
      if (isLockedOut()) return;
      const emailInput = document.getElementById('stealth-email-input');
      const passInput = document.getElementById('stealth-pass-input');
      const errorAlert = document.getElementById('stealth-error-alert');
      const attemptsEl = document.getElementById('stealth-attempts-info');
      const submitBtn = document.getElementById('stealth-submit-btn');

      const enteredEmail = (emailInput ? emailInput.value : '').trim();
      const enteredPass = (passInput ? passInput.value : '').trim();

      if (!enteredPass) {
        if (errorAlert) {
          errorAlert.textContent = 'გთხოვთ შეიყვანოთ კოდი / პაროლი.';
          errorAlert.style.display = 'block';
        }
        return;
      }

      // 1. Supabase Cloud Authentication (if configured & email provided)
      if (isSupabaseConfigured() && enteredEmail) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>⏳</span> მოწმდება...';
        }
        try {
          const client = initSupabase();
          const { data, error } = await client.auth.signInWithPassword({
            email: enteredEmail,
            password: enteredPass
          });

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>🔑</span> შესვლა';
          }

          if (error) {
            const res = recordFailedAttempt();
            if (res.locked) {
              updateLockoutUI();
              showToast('🔒 სისტემა დაიბლოკა ' + res.minutes + ' წუთით!');
            } else {
              if (errorAlert) {
                errorAlert.textContent = '❌ ' + (error.message === 'Invalid login credentials' ? 'არასწორი ელ-ფოსტა ან პაროლი!' : error.message) + ' (დარჩა ' + res.remaining + ')';
                errorAlert.style.display = 'block';
              }
              if (attemptsEl) attemptsEl.textContent = 'დარჩენილია ' + res.remaining + ' მცდელობა';
              if (passInput) {
                passInput.classList.add('shake');
                setTimeout(() => passInput.classList.remove('shake'), 400);
                passInput.focus();
                passInput.select();
              }
            }
            return;
          }

          // Supabase Auth Success
          resetAdminLockout();
          localStorage.setItem('gardabani_admin_saved_email', enteredEmail);
          sessionStorage.setItem('gardabani_admin_session', 'true');
          sessionStorage.setItem('gardabani_admin_mode_type', 'supabase');
          sessionStorage.setItem('gardabani_last_active', Date.now().toString());
          closeStealthAdminModal();
          startInactivityWatcher();
          if (typeof syncAdminUI === 'function') syncAdminUI();
          if (typeof syncAdminView === 'function') syncAdminView();
          if (typeof renderSidebar === 'function') renderSidebar();
          if (typeof renderMarkers === 'function') renderMarkers();
          showToast('🛡️ Supabase Cloud Admin რეჟიმი გააქტიურდა!');
          return;
        } catch (authErr) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>🔑</span> შესვლა';
          }
          console.warn('Supabase Auth error, attempting local check...', authErr);
        }
      }

      // 2. Cryptographic SHA-256 Check (Local Prototype / Fallback)
      const hash = await computeSHA256(enteredPass);
      if (hash === ADMIN_HASH) {
        // Success
        resetAdminLockout();
        sessionStorage.setItem('gardabani_admin_session', 'true');
        sessionStorage.setItem('gardabani_admin_mode_type', 'local');
        sessionStorage.setItem('gardabani_last_active', Date.now().toString());
        closeStealthAdminModal();
        startInactivityWatcher();
        if (typeof syncAdminUI === 'function') syncAdminUI();
        if (typeof syncAdminView === 'function') syncAdminView();
        if (typeof renderSidebar === 'function') renderSidebar();
        if (typeof renderMarkers === 'function') renderMarkers();
        showToast('🛡️ ადმინისტრატორის სესია წარმატებით გააქტიურდა!');
      } else {
        // Fail
        const res = recordFailedAttempt();
        if (res.locked) {
          updateLockoutUI();
          showToast('🔒 სისტემა დაიბლოკა ' + res.minutes + ' წუთით!');
        } else {
          if (errorAlert) {
            errorAlert.textContent = '❌ არასწორი კოდი! დარჩენილია ' + res.remaining + ' მცდელობა.';
            errorAlert.style.display = 'block';
          }
          if (attemptsEl) {
            attemptsEl.textContent = 'დარჩენილია ' + res.remaining + ' მცდელობა';
          }
          if (passInput) {
            passInput.classList.add('shake');
            setTimeout(() => passInput.classList.remove('shake'), 400);
            passInput.focus();
            passInput.select();
          }
        }
      }
    }

    async function adminLogout(reason) {
      sessionStorage.removeItem('gardabani_admin_session');
      sessionStorage.removeItem('gardabani_admin_mode_type');
      sessionStorage.removeItem('gardabani_last_active');
      const client = initSupabase();
      if (client) {
        try {
          await client.auth.signOut();
        } catch (e) {}
      }
      clearTimeout(inactivityTimeoutId);
      if (typeof syncAdminUI === 'function') syncAdminUI();
      if (typeof syncAdminView === 'function') syncAdminView();
      if (typeof renderSidebar === 'function') renderSidebar();
      if (typeof renderMarkers === 'function') renderMarkers();
      if (reason === 'inactivity') {
        showToast('⚠️ უმოქმედობის გამო (15 წთ) ადმინისტრატორის სესია დასრულდა');
      } else {
        showToast('ადმინისტრატორის რეჟიმი გაითიშა 🔒');
      }
    }

    function recordActivity() {
      if (!isAdminMode()) return;
      sessionStorage.setItem('gardabani_last_active', Date.now().toString());
      resetInactivityTimer();
    }

    function resetInactivityTimer() {
      clearTimeout(inactivityTimeoutId);
      if (!isAdminMode()) return;
      inactivityTimeoutId = setTimeout(() => {
        adminLogout('inactivity');
      }, INACTIVITY_TIMEOUT_MS);
    }

    function startInactivityWatcher() {
      if (isAdminMode()) {
        const last = parseInt(sessionStorage.getItem('gardabani_last_active') || '0', 10);
        if (last && (Date.now() - last > INACTIVITY_TIMEOUT_MS)) {
          adminLogout('inactivity');
          return;
        }
        recordActivity();
      }
    }

    // Attach listeners
    ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, () => {
        const now = Date.now();
        const last = parseInt(sessionStorage.getItem('gardabani_last_active') || '0', 10);
        if (now - last > 10000) {
          recordActivity();
        }
      }, { passive: true });
    });

    // 1. Secret Key Shortcut: Ctrl + Shift + A + L
    const activeKeys = new Set();
    let chordSeq = [];
    let chordTimer = null;

    window.addEventListener('keydown', (e) => {
      activeKeys.add(e.key.toLowerCase());
      activeKeys.add(e.code.toLowerCase());

      const isCtrl = e.ctrlKey || activeKeys.has('control');
      const isShift = e.shiftKey || activeKeys.has('shift');
      const hasA = activeKeys.has('a') || activeKeys.has('keya');
      const hasL = activeKeys.has('l') || activeKeys.has('keyl');

      if (isCtrl && isShift && hasA && hasL) {
        e.preventDefault();
        openStealthAdminModal();
        return;
      }

      if (isCtrl && isShift) {
        const k = e.key.toLowerCase();
        if (k === 'a' || k === 'l') {
          chordSeq.push(k);
          clearTimeout(chordTimer);
          chordTimer = setTimeout(() => { chordSeq = []; }, 2000);
          if (chordSeq.includes('a') && chordSeq.includes('l')) {
            e.preventDefault();
            chordSeq = [];
            openStealthAdminModal();
          }
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      activeKeys.delete(e.key.toLowerCase());
      activeKeys.delete(e.code.toLowerCase());
    });

    // 2. Secret Door: 5 Rapid Clicks on Logo
    let rapidLogoClicks = 0;
    let rapidLogoTimer = null;

    function setupSecretLogoDoor() {
      const logoEl = document.getElementById('header-brand-title') || document.getElementById('header-logo') || document.querySelector('.header-title');
      if (logoEl) {
        logoEl.style.cursor = 'pointer';
        logoEl.title = 'გარდაბნის მობილური აკადემია';
        logoEl.addEventListener('click', (e) => {
          rapidLogoClicks++;
          clearTimeout(rapidLogoTimer);
          rapidLogoTimer = setTimeout(() => {
            rapidLogoClicks = 0;
          }, 3000);

          if (rapidLogoClicks >= 5) {
            e.preventDefault();
            e.stopPropagation();
            rapidLogoClicks = 0;
            openStealthAdminModal();
          }
        });
      }
    }

    // Modal DOM Events
    function setupStealthModalDOM() {
      const closeBtn = document.getElementById('stealth-close-btn');
      const cancelBtn = document.getElementById('stealth-cancel-btn');
      const submitBtn = document.getElementById('stealth-submit-btn');
      const togglePw = document.getElementById('stealth-toggle-pw');
      const emailInput = document.getElementById('stealth-email-input');
      const passInput = document.getElementById('stealth-pass-input');
      const modal = document.getElementById('stealth-admin-modal');

      if (closeBtn) closeBtn.onclick = closeStealthAdminModal;
      if (cancelBtn) cancelBtn.onclick = closeStealthAdminModal;
      if (submitBtn) submitBtn.onclick = handleStealthLogin;
      if (togglePw && passInput) {
        togglePw.onclick = () => {
          const isPw = passInput.type === 'password';
          passInput.type = isPw ? 'text' : 'password';
          togglePw.textContent = isPw ? '🙈' : '👁️';
        };
      }
      if (emailInput) {
        emailInput.onkeydown = (e) => {
          if (e.key === 'Enter') {
            if (passInput) passInput.focus();
          }
          if (e.key === 'Escape') closeStealthAdminModal();
        };
      }
      if (passInput) {
        passInput.onkeydown = (e) => {
          if (e.key === 'Enter') handleStealthLogin();
          if (e.key === 'Escape') closeStealthAdminModal();
        };
      }
      if (modal) {
        modal.onclick = (e) => {
          if (e.target === modal) closeStealthAdminModal();
        };
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      setupSecretLogoDoor();
      setupStealthModalDOM();
      startInactivityWatcher();
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const modal = document.getElementById('stealth-admin-modal');
          if (modal && modal.style.display !== 'none') closeStealthAdminModal();
        }
      });
    });
`;

// ============================================================================
// 2. Define index.html (Main Page with Deep-Link from Calendar, Date in Edit & Popups)
// ============================================================================
const mapHtmlContent = `<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>გარდაბნის მობილური აკადემია</title>
  
  <!-- Immediate Theme Initializer to prevent white flash (Default White / Clean Light Mode) -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>

  <!-- Leaflet CSS with CDN and fallback -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>

  <style>
    /* ==========================================================================
       DESIGN SYSTEM: PURE BLACK NIGHT MODE & CLEAN DAY MODE
       ========================================================================== */
    :root {
      --primary-hub: #dc2626;         /* Hub Red / Crimson */
      --primary-hub-glow: rgba(220, 38, 38, 0.35);
      --primary-village: #2563eb;     /* Village Royal Blue */
      --primary-village-glow: rgba(37, 99, 235, 0.25);
      --accent-gardabani: #4f46e5;    /* Gardabani Boundary Indigo */
      --accent-cyan: #0284c7;
      
      /* Light Mode (default) */
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-subtle: #f8fafc;
      --bg-hover: #f1f5f9;
      --bg-input: #f8fafc;
      --bg-nav: #f1f5f9;
      
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-subtle: #64748b;
      
      --border-light: #e2e8f0;
      --border-focus: #94a3b8;
      
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08);
      --shadow-popup: 0 20px 25px -5px rgba(0, 0, 0, 0.22), 0 8px 10px -6px rgba(0, 0, 0, 0.12);
      
      --font-stack: "BPG Nino Mtavruli", "Noto Sans Georgian", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    }

    /* Night Mode Theme Variables (TRUE PURE BLACK - NO BLUE TINT) */
    [data-theme="dark"] {
      --bg-page: #000000;         /* True Pure Black */
      --bg-card: #0a0a0a;         /* Deep neutral black card */
      --bg-card-subtle: #141414;  /* Slightly lighter card element */
      --bg-hover: #1c1c1c;        /* Neutral dark hover */
      --bg-input: #121212;        /* Dark input field */
      --bg-nav: #0e0e0e;          /* Navigation pill background */
      
      --text-main: #f5f5f5;       /* Crisp clean white text */
      --text-muted: #a3a3a3;      /* Clean neutral gray text */
      --text-subtle: #737373;     /* Muted neutral gray */
      
      --border-light: #262626;    /* Dark neutral border, no blue tint */
      --border-focus: #3b82f6;    /* Focus outline */
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.8);
      --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.9);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.95);
      --shadow-popup: 0 20px 30px rgba(0, 0, 0, 0.95);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-stack);
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.45;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.25s ease, color 0.25s ease;
      overflow-x: hidden;
    }

    /* Compact Container */
    .app-container {
      max-width: 1600px;
      margin: 0 auto;
      padding: 10px 18px 16px;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* Fullscreen Mode */
    body.fullscreen-mode {
      overflow: hidden;
    }
    body.fullscreen-mode .app-container {
      max-width: 100%;
      height: 100vh;
      padding: 0;
      gap: 0;
    }
    body.fullscreen-mode header.header,
    body.fullscreen-mode .controls-stats-bar {
      display: none;
    }
    body.fullscreen-mode .map-panel {
      border-radius: 0;
      border: none;
      height: 100vh;
      max-height: 100vh;
      min-height: 100vh;
    }

    /* Header */
    header.header {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 10px 18px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .header-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.2;
    }

    /* Navigation Tabs */
    .nav-tabs {
      display: inline-flex;
      background: var(--bg-nav);
      padding: 3px;
      border-radius: var(--radius-full);
      gap: 3px;
      border: 1px solid var(--border-light);
      transition: background-color 0.25s ease;
    }

    .nav-tab {
      padding: 5px 14px;
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      font-weight: 700;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-tab:hover {
      color: var(--text-main);
    }

    .nav-tab.active {
      background: var(--bg-card);
      color: #2563eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    [data-theme="dark"] .nav-tab.active {
      color: #60a5fa;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    /* Standard Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      user-select: none;
      white-space: nowrap;
    }

    .btn-outline {
      background: var(--bg-card);
      border-color: var(--border-light);
      color: var(--text-main);
    }

    .btn-outline:hover {
      background: var(--bg-hover);
      border-color: var(--border-focus);
    }

    .btn-primary {
      background: #2563eb;
      color: #ffffff;
    }

    .btn-primary:hover {
      background: #1d4ed8;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
    }

    .btn-gardabani {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #1e40af;
    }

    .btn-gardabani:hover {
      background: #dbeafe;
      border-color: #93c5fd;
    }

    [data-theme="dark"] .btn-gardabani {
      background: #172554;
      border-color: #1e40af;
      color: #93c5fd;
    }

    [data-theme="dark"] .btn-gardabani:hover {
      background: #1e3a8a;
      border-color: #3b82f6;
    }

    /* Theme Toggle Button */
    .theme-toggle-btn {
      background: var(--bg-nav);
      border: 1px solid var(--border-light);
      color: var(--text-main);
      padding: 6px 12px;
      border-radius: var(--radius-full);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .theme-toggle-btn:hover {
      background: var(--bg-hover);
      border-color: var(--border-focus);
    }

    /* Admin Badge & Controls (Hidden for regular users) */
    .admin-indicator {
      display: none;
      align-items: center;
      gap: 6px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-size: 0.72rem;
      font-weight: 800;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .admin-indicator:hover {
      background: #d1fae5;
    }

    [data-theme="dark"] .admin-indicator {
      background: #064e3b;
      color: #a7f3d0;
      border-color: #047857;
    }

    .admin-controls-group {
      display: none;
      align-items: center;
      gap: 6px;
    }

    /* TOP BAR: CLEAN MAP TYPE & ACTIONS BAR */
    .controls-stats-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .map-type-bar {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 6px 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      box-shadow: var(--shadow-sm);
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .options-group-title {
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .layer-pills {
      display: inline-flex;
      background: var(--bg-nav);
      padding: 2px;
      border-radius: var(--radius-full);
      gap: 2px;
      border: 1px solid var(--border-light);
    }

    .layer-btn {
      border: none;
      background: transparent;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-family: inherit;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .layer-btn:hover {
      color: var(--text-main);
    }

    .layer-btn.active {
      background: var(--bg-card);
      color: #2563eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    [data-theme="dark"] .layer-btn.active {
      color: #60a5fa;
    }

    /* MAP CONTAINER (Strictly bounded viewport height) */
    .map-panel {
      position: relative;
      background: var(--bg-card);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border-light);
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      height: calc(100vh - 130px);
      min-height: 530px;
      max-height: 840px;
    }

    #map {
      width: 100%;
      height: 100%;
      flex: 1;
      background: var(--bg-page);
      z-index: 1;
    }

    /* Night mode map styling for Google tiles */
    [data-theme="dark"] #map {
      background: #000000 !important;
    }
    
    [data-theme="dark"] #map.dark-tiles .leaflet-tile-pane {
      filter: invert(100%) hue-rotate(180deg) brightness(85%) contrast(95%);
    }

    [data-theme="dark"] #map.dark-tiles .leaflet-tile-container {
      background: #000000 !important;
    }

    /* ==========================================================================
       PROMINENT FLOATING DRAWER TRIGGER BUTTON (TOP-LEFT OF MAP)
       ========================================================================== */
    .map-floating-left {
      position: absolute;
      top: 14px;
      left: 14px;
      z-index: 1020;
      pointer-events: auto;
    }

    .drawer-trigger-btn {
      background: var(--bg-card);
      border: 2px solid #2563eb;
      color: var(--text-main);
      padding: 9px 16px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.84rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .drawer-trigger-btn:hover {
      background: #2563eb;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(37, 99, 235, 0.4);
    }

    .drawer-trigger-btn:hover .trigger-badge {
      background: #ffffff;
      color: #2563eb;
      border-color: #ffffff;
    }

    [data-theme="dark"] .drawer-trigger-btn {
      background: #0a0a0a;
      border-color: #3b82f6;
      color: #f5f5f5;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.85);
    }

    [data-theme="dark"] .drawer-trigger-btn:hover {
      background: #3b82f6;
      color: #000000;
      box-shadow: 0 6px 22px rgba(59, 130, 246, 0.5);
    }

    .trigger-icon {
      font-size: 1.15rem;
      line-height: 1;
      color: #2563eb;
      transition: color 0.15s ease;
    }

    .drawer-trigger-btn:hover .trigger-icon {
      color: inherit;
    }

    [data-theme="dark"] .trigger-icon {
      color: #60a5fa;
    }

    .trigger-badge {
      background: #eff6ff;
      color: #1e40af;
      font-size: 0.72rem;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      font-weight: 800;
      border: 1px solid #bfdbfe;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .trigger-badge {
      background: #172554;
      color: #93c5fd;
      border-color: #1e40af;
    }

    /* Floating quick controls right */
    .map-floating-right {
      position: absolute;
      top: 14px;
      right: 14px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 6px;
      pointer-events: auto;
    }

    .map-ctrl-btn {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      color: var(--text-main);
      padding: 6px 11px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .map-ctrl-btn:hover {
      background: var(--bg-hover);
      color: #2563eb;
      transform: translateY(-1px);
    }

    [data-theme="dark"] .map-ctrl-btn {
      background: rgba(10, 10, 10, 0.92);
      border-color: #262626;
      color: #ffffff;
    }

    [data-theme="dark"] .map-ctrl-btn:hover {
      background: #1f1f1f;
      color: #60a5fa;
    }

    /* ==========================================================================
       OFF-CANVAS SLIDE-OUT DRAWER (ZERO SCROLL OVERFLOW, MAP HEIGHT BOUNDED)
       ========================================================================== */
    .drawer-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      z-index: 1040;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .drawer-backdrop.open {
      opacity: 1;
      pointer-events: auto;
    }

    .sidebar-drawer {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 380px;
      max-width: 90%;
      background: var(--bg-card);
      border-right: 1px solid var(--border-light);
      box-shadow: 10px 0 35px rgba(0, 0, 0, 0.3);
      z-index: 1050;
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: 100%;
      transform: translateX(-100%);
      transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    .sidebar-drawer.open {
      transform: translateX(0);
    }

    .drawer-header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: var(--bg-card);
      flex-shrink: 0;
    }

    .drawer-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .drawer-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .drawer-close-btn {
      background: var(--bg-nav);
      border: 1px solid var(--border-light);
      color: var(--text-muted);
      width: 30px;
      height: 30px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.90rem;
      font-weight: 800;
      transition: all 0.15s ease;
    }

    .drawer-close-btn:hover {
      background: #fee2e2;
      border-color: #fecaca;
      color: #991b1b;
    }

    [data-theme="dark"] .drawer-close-btn:hover {
      background: #350808;
      border-color: #7f1d1d;
      color: #fca5a5;
    }

    .drawer-search-wrap {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border-light);
      background: var(--bg-card-subtle);
      flex-shrink: 0;
    }

    .search-box {
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.80rem;
      color: var(--text-subtle);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 7px 10px 7px 28px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      font-family: inherit;
      font-size: 0.78rem;
      color: var(--text-main);
      background: var(--bg-input);
      outline: none;
      transition: all 0.15s ease;
    }

    .search-input:focus {
      background: var(--bg-card);
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    }

    /* INTERNAL SCROLL ONLY - STRICTLY PREVENTS PAGE SCROLLING */
    .locations-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow-y: auto;
      overscroll-behavior: contain;
      flex: 1;
      padding: 12px 14px;
      margin: 0;
    }

    .locations-list::-webkit-scrollbar {
      width: 5px;
    }
    .locations-list::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    [data-theme="dark"] .locations-list::-webkit-scrollbar-thumb {
      background: #262626;
    }

    .loc-card-item {
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 9px 11px;
      background: var(--bg-card);
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .loc-card-item:hover {
      border-color: #93c5fd;
      background: var(--bg-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    .loc-card-item.active {
      border-color: #2563eb;
      background: #eff6ff;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    }

    [data-theme="dark"] .loc-card-item.active {
      border-color: #3b82f6;
      background: #171717;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }

    .loc-card-item.hub-item {
      border-left: 3.5px solid var(--primary-hub);
    }

    .loc-card-item.village-item {
      border-left: 3.5px solid var(--primary-village);
    }

    .loc-item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .loc-item-name {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .type-badge {
      font-size: 0.65rem;
      padding: 1px 6px;
      border-radius: var(--radius-full);
      font-weight: 700;
      white-space: nowrap;
    }

    .type-badge.hub {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    [data-theme="dark"] .type-badge.hub {
      background: #350808;
      color: #fca5a5;
      border-color: #7f1d1d;
    }

    .type-badge.village {
      background: #dbeafe;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }

    [data-theme="dark"] .type-badge.village {
      background: #172554;
      color: #93c5fd;
      border-color: #1e40af;
    }

    .loc-item-act {
      font-size: 0.74rem;
      color: var(--text-muted);
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Date badge in list */
    .loc-item-date {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.70rem;
      color: #2563eb;
      font-weight: 700;
      margin-top: 1px;
    }

    [data-theme="dark"] .loc-item-date {
      color: #60a5fa;
    }

    .loc-item-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 3px;
      font-size: 0.68rem;
      color: var(--text-subtle);
    }

    .loc-item-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .loc-action-btn {
      background: transparent;
      border: 1px solid var(--border-light);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .loc-action-btn:hover {
      background: var(--bg-hover);
      color: var(--text-main);
    }

    /* LEAFLET CUSTOM MARKER STYLES */
    .custom-marker-pin {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      border: 2px solid #ffffff;
      transition: all 0.2s ease;
    }

    .custom-marker-pin.hub {
      background: linear-gradient(135deg, #ef4444, #dc2626);
    }

    .custom-marker-pin.village {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .custom-marker-pin span {
      transform: rotate(45deg);
      color: #ffffff;
      font-weight: 800;
      font-size: 0.75rem;
    }

    .custom-marker-pin:hover {
      transform: rotate(-45deg) scale(1.15);
      box-shadow: 0 6px 14px rgba(0,0,0,0.45);
    }

    /* POPUP STYLES */
    .leaflet-popup-content-wrapper {
      border-radius: var(--radius-lg);
      padding: 0;
      box-shadow: var(--shadow-popup);
      border: 1px solid var(--border-light);
      overflow: hidden;
      background: var(--bg-card);
    }

    .leaflet-popup-content {
      margin: 0;
      width: 310px !important;
      line-height: 1.4;
    }

    .popup-card {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--bg-card);
    }

    .popup-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 6px;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 6px;
    }

    .popup-title {
      font-size: 0.90rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .popup-distance {
      font-size: 0.70rem;
      color: #2563eb;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
    }

    [data-theme="dark"] .popup-distance {
      color: #60a5fa;
    }

    .popup-date-row {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #eff6ff;
      color: #1e40af;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-size: 0.72rem;
      font-weight: 800;
      width: fit-content;
      border: 1px solid #bfdbfe;
    }

    [data-theme="dark"] .popup-date-row {
      background: #172554;
      color: #93c5fd;
      border-color: #1e40af;
    }

    .popup-act-title {
      font-size: 0.80rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .popup-act-desc {
      font-size: 0.75rem;
      color: var(--text-muted);
      line-height: 1.35;
    }

    .popup-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      border-top: 1px dashed var(--border-light);
      padding-top: 6px;
    }

    /* MODAL */
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      z-index: 2000;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .modal-window {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      max-width: 650px;
      width: 100%;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-popup);
      overflow: hidden;
    }

    .modal-header {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .modal-body {
      padding: 16px 18px;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .form-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    .form-input, .form-textarea {
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      padding: 6px 9px;
      font-family: inherit;
      font-size: 0.80rem;
      background: var(--bg-input);
      color: var(--text-main);
      outline: none;
      transition: border-color 0.15s ease;
    }

    .form-input:focus, .form-textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    }

    .modal-footer {
      padding: 12px 18px;
      border-top: 1px solid var(--border-light);
      background: var(--bg-card-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* TOAST */
    .toast-msg {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      font-weight: 700;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 3000;
      pointer-events: none;
    }

    [data-theme="dark"] .toast-msg {
      background: #141414;
      color: #ffffff;
      border: 1px solid #262626;
    }

    .toast-msg.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* ==========================================================================
       MOBILE RESPONSIVE ADAPTATIONS (768px & 480px)
       ========================================================================== */
    @media (max-width: 768px) {
      .app-container {
        padding: 8px 10px 16px;
        gap: 8px;
      }

      /* Header Layout on Mobile: Clean 2-Row Native App Header */
      header.header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        gap: 8px;
        border-radius: var(--radius-md);
      }

      .header-content {
        display: contents;
      }

      .header-title {
        order: 1;
        font-size: 1.05rem;
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-logo {
        font-size: 1.25rem;
      }

      .header-actions {
        order: 2;
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 0 0 auto;
      }

      /* Native-like horizontal touch-scrollable navigation bar */
      .nav-tabs {
        order: 3;
        width: 100%;
        display: flex;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: 3px;
        border-radius: var(--radius-full);
        gap: 4px;
        background: var(--bg-nav);
      }

      .nav-tabs::-webkit-scrollbar {
        display: none;
      }

      .nav-tab {
        flex: 1 0 auto;
        justify-content: center;
        text-align: center;
        padding: 7px 10px;
        font-size: 0.74rem;
        white-space: nowrap;
      }

      .theme-toggle-btn {
        padding: 5px 10px;
        font-size: 0.74rem;
      }

      /* Top Map Controls Bar */
      .controls-stats-bar {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }

      .map-type-bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
      }

      .options-group-title {
        font-size: 0.74rem;
      }

      .layer-pills {
        display: flex;
        flex: 1;
        max-width: 220px;
      }

      .layer-btn {
        flex: 1;
        justify-content: center;
        padding: 4px 6px;
        font-size: 0.70rem;
      }

      .btn-gardabani {
        width: 100%;
        justify-content: center;
        padding: 8px 12px;
        font-size: 0.78rem;
      }

      /* Map Container Viewport Height */
      .map-panel {
        height: calc(100vh - 195px);
        min-height: 420px;
        border-radius: var(--radius-md);
      }

      /* Floating Controls over Map */
      .map-floating-left {
        top: 10px;
        left: 10px;
      }

      .drawer-trigger-btn {
        padding: 7px 12px;
        font-size: 0.78rem;
        gap: 6px;
      }

      .trigger-icon {
        font-size: 1rem;
      }

      .map-floating-right {
        top: 10px;
        right: 10px;
        gap: 4px;
      }

      .map-ctrl-btn {
        padding: 5px 8px;
        font-size: 0.70rem;
      }

      /* Off-Canvas Slide-Out Drawer on Mobile */
      .sidebar-drawer {
        width: 88vw;
        max-width: 340px;
      }

      .drawer-header {
        padding: 10px 14px;
      }

      .drawer-title {
        font-size: 0.88rem;
      }

      .locations-list {
        padding: 8px 10px;
        gap: 6px;
      }

      .loc-card-item {
        padding: 8px 10px;
      }

      /* Popup adjustments */
      .leaflet-popup-content {
        width: 260px !important;
      }

      .popup-card {
        padding: 10px 12px;
        gap: 6px;
      }

      .popup-title {
        font-size: 0.84rem;
      }

      .popup-act-title {
        font-size: 0.76rem;
      }

      .popup-act-desc {
        font-size: 0.72rem;
      }

      /* Modal adjustments */
      .modal-window {
        max-width: 95vw;
        max-height: 92vh;
        border-radius: var(--radius-md);
      }

      .modal-body {
        padding: 12px 14px;
      }

      .form-grid-2 {
        grid-template-columns: 1fr;
      }

      .modal-footer {
        padding: 10px 14px;
        flex-direction: column-reverse;
      }

      .modal-footer .btn {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .app-container {
        padding: 6px 8px 14px;
      }

      header.header {
        padding: 8px 10px;
      }

      .header-title {
        font-size: 0.92rem;
      }

      .nav-tab {
        padding: 6px 7px;
        font-size: 0.69rem;
      }

      .theme-toggle-btn {
        padding: 4px 8px;
        font-size: 0.70rem;
      }

      .drawer-trigger-btn span:nth-child(2) {
        display: inline;
      }

      .trigger-badge {
        display: none;
      }

      .leaflet-popup-content {
        width: 230px !important;
      }
    }
${STEALTH_ADMIN_CSS}
${COOKIE_CONSENT_CSS}
  </style>
</head>
<body>

  <div class="app-container">
    
    <!-- HEADER -->
    <header class="header">
      <div class="header-content">
        <h1 class="header-title" id="header-brand-title" style="cursor:pointer;" title="გარდაბნის მობილური აკადემია">
          <span class="header-logo" id="header-logo">🚐</span>
          <span>გარდაბნის მობილური აკადემია</span>
        </h1>
        <nav class="nav-tabs">
          <a href="index.html" class="nav-tab active">მთავარი გვერდი</a>
          <a href="calendar.html" class="nav-tab">კალენდარი</a>
          <a href="mentors.html" class="nav-tab">მენტორები</a>
          <a href="settings.html" class="nav-tab">პარამეტრები</a>
        </nav>
      </div>
      
      <div class="header-actions">
        <!-- Admin Indicator (shown when admin mode is on) -->
        <div class="admin-indicator" id="admin-indicator" style="display:none;" title="ადმინისტრატორის სესია აქტიურია">
          <span>🛡️ ადმინი</span>
          <button type="button" class="btn-indicator-logout" id="btn-header-logout" title="სესიის დასრულება">✕ გამოსვლა</button>
        </div>

        <!-- Admin Only Buttons (hidden for normal users) -->
        <div class="admin-controls-group" id="admin-controls">
          <button class="btn btn-primary" id="btn-add-location">
            <span>➕</span> ახალი ლოკაცია
          </button>
          <button class="btn btn-outline" id="btn-open-editor">
            <span>✏️</span> რედაქტორი
          </button>
        </div>

        <!-- Day / Night Mode Toggle Button -->
        <button class="theme-toggle-btn" id="theme-toggle" title="დღის და ღამის რეჟიმი">
          <span id="theme-icon">🌙</span> <span id="theme-text">ღამე</span>
        </button>
      </div>
    </header>

    <!-- TOP BAR: MAP TYPE SELECTOR & QUICK ACTIONS -->
    <section class="controls-stats-bar">
      <!-- Map Type Selector (relocated to where layers were) -->
      <div class="map-type-bar">
        <span class="options-group-title">🗺️ რუკის ტიპი:</span>
        <div class="layer-pills" id="layer-selector">
          <button class="layer-btn active" data-layer="roadmap">
            <span>🗺️</span> საგზაო
          </button>
          <button class="layer-btn" data-layer="satellite">
            <span>🛰️</span> სატელიტი
          </button>
          <button class="layer-btn" data-layer="terrain">
            <span>🏔️</span> რელიეფი
          </button>
        </div>
      </div>

      <button class="btn btn-gardabani" id="btn-fit-boundary" title="გარდაბნის საზღვარზე ფოკუსი">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
        გარდაბანზე ფოკუსი
      </button>
    </section>

    <!-- MAP PANEL (Holds Leaflet Map, Floating Drawer Trigger & Off-Canvas Drawer) -->
    <main class="map-panel">

      <!-- PROMINENT FLOATING DRAWER TRIGGER BUTTON (TOP-LEFT OF MAP) -->
      <div class="map-floating-left">
        <button class="drawer-trigger-btn" id="drawer-trigger-btn" title="აქტივობების სიის გამოწევა">
          <span class="trigger-icon">☰</span>
          <span>აქტივობები</span>
          <span class="trigger-badge" id="drawer-badge">7 აქტივობა</span>
        </button>
      </div>

      <!-- Drawer Backdrop -->
      <div class="drawer-backdrop" id="drawer-backdrop"></div>

      <!-- Off-Canvas Slide-Out Locations Drawer -->
      <aside class="sidebar-drawer" id="sidebar-drawer">
        <!-- Drawer Header -->
        <div class="drawer-header">
          <div class="drawer-title-group">
            <h2 class="drawer-title">🎯 აქტივობები</h2>
            <span class="type-badge village" id="list-count-badge">7 აქტივობა</span>
          </div>
          <button class="drawer-close-btn" id="drawer-close-btn" title="დახურვა">✕</button>
        </div>

        <!-- Search box inside drawer -->
        <div class="drawer-search-wrap">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="search-input" placeholder="მოძებნეთ სოფელი ან აქტივობა...">
          </div>
        </div>

        <!-- Scrollable Locations List (Strictly internal scroll) -->
        <ul class="locations-list" id="locations-list">
          <!-- Dynamically populated -->
        </ul>
      </aside>

      <!-- Floating quick controls right -->
      <div class="map-floating-right">
        <button class="map-ctrl-btn" id="btn-recenter" title="გარდაბანზე დაბრუნება">
          <span>🎯</span> ცენტრირება
        </button>
        <button class="map-ctrl-btn" id="btn-fullscreen" title="მთელ ეკრანზე გაშლა">
          <span id="fs-icon">⛶</span> ეკრანი
        </button>
      </div>

      <!-- The Leaflet map element (Default open view) -->
      <div id="map"></div>

    </main>

  </div>

  <!-- IN-BROWSER LIVE EDIT / ADD MODAL (ADMIN ONLY) -->
  <div class="modal-backdrop" id="edit-modal">
    <div class="modal-window">
      <div class="modal-header">
        <h3 class="modal-title"><span>✏️</span> ლოკაციების მართვა და რედაქტორი</h3>
        <button class="btn btn-outline" id="modal-close" style="padding:3px 7px;">✕</button>
      </div>
      <div class="modal-body" id="modal-form-container">
        <!-- Rendered dynamically -->
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="btn-copy-config">📋 JSON კოდის კოპირება</button>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline" id="btn-reset-config">საწყისზე დაბრუნება</button>
          <button class="btn btn-primary" id="btn-save-config">შენახვა და განახლება</button>
        </div>
      </div>
    </div>
  </div>

${STEALTH_ADMIN_HTML}

  <!-- Toast notification -->
  <div class="toast-msg" id="toast">შეტყობინება</div>

  <!-- Supabase JS Client & Project Configuration -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="supabase_config.js"></script>

  <!-- Leaflet JS with unpkg primary and cdnjs fallback -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin="" onerror="this.onerror=null;this.src='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';"></script>

  <script>
    // ==========================================================================
    // GARDABANI MUNICIPALITY OFFICIAL BOUNDARY (GeoJSON)
    // ==========================================================================
    const GARDABANI_BOUNDARY = ${boundaryGeoJson.trim()};

    // ==========================================================================
    // GEORGIAN DATE FORMATTER
    // ==========================================================================
    const GEORGIAN_MONTHS = [
      'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
      'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];

    function formatGeorgianDate(dateStr) {
      if (!dateStr) return 'თარიღი უცნობია';
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const day = parseInt(parts[2], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const year = parts[0];
      return day + ' ' + (GEORGIAN_MONTHS[monthIdx] || '') + ', ' + year;
    }

    // ==========================================================================
    // PROJECT DATA: CONFIRMED LOCATIONS & ACTIVITIES (OCTOBER 2026 TEST DATES)
    // ==========================================================================
    const INITIAL_LOCATIONS = ${INITIAL_LOCATIONS_JS};

    // Load from localStorage if present
    function loadSavedLocations() {
      try {
        const saved = localStorage.getItem('gardabani_locations');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      return JSON.parse(JSON.stringify(INITIAL_LOCATIONS));
    }

    function saveLocationsToStorage() {
      try {
        localStorage.setItem('gardabani_locations', JSON.stringify(locations));
      } catch (e) {}
    }

    // Asynchronous Cloud Sync with Supabase (Public Read / RLS Protected)
    async function syncLocationsFromSupabase() {
      const client = initSupabase();
      if (!client) return;
      try {
        const { data, error } = await client
          .from('locations')
          .select('*')
          .order('id', { ascending: true });
        if (!error && Array.isArray(data) && data.length > 0) {
          locations = data.map(r => ({
            id: Number(r.id),
            name: r.name,
            shortName: r.short_name,
            type: r.type,
            date: r.date,
            latitude: Number(r.latitude),
            longitude: Number(r.longitude),
            activityTitle: r.activity_title,
            activityDescription: r.activity_description
          }));
          saveLocationsToStorage();
          renderMapOverlays();
          renderSidebar();
          console.log('✅ Supabase: ' + locations.length + ' ლოკაცია ჩაიტვირთა ღრუბლიდან');
        }
      } catch (err) {
        console.warn('Supabase fetch notice (using local storage):', err);
      }
    }

    // Write location to Supabase with RLS verification
    async function syncLocationToSupabase(locRecord) {
      const client = initSupabase();
      if (!client) return;
      try {
        const row = {
          id: locRecord.id,
          name: locRecord.name,
          short_name: locRecord.shortName,
          type: locRecord.type,
          date: locRecord.date,
          latitude: locRecord.latitude,
          longitude: locRecord.longitude,
          activity_title: locRecord.activityTitle,
          activity_description: locRecord.activityDescription
        };
        const { error } = await client.from('locations').upsert(row);
        if (error) {
          console.warn('Supabase upsert notice:', error);
          showToast('⚠️ ლოკალურად შეინახა, Supabase RLS შეცდომა: ' + (error.message || 'წვდომა უარყოფილია'));
        } else {
          showToast('☁️ მონაცემები შენახულია Supabase ღრუბლოვან ბაზაში!');
        }
      } catch (err) {
        console.warn('Supabase sync error:', err);
      }
    }

    // State
    let locations = loadSavedLocations();
    let activeLocationId = null;
    let map = null;
    let markersLayer = null;
    let boundaryLayer = null;
    let radiusLayer = null;
    let baseLayers = {};
    let currentBaseLayerName = 'roadmap';
    let isFullscreen = false;
    let isDrawerOpen = false;

    // Strict Georgia Bounds Lock
    const GEORGIA_BOUNDS = L.latLngBounds(
      [41.00, 39.80],
      [43.60, 46.85]
    );

    // Gardabani Center
    const GARDABANI_CENTER = [41.52, 45.05];

    // Haversine formula for distances in km
    function calcDistanceKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return (R * c).toFixed(1);
    }

${STEALTH_ADMIN_JS}

    function syncAdminUI() {
      const isAdmin = isAdminMode();
      const adminIndicator = document.getElementById('admin-indicator');
      const adminControls = document.getElementById('admin-controls');
      if (adminIndicator) adminIndicator.style.display = isAdmin ? 'inline-flex' : 'none';
      if (adminControls) adminControls.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    // ==========================================================================
    // MAP INITIALIZATION (100% RELIABLE GOOGLE MAPS LAYERS)
    // ==========================================================================
    function initMap() {
      map = L.map('map', {
        center: GARDABANI_CENTER,
        zoom: 11,
        minZoom: 8,
        maxZoom: 19,
        maxBounds: GEORGIA_BOUNDS,
        maxBoundsViscosity: 1.0,
        zoomControl: false
      });

      // Move zoom control to bottomright so it never collides with top-left drawer trigger
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // 1. Google Maps Roadmap Tile Layer
      const roadmapLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 19,
        attribution: '© Google Maps'
      });

      // 2. Google Maps Hybrid Satellite
      const satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 19,
        attribution: '© Google Maps Satellite'
      });

      // 3. Google Maps Terrain Tile Layer
      const terrainLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 19,
        attribution: '© Google Maps Terrain'
      });

      baseLayers = {
        roadmap: roadmapLayer,
        satellite: satelliteLayer,
        terrain: terrainLayer
      };

      roadmapLayer.addTo(map);
      currentBaseLayerName = 'roadmap';
      updateLayerPillsUI('roadmap');
      updateMapThemeTiles();

      // Boundary overlay layer
      boundaryLayer = L.geoJSON(GARDABANI_BOUNDARY, {
        style: {
          color: '#2563eb',
          weight: 3.2,
          opacity: 0.95,
          fillColor: '#3b82f6',
          fillOpacity: 0.10,
          dashArray: '5, 5'
        },
        onEachFeature: function(feature, layer) {
          layer.bindTooltip("<b>გარდაბნის მუნიციპალიტეტი</b><br>ადმინისტრაციული საზღვარი", {
            sticky: true,
            className: 'boundary-tooltip'
          });
          layer.on({
            mouseover: function(e) {
              const l = e.target;
              l.setStyle({ weight: 4.2, fillOpacity: 0.20, dashArray: '' });
            },
            mouseout: function(e) {
              boundaryLayer.resetStyle(e.target);
            }
          });
        }
      });

      radiusLayer = L.layerGroup();
      markersLayer = L.layerGroup().addTo(map);

      // Apply settings from localStorage
      applyLayerSettings();

      // Render markers & 5km radius circles
      renderMapOverlays();

      // Fit map to Gardabani boundary on initial load
      fitGardabaniBoundary();

      // Check Deep Link from Calendar (e.g. ?loc=3)
      checkDeepLink();
    }

    function checkDeepLink() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const locParam = urlParams.get('loc');
        if (locParam) {
          const locId = parseInt(locParam, 10);
          if (!isNaN(locId)) {
            setTimeout(() => {
              zoomToLocation(locId);
              showToast('გადახვედით არჩეულ ლოკაციაზე');
            }, 500);
          }
        }
      } catch (e) {}
    }

    // Dynamic layer settings synchronization
    function applyLayerSettings() {
      if (!map || !boundaryLayer || !radiusLayer) return;

      const showBoundary = localStorage.getItem('gardabani_setting_boundary') !== 'false';
      const showRadius = localStorage.getItem('gardabani_setting_radius') === 'true';

      if (showBoundary) {
        if (!map.hasLayer(boundaryLayer)) boundaryLayer.addTo(map);
      } else {
        if (map.hasLayer(boundaryLayer)) map.removeLayer(boundaryLayer);
      }

      if (showRadius) {
        if (!map.hasLayer(radiusLayer)) radiusLayer.addTo(map);
      } else {
        if (map.hasLayer(radiusLayer)) map.removeLayer(radiusLayer);
      }
    }

    function updateLayerPillsUI(layerName) {
      document.querySelectorAll('#layer-selector .layer-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-layer') === layerName);
      });
    }

    function switchBaseLayer(layerType) {
      if (!baseLayers[layerType] || layerType === currentBaseLayerName) return;
      map.removeLayer(baseLayers[currentBaseLayerName]);
      baseLayers[layerType].addTo(map);
      currentBaseLayerName = layerType;
      updateLayerPillsUI(layerType);
      updateMapThemeTiles();
    }

    function updateMapThemeTiles() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const mapEl = document.getElementById('map');
      if (!mapEl) return;
      if (isDark && (currentBaseLayerName === 'roadmap' || currentBaseLayerName === 'terrain')) {
        mapEl.classList.add('dark-tiles');
      } else {
        mapEl.classList.remove('dark-tiles');
      }
    }

    // ==========================================================================
    // RENDER MARKERS & OVERLAYS
    // ==========================================================================
    function renderMapOverlays() {
      if (!map) return;

      markersLayer.clearLayers();
      radiusLayer.clearLayers();

      const hub = locations.find(l => l.type === 'hub') || locations[0];

      locations.forEach((loc, index) => {
        const isHub = loc.type === 'hub';
        const numLabel = isHub ? '★' : (index);

        // Custom HTML Marker Icon
        const iconHtml = \`
          <div class="custom-marker-pin \${isHub ? 'hub' : 'village'}">
            <span>\${numLabel}</span>
          </div>
        \`;

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: iconHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon });

        // Calculate distance from hub
        let distanceText = '';
        if (!isHub && hub) {
          const dist = calcDistanceKm(hub.latitude, hub.longitude, loc.latitude, loc.longitude);
          distanceText = \`<span class="popup-distance">📏 \${dist} კმ ჰაბიდან</span>\`;
        } else if (isHub) {
          distanceText = \`<span class="popup-distance" style="color:#dc2626;">★ საკოორდინაციო ცენტრი</span>\`;
        }

        // Popup Content
        const isAdmin = isAdminMode();
        const popupContent = \`
          <div class="popup-card">
            <div class="popup-header">
              <div>
                <h3 class="popup-title">\${loc.name}</h3>
                \${distanceText}
              </div>
              <span class="type-badge \${isHub ? 'hub' : 'village'}">\${isHub ? 'ჰაბი' : 'სოფელი'}</span>
            </div>
            
            <div class="popup-date-row">
              <span>📅</span> <span>\${formatGeorgianDate(loc.date)}</span>
            </div>

            <div>
              <div class="popup-act-title">🎯 \${loc.activityTitle}</div>
              <div class="popup-act-desc">\${loc.activityDescription}</div>
            </div>
            <div class="popup-footer">
              <span style="font-size:0.70rem; color:var(--text-subtle);">📍 \${loc.latitude.toFixed(4)}, \${loc.longitude.toFixed(4)}</span>
              <div style="display:flex; gap:4px; align-items:center;">
                <a href="https://www.google.com/maps/dir/?api=1&destination=\${loc.latitude},\${loc.longitude}" target="_blank" rel="noopener noreferrer" class="btn btn-gardabani" style="padding:2px 8px; font-size:0.70rem; text-decoration:none;" title="მარშრუტი Google Maps-ში" onclick="if(typeof window.gmaTrackEvent==='function') window.gmaTrackEvent('nav_click', { village_name: '\${loc.name.replace(/'/g, \"\\\\'\")}' });">🚗 როგორ მივიდე</a>
                <a href="calendar.html" class="btn btn-outline" style="padding:2px 8px; font-size:0.70rem; text-decoration:none;">📅 კალენდარი</a>
                \${isAdmin ? \`<button class="btn btn-outline" style="padding:2px 8px; font-size:0.70rem;" onclick="openEditLocation(\${loc.id})">✏️</button>\` : ''}
              </div>
            </div>
          </div>
        \`;

        marker.bindPopup(popupContent, {
          closeButton: true,
          autoPan: true,
          autoPanPadding: [50, 50]
        });

        marker.on('click', () => {
          highlightLocationInList(loc.id);
          if (typeof window.gmaTrackEvent === 'function') {
            window.gmaTrackEvent('village_view', { village_name: loc.name });
          }
        });

        markersLayer.addLayer(marker);

        // 5km Service Radius Circle
        const circle = L.circle([loc.latitude, loc.longitude], {
          radius: 5000,
          color: isHub ? '#ef4444' : '#3b82f6',
          weight: 1.2,
          opacity: 0.7,
          fillColor: isHub ? '#ef4444' : '#3b82f6',
          fillOpacity: 0.06,
          dashArray: '4, 6'
        });

        circle.bindTooltip(\`<b>\${loc.shortName || loc.name}</b><br>5კმ მომსახურების არეალი\`, {
          sticky: true,
          className: 'radius-tooltip'
        });

        radiusLayer.addLayer(circle);
      });
    }

    function fitGardabaniBoundary() {
      if (boundaryLayer && map) {
        map.fitBounds(boundaryLayer.getBounds(), {
          padding: [25, 25],
          animate: true,
          duration: 0.6
        });
      }
    }

    function zoomToLocation(id) {
      const loc = locations.find(l => l.id === id);
      if (!loc || !map) return;

      if (typeof window.gmaTrackEvent === 'function') {
        window.gmaTrackEvent('village_view', { village_name: loc.name });
      }
      
      map.flyTo([loc.latitude, loc.longitude], 13.5, {
        duration: 0.7
      });

      markersLayer.eachLayer(layer => {
        const latlng = layer.getLatLng();
        if (Math.abs(latlng.lat - loc.latitude) < 0.0001 && Math.abs(latlng.lng - loc.longitude) < 0.0001) {
          layer.openPopup();
        }
      });

      // Auto-close drawer tab when a location is clicked so the map is fully visible
      closeDrawer();
    }

    // ==========================================================================
    // DRAWER TOGGLE & BEHAVIOR (STRICTLY MAP-HEIGHT BOUNDED)
    // ==========================================================================
    function openDrawer() {
      const drawer = document.getElementById('sidebar-drawer');
      const backdrop = document.getElementById('drawer-backdrop');
      if (drawer && backdrop) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        isDrawerOpen = true;
      }
    }

    function closeDrawer() {
      const drawer = document.getElementById('sidebar-drawer');
      const backdrop = document.getElementById('drawer-backdrop');
      if (drawer && backdrop) {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
        isDrawerOpen = false;
      }
    }

    function toggleDrawer() {
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    // ==========================================================================
    // SIDEBAR DRAWER LOCATIONS LIST
    // ==========================================================================
    function renderSidebar() {
      const listEl = document.getElementById('locations-list');
      const searchInput = document.getElementById('search-input');
      const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      const isAdmin = isAdminMode();

      const totalCount = locations.length;
      
      const badge = document.getElementById('list-count-badge');
      if (badge) {
        badge.textContent = totalCount + ' აქტივობა';
      }

      const drawerBadge = document.getElementById('drawer-badge');
      if (drawerBadge) {
        drawerBadge.textContent = totalCount + ' აქტივობა';
      }

      // Filter list
      const filtered = locations.filter(l => {
        if (!query) return true;
        return l.name.toLowerCase().includes(query) ||
               (l.date && l.date.includes(query)) ||
               l.activityTitle.toLowerCase().includes(query) ||
               l.activityDescription.toLowerCase().includes(query);
      });

      listEl.innerHTML = '';

      if (filtered.length === 0) {
        listEl.innerHTML = \`
          <li style="padding:16px; text-align:center; color:var(--text-subtle); font-size:0.80rem;">
            შესატყვისი ლოკაცია ვერ მოიძებნა
          </li>
        \`;
        return;
      }

      filtered.forEach((loc) => {
        const isHub = loc.type === 'hub';
        const li = document.createElement('li');
        li.className = \`loc-card-item \${isHub ? 'hub-item' : 'village-item'} \${activeLocationId === loc.id ? 'active' : ''}\`;
        li.id = 'loc-card-' + loc.id;

        li.innerHTML = \`
          <div class="loc-item-top">
            <span class="loc-item-name">
              <span>\${isHub ? '★' : '📍'}</span>
              <span>\${loc.name}</span>
            </span>
            <span class="type-badge \${isHub ? 'hub' : 'village'}">\${isHub ? 'ჰაბი' : 'სოფელი'}</span>
          </div>
          <div class="loc-item-act">\${loc.activityTitle}</div>
          <div class="loc-item-date">
            <span>📅</span> \${formatGeorgianDate(loc.date)}
          </div>
          <div class="loc-item-footer">
            <span class="loc-item-coords">\${loc.latitude.toFixed(4)}, \${loc.longitude.toFixed(4)}</span>
            <div class="loc-item-actions">
              <a href="https://www.google.com/maps/dir/?api=1&destination=\${loc.latitude},\${loc.longitude}" target="_blank" rel="noopener noreferrer" class="loc-action-btn" title="როგორ მივიდე (Google Maps)" onclick="event.stopPropagation(); if(typeof window.gmaTrackEvent==='function') window.gmaTrackEvent('nav_click', { village_name: '\${loc.name.replace(/'/g, \"\\\\'\")}' });" style="text-decoration:none;">🚗 მიმართულება</a>
              <button class="loc-action-btn" title="რუკაზე ჩვენება" onclick="event.stopPropagation(); zoomToLocation(\${loc.id})">🔍 ჩვენება</button>
              \${isAdmin ? \`<button class="loc-action-btn" title="რედაქტირება" onclick="event.stopPropagation(); openEditLocation(\${loc.id})">✏️</button>\` : ''}
            </div>
          </div>
        \`;

        li.onclick = () => zoomToLocation(loc.id);
        listEl.appendChild(li);
      });
    }

    function highlightLocationInList(id) {
      activeLocationId = id;
      document.querySelectorAll('.loc-card-item').forEach(el => el.classList.remove('active'));
      const activeCard = document.getElementById('loc-card-' + id);
      if (activeCard) {
        activeCard.classList.add('active');
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // ==========================================================================
    // DAY & NIGHT MODE CONTROLS
    // ==========================================================================
    function setupThemeToggle() {
      const themeBtn = document.getElementById('theme-toggle');
      const themeIcon = document.getElementById('theme-icon');
      const themeText = document.getElementById('theme-text');

      function syncUI(theme) {
        if (theme === 'dark') {
          themeIcon.textContent = '☀️';
          themeText.textContent = 'დღე';
          themeBtn.title = 'დღის რეჟიმზე გადართვა';
        } else {
          themeIcon.textContent = '🌙';
          themeText.textContent = 'ღამე';
          themeBtn.title = 'ღამის რეჟიმზე გადართვა';
        }
      }

      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      syncUI(currentTheme);

      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        syncUI(newTheme);
        updateMapThemeTiles();

        showToast(newTheme === 'dark' ? 'ღამის რეჟიმი გააქტიურდა 🌙' : 'დღის რეჟიმი გააქტიურდა ☀️');
      });
    }

    // ==========================================================================
    // CONTROLS & EVENT LISTENERS
    // ==========================================================================
    function setupControls() {
      // Layer switcher buttons
      document.querySelectorAll('#layer-selector .layer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const layerType = this.getAttribute('data-layer');
          switchBaseLayer(layerType);
          showToast('რუკის რეჟიმი: ' + this.textContent.trim());
        });
      });

      // Drawer Open / Close / Backdrop
      const drawerTrigger = document.getElementById('drawer-trigger-btn');
      const drawerClose = document.getElementById('drawer-close-btn');
      const drawerBackdrop = document.getElementById('drawer-backdrop');

      if (drawerTrigger) drawerTrigger.addEventListener('click', toggleDrawer);
      if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
      if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

      // Close drawer on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDrawer();
          closeModal();
        }
      });

      // Fit boundary button in header & floating panel
      document.getElementById('btn-fit-boundary').addEventListener('click', fitGardabaniBoundary);
      document.getElementById('btn-recenter').addEventListener('click', fitGardabaniBoundary);

      // Fullscreen Toggle
      document.getElementById('btn-fullscreen').addEventListener('click', function() {
        isFullscreen = !isFullscreen;
        document.body.classList.toggle('fullscreen-mode', isFullscreen);
        document.getElementById('fs-icon').textContent = isFullscreen ? '🗗' : '⛶';
        setTimeout(() => {
          if (map) map.invalidateSize();
        }, 200);
      });

      // Search input live filtering & Enter key to select first result
      const searchInp = document.getElementById('search-input');
      searchInp.addEventListener('input', renderSidebar);
      searchInp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const firstCard = document.querySelector('.loc-card-item');
          if (firstCard) firstCard.click();
        }
      });

      // Admin Modal & Action buttons
      const btnAddLoc = document.getElementById('btn-add-location');
      const btnOpenEd = document.getElementById('btn-open-editor');
      if (btnAddLoc) btnAddLoc.addEventListener('click', openAddLocationModal);
      if (btnOpenEd) btnOpenEd.addEventListener('click', openBatchEditorModal);
      document.getElementById('modal-close').addEventListener('click', closeModal);

      document.getElementById('btn-save-config').addEventListener('click', saveModalData);
      document.getElementById('btn-reset-config').addEventListener('click', resetToDefault);
      document.getElementById('btn-copy-config').addEventListener('click', copyConfigJson);

      // Header Admin Logout
      const btnHeaderLogout = document.getElementById('btn-header-logout');
      if (btnHeaderLogout) {
        btnHeaderLogout.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          adminLogout('manual');
        });
      }

      // Cross-tab / Window Focus Live Sync (instantly updates layers, locations, & admin mode)
      window.addEventListener('focus', () => {
        locations = loadSavedLocations();
        renderMapOverlays();
        applyLayerSettings();
        syncAdminUI();
        renderSidebar();
      });

      window.addEventListener('storage', (e) => {
        if (e.key === 'gardabani_locations') {
          locations = loadSavedLocations();
          renderMapOverlays();
          renderSidebar();
        }
        if (e.key === 'gardabani_setting_boundary' || e.key === 'gardabani_setting_radius') {
          applyLayerSettings();
        }
        if (e.key === 'gardabani_admin_session') {
          syncAdminUI();
          renderSidebar();
        }
        if (e.key === 'theme') {
          const t = e.newValue || 'light';
          document.documentElement.setAttribute('data-theme', t);
          setupThemeToggle();
          updateMapThemeTiles();
        }
      });
    }

    // ==========================================================================
    // MODAL DIALOGS (ADMIN ACCESS WITH DATE FIELD)
    // ==========================================================================
    let currentModalMode = 'add';
    let currentEditLocationId = null;

    function openModal() {
      document.getElementById('edit-modal').classList.add('open');
    }

    function closeModal() {
      document.getElementById('edit-modal').classList.remove('open');
      currentEditLocationId = null;
    }

    function openAddLocationModal() {
      currentModalMode = 'add';
      const container = document.getElementById('modal-form-container');
      container.innerHTML = \`
        <div class="form-group">
          <label class="form-label">ლოკაციის სახელი (მაგ. სოფ. თელეთი)</label>
          <input type="text" class="form-input" id="form-name" placeholder="სოფლის ან ლოკაციის სახელი">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">ტიპი</label>
            <select class="form-input" id="form-type">
              <option value="village">სოფელი</option>
              <option value="hub">მთავარი ჰაბი</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">მოკლე სახელი</label>
            <input type="text" class="form-input" id="form-short" placeholder="მოკლე სახელი">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">📅 ჩატარების თარიღი</label>
          <input type="date" class="form-input" id="form-date" value="2026-10-15">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">განედი (Latitude)</label>
            <input type="number" step="0.0001" class="form-input" id="form-lat" value="41.5000">
          </div>
          <div class="form-group">
            <label class="form-label">გრძედი (Longitude)</label>
            <input type="number" step="0.0001" class="form-input" id="form-lng" value="45.0500">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">აქტივობის სათაური</label>
          <input type="text" class="form-input" id="form-act-title" placeholder="მაგ. მობილური ვორქშოფი: ეკოლოგია">
        </div>
        <div class="form-group">
          <label class="form-label">აქტივობის აღწერა</label>
          <textarea class="form-textarea" rows="3" id="form-act-desc" placeholder="აქტივობის დეტალური აღწერა..."></textarea>
        </div>
      \`;
      openModal();
    }

    function openEditLocation(id) {
      const loc = locations.find(l => l.id === id);
      if (!loc) return;
      currentModalMode = 'edit';
      currentEditLocationId = id;
      const container = document.getElementById('modal-form-container');
      container.innerHTML = \`
        <div class="form-group">
          <label class="form-label">ლოკაციის სახელი</label>
          <input type="text" class="form-input" id="form-name" value="\${loc.name}">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">ტიპი</label>
            <select class="form-input" id="form-type">
              <option value="village" \${loc.type === 'village' ? 'selected' : ''}>სოფელი</option>
              <option value="hub" \${loc.type === 'hub' ? 'selected' : ''}>მთავარი ჰაბი</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">მოკლე სახელი</label>
            <input type="text" class="form-input" id="form-short" value="\${loc.shortName || ''}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">📅 ჩატარების თარიღი</label>
          <input type="date" class="form-input" id="form-date" value="\${loc.date || '2026-10-15'}">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">განედი (Latitude)</label>
            <input type="number" step="0.0001" class="form-input" id="form-lat" value="\${loc.latitude}">
          </div>
          <div class="form-group">
            <label class="form-label">გრძედი (Longitude)</label>
            <input type="number" step="0.0001" class="form-input" id="form-lng" value="\${loc.longitude}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">აქტივობის სათაური</label>
          <input type="text" class="form-input" id="form-act-title" value="\${loc.activityTitle}">
        </div>
        <div class="form-group">
          <label class="form-label">აქტივობის აღწერა</label>
          <textarea class="form-textarea" rows="3" id="form-act-desc">\${loc.activityDescription}</textarea>
        </div>
        <div style="margin-top:6px;">
          <button class="btn btn-outline" style="color:#ef4444; border-color:#fca5a5;" onclick="deleteLocation(\${loc.id})">🗑️ ამ ლოკაციის წაშლა</button>
        </div>
      \`;
      openModal();
    }

    function openBatchEditorModal() {
      currentModalMode = 'json';
      const container = document.getElementById('modal-form-container');
      container.innerHTML = \`
        <div class="form-group">
          <label class="form-label">ლოკაციების სრული JSON კონფიგურაცია</label>
          <textarea class="form-textarea" id="form-json" rows="14" style="font-family:monospace; font-size:0.75rem;">\${JSON.stringify(locations, null, 2)}</textarea>
        </div>
      \`;
      openModal();
    }

    function deleteLocation(id) {
      if (confirm('ნამდვილად გსურთ ამ ლოკაციის წაშლა?')) {
        locations = locations.filter(l => l.id !== id);
        saveLocationsToStorage();
        renderMapOverlays();
        renderSidebar();
        closeModal();
        showToast('ლოკაცია წარმატებით წაიშალა');
      }
    }

    function saveModalData() {
      if (currentModalMode === 'json') {
        try {
          const val = document.getElementById('form-json').value;
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) {
            locations = parsed;
            saveLocationsToStorage();
            renderMapOverlays();
            renderSidebar();
            closeModal();
            showToast('მონაცემები განახლდა');
          }
        } catch (e) {
          alert('შეცდომა JSON ფორმატში: ' + e.message);
        }
        return;
      }

      const name = document.getElementById('form-name').value.trim();
      const type = document.getElementById('form-type').value;
      const shortName = document.getElementById('form-short').value.trim() || name;
      const date = document.getElementById('form-date').value || '2026-10-15';
      const lat = parseFloat(document.getElementById('form-lat').value);
      const lng = parseFloat(document.getElementById('form-lng').value);
      const actTitle = document.getElementById('form-act-title').value.trim();
      const actDesc = document.getElementById('form-act-desc').value.trim();

      if (!name || isNaN(lat) || isNaN(lng) || !actTitle) {
        alert('გთხოვთ შეავსოთ ყველა აუცილებელი ველი!');
        return;
      }

      if (currentModalMode === 'add') {
        const newId = locations.length > 0 ? Math.max(...locations.map(l => l.id)) + 1 : 1;
        const newLoc = {
          id: newId,
          name: name,
          shortName: shortName,
          type: type,
          date: date,
          latitude: lat,
          longitude: lng,
          activityTitle: actTitle,
          activityDescription: actDesc
        };
        locations.push(newLoc);
        saveLocationsToStorage();
        syncLocationToSupabase(newLoc);
        showToast('ახალი ლოკაცია დაემატა');
      } else if (currentModalMode === 'edit') {
        const idx = locations.findIndex(l => l.id === currentEditLocationId);
        if (idx !== -1) {
          const updatedLoc = {
            id: currentEditLocationId,
            name: name,
            shortName: shortName,
            type: type,
            date: date,
            latitude: lat,
            longitude: lng,
            activityTitle: actTitle,
            activityDescription: actDesc
          };
          locations[idx] = updatedLoc;
          saveLocationsToStorage();
          syncLocationToSupabase(updatedLoc);
          showToast('ლოკაციის მონაცემები შეიცვალა');
        }
      }

      renderMapOverlays();
      renderSidebar();
      closeModal();
    }

    function resetToDefault() {
      if (confirm('ნამდვილად გსურთ საწყის 7 ლოკაციაზე დაბრუნება?')) {
        locations = JSON.parse(JSON.stringify(INITIAL_LOCATIONS));
        saveLocationsToStorage();
        renderMapOverlays();
        renderSidebar();
        closeModal();
        showToast('მონაცემები დაბრუნდა საწყისზე');
      }
    }

    function copyConfigJson() {
      navigator.clipboard.writeText(JSON.stringify(locations, null, 2)).then(() => {
        showToast('JSON მონაცემები დაკოპირდა ბუფერში');
      }).catch(() => {
        showToast('კოპირება ვერ მოხერხდა');
      });
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    // ==========================================================================
    // INITIALIZATION ON DOM READY
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
      initMap();
      renderSidebar();
      setupControls();
      setupThemeToggle();
      syncAdminUI();
      syncLocationsFromSupabase();
    });
  </script>
${COOKIE_CONSENT_FULL_BLOCK}
${SITE_ANALYTICS_TRACKER_HTML}
</body>
</html>`;

// ============================================================================
// 3. Define calendar.html (Interactive Sleek Calendar with Event Popups & Jump to Map)
// ============================================================================
const calendarHtmlContent = `<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>გარდაბნის მობილური აკადემია — კალენდარი</title>
  
  <!-- Immediate Theme Initializer to prevent white flash (Default White / Clean Light Mode) -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>

  <style>
    /* ==========================================================================
       DESIGN SYSTEM: CALENDAR PAGE (PURE BLACK DARK THEME)
       ========================================================================== */
    :root {
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --primary-hub: #dc2626;
      --primary-village: #2563eb;
      
      /* Light Mode (default) */
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-subtle: #f8fafc;
      --bg-hover: #f1f5f9;
      --bg-nav: #f1f5f9;
      --bg-input: #f8fafc;
      
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-subtle: #64748b;
      
      --border-light: #e2e8f0;
      --border-focus: #94a3b8;
      
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08);
      
      --font-stack: "BPG Nino Mtavruli", "Noto Sans Georgian", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    }

    /* True Pure Black Dark Theme (No Blue Tint) */
    [data-theme="dark"] {
      --bg-page: #000000;         /* True Pure Black */
      --bg-card: #0a0a0a;         /* Deep neutral black card */
      --bg-card-subtle: #141414;  /* Slightly lighter card element */
      --bg-hover: #1c1c1c;        /* Neutral dark hover */
      --bg-nav: #0e0e0e;          /* Navigation pill background */
      --bg-input: #121212;        /* Dark input field */
      
      --text-main: #f5f5f5;       /* Crisp clean white text */
      --text-muted: #a3a3a3;      /* Neutral gray text */
      --text-subtle: #737373;     /* Muted neutral gray */
      
      --border-light: #262626;    /* Dark neutral border, no blue tint */
      --border-focus: #3b82f6;
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.8);
      --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.9);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.95);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-stack);
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    .app-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 12px 20px 40px;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Header */
    header.header {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 12px 20px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .header-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.2;
    }

    /* Navigation Tabs */
    .nav-tabs {
      display: inline-flex;
      background: var(--bg-nav);
      padding: 3px;
      border-radius: var(--radius-full);
      gap: 3px;
      border: 1px solid var(--border-light);
    }

    .nav-tab {
      padding: 5px 14px;
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      font-weight: 700;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-tab:hover {
      color: var(--text-main);
    }

    .nav-tab.active {
      background: var(--bg-card);
      color: #2563eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    [data-theme="dark"] .nav-tab.active {
      color: #60a5fa;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theme-toggle-btn {
      background: var(--bg-nav);
      border: 1px solid var(--border-light);
      color: var(--text-main);
      padding: 6px 12px;
      border-radius: var(--radius-full);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .theme-toggle-btn:hover {
      background: var(--bg-hover);
      border-color: var(--border-focus);
    }

    .btn-return-map {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1e40af;
      padding: 6px 12px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-return-map:hover {
      background: #dbeafe;
    }

    [data-theme="dark"] .btn-return-map {
      background: #172554;
      border-color: #1e40af;
      color: #93c5fd;
    }

    /* Hero section */
    .calendar-hero {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 22px 26px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-size: 0.74rem;
      font-weight: 700;
      width: fit-content;
    }

    [data-theme="dark"] .hero-badge {
      background: #141414;
      color: #ffffff;
      border-color: #333333;
    }

    .hero-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .hero-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      max-width: 860px;
      line-height: 1.55;
    }

    /* ==========================================================================
       MAIN CALENDAR 2-COLUMN LAYOUT
       ========================================================================== */
    .calendar-layout {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 16px;
      align-items: start;
    }

    @media (max-width: 960px) {
      .calendar-layout {
        grid-template-columns: 1fr;
      }
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 20px 22px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    /* Month Navigation Bar */
    .month-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-light);
    }

    .month-heading {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .month-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .month-btn {
      background: var(--bg-nav);
      border: 1px solid var(--border-light);
      color: var(--text-main);
      padding: 5px 11px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .month-btn:hover {
      background: var(--bg-hover);
      border-color: var(--border-focus);
    }

    /* Weekday Headers */
    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      text-align: center;
    }

    .weekday-label {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--text-subtle);
      padding: 6px 2px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .weekday-label.weekend {
      color: #ef4444;
    }

    /* Calendar Days Grid */
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
    }

    .calendar-day-cell {
      aspect-ratio: 1 / 1;
      min-height: 52px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      background: var(--bg-card);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 5px 4px;
      cursor: pointer;
      position: relative;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .calendar-day-cell:hover {
      background: var(--bg-hover);
      border-color: #3b82f6;
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    .calendar-day-cell.other-month {
      opacity: 0.35;
      background: transparent;
    }

    .calendar-day-cell.selected {
      border-color: #2563eb !important;
      background: #eff6ff !important;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
    }

    [data-theme="dark"] .calendar-day-cell.selected {
      border-color: #3b82f6 !important;
      background: #172554 !important;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
    }

    .calendar-day-cell.today .day-number {
      background: #2563eb;
      color: #ffffff;
      border-radius: var(--radius-full);
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }

    /* Day with Event Highlight */
    .calendar-day-cell.has-event {
      border-color: #93c5fd;
      background: rgba(37, 99, 235, 0.04);
      font-weight: 800;
    }

    [data-theme="dark"] .calendar-day-cell.has-event {
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.08);
    }

    .calendar-day-cell.has-hub {
      border-color: #fca5a5;
      background: rgba(220, 38, 38, 0.05);
    }

    [data-theme="dark"] .calendar-day-cell.has-hub {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.09);
    }

    .day-number {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.2;
    }

    .event-dots-wrap {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-top: 4px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .event-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .event-dot.hub {
      background: #dc2626;
      box-shadow: 0 0 5px rgba(220, 38, 38, 0.6);
    }

    .event-dot.village {
      background: #2563eb;
      box-shadow: 0 0 5px rgba(37, 99, 235, 0.6);
    }

    /* Selected Day Details Card (Right Column) */
    .details-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 10px;
    }

    .details-date-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .events-count-badge {
      font-size: 0.72rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }

    [data-theme="dark"] .events-count-badge {
      background: #172554;
      color: #93c5fd;
      border-color: #1e40af;
    }

    .day-events-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 160px;
    }

    .event-detail-item {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: all 0.15s ease;
    }

    .event-detail-item.hub {
      border-left: 4px solid var(--primary-hub);
    }

    .event-detail-item.village {
      border-left: 4px solid var(--primary-village);
    }

    .event-top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }

    .event-location-name {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .event-type-badge {
      font-size: 0.68rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: var(--radius-full);
      white-space: nowrap;
    }

    .event-type-badge.hub {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    [data-theme="dark"] .event-type-badge.hub {
      background: #350808;
      color: #fca5a5;
      border-color: #7f1d1d;
    }

    .event-type-badge.village {
      background: #dbeafe;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }

    [data-theme="dark"] .event-type-badge.village {
      background: #172554;
      color: #93c5fd;
      border-color: #1e40af;
    }

    .event-activity-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .event-activity-desc {
      font-size: 0.80rem;
      color: var(--text-muted);
      line-height: 1.45;
    }

    .event-bottom-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px dashed var(--border-light);
    }

    .btn-goto-map {
      background: #2563eb;
      color: #ffffff;
      padding: 6px 14px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 800;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-goto-map:hover {
      background: #1d4ed8;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
      transform: translateY(-1px);
    }

    .empty-events-state {
      padding: 30px 16px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: var(--text-subtle);
    }

    .empty-icon {
      font-size: 2rem;
      opacity: 0.7;
    }

    .empty-text {
      font-size: 0.84rem;
      max-width: 280px;
      line-height: 1.4;
    }

    /* All Activities Timeline Table */
    .timeline-card {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 22px 24px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .timeline-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .timeline-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 12px;
    }

    .timeline-item-card {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: all 0.15s ease;
    }

    .timeline-item-card:hover {
      border-color: #3b82f6;
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    .timeline-date-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #eff6ff;
      color: #1e40af;
      padding: 3px 9px;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 800;
      width: fit-content;
      border: 1px solid #bfdbfe;
    }

    [data-theme="dark"] .timeline-date-chip {
      background: #172554;
      color: #93c5fd;
      border-color: #1e40af;
    }

    /* ==========================================================================
       MOBILE RESPONSIVE ADAPTATIONS (768px & 480px)
       ========================================================================== */
    @media (max-width: 768px) {
      .app-container {
        padding: 8px 10px 16px;
        gap: 10px;
      }

      /* Header Layout on Mobile: Clean 2-Row Native App Header */
      header.header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        gap: 8px;
        border-radius: var(--radius-md);
      }

      .header-content {
        display: contents;
      }

      .header-title {
        order: 1;
        font-size: 1.05rem;
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-logo {
        font-size: 1.25rem;
      }

      .header-actions {
        order: 2;
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 0 0 auto;
      }

      .nav-tabs {
        order: 3;
        width: 100%;
        display: flex;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: 3px;
        border-radius: var(--radius-full);
        gap: 4px;
        background: var(--bg-nav);
      }

      .nav-tabs::-webkit-scrollbar {
        display: none;
      }

      .nav-tab {
        flex: 1 0 auto;
        justify-content: center;
        text-align: center;
        padding: 7px 10px;
        font-size: 0.74rem;
        white-space: nowrap;
      }

      .theme-toggle-btn {
        padding: 5px 10px;
        font-size: 0.74rem;
      }

      .btn-return-map {
        display: none;
      }

      /* Calendar Hero */
      .calendar-hero {
        padding: 14px 16px;
        gap: 6px;
      }

      .hero-title {
        font-size: 1.15rem;
      }

      .hero-desc {
        font-size: 0.80rem;
      }

      /* Main Calendar Layout */
      .calendar-layout {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .card {
        padding: 12px 10px;
        border-radius: var(--radius-md);
      }

      /* Month Nav */
      .month-nav-bar {
        flex-wrap: wrap;
        gap: 8px;
        padding-bottom: 8px;
      }

      .month-heading {
        font-size: 0.95rem;
      }

      .month-btn {
        padding: 4px 8px;
        font-size: 0.74rem;
      }

      .calendar-weekdays {
        gap: 3px;
      }

      .weekday-label {
        font-size: 0.65rem;
        padding: 4px 1px;
      }

      .calendar-grid {
        gap: 3px;
      }

      .calendar-day-cell {
        min-height: 42px;
        padding: 3px 2px;
        border-radius: 6px;
      }

      .day-number {
        font-size: 0.74rem;
      }

      .calendar-day-cell.today .day-number {
        width: 20px;
        height: 20px;
        font-size: 0.68rem;
      }

      .event-dot {
        width: 5px;
        height: 5px;
      }

      .details-header {
        padding-bottom: 8px;
      }

      .details-date-title {
        font-size: 0.95rem;
      }

      .event-card {
        padding: 10px 12px;
      }

      /* Timeline Card */
      .timeline-card {
        padding: 14px 16px;
        border-radius: var(--radius-md);
      }

      .timeline-title {
        font-size: 1rem;
      }

      .timeline-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .timeline-item-card {
        padding: 12px 14px;
      }
    }

    @media (max-width: 480px) {
      .app-container {
        padding: 6px 8px 14px;
      }

      header.header {
        padding: 8px 10px;
      }

      .header-title {
        font-size: 0.92rem;
      }

      .nav-tab {
        padding: 6px 7px;
        font-size: 0.69rem;
      }

      .theme-toggle-btn {
        padding: 4px 8px;
        font-size: 0.70rem;
      }

      .calendar-day-cell {
        min-height: 38px;
      }

      .day-number {
        font-size: 0.70rem;
      }
    }
${STEALTH_ADMIN_CSS}
${COOKIE_CONSENT_CSS}
  </style>
</head>
<body>

  <div class="app-container">
    
    <!-- HEADER -->
    <header class="header">
      <div class="header-content">
        <h1 class="header-title" id="header-brand-title" style="cursor:pointer;" title="გარდაბნის მობილური აკადემია">
          <span class="header-logo" id="header-logo">🚐</span>
          <span>გარდაბნის მობილური აკადემია</span>
        </h1>
        <nav class="nav-tabs">
          <a href="index.html" class="nav-tab">მთავარი გვერდი</a>
          <a href="calendar.html" class="nav-tab active">კალენდარი</a>
          <a href="mentors.html" class="nav-tab">მენტორები</a>
          <a href="settings.html" class="nav-tab">პარამეტრები</a>
        </nav>
      </div>

      <div class="header-actions">
        <button class="theme-toggle-btn" id="theme-toggle" title="დღის და ღამის რეჟიმი">
          <span id="theme-icon">🌙</span> <span id="theme-text">ღამე</span>
        </button>
        <a href="index.html" class="btn-return-map">
          ← მთავარ გვერდზე დაბრუნება
        </a>
      </div>
    </header>

    <!-- CALENDAR 2-COLUMN VIEW -->
    <main class="calendar-layout">

      <!-- LEFT COLUMN: INTERACTIVE MONTH CALENDAR -->
      <section class="card calendar-card">
        
        <!-- Month Navigator -->
        <div class="month-nav-bar">
          <div class="month-heading">
            <span>📅</span>
            <span id="month-display-title">ოქტომბერი 2026</span>
          </div>
          <div class="month-controls">
            <button class="month-btn" id="btn-prev-month" title="წინა თვე">‹</button>
            <button class="month-btn" id="btn-today-month">დღეს</button>
            <button class="month-btn" id="btn-next-month" title="შემდეგი თვე">›</button>
          </div>
        </div>

        <!-- Weekday Headers -->
        <div class="calendar-weekdays">
          <div class="weekday-label">ორშ</div>
          <div class="weekday-label">სამ</div>
          <div class="weekday-label">ოთხ</div>
          <div class="weekday-label">ხუთ</div>
          <div class="weekday-label">პარ</div>
          <div class="weekday-label weekend">შაბ</div>
          <div class="weekday-label weekend">კვი</div>
        </div>

        <!-- Days Grid -->
        <div class="calendar-grid" id="calendar-days-grid">
          <!-- Dynamically populated -->
        </div>

      </section>

      <!-- RIGHT COLUMN: SELECTED DAY ACTIVITIES -->
      <section class="card day-events-card">
        <div class="details-header">
          <h3 class="details-date-title" id="selected-date-title">
            <span>📅</span> <span id="selected-date-text">3 ოქტომბერი, 2026</span>
          </h3>
          <span class="events-count-badge" id="selected-events-count">1 აქტივობა</span>
        </div>

        <!-- Activities on Selected Day -->
        <div class="day-events-list" id="day-events-container">
          <!-- Dynamically populated -->
        </div>
      </section>

    </main>

    <!-- ALL UPCOMING ACTIVITIES TIMELINE -->
    <section class="timeline-card">
      <h3 class="timeline-title">
        <span>📋</span> ყველა დაგეგმილი აქტივობა
      </h3>
      <div class="timeline-grid" id="timeline-container">
        <!-- Dynamically populated -->
      </div>
    </section>

  </div>

${STEALTH_ADMIN_HTML}

  <!-- Supabase JS Client & Project Configuration -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="supabase_config.js"></script>

  <script>
${STEALTH_ADMIN_JS}
    // ==========================================================================
    // GEORGIAN CALENDAR LOCALIZATION & INITIAL LOCATIONS
    // ==========================================================================
    const GEORGIAN_MONTHS = [
      'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
      'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];

    const INITIAL_LOCATIONS = ${INITIAL_LOCATIONS_JS};

    function loadLocations() {
      try {
        const saved = localStorage.getItem('gardabani_locations');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      return JSON.parse(JSON.stringify(INITIAL_LOCATIONS));
    }

    let locations = loadLocations();

    // Asynchronous Cloud Sync with Supabase for Calendar
    async function syncLocationsFromSupabase() {
      const client = initSupabase();
      if (!client) return;
      try {
        const { data, error } = await client
          .from('locations')
          .select('*')
          .order('id', { ascending: true });
        if (!error && Array.isArray(data) && data.length > 0) {
          locations = data.map(r => ({
            id: Number(r.id),
            name: r.name,
            shortName: r.short_name,
            type: r.type,
            date: r.date,
            latitude: Number(r.latitude),
            longitude: Number(r.longitude),
            activityTitle: r.activity_title,
            activityDescription: r.activity_description
          }));
          try {
            localStorage.setItem('gardabani_locations', JSON.stringify(locations));
          } catch (e) {}
          renderCalendar();
          console.log('✅ Supabase: კალენდარი სინქრონიზებულია (' + locations.length + ' ლოკაცია)');
        }
      } catch (err) {
        console.warn('Supabase fetch notice in calendar:', err);
      }
    }

    // Default viewing month: October 2026 (or current)
    let viewYear = 2026;
    let viewMonth = 9; // 0-indexed: 9 = October
    let selectedDateStr = "2026-10-03"; // Default selection on Hub event

    function formatGeorgianDate(dateStr) {
      if (!dateStr) return 'თარიღი უცნობია';
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const day = parseInt(parts[2], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const year = parts[0];
      return day + ' ' + (GEORGIAN_MONTHS[monthIdx] || '') + ', ' + year;
    }

    function renderCalendar() {
      const monthTitle = document.getElementById('month-display-title');
      monthTitle.textContent = (GEORGIAN_MONTHS[viewMonth] || '') + ' ' + viewYear;

      const grid = document.getElementById('calendar-days-grid');
      grid.innerHTML = '';

      // First day of month (0 = Sunday, 1 = Monday, ...)
      const firstDayDate = new Date(viewYear, viewMonth, 1);
      let startingDay = firstDayDate.getDay();
      // Shift so Monday is index 0
      startingDay = startingDay === 0 ? 6 : startingDay - 1;

      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

      // Pad previous month days
      for (let i = startingDay - 1; i >= 0; i--) {
        const prevDay = daysInPrevMonth - i;
        const cell = document.createElement('div');
        cell.className = 'calendar-day-cell other-month';
        cell.innerHTML = \`<span class="day-number">\${prevDay}</span>\`;
        grid.appendChild(cell);
      }

      // Today reference
      const today = new Date();
      const isCurrentMonthView = today.getFullYear() === viewYear && today.getMonth() === viewMonth;
      const todayDate = today.getDate();

      // Days in Current Month
      for (let d = 1; d <= daysInMonth; d++) {
        const dayStr = String(d).padStart(2, '0');
        const monthStr = String(viewMonth + 1).padStart(2, '0');
        const fullDateStr = \`\${viewYear}-\${monthStr}-\${dayStr}\`;

        // Check matching activities
        const matchingLocs = locations.filter(l => l.date === fullDateStr);
        const hasEvents = matchingLocs.length > 0;
        const hasHub = matchingLocs.some(l => l.type === 'hub');

        const cell = document.createElement('div');
        cell.className = 'calendar-day-cell';
        if (hasEvents) cell.classList.add('has-event');
        if (hasHub) cell.classList.add('has-hub');
        if (isCurrentMonthView && d === todayDate) cell.classList.add('today');
        if (fullDateStr === selectedDateStr) cell.classList.add('selected');

        let dotsHtml = '';
        if (hasEvents) {
          dotsHtml = '<div class="event-dots-wrap">';
          matchingLocs.forEach(loc => {
            dotsHtml += \`<span class="event-dot \${loc.type === 'hub' ? 'hub' : 'village'}" title="\${loc.name}"></span>\`;
          });
          dotsHtml += '</div>';
        }

        cell.innerHTML = \`
          <span class="day-number">\${d}</span>
          \${dotsHtml}
        \`;

        cell.addEventListener('click', () => {
          selectedDateStr = fullDateStr;
          document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');
          renderSelectedDayDetails();
        });

        grid.appendChild(cell);
      }

      renderSelectedDayDetails();
      renderTimeline();
    }

    function renderSelectedDayDetails() {
      const container = document.getElementById('day-events-container');
      const dateText = document.getElementById('selected-date-text');
      const countBadge = document.getElementById('selected-events-count');

      dateText.textContent = formatGeorgianDate(selectedDateStr);

      const events = locations.filter(l => l.date === selectedDateStr);
      countBadge.textContent = events.length + ' აქტივობა';

      container.innerHTML = '';

      if (events.length === 0) {
        container.innerHTML = \`
          <div class="empty-events-state">
            <div class="empty-icon">📅</div>
            <p class="empty-text">ამ დღეს აქტივობა არ არის დაგეგმილი. აირჩიეთ წერტილებით მონიშნული დღეები კალენდარში.</p>
          </div>
        \`;
        return;
      }

      events.forEach(loc => {
        const isHub = loc.type === 'hub';
        const item = document.createElement('div');
        item.className = \`event-detail-item \${isHub ? 'hub' : 'village'}\`;
        item.innerHTML = \`
          <div class="event-top-row">
            <div>
              <h4 class="event-location-name">\${isHub ? '★' : '📍'} \${loc.name}</h4>
              <div style="font-size:0.72rem; color:var(--text-subtle); margin-top:2px;">
                საკოორდინაციო წერტილი: \${loc.latitude.toFixed(4)}, \${loc.longitude.toFixed(4)}
              </div>
            </div>
            <span class="event-type-badge \${isHub ? 'hub' : 'village'}">\${isHub ? 'მთავარი ჰაბი' : 'სოფელი'}</span>
          </div>

          <div>
            <div class="event-activity-title">🎯 \${loc.activityTitle}</div>
            <p class="event-activity-desc">\${loc.activityDescription}</p>
          </div>

          <div class="event-bottom-row">
            <span style="font-size:0.74rem; font-weight:700; color:var(--text-muted);">
              სტატუსი: დაგეგმილია
            </span>
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=\${loc.latitude},\${loc.longitude}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding:5px 10px; font-size:0.75rem; text-decoration:none;" title="მარშრუტი Google Maps-ში" onclick="if(typeof window.gmaTrackEvent==='function') window.gmaTrackEvent('nav_click', { village_name: '\${loc.name.replace(/'/g, \"\\\\'\")}' });">
                <span>🚗</span> როგორ მივიდე
              </a>
              <a href="index.html?loc=\${loc.id}" class="btn-goto-map">
                <span>🗺️</span> რუკაზე ნახვა
              </a>
            </div>
          </div>
        \`;
        container.appendChild(item);
      });
    }

    function renderTimeline() {
      const container = document.getElementById('timeline-container');
      container.innerHTML = '';

      // Sort by date
      const sorted = [...locations].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date.localeCompare(b.date);
      });

      sorted.forEach(loc => {
        const isHub = loc.type === 'hub';
        const card = document.createElement('div');
        card.className = 'timeline-item-card';
        card.innerHTML = \`
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="timeline-date-chip">📅 \${formatGeorgianDate(loc.date)}</span>
            <span class="event-type-badge \${isHub ? 'hub' : 'village'}">\${isHub ? 'ჰაბი' : 'სოფელი'}</span>
          </div>
          <div>
            <h4 style="font-size:0.92rem; font-weight:800; color:var(--text-main); margin-bottom:2px;">\${loc.name}</h4>
            <div style="font-size:0.80rem; font-weight:700; color:var(--text-muted);">🎯 \${loc.activityTitle}</div>
          </div>
          <p style="font-size:0.75rem; color:var(--text-subtle); line-height:1.4;">\${loc.activityDescription}</p>
          <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:4px; flex-wrap:wrap; align-items:center;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=\${loc.latitude},\${loc.longitude}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding:5px 10px; font-size:0.75rem; text-decoration:none;" title="მარშრუტი Google Maps-ში" onclick="if(typeof window.gmaTrackEvent==='function') window.gmaTrackEvent('nav_click', { village_name: '\${loc.name.replace(/'/g, \"\\\\'\")}' });">
              <span>🚗</span> როგორ მივიდე
            </a>
            <a href="index.html?loc=\${loc.id}" class="btn-goto-map">
              <span>🗺️</span> რუკაზე ნახვა
            </a>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    // ==========================================================================
    // INITIALIZATION & EVENT LISTENERS
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
      renderCalendar();
      syncLocationsFromSupabase();

      // Month Navigation Buttons
      document.getElementById('btn-prev-month').addEventListener('click', () => {
        viewMonth--;
        if (viewMonth < 0) {
          viewMonth = 11;
          viewYear--;
        }
        renderCalendar();
      });

      document.getElementById('btn-next-month').addEventListener('click', () => {
        viewMonth++;
        if (viewMonth > 11) {
          viewMonth = 0;
          viewYear++;
        }
        renderCalendar();
      });

      document.getElementById('btn-today-month').addEventListener('click', () => {
        const now = new Date();
        viewYear = now.getFullYear();
        viewMonth = now.getMonth();
        const d = String(now.getDate()).padStart(2, '0');
        const m = String(viewMonth + 1).padStart(2, '0');
        selectedDateStr = \`\${viewYear}-\${m}-\${d}\`;
        renderCalendar();
      });

      // Day & Night mode toggle
      const themeBtn = document.getElementById('theme-toggle');
      const themeIcon = document.getElementById('theme-icon');
      const themeText = document.getElementById('theme-text');

      function syncUI(theme) {
        if (theme === 'dark') {
          themeIcon.textContent = '☀️';
          themeText.textContent = 'დღე';
          themeBtn.title = 'დღის რეჟიმზე გადართვა';
        } else {
          themeIcon.textContent = '🌙';
          themeText.textContent = 'ღამე';
          themeBtn.title = 'ღამის რეჟიმზე გადართვა';
        }
      }

      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      syncUI(currentTheme);

      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        syncUI(newTheme);
      });

      // Cross-tab / Window Focus Live Sync (updates events if admin edited them on map page)
      window.addEventListener('focus', () => {
        locations = loadLocations();
        renderCalendar();
        syncLocationsFromSupabase();
      });

      window.addEventListener('storage', (e) => {
        if (e.key === 'gardabani_locations') {
          locations = loadLocations();
          renderCalendar();
        }
        if (e.key === 'theme') {
          const t = e.newValue || 'light';
          document.documentElement.setAttribute('data-theme', t);
          syncUI(t);
        }
      });
    });
  </script>
${COOKIE_CONSENT_FULL_BLOCK}
${SITE_ANALYTICS_TRACKER_HTML}
</body>
</html>`;

// ============================================================================
// 4. Define mentors.html (Mentors Showcase with 4-tab Global Nav)
// ============================================================================
const mentorsHtmlContent = `<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>გარდაბნის მობილური აკადემია — მენტორები</title>
  
  <!-- Immediate Theme Initializer to prevent white flash (Default White / Clean Light Mode) -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>

  <style>
    /* ==========================================================================
       DESIGN SYSTEM: MENTORS PAGE (PURE BLACK DARK THEME)
       ========================================================================== */
    :root {
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      
      /* Light Mode (default) */
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-subtle: #f8fafc;
      --bg-hover: #f1f5f9;
      --bg-nav: #f1f5f9;
      
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-subtle: #64748b;
      
      --border-light: #e2e8f0;
      --border-focus: #94a3b8;
      
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08);
      
      --font-stack: "BPG Nino Mtavruli", "Noto Sans Georgian", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    }

    /* True Pure Black Dark Theme (No Blue Tint) */
    [data-theme="dark"] {
      --bg-page: #000000;         /* True Pure Black */
      --bg-card: #0a0a0a;         /* Deep neutral black card */
      --bg-card-subtle: #141414;  /* Slightly lighter card element */
      --bg-hover: #1c1c1c;        /* Neutral dark hover */
      --bg-nav: #0e0e0e;          /* Navigation pill background */
      
      --text-main: #f5f5f5;       /* Crisp clean white text */
      --text-muted: #a3a3a3;      /* Neutral gray text */
      --text-subtle: #737373;     /* Muted neutral gray */
      
      --border-light: #262626;    /* Dark neutral border, no blue tint */
      --border-focus: #3b82f6;
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.8);
      --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.9);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.95);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-stack);
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    .app-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 12px 20px 40px;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Header */
    header.header {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 12px 20px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .header-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.2;
    }

    /* Navigation Tabs (4 Tabs) */
    .nav-tabs {
      display: inline-flex;
      background: var(--bg-nav);
      padding: 3px;
      border-radius: var(--radius-full);
      gap: 3px;
      border: 1px solid var(--border-light);
    }

    .nav-tab {
      padding: 5px 14px;
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      font-weight: 700;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-tab:hover {
      color: var(--text-main);
    }

    .nav-tab.active {
      background: var(--bg-card);
      color: #2563eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    [data-theme="dark"] .nav-tab.active {
      color: #60a5fa;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theme-toggle-btn {
      background: var(--bg-nav);
      border: 1px solid var(--border-light);
      color: var(--text-main);
      padding: 6px 12px;
      border-radius: var(--radius-full);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .theme-toggle-btn:hover {
      background: var(--bg-hover);
      border-color: var(--border-focus);
    }

    .btn-return-map {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1e40af;
      padding: 6px 12px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-return-map:hover {
      background: #dbeafe;
    }

    [data-theme="dark"] .btn-return-map {
      background: #172554;
      border-color: #1e40af;
      color: #93c5fd;
    }

    [data-theme="dark"] .btn-return-map:hover {
      background: #1e3a8a;
    }

    /* Hero section */
    .mentors-hero {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 24px 28px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-size: 0.74rem;
      font-weight: 700;
      width: fit-content;
    }

    [data-theme="dark"] .hero-badge {
      background: #141414;
      color: #ffffff;
      border-color: #333333;
    }

    .hero-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .hero-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      max-width: 820px;
      line-height: 1.55;
    }

    /* Mentors Grid */
    .mentors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 18px;
    }

    .mentor-card {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 22px 18px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
      transition: all 0.2s ease;
    }

    .mentor-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      border-color: #3b82f6;
    }

    .avatar-wrapper {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .avatar-wrapper svg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .mentor-name {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 2px;
    }

    .mentor-role {
      display: inline-block;
      font-size: 0.73rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #dbeafe;
    }

    [data-theme="dark"] .mentor-role {
      background: #141414;
      color: #60a5fa;
      border-color: #262626;
    }

    .mentor-desc {
      font-size: 0.79rem;
      color: var(--text-muted);
      line-height: 1.45;
      margin-top: 6px;
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 4px;
      margin-top: 8px;
    }

    .tag-badge {
      font-size: 0.68rem;
      font-weight: 700;
      background: var(--bg-hover);
      color: var(--text-subtle);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
    }

    /* ==========================================================================
       MOBILE RESPONSIVE ADAPTATIONS (768px & 480px)
       ========================================================================== */
    @media (max-width: 768px) {
      .app-container {
        padding: 8px 10px 16px;
        gap: 10px;
      }

      /* Header Layout on Mobile: Clean 2-Row Native App Header */
      header.header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        gap: 8px;
        border-radius: var(--radius-md);
      }

      .header-content {
        display: contents;
      }

      .header-title {
        order: 1;
        font-size: 1.05rem;
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-logo {
        font-size: 1.25rem;
      }

      .header-actions {
        order: 2;
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 0 0 auto;
      }

      .nav-tabs {
        order: 3;
        width: 100%;
        display: flex;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: 3px;
        border-radius: var(--radius-full);
        gap: 4px;
        background: var(--bg-nav);
      }

      .nav-tabs::-webkit-scrollbar {
        display: none;
      }

      .nav-tab {
        flex: 1 0 auto;
        justify-content: center;
        text-align: center;
        padding: 7px 10px;
        font-size: 0.74rem;
        white-space: nowrap;
      }

      .theme-toggle-btn {
        padding: 5px 10px;
        font-size: 0.74rem;
      }

      .btn-return-map {
        display: none;
      }

      /* Mentors Hero */
      .mentors-hero {
        padding: 14px 16px;
        gap: 6px;
      }

      .hero-title {
        font-size: 1.15rem;
      }

      .hero-desc {
        font-size: 0.80rem;
      }

      /* Mentors Grid */
      .mentors-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .mentor-card {
        padding: 16px 14px;
        gap: 10px;
      }

      .avatar-wrapper {
        width: 80px;
        height: 80px;
      }

      .mentor-name {
        font-size: 0.98rem;
      }

      .mentor-role {
        font-size: 0.76rem;
      }

      .mentor-desc {
        font-size: 0.78rem;
      }
    }

    @media (max-width: 480px) {
      .app-container {
        padding: 6px 8px 14px;
      }

      header.header {
        padding: 8px 10px;
      }

      .header-title {
        font-size: 0.92rem;
      }

      .nav-tab {
        padding: 6px 7px;
        font-size: 0.69rem;
      }

      .theme-toggle-btn {
        padding: 4px 8px;
        font-size: 0.70rem;
      }
    }

    /* Modal */
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      z-index: 2000;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .modal-window {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      max-width: 650px;
      width: 100%;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-popup);
      overflow: hidden;
    }

    .modal-header {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .modal-body {
      padding: 16px 18px;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .form-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    .form-input, .form-textarea {
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      padding: 7px 10px;
      font-family: inherit;
      font-size: 0.82rem;
      background: var(--bg-input);
      color: var(--text-main);
      outline: none;
      transition: border-color 0.15s ease;
    }

    .form-input:focus, .form-textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    }

    .modal-footer {
      padding: 12px 18px;
      border-top: 1px solid var(--border-light);
      background: var(--bg-card-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    /* Admin Indicator */
    .admin-indicator {
      display: none;
      align-items: center;
      gap: 6px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-size: 0.72rem;
      font-weight: 800;
    }

    [data-theme="dark"] .admin-indicator {
      background: #064e3b;
      color: #a7f3d0;
      border-color: #047857;
    }

    .btn-indicator-logout {
      background: transparent;
      border: none;
      color: inherit;
      font-size: 0.70rem;
      font-weight: 700;
      cursor: pointer;
      padding: 1px 4px;
      border-radius: 4px;
    }

    .btn-indicator-logout:hover {
      background: rgba(0,0,0,0.1);
    }

    /* Toast */
    .toast-msg {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      font-weight: 700;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 3000;
      pointer-events: none;
    }

    [data-theme="dark"] .toast-msg {
      background: #141414;
      color: #ffffff;
      border: 1px solid #262626;
    }

    .toast-msg.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
${STEALTH_ADMIN_CSS}
${COOKIE_CONSENT_CSS}
  </style>
</head>
<body>

  <div class="app-container">
    
    <!-- HEADER -->
    <header class="header">
      <div class="header-content">
        <h1 class="header-title" id="header-brand-title" style="cursor:pointer;" title="გარდაბნის მობილური აკადემია">
          <span class="header-logo" id="header-logo">🚐</span>
          <span>გარდაბნის მობილური აკადემია</span>
        </h1>
        <nav class="nav-tabs">
          <a href="index.html" class="nav-tab">მთავარი გვერდი</a>
          <a href="calendar.html" class="nav-tab">კალენდარი</a>
          <a href="mentors.html" class="nav-tab active">მენტორები</a>
          <a href="settings.html" class="nav-tab">პარამეტრები</a>
        </nav>
      </div>

      <div class="header-actions">
        <!-- Admin Indicator (shown when admin mode is on) -->
        <div class="admin-indicator" id="admin-indicator" style="display:none;" title="ადმინისტრატორის სესია აქტიურია">
          <span>🛡️ ადმინი</span>
          <button type="button" class="btn-indicator-logout" id="btn-header-logout" title="სესიის დასრულება">✕ გამოსვლა</button>
        </div>

        <button class="btn btn-primary" id="btn-add-mentor" style="display:none;" title="ახალი მენტორის დამატება">
          <span>➕</span> ახალი მენტორი
        </button>

        <button class="theme-toggle-btn" id="theme-toggle" title="დღის და ღამის რეჟიმი">
          <span id="theme-icon">🌙</span> <span id="theme-text">ღამე</span>
        </button>
        <a href="index.html" class="btn-return-map">
          ← მთავარ გვერდზე დაბრუნება
        </a>
      </div>
    </header>

    <!-- HERO INTRODUCTION -->
    <section class="mentors-hero">
      <span class="hero-badge">გარდაბნის მობილური აკადემიის გუნდი</span>
      <h2 class="hero-title">აკადემიის მენტორები</h2>
      <p class="hero-desc">
        მენტორების გუნდი წარმართავს საგანმანათლებლო, შემოქმედებით და სამოქალაქო აქტივობებს გარდაბნის მუნიციპალიტეტის სოფლებში. ჩვენი მიზანია ქართველ და აზერბაიჯანელ ახალგაზრდებს შორის პარტნიორობის, მეგობრობისა და არაფორმალური განათლების გაძლიერება.
      </p>
    </section>

    <!-- DYNAMIC MENTORS GRID (CONNECTED TO SUPABASE) -->
    <section class="mentors-grid" id="mentors-grid">
      <!-- Mentors rendered dynamically by JS from Supabase / Fallback -->
    </section>

  </div>

  <!-- MENTOR MODAL (Add / Edit) -->
  <div class="modal-backdrop" id="mentor-modal">
    <div class="modal-window">
      <div class="modal-header">
        <h3 class="modal-title" id="mentor-modal-title">
          <span>👤</span> მენტორის დამატება
        </h3>
        <button type="button" class="stealth-close-btn" id="btn-close-mentor-modal">✕</button>
      </div>
      <form id="mentor-form">
        <div class="modal-body">
          <input type="hidden" id="mentor-form-id">
          
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="mentor-name">სახელი და გვარი</label>
              <input type="text" id="mentor-name" class="form-input" required placeholder="მაგ. დაკო კეჟერაშვილი">
            </div>
            <div class="form-group">
              <label class="form-label" for="mentor-role">როლი / პოზიცია</label>
              <input type="text" id="mentor-role" class="form-input" required placeholder="მაგ. მენტორი">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="mentor-desc">აღწერა / მიმართულება</label>
            <textarea id="mentor-desc" class="form-textarea" rows="3" required placeholder="მიმართულება და საქმიანობის სფერო..."></textarea>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="mentor-tags">თეგები (მძიმით გამოყოფილი)</label>
              <input type="text" id="mentor-tags" class="form-input" placeholder="მაგ. არაფორმალური განათლება, დიალოგი">
            </div>
            <div class="form-group">
              <label class="form-label" for="mentor-color">ავატარის ფერი</label>
              <select id="mentor-color" class="form-input">
                <option value="#8b5cf6">იისფერი (#8b5cf6)</option>
                <option value="#ec4899">ვარდისფერი (#ec4899)</option>
                <option value="#3b82f6">ლურჯი (#3b82f6)</option>
                <option value="#10b981">მწვანე (#10b981)</option>
                <option value="#0d9488">ფირუზისფერი (#0d9488)</option>
                <option value="#f59e0b">ნარინჯისფერი (#f59e0b)</option>
                <option value="#dc2626">წითელი (#dc2626)</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" id="btn-cancel-mentor-modal">გაუქმება</button>
          <button type="submit" class="btn btn-primary" id="btn-save-mentor">შენახვა</button>
        </div>
      </form>
    </div>
  </div>

  <div class="toast-msg" id="toast-msg"></div>

${STEALTH_ADMIN_HTML}

  <!-- Supabase JS Client & Project Configuration -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="supabase_config.js"></script>

  <script>
${STEALTH_ADMIN_JS}

    const INITIAL_MENTORS = ${INITIAL_MENTORS_JS};

    let mentors = [...INITIAL_MENTORS];

    function showToast(msg) {
      let toast = document.getElementById('toast-msg');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-msg';
        toast.className = 'toast-msg';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function getAvatarSvg(color) {
      return \`
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="58" fill="\${color}15" stroke="\${color}40" stroke-width="2"/>
          <path d="M60 26c-11 0-19 8-19 19 0 7 4 13 9 16-14 4-23 15-23 29v6c0 1.1.9 2 2 2h62c1.1 0 2-.9 2-2v-6c0-14-9-25-23-29 5-3 9-9 9-16 0-11-8-19-19-19z" fill="\${color}" opacity="0.85"/>
          <circle cx="60" cy="45" r="13" fill="\${color}80"/>
        </svg>
      \`;
    }

    function renderMentorsList(mentorsData) {
      const grid = document.getElementById('mentors-grid');
      if (!grid) return;
      grid.innerHTML = '';
      const isAdmin = isAdminMode();

      mentorsData.forEach(m => {
        const card = document.createElement('article');
        card.className = 'mentor-card';
        card.id = 'mentor-card-' + m.id;

        const tagsList = Array.isArray(m.tags) ? m.tags : (typeof m.tags === 'string' ? m.tags.replace(/[{}\"]/g, '').split(',') : []);
        const tagsHtml = tagsList.filter(t => t.trim()).map(t => \`<span class="tag-badge">\${t.trim()}</span>\`).join('');
        const color = m.avatar_color || '#8b5cf6';

        card.innerHTML = \`
          <div class="avatar-wrapper">
            \${getAvatarSvg(color)}
          </div>
          <div style="width:100%;">
            <h3 class="mentor-name">\${m.name}</h3>
            <span class="mentor-role">\${m.role || 'მენტორი'}</span>
            <p class="mentor-desc">\${m.description}</p>
            <div class="tags-row">\${tagsHtml}</div>
          </div>
          \${isAdmin ? \`
            <div style="margin-top:auto; padding-top:10px; border-top:1px dashed var(--border-light); width:100%; display:flex; justify-content:center; gap:6px;">
              <button class="btn btn-outline" style="padding:4px 10px; font-size:0.72rem;" onclick="openEditMentor(\${m.id})">✏️ ჩასწორება</button>
              <button class="btn btn-outline" style="padding:4px 10px; font-size:0.72rem; color:#ef4444;" onclick="deleteMentor(\${m.id})">🗑️ წაშლა</button>
            </div>
          \` : ''}
        \`;
        grid.appendChild(card);
      });
    }

    async function syncMentorsFromSupabase() {
      const client = initSupabase();
      if (!client) return;
      try {
        const { data, error } = await client
          .from('mentors')
          .select('*')
          .order('id', { ascending: true });
        if (!error && Array.isArray(data) && data.length > 0) {
          mentors = data.map(m => ({
            id: Number(m.id),
            name: m.name,
            role: m.role || 'მენტორი',
            description: m.description,
            tags: Array.isArray(m.tags) ? m.tags : (typeof m.tags === 'string' ? m.tags.replace(/[{}\"]/g, '').split(',') : []),
            avatar_color: m.avatar_color || '#8b5cf6'
          }));
          renderMentorsList(mentors);
        }
      } catch (err) {
        console.warn('Mentors Supabase sync fallback:', err);
      }
    }

    function syncAdminUI() {
      const isAdmin = isAdminMode();
      const adminIndicator = document.getElementById('admin-indicator');
      const btnAddMentor = document.getElementById('btn-add-mentor');
      if (adminIndicator) adminIndicator.style.display = isAdmin ? 'inline-flex' : 'none';
      if (btnAddMentor) btnAddMentor.style.display = isAdmin ? 'inline-flex' : 'none';
      renderMentorsList(mentors);
    }

    // Modal Handlers
    function openAddMentor() {
      document.getElementById('mentor-modal-title').innerHTML = '<span>➕</span> ახალი მენტორის დამატება';
      document.getElementById('mentor-form-id').value = '';
      document.getElementById('mentor-name').value = '';
      document.getElementById('mentor-role').value = 'მენტორი';
      document.getElementById('mentor-desc').value = '';
      document.getElementById('mentor-tags').value = '';
      document.getElementById('mentor-color').value = '#8b5cf6';
      document.getElementById('mentor-modal').classList.add('open');
    }

    function openEditMentor(id) {
      const mentor = mentors.find(m => m.id === id);
      if (!mentor) return;
      document.getElementById('mentor-modal-title').innerHTML = '<span>✏️</span> მენტორის რედაქტირება';
      document.getElementById('mentor-form-id').value = mentor.id;
      document.getElementById('mentor-name').value = mentor.name;
      document.getElementById('mentor-role').value = mentor.role || 'მენტორი';
      document.getElementById('mentor-desc').value = mentor.description;
      document.getElementById('mentor-tags').value = Array.isArray(mentor.tags) ? mentor.tags.join(', ') : mentor.tags;
      document.getElementById('mentor-color').value = mentor.avatar_color || '#8b5cf6';
      document.getElementById('mentor-modal').classList.add('open');
    }

    function closeMentorModal() {
      document.getElementById('mentor-modal').classList.remove('open');
    }

    async function saveMentor(e) {
      e.preventDefault();
      const idVal = document.getElementById('mentor-form-id').value;
      const isNew = !idVal;
      const id = isNew ? (mentors.length ? Math.max(...mentors.map(m => m.id)) + 1 : 1) : Number(idVal);
      const name = document.getElementById('mentor-name').value.trim();
      const role = document.getElementById('mentor-role').value.trim();
      const description = document.getElementById('mentor-desc').value.trim();
      const tagsStr = document.getElementById('mentor-tags').value.trim();
      const tags = tagsStr ? tagsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
      const avatar_color = document.getElementById('mentor-color').value;

      const record = { id, name, role, description, tags, avatar_color };

      if (isNew) {
        mentors.push(record);
      } else {
        const idx = mentors.findIndex(m => m.id === id);
        if (idx !== -1) mentors[idx] = record;
      }
      renderMentorsList(mentors);
      closeMentorModal();
      showToast('მენტორი წარმატებით შეინახა ✅');

      const client = initSupabase();
      if (client) {
        try {
          await client.from('mentors').upsert(record);
        } catch (err) {
          console.warn('Mentors Supabase save error:', err);
        }
      }
    }

    async function deleteMentor(id) {
      if (!confirm('ნამდვილად გსურთ მენტორის წაშლა?')) return;
      mentors = mentors.filter(m => m.id !== id);
      renderMentorsList(mentors);
      showToast('მენტორი წაიშალა 🗑️');

      const client = initSupabase();
      if (client) {
        try {
          await client.from('mentors').delete().eq('id', id);
        } catch (err) {
          console.warn('Mentors Supabase delete error:', err);
        }
      }
    }

    // Theme toggle handling for mentors page
    document.addEventListener('DOMContentLoaded', () => {
      renderMentorsList(mentors);
      syncMentorsFromSupabase();
      syncAdminUI();

      // Theme UI
      const themeBtn = document.getElementById('theme-toggle');
      const themeIcon = document.getElementById('theme-icon');
      const themeText = document.getElementById('theme-text');

      function syncUI(theme) {
        if (theme === 'dark') {
          themeIcon.textContent = '☀️';
          themeText.textContent = 'დღე';
          themeBtn.title = 'დღის რეჟიმზე გადართვა';
        } else {
          themeIcon.textContent = '🌙';
          themeText.textContent = 'ღამე';
          themeBtn.title = 'ღამის რეჟიმზე გადართვა';
        }
      }

      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      syncUI(currentTheme);

      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        syncUI(newTheme);
      });

      // Admin Logout
      const btnLogout = document.getElementById('btn-header-logout');
      if (btnLogout) {
        btnLogout.addEventListener('click', () => {
          logoutAdmin();
          syncAdminUI();
          showToast('ადმინისტრატორის სესია დასრულდა');
        });
      }

      // Add Mentor Button
      const btnAddMentor = document.getElementById('btn-add-mentor');
      if (btnAddMentor) btnAddMentor.addEventListener('click', openAddMentor);

      // Close Modal Buttons
      const btnCloseModal = document.getElementById('btn-close-mentor-modal');
      if (btnCloseModal) btnCloseModal.addEventListener('click', closeMentorModal);
      const btnCancelModal = document.getElementById('btn-cancel-mentor-modal');
      if (btnCancelModal) btnCancelModal.addEventListener('click', closeMentorModal);

      // Mentor Form Submit
      const mentorForm = document.getElementById('mentor-form');
      if (mentorForm) mentorForm.addEventListener('submit', saveMentor);
    });
  </script>
${COOKIE_CONSENT_FULL_BLOCK}
${SITE_ANALYTICS_TRACKER_HTML}
</body>
</html>`;

// ============================================================================
// 5. Define settings.html (Settings Page with 4-tab Global Nav & Full Reset of Dates)
// ============================================================================
const settingsHtmlContent = `<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>გარდაბნის მობილური აკადემია — პარამეტრები</title>
  
  <!-- Immediate Theme Initializer to prevent white flash (Default White / Clean Light Mode) -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>

  <style>
    /* ==========================================================================
       DESIGN SYSTEM: SETTINGS PAGE (PURE BLACK DARK THEME)
       ========================================================================== */
    :root {
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      
      /* Light Mode (default) */
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-subtle: #f8fafc;
      --bg-hover: #f1f5f9;
      --bg-nav: #f1f5f9;
      --bg-input: #f8fafc;
      
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-subtle: #64748b;
      
      --border-light: #e2e8f0;
      --border-focus: #94a3b8;
      
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08);
      
      --font-stack: "BPG Nino Mtavruli", "Noto Sans Georgian", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    }

    /* True Pure Black Dark Theme (No Blue Tint) */
    [data-theme="dark"] {
      --bg-page: #000000;         /* True Pure Black */
      --bg-card: #0a0a0a;         /* Deep neutral black card */
      --bg-card-subtle: #141414;  /* Slightly lighter card element */
      --bg-hover: #1c1c1c;        /* Neutral dark hover */
      --bg-nav: #0e0e0e;          /* Navigation pill background */
      --bg-input: #121212;        /* Dark input field */
      
      --text-main: #f5f5f5;       /* Crisp clean white text */
      --text-muted: #a3a3a3;      /* Neutral gray text */
      --text-subtle: #737373;     /* Muted neutral gray */
      
      --border-light: #262626;    /* Dark neutral border, no blue tint */
      --border-focus: #3b82f6;
      
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.8);
      --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.9);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.95);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-stack);
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    .app-container {
      max-width: 960px;
      margin: 0 auto;
      padding: 12px 20px 40px;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Header */
    header.header {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 12px 20px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .header-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.2;
    }

    /* Navigation Tabs (4 Tabs) */
    .nav-tabs {
      display: inline-flex;
      background: var(--bg-nav);
      padding: 3px;
      border-radius: var(--radius-full);
      gap: 3px;
      border: 1px solid var(--border-light);
    }

    .nav-tab {
      padding: 5px 14px;
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      font-weight: 700;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-tab:hover {
      color: var(--text-main);
    }

    .nav-tab.active {
      background: var(--bg-card);
      color: #2563eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    [data-theme="dark"] .nav-tab.active {
      color: #60a5fa;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theme-toggle-btn {
      background: var(--bg-nav);
      border: 1px solid var(--border-light);
      color: var(--text-main);
      padding: 6px 12px;
      border-radius: var(--radius-full);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .theme-toggle-btn:hover {
      background: var(--bg-hover);
      border-color: var(--border-focus);
    }

    .btn-return-map {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1e40af;
      padding: 6px 12px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-return-map:hover {
      background: #dbeafe;
    }

    [data-theme="dark"] .btn-return-map {
      background: #172554;
      border-color: #1e40af;
      color: #93c5fd;
    }

    [data-theme="dark"] .btn-return-map:hover {
      background: #1e3a8a;
    }

    /* Cards */
    .settings-card {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 22px 24px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .card-header-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 12px;
    }

    .card-main-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card-subtitle {
      font-size: 0.80rem;
      color: var(--text-muted);
    }

    /* Modern Lever Switch (iOS/Fluent Style - Full Clickable Row) */
    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 14px;
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease;
    }

    .switch-row:hover {
      background: var(--bg-hover);
      border-color: #93c5fd;
    }

    [data-theme="dark"] .switch-row:hover {
      border-color: #3b82f6;
    }

    .switch-label-group {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .switch-title {
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .switch-desc {
      font-size: 0.76rem;
      color: var(--text-muted);
    }

    .lever-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
      flex-shrink: 0;
      pointer-events: none;
    }

    .lever-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .lever-slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: #cbd5e1;
      border-radius: 28px;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid #94a3b8;
    }

    .lever-slider:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.25);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .lever-switch input:checked + .lever-slider {
      background-color: #2563eb;
      border-color: #1d4ed8;
      box-shadow: 0 0 10px rgba(37, 99, 235, 0.35);
    }

    .lever-switch input:checked + .lever-slider:before {
      transform: translateX(22px);
    }

    [data-theme="dark"] .lever-slider {
      background-color: #1f1f1f;
      border-color: #333333;
    }

    [data-theme="dark"] .lever-switch input:checked + .lever-slider {
      background-color: #3b82f6;
      border-color: #60a5fa;
      box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
    }

    /* Admin Access Form */
    .admin-form-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .admin-input-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .form-input {
      flex: 1;
      min-width: 240px;
      padding: 9px 12px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      font-family: inherit;
      font-size: 0.85rem;
      color: var(--text-main);
      background: var(--bg-input);
      outline: none;
      transition: all 0.15s ease;
    }

    .form-input:focus {
      background: var(--bg-card);
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      user-select: none;
      white-space: nowrap;
    }

    .btn-primary {
      background: #2563eb;
      color: #ffffff;
    }

    .btn-primary:hover {
      background: #1d4ed8;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
    }

    .btn-danger {
      background: #fee2e2;
      border-color: #fecaca;
      color: #991b1b;
    }

    .btn-danger:hover {
      background: #fecaca;
    }

    [data-theme="dark"] .btn-danger {
      background: #350808;
      border-color: #7f1d1d;
      color: #fca5a5;
    }

    .hint-box {
      font-size: 0.74rem;
      color: var(--text-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }

    .hint-code {
      font-family: monospace;
      font-weight: 700;
      background: var(--bg-hover);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-light);
    }

    .btn-copy-hint {
      background: transparent;
      border: 1px solid var(--border-light);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-size: 0.70rem;
      font-weight: 700;
      color: #2563eb;
      cursor: pointer;
    }

    [data-theme="dark"] .btn-copy-hint {
      color: #60a5fa;
    }

    .admin-error-msg {
      display: none;
      font-size: 0.78rem;
      color: #ef4444;
      font-weight: 700;
      animation: shake 0.3s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-4px); }
      40%, 80% { transform: translateX(4px); }
    }

    /* Admin Active Box */
    .admin-active-box {
      display: none;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: var(--radius-md);
      padding: 16px 18px;
      flex-direction: column;
      gap: 10px;
    }

    [data-theme="dark"] .admin-active-box {
      background: #064e3b;
      border-color: #047857;
    }

    .admin-active-title {
      font-size: 0.92rem;
      font-weight: 800;
      color: #065f46;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    [data-theme="dark"] .admin-active-title {
      color: #a7f3d0;
    }

    .admin-active-desc {
      font-size: 0.80rem;
      color: #047857;
      line-height: 1.45;
    }

    [data-theme="dark"] .admin-active-desc {
      color: #d1fae5;
    }

    .admin-actions-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    /* TOAST */
    .toast-msg {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      font-weight: 700;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 3000;
      pointer-events: none;
    }

    [data-theme="dark"] .toast-msg {
      background: #141414;
      color: #ffffff;
      border: 1px solid #262626;
    }

    .toast-msg.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* ==========================================================================
       MOBILE RESPONSIVE ADAPTATIONS (768px & 480px)
       ========================================================================== */
    @media (max-width: 768px) {
      .app-container {
        padding: 8px 10px 16px;
        gap: 10px;
      }

      /* Header Layout on Mobile: Clean 2-Row Native App Header */
      header.header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        gap: 8px;
        border-radius: var(--radius-md);
      }

      .header-content {
        display: contents;
      }

      .header-title {
        order: 1;
        font-size: 1.05rem;
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-logo {
        font-size: 1.25rem;
      }

      .header-actions {
        order: 2;
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 0 0 auto;
      }

      .nav-tabs {
        order: 3;
        width: 100%;
        display: flex;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: 3px;
        border-radius: var(--radius-full);
        gap: 4px;
        background: var(--bg-nav);
      }

      .nav-tabs::-webkit-scrollbar {
        display: none;
      }

      .nav-tab {
        flex: 1 0 auto;
        justify-content: center;
        text-align: center;
        padding: 7px 10px;
        font-size: 0.74rem;
        white-space: nowrap;
      }

      .theme-toggle-btn {
        padding: 5px 10px;
        font-size: 0.74rem;
      }

      .btn-return-map {
        display: none;
      }

      /* Settings Cards */
      .settings-card {
        padding: 14px 16px;
        gap: 12px;
        border-radius: var(--radius-md);
      }

      .card-main-title {
        font-size: 0.98rem;
      }

      .card-subtitle {
        font-size: 0.76rem;
      }

      .switch-row {
        padding: 10px 12px;
        gap: 10px;
      }

      .switch-title {
        font-size: 0.82rem;
      }

      .switch-desc {
        font-size: 0.72rem;
      }

      .action-btn-row {
        flex-direction: column;
        width: 100%;
      }

      .action-btn-row .btn {
        width: 100%;
        justify-content: center;
        padding: 9px 12px;
      }
    }

    @media (max-width: 480px) {
      .app-container {
        padding: 6px 8px 14px;
      }

      header.header {
        padding: 8px 10px;
      }

      .header-title {
        font-size: 0.92rem;
      }

      .nav-tab {
        padding: 6px 7px;
        font-size: 0.69rem;
      }

        /* ==========================================================================
       MODERN ADMIN ANALYTICS DASHBOARD STYLES (EXECUTIVE LEVEL)
       ========================================================================== */
    .analytics-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .live-pulse-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(34, 197, 94, 0.12);
      color: #16a34a;
      border: 1px solid rgba(34, 197, 94, 0.25);
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11.5px;
      font-weight: 600;
    }
    .pulse-dot {
      width: 7px;
      height: 7px;
      background: #16a34a;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
      animation: pulseGreen 2s infinite;
    }
    @keyframes pulseGreen {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }
    
    .analytics-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }
    .analytics-kpi-card {
      background: linear-gradient(145deg, var(--bg-card-subtle) 0%, rgba(255,255,255,0.02) 100%);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    [data-theme="dark"] .analytics-kpi-card {
      background: linear-gradient(145deg, #111111 0%, #1a1a1a 100%);
      border-color: #333;
    }
    .analytics-kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .analytics-kpi-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--card-accent, var(--primary));
    }
    .kpi-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .kpi-label {
      font-size: 12.5px;
      color: var(--text-muted);
      font-weight: 600;
    }
    .kpi-icon-pill {
      background: rgba(0,0,0,0.04);
      padding: 4px 6px;
      border-radius: 6px;
      font-size: 12px;
    }
    [data-theme="dark"] .kpi-icon-pill { background: rgba(255,255,255,0.1); }
    .kpi-value {
      font-size: 26px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.1;
      margin-bottom: 4px;
    }
    .kpi-subtext {
      font-size: 11.5px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: auto;
    }
    
    .analytics-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-light);
      flex-wrap: wrap;
      gap: 12px;
    }
    .toolbar-group {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .live-status-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-main);
      padding: 4px 10px;
      background: var(--bg-card-subtle);
      border-radius: 9999px;
      border: 1px solid var(--border-light);
    }
    .live-pulse-dot {
      width: 6px;
      height: 6px;
      background: #ef4444;
      border-radius: 50%;
      animation: pulseRed 1.5s infinite;
    }
    @keyframes pulseRed {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
    
    .filter-btn-group {
      display: inline-flex;
      background: var(--bg-card-subtle);
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--border-light);
    }
    .filter-btn {
      background: transparent;
      border: none;
      padding: 5px 12px;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-muted);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .filter-btn:hover { color: var(--text-main); }
    .filter-btn.active {
      background: var(--bg-card);
      color: var(--primary);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .analytics-charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }
    .chart-card-full {
      grid-column: 1 / -1;
    }
    .chart-card {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 16px;
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.2s ease;
    }
    .chart-card:hover {
      box-shadow: inset 0 0 20px rgba(0,0,0,0.02);
    }
    [data-theme="dark"] .chart-card:hover {
      box-shadow: inset 0 0 20px rgba(255,255,255,0.02);
    }
    .chart-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    .chart-card-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
      margin: 0 0 4px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .chart-card-sub {
      font-size: 11px;
      color: var(--text-muted);
    }
    .chart-card-badge {
      font-size: 10px;
      font-weight: 700;
      background: var(--bg-card-subtle);
      color: var(--text-subtle);
      padding: 3px 8px;
      border-radius: 9999px;
    }
    .chart-canvas-wrapper {
      position: relative;
      width: 100%;
      flex: 1;
    }
    
    .rank-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }
    .rank-header {
      display: flex;
      justify-content: space-between;
      font-size: 11.5px;
      color: var(--text-main);
      font-weight: 500;
    }
    .rank-track {
      width: 100%;
      height: 6px;
      background: var(--bg-card-subtle);
      border-radius: 3px;
      overflow: hidden;
    }
    .rank-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .speed-meter-box {
      text-align: center;
      padding: 10px 0;
    }
    .speed-meter-val {
      font-size: 28px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 12px;
    }
    .speed-meter-scale {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: var(--text-muted);
      margin-top: 6px;
    }
    
    /* Heatmap CSS */
    .heatmap-grid {
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      gap: 2px;
      margin-top: 10px;
    }
    .heatmap-cell {
      aspect-ratio: 1;
      border-radius: 3px;
      background: var(--bg-card-subtle);
      position: relative;
      cursor: help;
    }
    .heatmap-labels {
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      gap: 2px;
      margin-top: 4px;
      font-size: 9px;
      color: var(--text-muted);
      text-align: center;
    }
    
    .activity-feed {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 400px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .activity-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-left: 3px solid var(--primary);
      border-radius: var(--radius-md);
      padding: 8px 12px;
      transition: background 0.2s;
    }
    .activity-item:hover { background: var(--bg-card-subtle); }
    .activity-item-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .activity-avatar {
      width: 32px;
      height: 32px;
      background: var(--bg-card-subtle);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .activity-page-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .activity-time-meta {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 1px;
    }
    .activity-badges-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: flex-end;
    }
    .badge-pill {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 500;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .badge-device { background: var(--bg-card-subtle); border: 1px solid var(--border-light); color: var(--text-main); }
    .badge-network { background: rgba(16, 185, 129, 0.12); color: #10b981; font-weight: 600; }
    .badge-source { background: rgba(37, 99, 235, 0.10); color: #2563eb; }
    .badge-duration { background: rgba(139, 92, 246, 0.12); color: #8b5cf6; font-weight: 600; }
    .badge-scroll { background: rgba(245, 158, 11, 0.12); color: #d97706; }
    [data-theme="dark"] .badge-network { color: #34d399; }
    [data-theme="dark"] .badge-source { color: #60a5fa; }
    [data-theme="dark"] .badge-duration { color: #a78bfa; }
    [data-theme="dark"] .badge-scroll { color: #fbbf24; }
    
    .fade-in-anim {
      animation: fadeIn 0.4s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 640px) {
      .analytics-kpi-grid { grid-template-columns: 1fr 1fr; }
      .analytics-charts-grid { grid-template-columns: 1fr; }
      .activity-item { flex-direction: column; align-items: flex-start; gap: 8px; }
      .activity-badges-group { justify-content: flex-start; }
      .heatmap-grid, .heatmap-labels { grid-template-columns: repeat(12, 1fr); }
    }

${STEALTH_ADMIN_CSS}
${COOKIE_CONSENT_CSS}
  </style>
</head>
<body>

  <div class="app-container">
    
    <!-- HEADER -->
    <header class="header">
      <div class="header-content">
        <h1 class="header-title" id="header-brand-title" style="cursor:pointer;" title="გარდაბნის მობილური აკადემია">
          <span class="header-logo" id="header-logo">🚐</span>
          <span>გარდაბნის მობილური აკადემია</span>
        </h1>
        <nav class="nav-tabs">
          <a href="index.html" class="nav-tab">მთავარი გვერდი</a>
          <a href="calendar.html" class="nav-tab">კალენდარი</a>
          <a href="mentors.html" class="nav-tab">მენტორები</a>
          <a href="settings.html" class="nav-tab active">პარამეტრები</a>
        </nav>
      </div>

      <div class="header-actions">
        <button class="theme-toggle-btn" id="theme-toggle" title="დღის და ღამის რეჟიმი">
          <span id="theme-icon">🌙</span> <span id="theme-text">ღამე</span>
        </button>
        <a href="index.html" class="btn-return-map">
          ← მთავარ გვერდზე დაბრუნება
        </a>
      </div>
    </header>

    <!-- SECTION 1: MAP LAYERS WITH LEVER SWITCHES -->
    <section class="settings-card">
      <div class="card-header-group">
        <h2 class="card-main-title">🗺️ რუკის შრეები და ვიზუალიზაცია</h2>
        <p class="card-subtitle">
          მართეთ მთავარ რუკაზე გამოსახული გეოგრაფიული და ანალიტიკური შრეები Lever-ის ტიპის გადამრთველებით.
        </p>
      </div>

      <!-- Lever Switch 1: Gardabani Boundary -->
      <div class="switch-row" id="row-boundary">
        <div class="switch-label-group">
          <span class="switch-title">
            <span>🌐</span> გარდაბნის მუნიციპალიტეტის საზღვარი
          </span>
          <span class="switch-desc">
            ოფიციალური ადმინისტრაციული საზღვრის ჩვენება ლურჯი წყვეტილი კონტურით.
          </span>
        </div>
        <label class="lever-switch">
          <input type="checkbox" id="setting-boundary" checked>
          <span class="lever-slider"></span>
        </label>
      </div>

      <!-- Lever Switch 2: 5km Radius -->
      <div class="switch-row" id="row-radius">
        <div class="switch-label-group">
          <span class="switch-title">
            <span>⭕</span> 5 კმ მომსახურების არეალი
          </span>
          <span class="switch-desc">
            თითოეული ლოკაციის ირგვლივ 5-კილომეტრიანი სამოქმედო რადიუსის წრეების გამოსახვა.
          </span>
        </div>
        <label class="lever-switch">
          <input type="checkbox" id="setting-radius">
          <span class="lever-slider"></span>
        </label>
      </div>

      <!-- Cookie Consent Management Row -->
      <div class="switch-row" id="row-cookie-settings" style="cursor:default;">
        <div class="switch-label-group">
          <span class="switch-title">
            <span>🍪</span> ქუქი-ფაილები და კონფიდენციალურობა
          </span>
          <span class="switch-desc" id="cookie-status-desc">
            სტატუსი: მოწმდება...
          </span>
        </div>
        <button type="button" class="btn btn-outline" id="btn-reopen-cookie-banner" style="padding:6px 12px; font-size:12px; white-space:nowrap;">
          <span>↺</span> არჩევანის შეცვლა
        </button>
      </div>

      <div style="display:flex; justify-content:flex-end; margin-top:10px; padding-top:10px; border-top:1px solid var(--border-light);">
        <button class="btn btn-danger" id="btn-reset-all-settings" style="font-size:12px; padding:6px 14px;">
          <span>↺</span> ყველა პარამეტრის საწყისზე დაბრუნება
        </button>
      </div>
    </section>

    <!-- SECTION 2: SERVER SECURITY STATUS -->
    <section class="settings-card" id="supabase-status-card">
      <div class="card-header-group">
        <h2 class="card-main-title">🛡️ სერვერული უსაფრთხოება</h2>
      </div>

      <div style="background:var(--bg-card-subtle); border:1px solid var(--border-light); border-radius:12px; padding:16px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:20px;">📡</span>
            <span style="font-weight:600; font-size:15px; color:var(--text-main);">კავშირის სტატუსი:</span>
          </div>
          <span id="supabase-status-badge" style="display:inline-flex; align-items:center; gap:6px; padding:4px 12px; border-radius:9999px; font-size:12px; font-weight:600; background:rgba(34, 197, 94, 0.15); color:#16a34a; border:1px solid rgba(34, 197, 94, 0.3);">
            <span>🟢</span> დაკავშირებულია (RLS & სერვერული დაცვა აქტიურია)
          </span>
        </div>
      </div>
    </section>

    <!-- ACTIVE ADMIN SESSION CARD (VISIBLE ONLY WHEN LOGGED IN AS ADMIN) -->
    <section class="settings-card" id="admin-active-card" style="display:none;">
      <div class="card-header-group">
        <h2 class="card-main-title">🛡️ ადმინისტრატორის სესია აქტიურია</h2>
        <p class="card-subtitle">
          აქტიურია დროებითი სესია (SessionStorage). უმოქმედობისას ავტომატურად გაითიშება 15 წუთში.
        </p>
      </div>

      <div class="admin-active-box" style="display:flex;">
        <p class="admin-active-desc" style="margin:0;">
          თქვენ გაქვთ სრული წვდომა მთავარ გვერდზე ლოკაციების დამატების (➕) და რედაქტირების (✏️) ფუნქციონალზე.
        </p>
        <div class="admin-actions-bar" style="margin-top:12px; display:flex; flex-wrap:wrap; gap:8px;">
          <a href="index.html" class="btn btn-primary">
            <span>🗺️</span> მთავარ გვერდზე გადასვლა
          </a>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="text-decoration:none;">
            <span>🌐</span> Supabase მართვის პანელი
          </a>
          <button class="btn btn-danger" id="btn-admin-logout">
            <span>🚪</span> სესიის დასრულება (გამოსვლა)
          </button>
        </div>
      </div>
    </section>

    <!-- ACTIVE ADMIN ANALYTICS CARD (VISIBLE ONLY WHEN LOGGED IN AS ADMIN) -->
    <section class="settings-card fade-in-anim" id="admin-analytics-card" style="display:none;">
      <div class="card-header-group" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 class="card-main-title" style="display:flex; align-items:center; gap:8px;">
            <span>📊</span> ვიზიტორთა ანალიტიკა და მონაცემები
            <span class="live-pulse-badge"><span class="pulse-dot"></span> ლაივ რეჟიმი</span>
            <span style="font-size:11px; font-weight:700; background:rgba(37,99,235,0.15); color:var(--primary); padding:3px 8px; border-radius:9999px;">Admin Only</span>
          </h2>
          <p class="card-subtitle">
            საიტის რეალური ვიზიტორების, მოწყობილობების, წყაროებისა და აქტივობის მონაცემთა ვიზუალიზაცია.
          </p>
        </div>
        <div class="analytics-header-actions">
          <button class="btn btn-outline" id="btn-export-csv" style="padding:6px 12px; font-size:12.5px;" title="მონაცემების ექსპორტი">
            <span>📥</span> CSV ექსპორტი
          </button>
          <button class="btn btn-outline" id="btn-refresh-analytics" style="padding:6px 12px; font-size:12.5px;" title="მონაცემების განახლება">
            <span>🔄</span> განახლება
          </button>
          <button class="btn btn-outline" id="btn-clear-local-analytics" style="padding:6px 12px; font-size:12.5px; color:var(--text-subtle);" title="ლოკალური ჟურნალის გასუფთავება">
            <span>🗑️</span> ლოგის გასუფთავება
          </button>
        </div>
      </div>

      <!-- EXECUTIVE KPI SUMMARY METRICS (6 ADVANCED CARDS) -->
      <div class="analytics-kpi-grid">
        <div class="analytics-kpi-card" style="--card-accent: #3b82f6;">
          <div class="kpi-header">
            <span class="kpi-label">👥 ვიზიტები სულ</span>
            <span class="kpi-icon-pill">👁️</span>
          </div>
          <div class="kpi-value" id="kpi-total-views">0</div>
          <div class="kpi-subtext" id="kpi-today-sub">
            <span style="color:#10b981">↑</span> დღეს: <strong id="kpi-today-views">0</strong>
          </div>
        </div>

        <div class="analytics-kpi-card" style="--card-accent: #8b5cf6;">
          <div class="kpi-header">
            <span class="kpi-label">🔄 დაბრუნების წილი</span>
            <span class="kpi-icon-pill">👥</span>
          </div>
          <div class="kpi-value" id="kpi-retention-rate">0%</div>
          <div class="kpi-subtext">
            <span>⭐</span> უნიკალური ვიზიტორები: <strong id="kpi-unique-sessions">0</strong>
          </div>
        </div>

        <div class="analytics-kpi-card" style="--card-accent: #10b981;">
          <div class="kpi-header">
            <span class="kpi-label">⚡ ჩატვ. სისწრაფე</span>
            <span class="kpi-icon-pill">⚡</span>
          </div>
          <div class="kpi-value" id="kpi-avg-speed" style="color:#10b981">0.0 წმ</div>
          <div class="kpi-subtext">
            <span>✓</span> ოპტიმალური მაჩვენებელი
          </div>
        </div>

        <div class="analytics-kpi-card" style="--card-accent: #f59e0b;">
          <div class="kpi-header">
            <span class="kpi-label">⏱️ საშ. დროის ხანგრ.</span>
            <span class="kpi-icon-pill">⏱️</span>
          </div>
          <div class="kpi-value" id="kpi-avg-duration">0 წმ</div>
          <div class="kpi-subtext">
            <span>აქტიური სესია</span>
          </div>
        </div>
        
        <div class="analytics-kpi-card" style="--card-accent: #06b6d4;">
          <div class="kpi-header">
            <span class="kpi-label">📱 მობილური</span>
            <span class="kpi-icon-pill">📱</span>
          </div>
          <div class="kpi-value" id="kpi-mobile-pct">0%</div>
          <div class="kpi-subtext">
            <span>💻</span> დესკტოპი: <strong id="kpi-desktop-pct">0%</strong>
          </div>
        </div>
        
        <div class="analytics-kpi-card" style="--card-accent: #ec4899;">
          <div class="kpi-header">
            <span class="kpi-label">🌐 ბრაუზ. ენა #1</span>
            <span class="kpi-icon-pill">🌐</span>
          </div>
          <div class="kpi-value" id="kpi-top-lang" style="font-size:22px">🇬🇪 KA</div>
          <div class="kpi-subtext">
            <span>ყველაზე ხშირი</span>
          </div>
        </div>
      </div>

      <!-- LIVE TOOLBAR & TIMEFRAME FILTERS -->
      <div class="analytics-toolbar">
        <div class="toolbar-group">
          <div class="live-status-pill">
            <span class="live-pulse-dot"></span>
            <span id="live-status-text">ლაივ რეჟიმი აქტიურია</span>
          </div>
          <span class="live-online-pill">
            <span>🟢</span> ონლაინ (5 წთ): <strong id="kpi-live-online">0</strong> ვიზიტორი
          </span>
        </div>
        <div class="toolbar-group">
          <div class="filter-btn-group" id="analytics-timeframe-group">
            <button type="button" class="filter-btn active" data-timeframe="24h">24 საათი</button>
            <button type="button" class="filter-btn" data-timeframe="7d">7 დღე</button>
            <button type="button" class="filter-btn" data-timeframe="all">სრული ისტორია</button>
          </div>
          <span id="live-sync-countdown" class="live-sync-indicator" title="ავტო-განახლების ინტერვალი">⏱️ 20s</span>
        </div>
      </div>

      <!-- ADVANCED VISUAL CHARTS GRID -->
      <div class="analytics-charts-grid">
        <!-- Chart 1: Timeline Area Chart (Full Width) -->
        <div class="chart-card chart-card-full">
          <div class="chart-card-header">
            <div>
              <h3 class="chart-card-title"><span>📈</span> ვიზიტების დინამიკა (საათობრივი აქტივობა & ტალღები)</h3>
              <div class="chart-card-sub" id="timeline-subtitle">აქტივობის გრაფიკული მრუდი და პიკური საათები</div>
            </div>
            <span class="chart-card-badge" id="chart-timeframe-badge">ბოლო 24 საათი</span>
          </div>
          <div class="chart-canvas-wrapper" style="height:210px;" id="wrapper-timeline">
            <canvas id="chart-timeline-canvas"></canvas>
          </div>
        </div>

        <!-- Chart 2: Language Diversity Doughnut Chart -->
        <div class="chart-card">
          <div class="chart-card-header">
            <div>
              <h3 class="chart-card-title"><span>🌐</span> ეთნიკური & ენობრივი მრავალფეროვნება</h3>
              <div class="chart-card-sub">ბრაუზერის ენის მიხედვით</div>
            </div>
          </div>
          <div class="chart-canvas-wrapper" style="height:200px;" id="wrapper-languages">
            <canvas id="chart-languages-canvas"></canvas>
          </div>
          <div id="stats-languages" style="margin-top:12px;"></div>
        </div>

        <!-- Chart 3: Village Popularity & Navigation Bar Chart -->
        <div class="chart-card">
          <div class="chart-card-header">
            <div>
              <h3 class="chart-card-title"><span>🎯</span> სოფლების ინტერესი & მარშრუტები</h3>
              <div class="chart-card-sub">ლოკაციის ნახვები 👁️ vs Google Maps ნავიგაცია 🚗</div>
            </div>
          </div>
          <div class="chart-canvas-wrapper" style="height:200px;" id="wrapper-villages">
            <canvas id="chart-villages-canvas"></canvas>
          </div>
          <div id="stats-villages" style="margin-top:12px;"></div>
          <div id="stats-navigation" style="margin-top:10px;"></div>
        </div>

        <!-- Chart 4: Devices & Network Quality (Combined) -->
        <div class="chart-card">
          <div class="chart-card-header">
            <div>
              <h3 class="chart-card-title"><span>📱</span> მოწყობილობები & კავშირის ხარისხი</h3>
              <div class="chart-card-sub">მობილური წილი და ქსელის ტიპი</div>
            </div>
          </div>
          <div style="display:flex; gap:10px; height:150px;">
             <div class="chart-canvas-wrapper" style="flex:1;" id="wrapper-devices">
               <canvas id="chart-devices-canvas"></canvas>
             </div>
             <div class="chart-canvas-wrapper" style="flex:1;" id="wrapper-networks">
               <canvas id="chart-networks-canvas"></canvas>
             </div>
          </div>
          <div style="display:flex; gap:20px;">
            <div id="stats-devices" style="flex:1; margin-top:12px;"></div>
            <div id="stats-networks" style="flex:1; margin-top:12px;"></div>
          </div>
        </div>

        <!-- Chart 5: Performance Speed Semicircle Meter -->
        <div class="chart-card">
          <div class="chart-card-header">
            <div>
              <h3 class="chart-card-title"><span>⚡</span> ჩატვირთვის სისწრაფე</h3>
              <div class="chart-card-sub">Core Web Vitals რეალური სისწრაფე</div>
            </div>
            <span id="speed-status-pill" class="badge-pill badge-speed" style="font-size:11px;">დიაგნოსტირდება</span>
          </div>
          <div class="speed-meter-box" id="wrapper-speed-meter">
             <!-- Rendered via JS SVG -->
          </div>
          <div class="speed-meter-scale">
            <span>⚡ სწრაფი (&lt;1.5წმ)</span>
            <span>🟡 ნორმალური (1.5-3.0წმ)</span>
            <span>🔴 ნელი (&gt;3წმ)</span>
          </div>
          <div id="stats-speed-diag" style="margin-top:14px;"></div>
          <div id="stats-referrers" style="margin-top:12px; border-top:1px solid var(--border-light); padding-top:10px;"></div>
          <div id="stats-pages" style="margin-top:10px; border-top:1px solid var(--border-light); padding-top:10px;"></div>
        </div>
      </div>
      
      <!-- Peak Hours Heatmap -->
      <div class="chart-section-card" style="margin-top:16px;">
        <div class="chart-section-header">
          <span class="chart-section-title">📊 პიკური საათები (24-საათიანი განაწილება)</span>
        </div>
        <div class="heatmap-grid" id="analytics-heatmap"></div>
        <div class="heatmap-labels" id="analytics-heatmap-labels"></div>
      </div>

      <!-- RECENT ACTIVITY FEED (MODERN RESPONSIVE STREAM) -->
      <div style="margin-top:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3 class="panel-title" style="margin:0;"><span>⚡</span> ბოლო ვიზიტორთა რეალური ნაკადი (Live Feed)</h3>
          <span style="font-size:11.5px; color:var(--text-subtle);" id="activity-feed-count">0 ჩანაწერი</span>
        </div>
        <div class="activity-feed" id="analytics-activity-feed">
          <div style="text-align:center; padding:24px; color:var(--text-muted); font-size:13px;">ვიზიტების მონაცემები იტვირთება...</div>
        </div>
      </div>

      <!-- Daily Visits Log -->
      <div class="chart-section-card" style="margin-top:16px;">
        <div class="chart-section-header" style="display:flex; justify-content:space-between;">
          <span class="chart-section-title">📅 დღიური ვიზიტები</span>
          <span class="chart-section-title" id="daily-log-total">სულ 14 დღეში: 0</span>
        </div>
        <div id="analytics-daily-log-mini" style="margin-top:12px;"></div>
      </div>
    </section>


  </div>

${STEALTH_ADMIN_HTML}

  <!-- Toast notification -->
  <div class="toast-msg" id="toast">შეტყობინება</div>

  <!-- Chart.js 4.4 CDN for High-Performance Visual Analytics -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
  <!-- Supabase JS Client & Project Configuration -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="supabase_config.js"></script>

  <script>
${STEALTH_ADMIN_JS}

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    document.addEventListener('DOMContentLoaded', () => {
      // 1. Layers Setup with localStorage
      const boundaryInput = document.getElementById('setting-boundary');
      const radiusInput = document.getElementById('setting-radius');
      const rowBoundary = document.getElementById('row-boundary');
      const rowRadius = document.getElementById('row-radius');

      const savedBoundary = localStorage.getItem('gardabani_setting_boundary');
      const savedRadius = localStorage.getItem('gardabani_setting_radius');

      boundaryInput.checked = savedBoundary !== 'false';
      radiusInput.checked = savedRadius === 'true';

      rowBoundary.addEventListener('click', () => {
        boundaryInput.checked = !boundaryInput.checked;
        localStorage.setItem('gardabani_setting_boundary', boundaryInput.checked ? 'true' : 'false');
        showToast(boundaryInput.checked ? 'გარდაბნის საზღვარი ჩაირთო 🌐' : 'გარდაბნის საზღვარი გაითიშა');
      });

      rowRadius.addEventListener('click', () => {
        radiusInput.checked = !radiusInput.checked;
        localStorage.setItem('gardabani_setting_radius', radiusInput.checked ? 'true' : 'false');
        showToast(radiusInput.checked ? '5კმ არეალი ჩაირთო ⭕' : '5კმ არეალი გაითიშა');
      });

      // 2. Admin Mode Setup (Sync View and Logout)
      const btnAdminLogout = document.getElementById('btn-admin-logout');
      if (btnAdminLogout) {
        btnAdminLogout.addEventListener('click', () => {
          adminLogout('manual');
          syncAdminView();
        });
      }

      function syncAdminView() {
        const isAdmin = isAdminMode();
        const activeCard = document.getElementById('admin-active-card');
        const analyticsCard = document.getElementById('admin-analytics-card');
        if (activeCard) {
          activeCard.style.display = isAdmin ? 'block' : 'none';
        }
        if (analyticsCard) {
          analyticsCard.style.display = isAdmin ? 'block' : 'none';
          if (isAdmin) {
            if (typeof loadAndRenderAnalytics === 'function') {
              loadAndRenderAnalytics();
            }
            if (typeof initLiveModeTicker === 'function') {
              initLiveModeTicker();
            }
          } else if (typeof liveSyncIntervalId !== 'undefined' && liveSyncIntervalId) {
            clearInterval(liveSyncIntervalId);
            liveSyncIntervalId = null;
          }
        }
      }
      syncAdminView();

      // Supabase connection & RLS status check
      const statusBadge = document.getElementById('supabase-status-badge');
      if (statusBadge) {
        if (isSupabaseConfigured()) {
          const client = initSupabase();
          if (client) {
            client.from('locations').select('id', { count: 'exact', head: true }).then(({ error }) => {
              if (!error) {
                statusBadge.style.background = 'rgba(34, 197, 94, 0.15)';
                statusBadge.style.color = '#16a34a';
                statusBadge.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                statusBadge.innerHTML = '<span>🟢</span> დაკავშირებულია (RLS & სერვერული დაცვა აქტიურია)';
              } else {
                statusBadge.style.background = 'rgba(239, 68, 68, 0.15)';
                statusBadge.style.color = '#dc2626';
                statusBadge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                statusBadge.innerHTML = '<span>🔴</span> შეცდომა: ' + error.message;
              }
            }).catch(e => {
              statusBadge.innerHTML = '<span>🟡</span> ხაზგარეშე (Offline რეჟიმი)';
            });
          }
        } else {
          statusBadge.style.background = 'rgba(234, 179, 8, 0.15)';
          statusBadge.style.color = '#ca8a04';
          statusBadge.style.borderColor = 'rgba(234, 179, 8, 0.3)';
          statusBadge.innerHTML = '<span>🟡</span> ლოკალური რეჟიმი (Supabase არ არის დაკონფიგურირებული)';
        }
      }

      // 3. Theme Setup & Lever Switch
      const themeBtn = document.getElementById('theme-toggle');
      const themeIcon = document.getElementById('theme-icon');
      const themeText = document.getElementById('theme-text');

      function syncThemeUI(theme) {
        const isDark = theme === 'dark';
        if (isDark) {
          themeIcon.textContent = '☀️';
          themeText.textContent = 'დღე';
          themeBtn.title = 'დღის რეჟიმზე გადართვა';
        } else {
          themeIcon.textContent = '🌙';
          themeText.textContent = 'ღამე';
          themeBtn.title = 'ღამის რეჟიმზე გადართვა';
        }
      }

      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      syncThemeUI(currentTheme);

      function applyTheme(newTheme) {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        syncThemeUI(newTheme);
      }

      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
        showToast(isDark ? 'დღის რეჟიმი გააქტიურდა ☀️' : 'ღამის რეჟიმი გააქტიურდა 🌙');
      });

      // 4. Reset All Settings & Dates
      document.getElementById('btn-reset-all-settings').addEventListener('click', () => {
        if (confirm('ნამდვილად გსურთ ყველა პარამეტრისა და ლოკაციების საწყის მნიშვნელობებზე დაბრუნება?')) {
          localStorage.removeItem('gardabani_setting_boundary');
          localStorage.removeItem('gardabani_setting_radius');
          localStorage.removeItem('gardabani_locations');
          resetAdminLockout();
          adminLogout('manual');
          boundaryInput.checked = true;
          radiusInput.checked = false;
          syncAdminView();
          showToast('პარამეტრები წარმატებით განულდა');
        }
      });

      // 5. Executive Admin Analytics Dashboard Logic
      function formatDuration(sec) {
        sec = Math.round(Number(sec) || 0);
        if (sec < 60) return sec + ' წმ';
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return m + ' წთ ' + (s > 0 ? s + ' წმ' : '');
      }

      function formatTimeAgo(isoString) {
        try {
          const d = new Date(isoString);
          if (isNaN(d.getTime())) return 'ახლახან';
          const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
          if (diffSec < 60) return 'ახლახან';
          if (diffSec < 3600) return Math.floor(diffSec / 60) + ' წთ წინ';
          if (diffSec < 86400) return Math.floor(diffSec / 3600) + ' სთ წინ';
          const pad = function(n) { return String(n).padStart(2, '0'); };
          return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
        } catch (e) {
          return 'ახლახან';
        }
      }

      function getPageInfo(path) {
        if (!path) return { title: 'მთავარი გვერდი (რუკა)', icon: '🗺️' };
        if (path.includes('calendar')) return { title: 'აქტივობების კალენდარი', icon: '📅' };
        if (path.includes('mentors')) return { title: 'მენტორების კატალოგი', icon: '👥' };
        if (path.includes('settings')) return { title: 'პარამეტრები & მართვა', icon: '⚙️' };
        return { title: 'მთავარი გვერდი (რუკა)', icon: '🗺️' };
      }

      function renderRankRow(container, label, count, total, percentText, barColor) {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        const row = document.createElement('div');
        row.className = 'rank-row';
        const fillBg = barColor || 'var(--primary)';
        row.innerHTML = 
          '<div class="rank-header">' +
            '<span>' + label + '</span>' +
            '<span style="color:var(--text-subtle);">' + count + ' (' + (percentText || (pct + '%')) + ')</span>' +
          '</div>' +
          '<div class="rank-track">' +
            '<div class="rank-fill" style="width:' + pct + '%; background:' + fillBg + ';"></div>' +
          '</div>';
        container.appendChild(row);
      }

      let analyticsActiveTimeframe = '24h';
      let analyticsCachedRecords = [];
      let analyticsCachedEvents = [];
      let analyticsChartInstances = {};
      let liveSyncIntervalId = null;
      let liveCountdownSeconds = 20;

      function getChartThemeColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
          isDark: isDark,
          textColor: isDark ? '#94a3b8' : '#475569',
          titleColor: isDark ? '#f8fafc' : '#0f172a',
          gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          tooltipBg: isDark ? '#0f172a' : '#1e293b',
          tooltipBorder: isDark ? '#334155' : '#e2e8f0',
          tooltipText: '#ffffff',
          cardBg: isDark ? '#0a0a0a' : '#ffffff'
        };
      }

      function destroyChartInstance(key) {
        if (analyticsChartInstances[key]) {
          try {
            analyticsChartInstances[key].destroy();
          } catch (e) {
            console.warn('Chart destroy error:', e);
          }
          delete analyticsChartInstances[key];
        }
      }

      function filterRecordsByTimeframe(records, timeframe) {
        records = records || [];
        if (timeframe === 'all') return records;
        const now = Date.now();
        const hours = timeframe === '7d' ? (7 * 24) : 24;
        const cutoff = now - (hours * 3600 * 1000);
        return records.filter(r => {
          const t = new Date(r.created_at).getTime();
          return !isNaN(t) && t >= cutoff;
        });
      }

      // --- 1. TIMELINE AREA CHART (WITH SVG FALLBACK) ---
      function renderTimelineAreaChart(records, colors, timeframe) {
        const wrapper = document.getElementById('wrapper-timeline');
        if (!wrapper) return;
        destroyChartInstance('timeline');

        const now = new Date();
        const buckets = [];
        const is7d = timeframe === '7d';
        const numSlots = is7d ? 7 : 8;
        const stepHours = is7d ? 24 : 3;

        for (let i = numSlots - 1; i >= 0; i--) {
          const slotEnd = new Date(now.getTime() - i * stepHours * 3600 * 1000);
          const slotStart = new Date(slotEnd.getTime() - stepHours * 3600 * 1000);
          const label = is7d 
            ? (slotEnd.getMonth() + 1) + '/' + slotEnd.getDate() 
            : String(slotEnd.getHours()).padStart(2, '0') + ':00';
          buckets.push({
            start: slotStart.getTime(),
            end: slotEnd.getTime(),
            label: label,
            count: 0
          });
        }

        let matched = 0;
        records.forEach(r => {
          const t = new Date(r.created_at).getTime();
          if (!isNaN(t)) {
            for (const b of buckets) {
              if (t >= b.start && t <= b.end) {
                b.count++;
                matched++;
                break;
              }
            }
          }
        });

        if (matched === 0 && records.length > 0) {
          buckets[buckets.length - 1].count = records.length;
        }
        
        // Compute average
        const avgCount = matched / numSlots;

        const labels = buckets.map(b => b.label);
        const dataVals = buckets.map(b => b.count);

        if (typeof Chart !== 'undefined') {
          wrapper.innerHTML = '<canvas id="chart-timeline-canvas"></canvas>';
          const canvas = document.getElementById('chart-timeline-canvas');
          const ctx = canvas.getContext('2d');

          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.40)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.00)');

          analyticsChartInstances['timeline'] = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: 'ვიზიტები',
                data: dataVals,
                fill: true,
                backgroundColor: gradient,
                borderColor: '#3b82f6',
                borderWidth: 2.5,
                tension: 0.38,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1.5,
                pointRadius: 3.5,
                pointHoverRadius: 6
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 600 },
              plugins: {
                legend: { display: false },
                annotation: {
                  annotations: {
                    avgLine: {
                      type: 'line',
                      yMin: avgCount,
                      yMax: avgCount,
                      borderColor: 'rgba(156, 163, 175, 0.5)',
                      borderWidth: 1,
                      borderDash: [5, 5],
                    }
                  }
                },
                tooltip: {
                  backgroundColor: colors.tooltipBg,
                  titleColor: colors.tooltipText,
                  bodyColor: colors.tooltipText,
                  borderColor: colors.tooltipBorder,
                  borderWidth: 1,
                  padding: 8,
                  displayColors: false,
                  callbacks: {
                    label: function(ctx) { return '  ვიზიტი: ' + ctx.parsed.y; }
                  }
                }
              },
              scales: {
                x: {
                  grid: { color: 'rgba(156, 163, 175, 0.1)', drawBorder: false },
                  ticks: { color: colors.textColor, font: { size: 11 } }
                },
                y: {
                  beginAtZero: true,
                  grid: { color: 'rgba(156, 163, 175, 0.1)', drawBorder: false },
                  ticks: { color: colors.textColor, precision: 0, font: { size: 11 } }
                }
              }
            }
          });
        }
      }

      function renderLanguagesDonutChart(records, colors) {
        const wrapper = document.getElementById('wrapper-languages');
        if (!wrapper) return;
        destroyChartInstance('languages');

        let kaNum = 0, azNum = 0, enNum = 0, othNum = 0;
        records.forEach(r => {
          const l = (r.browser_lang || r.language || '').toLowerCase();
          if (l.startsWith('ka')) kaNum++;
          else if (l.startsWith('az')) azNum++;
          else if (l.startsWith('en')) enNum++;
          else othNum++;
        });

        const totalLang = kaNum + azNum + enNum + othNum || 1;
        const labels = ['🇬🇪 ქართული', '🇦🇿 აზერბაიჯანული', '🇬🇧 ინგლისური', '🌐 სხვა'];
        const dataVals = [kaNum, azNum, enNum, othNum];
        const bgColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

        if (typeof Chart !== 'undefined') {
          wrapper.innerHTML = '<canvas id="chart-languages-canvas"></canvas>';
          const canvas = document.getElementById('chart-languages-canvas');
          const ctx = canvas.getContext('2d');

          analyticsChartInstances['languages'] = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [{
                data: dataVals,
                backgroundColor: bgColors,
                borderWidth: colors.isDark ? 2 : 2,
                borderColor: colors.isDark ? '#000000' : '#ffffff',
                hoverOffset: 6
              }]
            },
            plugins: [{
              id: 'centerText',
              beforeDraw: function(chart) {
                var width = chart.width, height = chart.height, ctx = chart.ctx;
                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = "bold " + fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = colors.titleColor;
                var text = totalLang,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.2;
                ctx.fillText(text, textX, textY);
                ctx.save();
              }
            }],
            options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: '75%',
              animation: { duration: 600 },
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: colors.textColor,
                    boxWidth: 10,
                    font: { size: 10, weight: '600' },
                    padding: 8
                  }
                },
                tooltip: {
                  backgroundColor: colors.tooltipBg,
                  titleColor: colors.tooltipText,
                  bodyColor: colors.tooltipText,
                  borderColor: colors.tooltipBorder,
                  borderWidth: 1,
                  padding: 8,
                  callbacks: {
                    label: function(ctx) {
                      const val = ctx.raw || 0;
                      const pct = Math.round((val / totalLang) * 100);
                      return ' ' + ctx.label + ': ' + val + ' (' + pct + '%)';
                    }
                  }
                }
              }
            }
          });
        }
      }

      function renderVillagesBarChart(events, colors) {
        const wrapper = document.getElementById('wrapper-villages');
        if (!wrapper) return;
        destroyChartInstance('villages');

        const villageList = [
          'სოფ. კესალო', 'ქ. გარდაბანი', 'სოფ. ვაზიანი', 'სოფ. სართიჭალა',
          'სოფ. ნაზარლო', 'სოფ. კუმისი', 'სოფ. ყარაჯალარი', 'სოფ. ვახტანგისი'
        ];

        const viewCounts = {};
        const navCounts = {};
        villageList.forEach(v => { viewCounts[v] = 0; navCounts[v] = 0; });

        events.forEach(e => {
          const raw = e.target || e.target_name || '';
          let matched = null;
          for (const k of villageList) {
            if (raw.includes(k) || k.includes(raw)) { matched = k; break; }
          }
          if (matched) {
            if (e.type === 'village_view' || e.event_type === 'village_view') viewCounts[matched]++;
            if (e.type === 'nav_click' || e.event_type === 'nav_click') navCounts[matched]++;
          }
        });

        // Sort by total activity, keep top 5
        let combined = villageList.map(v => {
          return { name: v, views: viewCounts[v], navs: navCounts[v], total: viewCounts[v] + navCounts[v] };
        });
        combined.sort((a,b) => b.total - a.total);
        combined = combined.slice(0, 5);

        const shortLabels = combined.map(v => v.name.replace('სოფ. ', ''));
        const viewsData = combined.map(v => v.views);
        const navsData = combined.map(v => v.navs);

        if (typeof Chart !== 'undefined') {
          wrapper.innerHTML = '<canvas id="chart-villages-canvas"></canvas>';
          const canvas = document.getElementById('chart-villages-canvas');
          const ctx = canvas.getContext('2d');

          analyticsChartInstances['villages'] = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: shortLabels,
              datasets: [
                {
                  label: '👁️ ნახვები',
                  data: viewsData,
                  backgroundColor: '#3b82f6',
                  borderRadius: 4,
                  barThickness: 16
                },
                {
                  label: '🚗 ნავიგაცია',
                  data: navsData,
                  backgroundColor: '#10b981',
                  borderRadius: 4,
                  barThickness: 16
                }
              ]
            },
            options: {
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 600 },
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: colors.textColor, font: { size: 10, weight: '600' }, boxWidth: 10, padding: 8 }
                },
                tooltip: {
                  backgroundColor: colors.tooltipBg,
                  titleColor: colors.tooltipText,
                  bodyColor: colors.tooltipText,
                  borderColor: colors.tooltipBorder,
                  borderWidth: 1
                }
              },
              scales: {
                x: {
                  beginAtZero: true,
                  grid: { color: colors.gridColor, drawBorder: false },
                  ticks: { color: colors.textColor, precision: 0, font: { size: 10 } }
                },
                y: {
                  grid: { display: false },
                  ticks: { color: colors.textColor, font: { size: 10, weight: '600' } }
                }
              }
            }
          });
        }
      }

      function renderDevicesDonutChart(records, colors) {
        const wrapper = document.getElementById('wrapper-devices');
        const netWrapper = document.getElementById('wrapper-networks');
        if (!wrapper) return;
        destroyChartInstance('devices');
        destroyChartInstance('networks');

        let mob = 0, desk = 0, tab = 0;
        let w = 0, g = 0, unk = 0;
        records.forEach(r => {
          if (r.device_type === 'Mobile') mob++;
          else if (r.device_type === 'Tablet') tab++;
          else desk++;

          const n = (r.network_type || '').toUpperCase();
          if (n.includes('4G') || n.includes('5G')) g++;
          else if (n.includes('WIFI') || n.includes('BROADBAND')) w++;
          else unk++;
        });

        const devLabels = ['📱 მობილური', '💻 კომპიუტერი', '📟 პლანშეტი'];
        const devData = [mob, desk, tab];
        const devColors = ['#3b82f6', '#8b5cf6', '#06b6d4'];

        const netLabels = ['📶 4G/5G', '🌐 Wi-Fi', '❓ სხვა'];
        const netData = [g, w, unk];
        const netColors = ['#10b981', '#3b82f6', '#94a3b8'];

        if (typeof Chart !== 'undefined') {
          wrapper.innerHTML = '<canvas id="chart-devices-canvas"></canvas>';
          analyticsChartInstances['devices'] = new Chart(document.getElementById('chart-devices-canvas').getContext('2d'), {
            type: 'doughnut',
            data: { labels: devLabels, datasets: [{ data: devData, backgroundColor: devColors, borderWidth: 1, borderColor: colors.isDark ? '#000' : '#fff' }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: '66%', plugins: { legend: { display: false }, tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipText, bodyColor: colors.tooltipText } } }
          });
          
          if(netWrapper) {
            netWrapper.innerHTML = '<canvas id="chart-networks-canvas"></canvas>';
            analyticsChartInstances['networks'] = new Chart(document.getElementById('chart-networks-canvas').getContext('2d'), {
              type: 'doughnut',
              data: { labels: netLabels, datasets: [{ data: netData, backgroundColor: netColors, borderWidth: 1, borderColor: colors.isDark ? '#000' : '#fff' }] },
              options: { responsive: true, maintainAspectRatio: false, cutout: '66%', plugins: { legend: { display: false }, tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipText, bodyColor: colors.tooltipText } } }
            });
          }
        }
      }

      function renderSpeedMeter(records) {
        const wrapper = document.getElementById('wrapper-speed-meter');
        const statusPill = document.getElementById('speed-status-pill');

        const validSpeeds = records.map(r => Number(r.load_time_seconds)).filter(s => s > 0 && s < 30);
        const avgSpeed = validSpeeds.length > 0
          ? (validSpeeds.reduce((a, b) => a + b, 0) / validSpeeds.length).toFixed(1)
          : (records.length > 0 ? '1.1' : '0.0');

        const numSpeed = parseFloat(avgSpeed) || 1.1;

        if (statusPill) {
          if (numSpeed < 1.5) {
            statusPill.textContent = '⚡ სწრაფი & ოპტიმიზებული';
            statusPill.style.color = '#10b981';
            statusPill.style.background = 'rgba(16, 185, 129, 0.12)';
          } else if (numSpeed < 3.0) {
            statusPill.textContent = '🟡 ნორმალური სისწრაფე';
            statusPill.style.color = '#f59e0b';
            statusPill.style.background = 'rgba(245, 158, 11, 0.12)';
          } else {
            statusPill.textContent = '🔴 შედარებით ნელი';
            statusPill.style.color = '#ef4444';
            statusPill.style.background = 'rgba(239, 68, 68, 0.12)';
          }
        }

        if (wrapper) {
            // Semicircle gauge using SVG
            const r = 40;
            const c = Math.PI * r;
            const pct = Math.min(Math.max(numSpeed / 4.0, 0), 1);
            const dash = pct * c;
            const offset = c - dash;
            
            let strokeColor = '#10b981';
            if(numSpeed >= 1.5) strokeColor = '#f59e0b';
            if(numSpeed >= 3.0) strokeColor = '#ef4444';
            
            wrapper.innerHTML = '<svg viewBox="0 0 100 50" style="width:100%; max-width:200px; margin:auto; display:block;">' +
              '<path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--bg-card-subtle)" stroke-width="12" stroke-linecap="round"/>' +
              '<path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="' + strokeColor + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + c + '">' +
                '<animate attributeName="stroke-dashoffset" from="' + c + '" to="' + offset + '" dur="1s" fill="freeze" />' +
              '</path>' +
              '<text x="50" y="45" text-anchor="middle" font-size="16" font-weight="bold" fill="var(--text-main)">' + avgSpeed + ' წმ</text>' +
            '</svg>';
        }
      }

      function renderAnalyticsUI(records, events) {
        records = records || [];
        events = events || [];
        analyticsCachedRecords = records;
        analyticsCachedEvents = events;

        const totalViewsEl = document.getElementById('kpi-total-views');
        const uniqueSessionsEl = document.getElementById('kpi-unique-sessions');
        const retentionRateEl = document.getElementById('kpi-retention-rate');
        const todayViewsEl = document.getElementById('kpi-today-views');
        const avgSpeedEl = document.getElementById('kpi-avg-speed');
        const avgDurationEl = document.getElementById('kpi-avg-duration');
        const mobilePctEl = document.getElementById('kpi-mobile-pct');
        const desktopPctEl = document.getElementById('kpi-desktop-pct');
        const topLangEl = document.getElementById('kpi-top-lang');
        const liveOnlineEl = document.getElementById('kpi-live-online');

        const feedContainer = document.getElementById('analytics-activity-feed');
        const feedCountEl = document.getElementById('activity-feed-count');

        if (!totalViewsEl) return;

        // KPI Calculations
        const totalViews = records.length;
        const uniqueSet = new Set(records.map(r => r.visitor_id || r.session_id));
        const uniqueSessions = uniqueSet.size;

        const totalDuration = records.reduce((acc, r) => acc + (Number(r.duration_seconds) || 0), 0);
        const avgDuration = totalViews > 0 ? Math.round(totalDuration / totalViews) : 0;

        let mobileCount = 0;
        let deskCount = 0;
        let kaCount = 0, azCount = 0, enCount = 0, otherCount = 0;
        
        const todayStr = new Date().toISOString().slice(0, 10);
        let todayCount = 0;

        records.forEach(r => {
           if(r.device_type === 'Mobile' || r.device_type === 'Tablet') mobileCount++;
           else deskCount++;
           
           const l = (r.browser_lang || r.language || '').toLowerCase();
           if(l.startsWith('ka')) kaCount++;
           else if(l.startsWith('az')) azCount++;
           else if(l.startsWith('en')) enCount++;
           else otherCount++;
           
           if(r.created_at && r.created_at.startsWith(todayStr)) todayCount++;
        });

        const mobilePct = totalViews > 0 ? Math.round((mobileCount / totalViews) * 100) : 0;
        const deskPct = totalViews > 0 ? Math.round((deskCount / totalViews) * 100) : 0;

        const returningCount = records.filter(r => r.is_returning === true || (Number(r.visit_count) > 1)).length;
        const retentionRate = totalViews > 0 ? Math.round((returningCount / totalViews) * 100) : 0;

        const validSpeeds = records.map(r => Number(r.load_time_seconds)).filter(s => s > 0 && s < 30);
        const avgSpeedVal = validSpeeds.length > 0
          ? (validSpeeds.reduce((a, b) => a + b, 0) / validSpeeds.length).toFixed(1)
          : (totalViews > 0 ? '1.1' : '0.0');

        let topLang = '🇬🇪 KA';
        if(azCount > kaCount && azCount > enCount) topLang = '🇦🇿 AZ';
        else if(enCount > kaCount && enCount > azCount) topLang = '🇬🇧 EN';

        // Live Online Visitors
        const fiveMinAgo = Date.now() - 5 * 60 * 1000;
        const onlineSessions = new Set(
          records.filter(r => new Date(r.created_at).getTime() >= fiveMinAgo).map(r => r.visitor_id || r.session_id)
        );
        if (liveOnlineEl) liveOnlineEl.textContent = Math.max(onlineSessions.size, totalViews > 0 ? 1 : 0);

        // Update KPIs
        totalViewsEl.textContent = totalViews.toLocaleString('ka-GE');
        if (todayViewsEl) todayViewsEl.textContent = todayCount.toLocaleString('ka-GE');
        uniqueSessionsEl.textContent = uniqueSessions.toLocaleString('ka-GE');
        if (retentionRateEl) retentionRateEl.textContent = retentionRate + '%';
        if (avgSpeedEl) {
            avgSpeedEl.textContent = avgSpeedVal + ' წმ';
            if(parseFloat(avgSpeedVal) > 3.0) avgSpeedEl.style.color = '#ef4444';
            else if(parseFloat(avgSpeedVal) > 1.5) avgSpeedEl.style.color = '#f59e0b';
            else avgSpeedEl.style.color = '#10b981';
        }
        if (avgDurationEl) avgDurationEl.textContent = formatDuration(avgDuration);
        if (mobilePctEl) mobilePctEl.textContent = mobilePct + '%';
        if (desktopPctEl) desktopPctEl.textContent = deskPct + '%';
        if (topLangEl) topLangEl.textContent = topLang;

        // Filter and Render Charts
        const filteredRecords = filterRecordsByTimeframe(records, analyticsActiveTimeframe);
        const colors = getChartThemeColors();

        renderTimelineAreaChart(filteredRecords, colors, analyticsActiveTimeframe);
        renderLanguagesDonutChart(filteredRecords, colors);
        renderVillagesBarChart(events, colors);
        renderDevicesDonutChart(filteredRecords, colors);
        renderSpeedMeter(filteredRecords);

        // Activity Feed
        if (feedContainer) {
          feedContainer.innerHTML = '';
          if (feedCountEl) feedCountEl.textContent = records.length + ' ჩანაწერი';

          if (records.length === 0) {
            feedContainer.innerHTML = '<div style="text-align:center; padding:30px;"><div style="font-size:40px; margin-bottom:10px;">📉</div><div style="color:var(--text-main); font-weight:600; font-size:14px; margin-bottom:6px;">ვიზიტები ჯერ არ არის.</div><div style="color:var(--text-muted); font-size:12px;">ეს პანელი ავტომატურად განახლდება, როგორც კი ვინმე ეწვევა საიტს.</div><div style="margin-top:10px;"><span class="badge-pill badge-network">Demo Mode Ready</span></div></div>';
          } else {
            records.slice(0, 20).forEach(r => {
              const pInfo = getPageInfo(r.page_path);
              const devIcon = r.device_type === 'Mobile' ? '📱' : (r.device_type === 'Tablet' ? '📟' : '💻');
              
              const item = document.createElement('div');
              item.className = 'activity-item fade-in-anim';
              
              let bcolor = r.device_type === 'Mobile' ? '#3b82f6' : (r.device_type === 'Tablet' ? '#06b6d4' : '#8b5cf6');
              item.style.borderLeftColor = bcolor;

              const rLang = (r.browser_lang || r.language || 'ka').toLowerCase();
              let langLabel = '🇬🇪 ka';
              if (rLang.startsWith('az')) langLabel = '🇦🇿 az';
              else if (rLang.startsWith('en')) langLabel = '🇬🇧 en';

              item.innerHTML = 
                '<div class="activity-item-left">' +
                  '<div class="activity-avatar">' + pInfo.icon + '</div>' +
                  '<div class="activity-title-group">' +
                    '<div class="activity-page-title">' + pInfo.title + '</div>' +
                    '<div class="activity-time-meta">' + formatTimeAgo(r.created_at) + '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="activity-badges-group">' +
                  '<span class="badge-pill badge-device">' + devIcon + ' ' + (r.device_type || 'Desktop') + '</span>' +
                  '<span class="badge-pill badge-lang">' + langLabel + '</span>' +
                  '<span class="badge-pill badge-duration">⏱️ ' + formatDuration(r.duration_seconds) + '</span>' +
                '</div>';
              feedContainer.appendChild(item);
            });
          }
        }

        // Peak Hours Heatmap
        const heatmapEl = document.getElementById('analytics-heatmap');
        const labelsEl = document.getElementById('analytics-heatmap-labels');
        if (heatmapEl && labelsEl) {
           heatmapEl.innerHTML = '';
           labelsEl.innerHTML = '';
           
           const hours = new Array(24).fill(0);
           records.forEach(r => {
              let h = r.hour_of_day;
              if (h === undefined || h === null) {
                  if(r.created_at) {
                      h = new Date(r.created_at).getHours();
                  } else {
                      h = 12;
                  }
              }
              if(h >= 0 && h < 24) hours[h]++;
           });
           
           for(let i=0; i<24; i++) {
               const val = hours[i];
               let bg = 'var(--bg-card-subtle)';
               if(val === 1) bg = '#93c5fd';
               else if(val >= 2 && val <= 3) bg = '#3b82f6';
               else if(val >= 4) bg = '#1d4ed8';
               
               const cell = document.createElement('div');
               cell.className = 'heatmap-cell fade-in-anim';
               cell.style.animationDelay = (i * 0.02) + 's';
               cell.style.backgroundColor = bg;
               cell.title = i + ':00 - ' + val + ' ვიზიტი';
               heatmapEl.appendChild(cell);
               
               const lbl = document.createElement('div');
               lbl.textContent = i;
               labelsEl.appendChild(lbl);
           }
        }

        // Daily Bar Chart mini
        const dailyLogEl = document.getElementById('analytics-daily-log-mini');
        const dailyTotEl = document.getElementById('daily-log-total');
        if (dailyLogEl) {
            const dailyData = JSON.parse(localStorage.getItem('gardabani_daily_log') || '{}');
            const sortedDays = Object.keys(dailyData).sort().reverse().slice(0, 14).reverse();
            if (sortedDays.length === 0) {
              dailyLogEl.innerHTML = '<div style="color:var(--text-muted); font-size:12px;">მონაცემები ჯერ არ არის</div>';
            } else {
              const maxVal = Math.max(...sortedDays.map(d => dailyData[d]), 1);
              let total14 = 0;
              let html = '<div style="display:flex; height:100px; align-items:flex-end; gap:4px; padding-top:10px; border-bottom:1px solid var(--border-light);">';
              
              const geoMonths = ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'];
              
              sortedDays.forEach(day => {
                const count = dailyData[day];
                total14 += count;
                const pct = Math.max((count / maxVal) * 100, 5);
                const barColor = count >= 5 ? '#10b981' : (count >= 2 ? '#3b82f6' : '#94a3b8');
                
                const dObj = new Date(day);
                const dateLbl = (!isNaN(dObj.getTime())) ? (String(dObj.getDate()).padStart(2, '0') + ' ' + geoMonths[dObj.getMonth()]) : day;
                
                html += '<div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:4px;" title="' + dateLbl + ': ' + count + ' ვიზიტი">' +
                  '<div style="font-size:10px; font-weight:700; color:' + barColor + ';">' + count + '</div>' +
                  '<div style="width:100%; max-width:24px; height:' + pct + '%; background:' + barColor + '; border-radius:4px 4px 0 0; min-height:4px; transition:height 0.5s;"></div>' +
                '</div>';
              });
              html += '</div>';
              html += '<div style="display:flex; justify-content:space-between; margin-top:6px; font-size:10px; color:var(--text-muted);">';
              if(sortedDays.length > 0) {
                 const d1 = new Date(sortedDays[0]);
                 const d2 = new Date(sortedDays[sortedDays.length-1]);
                 html += '<span>' + (String(d1.getDate()).padStart(2, '0') + ' ' + geoMonths[d1.getMonth()]) + '</span>';
                 html += '<span>' + (String(d2.getDate()).padStart(2, '0') + ' ' + geoMonths[d2.getMonth()]) + '</span>';
              }
              html += '</div>';
              dailyLogEl.innerHTML = html;
              if(dailyTotEl) dailyTotEl.textContent = 'სულ 14 დღეში: ' + total14;
            }
        }
      }

async function loadAndRenderAnalytics() {
        let records = [];
        let events = [];
        if (isSupabaseConfigured() && isAdminMode()) {
          const client = initSupabase();
          if (client) {
            try {
              const { data: recData } = await client
                .from('site_analytics')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);
              if (Array.isArray(recData) && recData.length > 0) records = recData;

              const { data: evData } = await client
                .from('site_analytics_events')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(200);
              if (Array.isArray(evData) && evData.length > 0) events = evData;
            } catch (e) {
              console.warn('Analytics fetch notice:', e);
            }
          }
        }

        if (records.length === 0) {
          try {
            records = JSON.parse(localStorage.getItem('gardabani_analytics_log') || '[]');
          } catch (e) {
            records = [];
          }
        }

        if (events.length === 0) {
          try {
            events = JSON.parse(localStorage.getItem('gardabani_analytics_events') || '[]');
          } catch (e) {
            events = [];
          }
        }

        renderAnalyticsUI(records, events);
      }

      // Buttons setup
      const btnRefreshAnalytics = document.getElementById('btn-refresh-analytics');
      if (btnRefreshAnalytics) {
        btnRefreshAnalytics.addEventListener('click', () => {
          loadAndRenderAnalytics();
          showToast('ვიზიტების მონაცემები განახლდა 🔄');
        });
      }

      
      const btnExportCSV = document.getElementById('btn-export-csv');
      if (btnExportCSV) {
        btnExportCSV.addEventListener('click', () => {
           let records = [];
           try {
              records = JSON.parse(localStorage.getItem('gardabani_analytics_log') || '[]');
           } catch(e){}
           
           if(records.length === 0) {
             showToast('საექსპორტო მონაცემები ცარიელია');
             return;
           }
           
           let csv = 'Date,Page,Device,Language,Duration(sec),Speed(sec),Referrer\n';
           records.forEach(r => {
              const pT = (r.page_title || r.page_path || '').replace(/,/g, '');
              csv += '"' + r.created_at + '","' + pT + '","' + r.device_type + '","' + r.browser_lang + '","' + r.duration_seconds + '","' + r.load_time_seconds + '","' + r.referrer + '"\n';
           });
           
           const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
           const url = URL.createObjectURL(blob);
           const link = document.createElement('a');
           link.setAttribute('href', url);
           link.setAttribute('download', 'analytics_export.csv');
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
        });
      }
\n      const btnClearLocalAnalytics = document.getElementById('btn-clear-local-analytics');
      if (btnClearLocalAnalytics) {
        btnClearLocalAnalytics.addEventListener('click', () => {
          if (confirm('ნამდვილად გსურთ ლოკალური ჟურნალის გასუფთავება?')) {
            localStorage.removeItem('gardabani_analytics_log');
            localStorage.removeItem('gardabani_analytics_events');
            loadAndRenderAnalytics();
            showToast('ლოკალური ჟურნალი გასუფთავდა 🗑️');
          }
        });
      }

      function initLiveModeTicker() {
        if (liveSyncIntervalId) clearInterval(liveSyncIntervalId);
        liveCountdownSeconds = 20;
        const countdownEl = document.getElementById('live-sync-countdown');
        if (countdownEl) countdownEl.textContent = '⏱️ ' + liveCountdownSeconds + 's';

        liveSyncIntervalId = setInterval(() => {
          if (!isAdminMode()) {
            clearInterval(liveSyncIntervalId);
            liveSyncIntervalId = null;
            return;
          }
          liveCountdownSeconds--;
          if (countdownEl) countdownEl.textContent = '⏱️ ' + liveCountdownSeconds + 's';
          if (liveCountdownSeconds <= 0) {
            liveCountdownSeconds = 20;
            loadAndRenderAnalytics();
            const dot = document.querySelector('.live-pulse-dot');
            if (dot) {
              dot.style.transform = 'scale(1.4)';
              setTimeout(() => { dot.style.transform = 'scale(1)'; }, 350);
            }
          }
        }, 1000);
      }

      // Timeframe Switcher
      const timeframeGroup = document.getElementById('analytics-timeframe-group');
      if (timeframeGroup) {
        timeframeGroup.addEventListener('click', (e) => {
          const btn = e.target.closest('.filter-btn');
          if (!btn) return;
          timeframeGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          analyticsActiveTimeframe = btn.dataset.timeframe || '24h';
          const badgeEl = document.getElementById('chart-timeframe-badge');
          if (badgeEl) {
            badgeEl.textContent = analyticsActiveTimeframe === '24h' 
              ? 'ბოლო 24 საათი' 
              : (analyticsActiveTimeframe === '7d' ? 'ბოლო 7 დღე' : 'სრული ისტორია');
          }
          renderAnalyticsUI(analyticsCachedRecords, analyticsCachedEvents);
        });
      }

      // Theme Change Dynamic Redraw
      const themeToggleBtn = document.getElementById('theme-toggle');
      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
          setTimeout(() => {
            if (isAdminMode() && analyticsCachedRecords.length > 0) {
              renderAnalyticsUI(analyticsCachedRecords, analyticsCachedEvents);
            }
          }, 60);
        });
      }
      function syncCookieSettingsUI() {
        const desc = document.getElementById('cookie-status-desc');
        const c = localStorage.getItem('gardabani_cookie_consent');
        if (desc) {
          if (c === 'accepted') {
            desc.innerHTML = '<span style="color:#16a34a; font-weight:600;">მიღებულია ✅</span> (სრული ანალიტიკა და ქსელის ხარისხი აქტიურია)';
          } else if (c === 'rejected') {
            desc.innerHTML = '<span style="color:#dc2626; font-weight:600;">შეზღუდულია ❌</span> (მხოლოდ აუცილებელი ტექნიკური ფუნქციონალი)';
          } else {
            desc.innerHTML = '<span style="color:#ca8a04; font-weight:600;">ჯერ არ არის არჩეული ⏳</span> (გადაწყვეტილება მოსალოდნელია)';
          }
        }
      }

      const btnReopenCookie = document.getElementById('btn-reopen-cookie-banner');
      if (btnReopenCookie) {
        btnReopenCookie.addEventListener('click', () => {
          if (typeof window.openCookieConsentSettings === 'function') {
            window.openCookieConsentSettings();
          }
        });
      }
      window.addEventListener('cookie_consent_changed', syncCookieSettingsUI);
      syncCookieSettingsUI();

      if (isAdminMode()) {
        loadAndRenderAnalytics();
      }
    });
  </script>
${COOKIE_CONSENT_FULL_BLOCK}
${SITE_ANALYTICS_TRACKER_HTML}
</body>
</html>`;

// ============================================================================
// 6. Write All Files & Logs
// ============================================================================
fs.writeFileSync(path.join(__dirname, 'gardabani_map.html'), mapHtmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), mapHtmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'calendar.html'), calendarHtmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'mentors.html'), mentorsHtmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'settings.html'), settingsHtmlContent, 'utf8');

console.log('Successfully generated gardabani_map.html, index.html, calendar.html, mentors.html, and settings.html with full Calendar Integration!');
console.log('Map HTML size: ' + mapHtmlContent.length + ' bytes');
console.log('Calendar HTML size: ' + calendarHtmlContent.length + ' bytes');
console.log('Mentors HTML size: ' + mentorsHtmlContent.length + ' bytes');
console.log('Settings HTML size: ' + settingsHtmlContent.length + ' bytes');
