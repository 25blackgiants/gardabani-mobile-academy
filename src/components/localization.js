const LANGUAGE_SWITCHER_CSS = `
    .language-switcher {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 3px;
      border: 1px solid var(--border-light, rgba(148,163,184,.35));
      border-radius: 999px;
      background: var(--bg-card-subtle, rgba(148,163,184,.10));
    }
    .language-switcher button {
      min-width: 42px;
      min-height: 34px;
      padding: 5px 9px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--text-muted, #64748b);
      font: inherit;
      font-size: .72rem;
      font-weight: 800;
      letter-spacing: .02em;
      cursor: pointer;
      transition: background .18s ease, color .18s ease, transform .18s ease;
    }
    .language-switcher button:hover { color: var(--text-main, #0f172a); transform: translateY(-1px); }
    .language-switcher button:focus-visible { outline: 3px solid rgba(37,99,235,.45); outline-offset: 2px; }
    .language-switcher button.active { background: var(--primary, #2563eb); color: #fff; }
    [data-theme="dark"] .language-switcher button:hover { color: #fff; }
    @media (max-width: 720px) {
      .language-switcher button { min-width: 38px; min-height: 32px; padding-inline: 7px; }
    }
`;

const LANGUAGE_SWITCHER_HTML = `
        <div class="language-switcher" id="language-switcher" role="group" aria-label="ენის არჩევა / Dil seçimi">
          <button type="button" data-language="ka" aria-label="ქართული ენა">ქარ</button>
          <button type="button" data-language="az" aria-label="Azərbaycan dili">AZ</button>
        </div>
`;

const LOCALIZATION_JS = `
(function () {
  const translations = {
    'გარდაბნის მობილური აკადემია': 'Qardabani Mobil Akademiyası',
    'მთავარი გვერდი': 'Əsas səhifə',
    'კალენდარი': 'Təqvim',
    'მენტორები': 'Mentorlar',
    'პარამეტრები': 'Parametrlər',
    'ღამე': 'Gecə',
    'დღე': 'Gündüz',
    'რუკის ტიპი:': 'Xəritə növü:',
    'საგზაო': 'Yol',
    'სატელიტი': 'Peyk',
    'რელიეფი': 'Relyef',
    'გარდაბანზე ფოკუსი': 'Qardabaniyə fokuslan',
    'რუკაზე ნახვა': 'Xəritədə bax',
    'მთავარ გვერდზე დაბრუნება': 'Əsas səhifəyə qayıt',
    'შემდეგი შეხვედრა': 'Növbəti görüş',
    'დღეს': 'Bu gün',
    'წინა თვე': 'Əvvəlki ay',
    'შემდეგი თვე': 'Növbəti ay',
    'დღე': 'Gün',
    'სთ': 'saat',
    'წთ': 'dəq',
    'მარშრუტი Google Maps-ში': 'Google Maps-də marşrut',
    'როგორ მივიდე': 'Necə getmək olar',
    'მიმართულება': 'İstiqamət',
    'რედაქტორი': 'Redaktor',
    'ახალი ლოკაცია': 'Yeni məkan',
    'ახალი მენტორი': 'Yeni mentor',
    'ადმინი': 'Admin',
    'გამოსვლა': 'Çıxış',
    'აკადემიის მენტორები': 'Akademiyanın mentorları',
    'ენის არჩევა': 'Dil seçimi',
    'ლოკაციები': 'Məkanlar',
    'მდებარეობა': 'Məkan',
    'აღწერა': 'Təsvir',
    'დეტალები': 'Ətraflı məlumat',
    'სრული ისტორია': 'Tam tarixçə',
    'ბოლო 24 საათი': 'Son 24 saat',
    'ბოლო 7 დღე': 'Son 7 gün',
    'ანალიტიკა': 'Analitika',
    'არჩევანი მოლოდინშია': 'Seçim gözlənilir',
    'პრეფერენციები': 'Tərcihlər',
    'მარკეტინგი': 'Marketinq',
    'მხოლოდ აუცილებელი': 'Yalnız zəruri',
    'დახურვა': 'Bağla',
    'შენახვა': 'Yadda saxla',
    'გაუქმება': 'Ləğv et',
    'ჩასწორება': 'Redaktə et',
    'წაშლა': 'Sil',
    'მომდევნო': 'Növbəti',
    'წინა': 'Əvvəlki'
  };
  const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
  const originals = new WeakMap();
  let activeLanguage = 'ka';

  function translateNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim()) return;
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return;
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    const source = originals.get(node);
    if (activeLanguage === 'ka') { node.nodeValue = source; return; }
    let value = source;
    sortedKeys.forEach(key => { value = value.split(key).join(translations[key]); });
    node.nodeValue = value;
  }

  function translateTree(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(translateNode);
  }

  function setLanguage(language, persist) {
    activeLanguage = language === 'az' ? 'az' : 'ka';
    document.documentElement.lang = activeLanguage;
    document.documentElement.setAttribute('data-language', activeLanguage);
    if (persist) localStorage.setItem('gardabani_language', activeLanguage);
    document.querySelectorAll('[data-language]').forEach(button => {
      if (button.tagName === 'BUTTON') {
        const selected = button.dataset.language === activeLanguage;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      }
    });
    translateTree(document.body);
  }

  function initLocalization() {
    const saved = localStorage.getItem('gardabani_language');
    document.querySelectorAll('#language-switcher button[data-language]').forEach(button => {
      button.addEventListener('click', () => setLanguage(button.dataset.language, true));
    });
    setLanguage(saved === 'az' ? 'az' : 'ka', false);
    const observer = new MutationObserver(records => {
      if (activeLanguage !== 'ka') records.forEach(record => record.addedNodes.forEach(translateTree));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.GARDABANI_TRANSLATIONS = translations;
  window.setGardabaniLanguage = setLanguage;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLocalization);
  else initLocalization();
})();
`;

module.exports = { LANGUAGE_SWITCHER_CSS, LANGUAGE_SWITCHER_HTML, LOCALIZATION_JS };
