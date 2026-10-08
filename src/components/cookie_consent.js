// ============================================================================
// COOKIE CONSENT & PRIVACY MODAL MODULE (GDPR COMPLIANCE ARCHITECTURE)
// Follows EU GDPR, ePrivacy Directive & Georgian Data Protection Law
// Features:
// 1. Legal Cookie Classifications (Strictly Necessary, Preferences, Analytics, Marketing)
// 2. Prior Consent / Zero-Cookieless State until explicit user interaction
// 3. Granular Consent with un-checked default micro-toggles (No pre-checked checkboxes)
// 4. Equal Prominence / No Dark Patterns between Accept and Reject buttons
// 5. Easy Withdrawal via persistent floating badge across all pages
// 6. Secure Consent Audit Trail (Audit Logging)
// 7. Open Cookie Database registry mapping and transparent disclosures
// ============================================================================

const COOKIE_CONSENT_CSS = `
  /* Cookie Consent Modal Backdrop & Centered Window */
  .cookie-consent-backdrop {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.78) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    z-index: 9999998 !important;
    display: none;
    align-items: center !important;
    justify-content: center !important;
    padding: 16px !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    animation: cookieFadeIn 0.2s ease-out;
  }
  .cookie-consent-backdrop.show {
    display: flex !important;
  }
  @keyframes cookieFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .cookie-consent-banner {
    position: relative !important;
    width: 100% !important;
    max-width: 600px !important;
    max-height: 88vh !important;
    overflow-y: auto !important;
    background: var(--bg-card, #ffffff) !important;
    border: 1px solid var(--border-light, #e2e8f0) !important;
    border-radius: 16px !important;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35) !important;
    padding: 22px 24px !important;
    margin: auto !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 14px !important;
    animation: cookieSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  @keyframes cookieSlideUp {
    from { transform: translateY(20px) scale(0.97); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
  }
  [data-theme="dark"] .cookie-consent-banner {
    background: #0d0d0d !important;
    border-color: #262626 !important;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 25px rgba(37, 99, 235, 0.25) !important;
  }
  .cookie-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .cookie-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--text-main, #0f172a);
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
  }
  .cookie-close-btn {
    background: transparent;
    border: none;
    color: var(--text-subtle, #64748b);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: all 0.15s ease;
  }
  .cookie-close-btn:hover {
    background: var(--bg-hover, #f1f5f9);
    color: var(--text-main, #0f172a);
  }
  .cookie-desc {
    font-size: 13px;
    color: var(--text-muted, #475569);
    line-height: 1.5;
    margin: 0;
  }

  /* Granular Categories Container */
  .cookie-details-box {
    display: none;
    background: var(--bg-card-subtle, #f8fafc);
    border: 1px solid var(--border-light, #e2e8f0);
    border-radius: 12px;
    padding: 14px;
    font-size: 12px;
    line-height: 1.45;
    color: var(--text-muted, #475569);
    flex-direction: column;
    gap: 12px;
  }
  [data-theme="dark"] .cookie-details-box {
    background: #141414;
    border-color: #262626;
  }
  .cookie-details-box.open {
    display: flex !important;
    animation: cookieDetailsSlideDown 0.22s ease-out;
  }
  @keyframes cookieDetailsSlideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Category Item Cards */
  .cookie-category-item {
    background: var(--bg-card, #ffffff);
    border: 1px solid var(--border-light, #e2e8f0);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  [data-theme="dark"] .cookie-category-item {
    background: #0d0d0d;
    border-color: #262626;
  }
  .cookie-cat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .cookie-cat-title {
    font-weight: 700;
    font-size: 13px;
    color: var(--text-main, #0f172a);
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .cookie-cat-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 9999px;
    background: rgba(59, 130, 246, 0.12);
    color: #2563eb;
  }
  .cookie-cat-badge.badge-necessary {
    background: rgba(16, 185, 129, 0.15);
    color: #059669;
  }
  .cookie-cat-badge.badge-marketing {
    background: rgba(245, 158, 11, 0.15);
    color: #d97706;
  }
  .cookie-cat-desc {
    font-size: 11.5px;
    color: var(--text-muted, #64748b);
    line-height: 1.4;
  }
  .cookie-cat-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 2px;
  }
  .cookie-cat-tags code {
    background: var(--bg-card-subtle, #f1f5f9);
    border: 1px solid var(--border-light, #e2e8f0);
    color: var(--text-muted, #475569);
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 4px;
    font-family: monospace;
  }
  [data-theme="dark"] .cookie-cat-tags code {
    background: #1a1a1a;
    border-color: #333333;
    color: #94a3b8;
  }

  /* Micro Toggles */
  .cookie-toggle-switch {
    position: relative;
    display: inline-block;
    width: 38px;
    height: 22px;
    flex-shrink: 0;
  }
  .cookie-toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .cookie-toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #cbd5e1;
    border-radius: 22px;
    transition: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  [data-theme="dark"] .cookie-toggle-slider {
    background-color: #334155;
  }
  .cookie-toggle-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cookie-toggle-switch input:checked + .cookie-toggle-slider {
    background-color: #2563eb;
  }
  .cookie-toggle-switch input:checked + .cookie-toggle-slider:before {
    transform: translateX(16px);
  }
  .cookie-toggle-switch input:disabled + .cookie-toggle-slider {
    background-color: #059669;
    cursor: not-allowed;
    opacity: 0.85;
  }

  /* Cookie Registry Table */
  .cookie-registry-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    margin-top: 6px;
  }
  .cookie-registry-table th, .cookie-registry-table td {
    padding: 6px 8px;
    text-align: left;
    border-bottom: 1px solid var(--border-light, #e2e8f0);
  }
  .cookie-registry-table th {
    color: var(--text-main, #0f172a);
    font-weight: 700;
  }
  [data-theme="dark"] .cookie-registry-table th, 
  [data-theme="dark"] .cookie-registry-table td {
    border-color: #262626;
  }

  /* Actions Bar - Equal Prominence, No Dark Patterns */
  .cookie-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 4px;
    padding-top: 4px;
  }
  .btn-cookie-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 16px;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    text-decoration: none;
    line-height: 1.2;
    box-sizing: border-box;
  }
  .btn-cookie-accept {
    background: #2563eb;
    color: #ffffff;
    border: 1px solid #2563eb;
  }
  .btn-cookie-accept:hover {
    background: #1d4ed8;
    border-color: #1d4ed8;
    transform: translateY(-1px);
  }
  .btn-cookie-reject {
    background: var(--bg-card-subtle, #f1f5f9);
    color: var(--text-main, #0f172a);
    border: 1px solid var(--border-light, #cbd5e1);
  }
  .btn-cookie-reject:hover {
    background: var(--bg-hover, #e2e8f0);
    transform: translateY(-1px);
  }
  [data-theme="dark"] .btn-cookie-reject {
    background: #1a1a1a;
    color: #f8fafc;
    border-color: #333333;
  }
  [data-theme="dark"] .btn-cookie-reject:hover {
    background: #262626;
  }
  .btn-cookie-save {
    background: #059669;
    color: #ffffff;
    border: 1px solid #059669;
  }
  .btn-cookie-save:hover {
    background: #047857;
    border-color: #047857;
    transform: translateY(-1px);
  }
  .btn-cookie-details {
    background: transparent;
    color: var(--text-muted, #64748b);
    border: 1px solid var(--border-light, #cbd5e1);
    font-weight: 600;
    margin-right: auto;
  }
  .btn-cookie-details:hover {
    background: var(--bg-hover, #f1f5f9);
    color: var(--text-main, #0f172a);
  }
  [data-theme="dark"] .btn-cookie-details {
    border-color: #333333;
  }

  /* Persistent Floating Privacy & Cookie Trigger (Easy Withdrawal) */
  .cookie-floating-trigger {
    position: fixed !important;
    bottom: 20px !important;
    left: 20px !important;
    z-index: 999990 !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    padding: 7px 12px !important;
    background: var(--bg-card, #ffffff) !important;
    color: var(--text-main, #0f172a) !important;
    border: 1px solid var(--border-light, #e2e8f0) !important;
    border-radius: 9999px !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12) !important;
    cursor: pointer !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    user-select: none !important;
  }
  .cookie-floating-trigger:hover {
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18) !important;
    border-color: #2563eb !important;
  }
  [data-theme="dark"] .cookie-floating-trigger {
    background: #0d0d0d !important;
    color: #f8fafc !important;
    border-color: #262626 !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6) !important;
  }
  [data-theme="dark"] .cookie-floating-trigger:hover {
    border-color: #3b82f6 !important;
  }

  @media (max-width: 640px) {
    .cookie-consent-banner {
      padding: 16px 18px !important;
    }
    .cookie-actions {
      width: 100%;
      flex-direction: column-reverse;
      gap: 8px;
    }
    .btn-cookie-action {
      width: 100%;
      justify-content: center;
      text-align: center;
    }
    .btn-cookie-details {
      margin-right: 0;
    }
    .cookie-floating-trigger {
      bottom: 14px !important;
      left: 14px !important;
      padding: 6px 10px !important;
      font-size: 10px !important;
    }
  }
`;

const COOKIE_CONSENT_HTML = `
  <!-- Cookie Consent Centered Modal (GDPR Compliant) -->
  <div class="cookie-consent-backdrop" id="cookie-consent-backdrop" style="display:none;">
    <div class="cookie-consent-banner" id="cookie-consent-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div class="cookie-header">
        <h3 class="cookie-title" id="cookie-title">
          <span>🍪</span> კონფიდენციალურობა და ქუქი-ფაილები
        </h3>
        <button type="button" class="cookie-close-btn" id="btn-cookie-close" title="დახურვა">✕</button>
      </div>
      <p class="cookie-desc">
        საიტი იცავს ევროკავშირის GDPR რეგულაციასა და საქართველოს კანონმდებლობას. ჩვენ ვიყენებთ ტექნიკურ ქუქი-ფაილებს საიტის უსაფრთხოებისთვის, ხოლო ანალიტიკურ და პრეფერენციების პარამეტრებს ვააქტიურებთ მხოლოდ თქვენი მკაფიო ნებართვის შემდეგ.
      </p>

      <!-- Granular Preferences & Categories -->
      <div class="cookie-details-box" id="cookie-details-box">
        <div class="cookie-category-item">
          <div class="cookie-cat-header">
            <div class="cookie-cat-title">
              <span>🔒</span> აუცილებელი (Strictly Necessary)
              <span class="cookie-cat-badge badge-necessary">მუდამ აქტიური</span>
            </div>
            <label class="cookie-toggle-switch">
              <input type="checkbox" id="cookie-toggle-necessary" checked disabled>
              <span class="cookie-toggle-slider locked"></span>
            </label>
          </div>
          <div class="cookie-cat-desc">
            სესიის უსაფრთხოება, CSRF დაცვა, თანხმობის ჟურნალი და ადმინ-ავტორიზაცია. გათავისუფლებულია წინასწარი თანხმობისგან.
          </div>
          <div class="cookie-cat-tags">
            <code>gma_session_id</code> <code>gma_consent</code> <code>gardabani_lockout_until</code>
          </div>
        </div>

        <div class="cookie-category-item">
          <div class="cookie-cat-header">
            <div class="cookie-cat-title">
              <span>🎨</span> ფუნქციური & პრეფერენციები (Preferences)
              <span class="cookie-cat-badge">საჭიროებს თანხმობას</span>
            </div>
            <label class="cookie-toggle-switch">
              <input type="checkbox" id="cookie-toggle-preferences">
              <span class="cookie-toggle-slider"></span>
            </label>
          </div>
          <div class="cookie-cat-desc">
            არჩეული ვიზუალური თემის (დღე/ღამე), რუკის ფილტრებისა და რადიუსის პარამეტრების დამახსოვრება მომდევნო ვიზიტებისთვის.
          </div>
          <div class="cookie-cat-tags">
            <code>gardabani_theme</code> <code>gardabani_radius_active</code> <code>gardabani_boundary_active</code>
          </div>
        </div>

        <div class="cookie-category-item">
          <div class="cookie-cat-header">
            <div class="cookie-cat-title">
              <span>📊</span> ანალიტიკა & წარმადობა (Analytics)
              <span class="cookie-cat-badge">საჭიროებს თანხმობას</span>
            </div>
            <label class="cookie-toggle-switch">
              <input type="checkbox" id="cookie-toggle-analytics">
              <span class="cookie-toggle-slider"></span>
            </label>
          </div>
          <div class="cookie-cat-desc">
            ანონიმური სტატისტიკა: გვერდის ჩატვირთვის სისწრაფე, ვიზიტის ხანგრძლივობა, მოწყობილობის სიმძლავრე და სოფლების აქტივობების პოპულარობა. IP არ ინახება.
          </div>
          <div class="cookie-cat-tags">
            <code>gma_vid</code> <code>gardabani_analytics_log</code> <code>gardabani_daily_log</code>
          </div>
        </div>

        <div class="cookie-category-item">
          <div class="cookie-cat-header">
            <div class="cookie-cat-title">
              <span>📢</span> მარკეტინგი & რეკლამა (Marketing)
              <span class="cookie-cat-badge badge-marketing">მკაცრი თანხმობა</span>
            </div>
            <label class="cookie-toggle-switch">
              <input type="checkbox" id="cookie-toggle-marketing">
              <span class="cookie-toggle-slider"></span>
            </label>
          </div>
          <div class="cookie-cat-desc">
            მიზნობრივი კამპანიები და გარე პიქსელები. საიტი ამჟამად არ იყენებს სარეკლამო ქსელებს; პარამეტრი საწყისად გამორთულია.
          </div>
        </div>

        <!-- Open Cookie Database Disclosure -->
        <div style="margin-top:4px; padding-top:8px; border-top:1px solid var(--border-light, #e2e8f0); font-size:11px; color:var(--text-muted, #64748b);">
          <strong style="color:var(--text-main, #0f172a);">ქუქი-ფაილების რეესტრი (Open Cookie Database სტანდარტი):</strong>
          <table class="cookie-registry-table">
            <thead>
              <tr>
                <th>იდენტიფიკატორი</th>
                <th>კატეგორია</th>
                <th>ვადა</th>
                <th>მიზანი</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>gma_consent</code></td>
                <td>აუცილებელი</td>
                <td>1 წელი</td>
                <td>თანხმობის პარამეტრების შენახვა</td>
              </tr>
              <tr>
                <td><code>gma_session_id</code></td>
                <td>აუცილებელი</td>
                <td>სესია</td>
                <td>უსაფრთხო ნავიგაცია</td>
              </tr>
              <tr>
                <td><code>gardabani_theme</code></td>
                <td>პრეფერენცია</td>
                <td>1 წელი</td>
                <td>თემის (დღე/ღამე) დამახსოვრება</td>
              </tr>
              <tr>
                <td><code>gma_vid</code></td>
                <td>ანალიტიკა</td>
                <td>1 წელი</td>
                <td>ანონიმური განმეორებითი ვიზიტები</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Actions Bar: Equal prominence, no dark patterns -->
      <div class="cookie-actions">
        <button type="button" class="btn-cookie-action btn-cookie-details" id="btn-cookie-toggle-details">
          ⚙️ პარამეტრების მორგება
        </button>
        <button type="button" class="btn-cookie-action btn-cookie-reject" id="btn-cookie-reject">
          ❌ მხოლოდ აუცილებელი
        </button>
        <button type="button" class="btn-cookie-action btn-cookie-save" id="btn-cookie-save" style="display:none;">
          💾 არჩევანის შენახვა
        </button>
        <button type="button" class="btn-cookie-action btn-cookie-accept" id="btn-cookie-accept">
          ✅ ყველას მიღება
        </button>
      </div>
    </div>
  </div>

  <!-- Persistent Floating Privacy Button (GDPR Easy Withdrawal) -->
  <button type="button" class="cookie-floating-trigger" id="cookie-floating-trigger" aria-label="კონფიდენციალურობის პარამეტრები" title="ქუქი-ფაილები და კონფიდენციალურობა (GDPR)">
    <span>🍪</span>
    <span>ქუქი-ფაილები</span>
  </button>
`;

const COOKIE_CONSENT_JS = `
  // Cookie Consent Controller (GDPR Compliant Architecture)
  (function() {
    function getStoredConsent() {
      const raw = localStorage.getItem('gardabani_cookie_consent');
      if (!raw) return null;
      if (raw === 'accepted') return { necessary: true, preferences: true, analytics: true, marketing: false, version: '2.0-gdpr' };
      if (raw === 'rejected') return { necessary: true, preferences: false, analytics: false, marketing: false, version: '2.0-gdpr' };
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch(e) {}
      return null;
    }

    function recordAuditLog(action, categories) {
      try {
        const auditLogs = JSON.parse(localStorage.getItem('gardabani_consent_audit_log') || '[]');
        const auditRecord = {
          audit_id: 'cst_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36),
          timestamp: new Date().toISOString(),
          action: action,
          categories: {
            necessary: true,
            preferences: !!categories.preferences,
            analytics: !!categories.analytics,
            marketing: !!categories.marketing
          },
          policy_version: '2026.GDPR-v2'
        };
        auditLogs.unshift(auditRecord);
        if (auditLogs.length > 50) auditLogs.length = 50;
        localStorage.setItem('gardabani_consent_audit_log', JSON.stringify(auditLogs));
      } catch(e) {}
    }

    function saveConsent(categories, actionType) {
      const consentRecord = {
        necessary: true,
        preferences: !!categories.preferences,
        analytics: !!categories.analytics,
        marketing: !!categories.marketing,
        version: '2.0-gdpr',
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('gardabani_cookie_consent', JSON.stringify(consentRecord));
      
      const cookieVal = consentRecord.analytics ? 'accepted' : (consentRecord.preferences ? 'custom' : 'rejected');
      document.cookie = 'gma_consent=' + cookieVal + '; path=/; max-age=31536000; SameSite=Lax';

      recordAuditLog(actionType, consentRecord);

      window.dispatchEvent(new CustomEvent('cookie_consent_changed', { detail: consentRecord }));
      closeCookieModal();
    }

    function syncTogglesFromState() {
      const consent = getStoredConsent();
      const togglePref = document.getElementById('cookie-toggle-preferences');
      const toggleAnalytics = document.getElementById('cookie-toggle-analytics');
      const toggleMarketing = document.getElementById('cookie-toggle-marketing');

      // Rule: No pre-checked toggles for first-time visitors!
      if (togglePref) togglePref.checked = consent ? !!consent.preferences : false;
      if (toggleAnalytics) toggleAnalytics.checked = consent ? !!consent.analytics : false;
      if (toggleMarketing) toggleMarketing.checked = consent ? !!consent.marketing : false;
    }

    function openCookieModal(showDetailsInitially) {
      syncTogglesFromState();
      const backdrop = document.getElementById('cookie-consent-backdrop');
      if (backdrop) {
        backdrop.classList.add('show');
        backdrop.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

      const detailsBox = document.getElementById('cookie-details-box');
      const btnDetails = document.getElementById('btn-cookie-toggle-details');
      const btnSave = document.getElementById('btn-cookie-save');

      // Default: always collapsed unless explicitly true
      if (showDetailsInitially === true) {
        if (detailsBox) detailsBox.classList.add('open');
        if (btnDetails) btnDetails.textContent = '▲ პარამეტრების შეკუმშვა';
        if (btnSave) btnSave.style.display = 'inline-flex';
      } else {
        if (detailsBox) detailsBox.classList.remove('open');
        if (btnDetails) btnDetails.textContent = '⚙️ პარამეტრების მორგება';
        if (btnSave) btnSave.style.display = 'none';
      }
    }

    function closeCookieModal() {
      const backdrop = document.getElementById('cookie-consent-backdrop');
      if (backdrop) {
        backdrop.classList.remove('show');
        backdrop.style.display = 'none';
        document.body.style.overflow = '';
      }
    }

    function initCookieBanner() {
      const consent = getStoredConsent();
      // Zero-cookieless state: Prompt user on first visit (collapsed by default)
      if (!consent) {
        setTimeout(() => openCookieModal(false), 900);
      }

      const btnAccept = document.getElementById('btn-cookie-accept');
      const btnReject = document.getElementById('btn-cookie-reject');
      const btnSave = document.getElementById('btn-cookie-save');
      const btnClose = document.getElementById('btn-cookie-close');
      const btnDetails = document.getElementById('btn-cookie-toggle-details');
      const detailsBox = document.getElementById('cookie-details-box');
      const backdrop = document.getElementById('cookie-consent-backdrop');
      const floatingTrigger = document.getElementById('cookie-floating-trigger');

      if (btnAccept) {
        btnAccept.addEventListener('click', () => {
          saveConsent({ necessary: true, preferences: true, analytics: true, marketing: false }, 'accept_all');
        });
      }

      if (btnReject) {
        btnReject.addEventListener('click', () => {
          saveConsent({ necessary: true, preferences: false, analytics: false, marketing: false }, 'reject_all');
        });
      }

      if (btnSave) {
        btnSave.addEventListener('click', () => {
          const pref = document.getElementById('cookie-toggle-preferences')?.checked || false;
          const ana = document.getElementById('cookie-toggle-analytics')?.checked || false;
          const mkt = document.getElementById('cookie-toggle-marketing')?.checked || false;
          saveConsent({ necessary: true, preferences: pref, analytics: ana, marketing: mkt }, 'custom_save');
        });
      }

      if (btnClose) {
        btnClose.addEventListener('click', closeCookieModal);
      }

      if (backdrop) {
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop) closeCookieModal();
        });
      }

      if (floatingTrigger) {
        floatingTrigger.addEventListener('click', () => openCookieModal(false));
      }

      if (btnDetails && detailsBox) {
        btnDetails.addEventListener('click', () => {
          const isOpen = detailsBox.classList.contains('open');
          if (isOpen) {
            detailsBox.classList.remove('open');
            btnDetails.textContent = '⚙️ პარამეტრების მორგება';
            if (btnSave) btnSave.style.display = 'none';
          } else {
            detailsBox.classList.add('open');
            btnDetails.textContent = '▲ პარამეტრების შეკუმშვა';
            if (btnSave) btnSave.style.display = 'inline-flex';
            setTimeout(() => {
              detailsBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 60);
          }
        });
      }
    }

    // Expose global helper to re-open cookie banner anywhere (collapsed by default)
    window.openCookieConsentSettings = function() {
      openCookieModal(false);
    };

    window.getGDPRConsentState = function() {
      return getStoredConsent();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCookieBanner);
    } else {
      initCookieBanner();
    }
  })();
`;

module.exports = {
  COOKIE_CONSENT_CSS,
  COOKIE_CONSENT_HTML,
  COOKIE_CONSENT_JS
};
