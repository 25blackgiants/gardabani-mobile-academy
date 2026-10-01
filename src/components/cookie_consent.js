// ============================================================================
// COOKIE CONSENT & PRIVACY BANNER MODULE (GDPR & GEORGIAN LAW COMPLIANT)
// Allows user to Accept (Full analytics & retention) or Reject (Strictly necessary)
// ============================================================================

const COOKIE_CONSENT_CSS = `
  /* Cookie Consent Floating Banner */
  .cookie-consent-banner {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(120%);
    width: calc(100% - 32px);
    max-width: 640px;
    background: var(--bg-card, #ffffff);
    border: 1px solid var(--border-light, #e2e8f0);
    border-radius: 16px;
    box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.22), 0 10px 15px -5px rgba(0, 0, 0, 0.12);
    padding: 18px 22px;
    z-index: 999999;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    opacity: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .cookie-consent-banner.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  [data-theme="dark"] .cookie-consent-banner {
    background: #0d0d0d;
    border-color: #262626;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.95);
  }
  .cookie-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .cookie-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-main, #0f172a);
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
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
    gap: 8px;
    margin-top: 4px;
  }
  .btn-cookie-accept {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-cookie-accept:hover {
    background: #1d4ed8;
  }
  .btn-cookie-reject {
    background: transparent;
    color: var(--text-main, #0f172a);
    border: 1px solid var(--border-light, #e2e8f0);
    padding: 8px 14px;
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
      bottom: 12px;
      width: calc(100% - 20px);
      padding: 14px 16px;
    }
    .cookie-actions {
      width: 100%;
      flex-direction: column-reverse;
      gap: 6px;
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
  <!-- Cookie Consent Floating Banner -->
  <div class="cookie-consent-banner" id="cookie-consent-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
    <div class="cookie-header">
      <h3 class="cookie-title" id="cookie-title">
        <span>🍪</span> ქუქი-ფაილები და კონფიდენციალურობა
      </h3>
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
      const banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.style.display = 'none', 400);
      }
    }

    function initCookieBanner() {
      const banner = document.getElementById('cookie-consent-banner');
      if (!banner) return;

      const consent = getConsent();
      if (!consent) {
        // Show after brief delay
        setTimeout(() => {
          banner.style.display = 'flex';
          setTimeout(() => banner.classList.add('show'), 50);
        }, 1200);
      } else {
        banner.style.display = 'none';
      }

      const btnAccept = document.getElementById('btn-cookie-accept');
      const btnReject = document.getElementById('btn-cookie-reject');
      const btnDetails = document.getElementById('btn-cookie-toggle-details');
      const detailsBox = document.getElementById('cookie-details-box');

      if (btnAccept) {
        btnAccept.addEventListener('click', () => setConsent('accepted'));
      }
      if (btnReject) {
        btnReject.addEventListener('click', () => setConsent('rejected'));
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
      const banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.style.display = 'flex';
        setTimeout(() => banner.classList.add('show'), 50);
      }
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
