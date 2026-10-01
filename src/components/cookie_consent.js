// ============================================================================
// COOKIE CONSENT & PRIVACY MODAL MODULE (GDPR & GEORGIAN LAW COMPLIANT)
// Allows user to Accept (Full analytics & retention) or Reject (Strictly necessary)
// Centered modal window with dimmed backdrop preventing off-screen rendering
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
    max-width: 540px !important;
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
  .cookie-details-box {
    display: none;
    background: var(--bg-card-subtle, #f8fafc);
    border: 1px solid var(--border-light, #e2e8f0);
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 12px;
    line-height: 1.45;
    color: var(--text-muted, #475569);
  }
  [data-theme="dark"] .cookie-details-box {
    background: #141414;
    border-color: #262626;
  }
  .cookie-details-box.open {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .cookie-detail-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .cookie-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 6px;
  }
  .btn-cookie-accept {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 9px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-cookie-accept:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
  .btn-cookie-reject {
    background: transparent;
    color: var(--text-main, #0f172a);
    border: 1px solid var(--border-light, #e2e8f0);
    padding: 9px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .btn-cookie-reject:hover {
    background: var(--bg-hover, #f1f5f9);
  }
  .btn-cookie-toggle-details {
    background: transparent;
    border: none;
    color: var(--text-subtle, #64748b);
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    padding: 6px 8px;
    margin-right: auto;
  }
  @media (max-width: 480px) {
    .cookie-consent-banner {
      padding: 16px 18px !important;
    }
    .cookie-actions {
      width: 100%;
      flex-direction: column-reverse;
      gap: 8px;
    }
    .btn-cookie-accept, .btn-cookie-reject, .btn-cookie-toggle-details {
      width: 100%;
      justify-content: center;
      text-align: center;
    }
    .btn-cookie-toggle-details {
      margin-right: 0;
      padding: 4px;
    }
  }
`;

const COOKIE_CONSENT_HTML = `
  <!-- Cookie Consent Centered Modal -->
  <div class="cookie-consent-backdrop" id="cookie-consent-backdrop" style="display:none;">
    <div class="cookie-consent-banner" id="cookie-consent-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div class="cookie-header">
        <h3 class="cookie-title" id="cookie-title">
          <span>🍪</span> ქუქი-ფაილები და კონფიდენციალურობა
        </h3>
        <button type="button" class="cookie-close-btn" id="btn-cookie-close" title="დახურვა">✕</button>
      </div>
      <p class="cookie-desc">
        ჩვენ ვიყენებთ ქუქი-ფაილებს საიტის გამართული მუშაობისთვის, ვიზიტორთა სტატისტიკისა და ქსელის ხარისხის ანალიზისთვის. კანონმდებლობის შესაბამისად, თქვენ თავად ირჩევთ სასურველ რეჟიმს.
      </p>

      <!-- Collapsible Details Box -->
      <div class="cookie-details-box" id="cookie-details-box">
        <div class="cookie-detail-item">
          <span>🔒</span>
          <div>
            <strong>აუცილებელი ქუქიები (ყოველთვის აქტიური):</strong>
            უზრუნველყოფს ვიზუალური თემის შენახვას (დღე/ღამე) და ადმინისტრატორის დაცულ სესიას.
          </div>
        </div>
        <div class="cookie-detail-item">
          <span>📊</span>
          <div>
            <strong>ანალიტიკური ქუქიები (არასავალდებულო):</strong>
            გვეხმარება გავიგოთ, დაბრუნდა თუ არა ვიზიტორი განმეორებით, როგორია მობილური ინტერნეტის ხარისხი (4G/3G/Wifi) და რომელი სოფლების აქტივობებია ყველაზე პოპულარული.
          </div>
        </div>
      </div>

      <div class="cookie-actions">
        <button type="button" class="btn-cookie-toggle-details" id="btn-cookie-toggle-details">
          დეტალების ჩვენება
        </button>
        <button type="button" class="btn-cookie-reject" id="btn-cookie-reject">
          ❌ მხოლოდ აუცილებელი
        </button>
        <button type="button" class="btn-cookie-accept" id="btn-cookie-accept">
          ✅ ყველა ქუქის მიღება
        </button>
      </div>
    </div>
  </div>
`;

const COOKIE_CONSENT_JS = `
  // Cookie Consent Controller
  (function() {
    function getConsent() {
      return localStorage.getItem('gardabani_cookie_consent');
    }

    function setConsent(choice) {
      localStorage.setItem('gardabani_cookie_consent', choice);
      document.cookie = 'gma_consent=' + choice + '; path=/; max-age=31536000; SameSite=Lax';
      window.dispatchEvent(new CustomEvent('cookie_consent_changed', { detail: choice }));
      closeCookieModal();
    }

    function openCookieModal() {
      const backdrop = document.getElementById('cookie-consent-backdrop');
      if (backdrop) {
        backdrop.classList.add('show');
        backdrop.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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
      const consent = getConsent();
      if (!consent) {
        setTimeout(openCookieModal, 1200);
      }

      const btnAccept = document.getElementById('btn-cookie-accept');
      const btnReject = document.getElementById('btn-cookie-reject');
      const btnClose = document.getElementById('btn-cookie-close');
      const btnDetails = document.getElementById('btn-cookie-toggle-details');
      const detailsBox = document.getElementById('cookie-details-box');
      const backdrop = document.getElementById('cookie-consent-backdrop');

      if (btnAccept) {
        btnAccept.addEventListener('click', () => setConsent('accepted'));
      }
      if (btnReject) {
        btnReject.addEventListener('click', () => setConsent('rejected'));
      }
      if (btnClose) {
        btnClose.addEventListener('click', closeCookieModal);
      }
      if (backdrop) {
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop) closeCookieModal();
        });
      }
      if (btnDetails && detailsBox) {
        btnDetails.addEventListener('click', () => {
          const isOpen = detailsBox.classList.contains('open');
          if (isOpen) {
            detailsBox.classList.remove('open');
            btnDetails.textContent = 'დეტალების ჩვენება';
          } else {
            detailsBox.classList.add('open');
            btnDetails.textContent = 'დეტალების დამალვა';
          }
        });
      }
    }

    // Expose global helper to re-open cookie banner from settings
    window.openCookieConsentSettings = function() {
      openCookieModal();
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
