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
    header.header { min-height: 62px; }
    .header-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-width: 290px;
      white-space: nowrap;
    }
    .header-title > span:last-child { white-space: nowrap; }
    .nav-tab {
      justify-content: center;
      min-width: 98px;
      white-space: nowrap;
    }
    .theme-toggle-btn { min-width: 88px; justify-content: center; white-space: nowrap; }
    .btn-return-map { min-width: 184px; justify-content: center; white-space: nowrap; }
    [data-language="az"] .header-title,
    [data-language="az"] .nav-tab,
    [data-language="az"] .theme-toggle-btn,
    [data-language="az"] .btn-return-map { letter-spacing: 0; }
    @media (max-width: 1100px) {
      .header-content { width: 100%; justify-content: space-between; }
      .header-actions { width: 100%; justify-content: flex-end; flex-wrap: wrap; }
    }
    @media (max-width: 720px) {
      header.header { min-height: 0; }
      .header-content { gap: 8px; }
      .header-title { min-width: 0; width: 100%; font-size: 1rem; }
      .nav-tabs { width: 100%; }
      .nav-tab { min-width: 0; flex: 1 1 0; padding-inline: 6px; }
      .header-actions { justify-content: space-between; }
      .btn-return-map { min-width: 0; }
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
    /* Shared navigation and controls */
    'გარდაბნის მობილური აკადემია': 'Qardabani Mobil Akademiyası',
    'მთავარ გვერდზე დაბრუნება': 'Əsas səhifəyə qayıt',
    'მთავარ გვერდზე გადასვლა': 'Əsas səhifəyə keç',
    'მთავარი გვერდი (რუკა)': 'Əsas səhifə (xəritə)',
    'მთავარი გვერდი': 'Əsas səhifə',
    'აქტივობების კალენდარი': 'Fəaliyyət təqvimi',
    'მენტორების კატალოგი': 'Mentor kataloqu',
    'პარამეტრები & მართვა': 'Parametrlər və idarəetmə',
    'კალენდარი': 'Təqvim',
    'მენტორები': 'Mentorlar',
    'პარამეტრები': 'Parametrlər',
    'ენის არჩევა': 'Dil seçimi',
    'ქართული ენა': 'Gürcü dili',
    'დღის და ღამის რეჟიმი': 'Gündüz və gecə rejimi',
    'დღის რეჟიმზე გადართვა': 'Gündüz rejiminə keç',
    'ღამის რეჟიმზე გადართვა': 'Gecə rejiminə keç',
    'დღის რეჟიმი გააქტიურდა': 'Gündüz rejimi aktivləşdirildi',
    'ღამის რეჟიმი გააქტიურდა': 'Gecə rejimi aktivləşdirildi',
    'ღამე': 'Gecə',
    'დახურვა': 'Bağla',
    'შენახვა': 'Yadda saxla',
    'გაუქმება': 'Ləğv et',
    'ჩასწორება': 'Redaktə et',
    'წაშლა': 'Sil',
    'განახლება': 'Yenilə',
    'შეტყობინება': 'Bildiriş',

    /* Map and location interface */
    'რუკის ტიპი:': 'Xəritə növü:',
    'გარდაბანზე ფოკუსი': 'Qardabaniyə fokuslan',
    'გარდაბნის საზღვარზე ფოკუსი': 'Qardabani sərhədinə fokuslan',
    'რუკაზე ნახვა': 'Xəritədə bax',
    'მარშრუტი Google Maps-ში': 'Google Maps-də marşrut',
    'როგორ მივიდე': 'Necə getmək olar',
    'მიმართულება': 'İstiqamət',
    'საგზაო': 'Yol',
    'სატელიტი': 'Peyk',
    'რელიეფი': 'Relyef',
    'აქტივობები': 'Fəaliyyətlər',
    'აქტივობა': 'fəaliyyət',
    'ცენტრირება': 'Mərkəzləşdir',
    'ეკრანი': 'Tam ekran',
    'ლოკაციების მართვა და რედაქტორი': 'Məkanların idarəsi və redaktoru',
    'JSON კოდის კოპირება': 'JSON kodunu kopyala',
    'საწყისზე დაბრუნება': 'İlkin vəziyyətə qaytar',
    'შენახვა და განახლება': 'Yadda saxla və yenilə',
    'რედაქტორი': 'Redaktor',
    'ახალი ლოკაცია': 'Yeni məkan',
    'ლოკაციები': 'Məkanlar',
    'ლოკაცია': 'Məkan',
    'მდებარეობა': 'Məkan',
    'აღწერა': 'Təsvir',
    'დეტალები': 'Ətraflı məlumat',
    'ჰაბი': 'Mərkəz',
    'სოფელი': 'Kənd',

    /* Calendar */
    'ყველა დაგეგმილი აქტივობა': 'Bütün planlaşdırılmış fəaliyyətlər',
    'სათემო ლიდერობა და დებატები': 'İcma liderliyi və debatlar',
    'შემდეგი შეხვედრა': 'Növbəti görüş',
    'დღეს': 'Bu gün',
    'წინა თვე': 'Əvvəlki ay',
    'შემდეგი თვე': 'Növbəti ay',
    'სრული ისტორია': 'Tam tarixçə',
    'ბოლო 24 საათი': 'Son 24 saat',
    'ბოლო 7 დღე': 'Son 7 gün',
    '24 საათი': '24 saat',
    '7 დღე': '7 gün',
    'ორშ': 'B.e.',
    'სამ': 'Ç.a.',
    'ოთხ': 'Ç.',
    'ხუთ': 'C.a.',
    'პარ': 'C.',
    'შაბ': 'Ş.',
    'კვი': 'B.',
    'იანვარი': 'yanvar',
    'თებერვალი': 'fevral',
    'მარტი': 'mart',
    'აპრილი': 'aprel',
    'მაისი': 'may',
    'ივნისი': 'iyun',
    'ივლისი': 'iyul',
    'აგვისტო': 'avqust',
    'სექტემბერი': 'sentyabr',
    'ოქტომბერი': 'oktyabr',
    'ნოემბერი': 'noyabr',
    'დეკემბერი': 'dekabr',
    'დღეში': 'gün sonra',
    'დღე': 'Gün',
    'საათი': 'saat',
    'სთ': 'saat',
    'წუთი': 'dəqiqə',
    'წთ': 'dəq',
    'წამი': 'saniyə',
    'წმ': 'san',

    /* Mentors */
    'აკადემიის მენტორები': 'Akademiyanın mentorları',
    'მენტორის პროფილი': 'Mentor profili',
    'საქმიანობის მიმართულება და ბიოგრაფია': 'Fəaliyyət istiqaməti və bioqrafiya',
    'განათლება და კვალიფიკაცია': 'Təhsil və ixtisas',
    'სამუშაო გამოცდილება': 'İş təcrübəsi',
    'მიღწევები და სათემო პროექტები': 'Nailiyyətlər və icma layihələri',
    'კომპეტენციები და საკვანძო თემები': 'Bacarıqlar və əsas mövzular',
    'მენტორის დამატება': 'Mentor əlavə et',
    'ახალი მენტორი': 'Yeni mentor',
    'სახელი და გვარი': 'Ad və soyad',
    'როლი / პოზიცია': 'Rol / vəzifə',
    'აღწერა / მიმართულება / ბიოგრაფია': 'Təsvir / istiqamət / bioqrafiya',
    'თეგები (მძიმით გამოყოფილი)': 'Teqlər (vergüllə ayrılmış)',
    'ავატარის ფერი': 'Avatar rəngi',
    'იისფერი': 'Bənövşəyi',
    'ვარდისფერი': 'Çəhrayı',
    'ლურჯი': 'Mavi',
    'მწვანე': 'Yaşıl',
    'ფირუზისფერი': 'Firuzəyi',
    'ნარინჯისფერი': 'Narıncı',
    'წითელი': 'Qırmızı',
    'მენტორი': 'Mentor',

    /* Settings */
    'საიტის ნათელი და მუქი რეჟიმის მართვა': 'Saytın açıq və qaranlıq rejiminin idarəsi',
    'აქტიურია ნათელი რეჟიმი': 'Açıq rejim aktivdir',
    'აქტიურია მუქი რეჟიმი': 'Qaranlıq rejim aktivdir',
    'ფერთა რეჟიმი': 'Rəng rejimi',
    'რეჟიმის შეცვლა': 'Rejimi dəyiş',
    'გარეგნობა': 'Görünüş',
    'რუკის პარამეტრები': 'Xəritə parametrləri',
    'საზღვრების და მომსახურების არეალის ვიზუალიზაცია': 'Sərhədlərin vizuallaşdırılması',
    'რუკის შრეები და ვიზუალიზაცია': 'Xəritə qatları və vizuallaşdırma',
    'მართეთ მთავარ რუკაზე გამოსახული გეოგრაფიული და ანალიტიკური შრეები Lever-ის ტიპის გადამრთველებით.': 'Əsas xəritədə göstərilən coğrafi və analitik qatları keçid düymələri ilə idarə edin.',
    'გარდაბნის მუნიციპალიტეტის საზღვარი': 'Qardabani bələdiyyəsinin sərhədi',
    'ოფიციალური ადმინისტრაციული საზღვრის ჩვენება ლურჯი წყვეტილი კონტურით.': 'Rəsmi inzibati sərhədi mavi kəsik konturla göstərir.',
    'კონფიდენციალურობა და ანალიტიკის თანხმობა': 'Məxfilik və analitika razılığı',
    'ქუქი-ფაილების არჩევანი და ამ ბრაუზერში შენახული პარამეტრები': 'Kuki seçimi və bu brauzerdə saxlanmış parametrlər',
    'ქუქი-ფაილები და კონფიდენციალურობა': 'Kukilər və məxfilik',
    'სტატუსი: მოწმდება...': 'Status: yoxlanılır...',
    'არჩევანის შეცვლა': 'Seçimi dəyiş',
    'ყველა პარამეტრის საწყისზე დაბრუნება': 'Bütün parametrləri ilkin vəziyyətə qaytar',
    'პარამეტრები წარმატებით განულდა': 'Parametrlər uğurla sıfırlandı',
    'სისტემის სტატუსი': 'Sistem statusu',
    'ღრუბლოვან სერვისთან კავშირისა და დაცვის მდგომარეობა': 'Bulud xidməti bağlantısı və təhlükəsizlik vəziyyəti',
    'სერვერული უსაფრთხოება': 'Server təhlükəsizliyi',
    'კავშირის სტატუსი:': 'Bağlantı statusu:',
    'კავშირი მოწმდება...': 'Bağlantı yoxlanılır...',
    'დაკავშირებულია (RLS & სერვერული დაცვა აქტიურია)': 'Qoşulub (RLS və server qoruması aktivdir)',
    'ხაზგარეშე (Offline რეჟიმი)': 'Oflayn rejim',
    'ლოკალური რეჟიმი (Supabase არ არის დაკონფიგურირებული)': 'Lokal rejim (Supabase konfiqurasiya edilməyib)',
    'უცნობი შეცდომა': 'Naməlum xəta',
    'შეცდომა:': 'Xəta:',

    /* Administration */
    'ადმინისტრატორის დაცული წვდომა': 'Administratorun qorunan girişi',
    'ადმინისტრატორის ხელსაწყოები': 'Administrator alətləri',
    'მხოლოდ აქტიური ადმინისტრატორის სესიისთვის': 'Yalnız aktiv administrator sessiyası üçün',
    'ადმინისტრატორის სესია აქტიურია': 'Administrator sessiyası aktivdir',
    'აქტიურია დროებითი სესია (SessionStorage). უმოქმედობისას ავტომატურად გაითიშება 15 წუთში.': 'Müvəqqəti sessiya aktivdir (SessionStorage). 15 dəqiqə fəaliyyətsizlikdən sonra avtomatik bağlanacaq.',
    'თქვენ გაქვთ სრული წვდომა მთავარ გვერდზე ლოკაციების დამატების (➕) და რედაქტირების (✏️) ფუნქციონალზე.': 'Əsas səhifədə məkan əlavə etmək və redaktə etmək üçün tam girişiniz var.',
    'Supabase მართვის პანელი': 'Supabase idarəetmə paneli',
    'მართვის პანელი': 'İdarəetmə paneli',
    'სესიის დასრულება (გამოსვლა)': 'Sessiyanı bitir (çıxış)',
    'სესიის დასრულება': 'Sessiyanı bitir',
    'ადმინისტრატორის ელ-ფოსტა': 'Administrator e-poçtu',
    'ადმინისტრატორის კოდი': 'Administrator kodu',
    'ადმინისტრატორის პაროლი': 'Administrator parolu',
    'შეიყვანეთ კოდი...': 'Kodu daxil edin...',
    'პაროლის ჩვენება/დამალვა': 'Parolu göstər/gizlət',
    'დარჩენილია 3 მცდელობა': '3 cəhd qalıb',
    'დარჩენილია': 'Qalıb:',
    'მცდელობა': 'cəhd',
    'სისტემა დროებით დაბლოკილია!': 'Sistem müvəqqəti bloklanıb!',
    'დარჩენილი დრო:': 'Qalan vaxt:',
    'შეიყვანეთ ადმინისტრატორის საიდუმლო კოდი. კოდი მოწმდება კლიენტის კრიპტოგრაფიული ჰეშით. 3 არასწორი მცდელობის შემდეგ სისტემა დროებით დაიბლოკება.': 'Administratorun məxfi kodunu daxil edin. Kod kriptoqrafik heş ilə yoxlanılır. 3 səhv cəhddən sonra sistem müvəqqəti bloklanır.',
    'შეიყვანეთ Supabase ადმინისტრატორის ელ-ფოსტა და პაროლი სრული ღრუბლოვანი წვდომისთვის.': 'Tam bulud girişi üçün Supabase administrator e-poçtunu və parolunu daxil edin.',
    'გთხოვთ შეიყვანოთ კოდი / პაროლი.': 'Kodu / parolu daxil edin.',
    'არასწორი ელ-ფოსტა ან პაროლი!': 'E-poçt və ya parol yanlışdır!',
    'არასწორი კოდი!': 'Kod yanlışdır!',
    'ადმინისტრატორის რეჟიმი გაითიშა': 'Administrator rejimi söndürüldü',
    'ადმინისტრატორის სესია წარმატებით გააქტიურდა!': 'Administrator sessiyası uğurla aktivləşdirildi!',
    'რეჟიმი გააქტიურდა!': 'Rejim aktivləşdirildi!',
    'უმოქმედობის გამო (15 წთ) ადმინისტრატორის სესია დასრულდა': '15 dəqiqə fəaliyyətsizlik səbəbindən administrator sessiyası bitdi',
    'მოწმდება...': 'Yoxlanılır...',
    'შესვლა': 'Daxil ol',
    'გამოსვლა': 'Çıxış',
    'ადმინი': 'Admin',
    'დაცული': 'Qorunur',

    /* Analytics dashboard */
    'ვიზიტების, მოწყობილობებისა და აქტივობის შეჯამება': 'Ziyarətlərin, cihazların və fəaliyyətin icmalı',
    'ვიზიტორთა ანალიტიკა და მონაცემები': 'Ziyarətçi analitikası və məlumatları',
    'საიტის რეალური ვიზიტორების, მოწყობილობების, წყაროებისა და აქტივობის მონაცემთა ვიზუალიზაცია.': 'Saytın real ziyarətçiləri, cihazları, mənbələri və fəaliyyəti haqqında məlumatların vizuallaşdırılması.',
    'ანალიტიკის პანელი': 'Analitika paneli',
    'ანალიტიკა': 'Analitika',
    'ლაივ რეჟიმი აქტიურია': 'Canlı rejim aktivdir',
    'ლაივ რეჟიმი': 'Canlı rejim',
    'ტესტ-სიმულაცია': 'Test simulyasiyası',
    'სატესტო ვიზიტების სიმულაცია': 'Test ziyarətlərini simulyasiya et',
    'მონაცემების ექსპორტი': 'Məlumatları ixrac et',
    'ექსპორტი დასრულდა': 'İxrac tamamlandı',
    'CSV ექსპორტი': 'CSV ixracı',
    'ლოგის გასუფთავება': 'Jurnalı təmizlə',
    'ლოკალური ჟურნალის გასუფთავება': 'Lokal jurnalı təmizlə',
    'ვიზიტები სულ': 'Ümumi ziyarətlər',
    'დაბრუნების წილი': 'Təkrar ziyarət payı',
    'უნიკალური ვიზიტორები:': 'Unikal ziyarətçilər:',
    'ჩატვ. სისწრაფე': 'Yükləmə sürəti',
    'ჩატვირთვის სისწრაფე': 'Yükləmə sürəti',
    'ოპტიმალური მაჩვენებელი': 'Optimal göstərici',
    'საშ. დროის ხანგრ.': 'Orta sessiya müddəti',
    'აქტიური სესია': 'Aktiv sessiya',
    'მობილური': 'Mobil',
    'დესკტოპი:': 'Masaüstü:',
    'კომპიუტერი': 'Kompüter',
    'პლანშეტი': 'Planşet',
    'ბრაუზ. ენა #1': 'Əsas brauzer dili',
    'ყველაზე ხშირი': 'Ən çox istifadə olunan',
    'ონლაინ (5 წთ):': 'Onlayn (5 dəq):',
    'ვიზიტორი': 'Ziyarətçi',
    'ვიზიტები': 'Ziyarətlər',
    'ვიზიტი': 'ziyarət',
    'ვიზიტების დინამიკა (საათობრივი აქტივობა & ტალღები)': 'Ziyarət dinamikası (saatlıq fəaliyyət və dalğalar)',
    'აქტივობის გრაფიკული მრუდი და პიკური საათები': 'Fəaliyyət qrafiki və pik saatlar',
    'ეთნიკური & ენობრივი მრავალფეროვნება': 'Etnik və dil müxtəlifliyi',
    'ბრაუზერის ენის მიხედვით': 'Brauzer dilinə görə',
    'სოფლების ინტერესი & მარშრუტები': 'Kəndlərə maraq və marşrutlar',
    'ლოკაციის ნახვები 👁️ vs Google Maps ნავიგაცია 🚗': 'Məkan baxışları 👁️ və Google Maps naviqasiyası 🚗',
    'მოწყობილობები & კავშირის ხარისხი': 'Cihazlar və bağlantı keyfiyyəti',
    'მობილური წილი და ქსელის ტიპი': 'Mobil pay və şəbəkə növü',
    'რეალური სისწრაფე': 'Real sürət',
    'დიაგნოსტირდება': 'Diaqnostika edilir',
    'სწრაფი & ოპტიმიზებული': 'Sürətli və optimallaşdırılmış',
    'სწრაფი': 'Sürətli',
    'ნორმალური სისწრაფე': 'Normal sürət',
    'ნორმალური': 'Normal',
    'ნელი': 'Yavaş',
    'შედარებით ნელი': 'Nisbətən yavaş',
    'პიკური საათები (24-საათიანი განაწილება)': 'Pik saatlar (24 saatlıq bölgü)',
    'ტელეფონის მეხსიერება & CPU სიმძლავრე': 'Telefon yaddaşı və CPU gücü',
    'აპარატურული რესურსების განაწილება (RAM & პროცესორის ბირთვები)': 'Avadanlıq resurslarının bölgüsü (RAM və prosessor nüvələri)',
    'მონაცემთა დაზოგვის რეჟიმი (Data Saver)': 'Məlumat qənaəti rejimi (Data Saver)',
    'მობილური მეგაბაიტების დაზოგვის სტატუსი სოფლის ქსელებში': 'Kənd şəbəkələrində mobil məlumat qənaəti statusu',
    'ეკრანის ორიენტაცია & სისტემური თემა': 'Ekran istiqaməti və sistem mövzusu',
    'ვერტიკალური/ჰორიზონტალური რეჟიმი და მოწყობილობის Dark/Light თემა': 'Şaquli/üfüqi rejim və cihazın qaranlıq/açıq mövzusu',
    'დროის სარტყელი (Timezone)': 'Saat qurşağı',
    'ვიზიტორთა გეოგრაფიული არეალი და დროის ზონები': 'Ziyarətçilərin coğrafi ərazisi və saat qurşaqları',
    'ბოლო ვიზიტორთა რეალური ნაკადი (Live Feed)': 'Son ziyarətçilərin canlı axını',
    'ვიზიტების მონაცემები იტვირთება...': 'Ziyarət məlumatları yüklənir...',
    'ვიზიტები ჯერ არ არის.': 'Hələ ziyarət yoxdur.',
    'ეს პანელი ავტომატურად განახლდება, როგორც კი ვინმე ეწვევა საიტს.': 'Kimsə sayta daxil olan kimi bu panel avtomatik yenilənəcək.',
    'მონაცემები ჯერ არ არის': 'Hələ məlumat yoxdur',
    'მონაცემები არ არის': 'Məlumat yoxdur',
    'ჩანაწერი': 'Qeyd',
    'დღიური ვიზიტები': 'Gündəlik ziyarətlər',
    'დღეს:': 'Bu gün:',
    'სულ 14 დღეში:': '14 gündə cəmi:',
    'ახლახან': 'İndicə',
    'წთ წინ': 'dəq əvvəl',
    'სთ წინ': 'saat əvvəl',
    'ნახვები': 'Baxışlar',
    'ნავიგაცია': 'Naviqasiya',
    'ბირთვი': 'nüvə',
    'ვერტიკალური': 'Şaquli',
    'ჰორიზონტალური': 'Üfüqi',
    'სისტემური Dark Mode': 'Sistemin qaranlıq rejimi',
    'სისტემური Light Mode': 'Sistemin açıq rejimi',
    'ჩართულია (მეგაბაიტების დაზოგვა)': 'Aktivdir (məlumat qənaəti)',
    'გამორთულია (სტანდარტული რეჟიმი)': 'Söndürülüb (standart rejim)',
    'ქართული': 'Gürcü',
    'აზერბაიჯანული': 'Azərbaycan',
    'ინგლისური': 'İngilis',
    'სხვა წყარო': 'Digər mənbə',
    'პირდაპირი (Direct)': 'Birbaşa',
    'სხვა': 'Digər',
    'უცნობი': 'Naməlum',

    /* Cookie and privacy center */
    'კონფიდენციალურობა და ქუქი-ფაილები': 'Məxfilik və kukilər',
    'საიტი იცავს ევროკავშირის GDPR რეგულაციასა და საქართველოს კანონმდებლობას. ჩვენ ვიყენებთ ტექნიკურ ქუქი-ფაილებს საიტის უსაფრთხოებისთვის, ხოლო ანალიტიკურ და პრეფერენციების პარამეტრებს ვააქტიურებთ მხოლოდ თქვენი მკაფიო ნებართვის შემდეგ.': 'Sayt Avropa İttifaqının GDPR qaydalarına və Gürcüstan qanunvericiliyinə uyğundur. Təhlükəsizlik üçün texniki kukilərdən istifadə edirik; analitika və seçim parametrlərini yalnız aydın razılığınızdan sonra aktivləşdiririk.',
    'აუცილებელი (Strictly Necessary)': 'Zəruri (Strictly Necessary)',
    'მუდამ აქტიური': 'Həmişə aktiv',
    'სესიის უსაფრთხოება, CSRF დაცვა, თანხმობის ჟურნალი და ადმინ-ავტორიზაცია. გათავისუფლებულია წინასწარი თანხმობისგან.': 'Sessiya təhlükəsizliyi, CSRF qoruması, razılıq jurnalı və administrator girişi. İlkin razılıq tələbindən azaddır.',
    'ფუნქციური & პრეფერენციები (Preferences)': 'Funksional və seçim kukiləri',
    'საჭიროებს თანხმობას': 'Razılıq tələb edir',
    'არჩეული ვიზუალური თემისა (დღე/ღამე) და რუკის პარამეტრების დამახსოვრება მომდევნო ვიზიტებისთვის.': 'Seçilmiş mövzunu (gündüz/gecə) və xəritə parametrlərini növbəti ziyarətlər üçün yadda saxlayır.',
    'ანალიტიკა & წარმადობა (Analytics)': 'Analitika və performans',
    'ანონიმური სტატისტიკა: გვერდის ჩატვირთვის სისწრაფე, ვიზიტის ხანგრძლივობა, მოწყობილობის სიმძლავრე და სოფლების აქტივობების პოპულარობა. IP არ ინახება.': 'Anonim statistika: səhifənin yüklənmə sürəti, ziyarət müddəti, cihaz imkanları və kənd fəaliyyətlərinin populyarlığı. IP ünvanı saxlanmır.',
    'მარკეტინგი & რეკლამა (Marketing)': 'Marketinq və reklam',
    'მკაცრი თანხმობა': 'Aydın razılıq',
    'მიზნობრივი კამპანიები და გარე პიქსელები. საიტი ამჟამად არ იყენებს სარეკლამო ქსელებს; პარამეტრი საწყისად გამორთულია.': 'Hədəfli kampaniyalar və xarici piksellər. Sayt hazırda reklam şəbəkələrindən istifadə etmir; parametr standart olaraq söndürülüb.',
    'ქუქი-ფაილების რეესტრი (Open Cookie Database სტანდარტი):': 'Kuki reyestri (Open Cookie Database standartı):',
    'იდენტიფიკატორი': 'İdentifikator',
    'კატეგორია': 'Kateqoriya',
    'ვადა': 'Müddət',
    'მიზანი': 'Məqsəd',
    'აუცილებელი': 'Zəruri',
    '1 წელი': '1 il',
    'თანხმობის პარამეტრების შენახვა': 'Razılıq parametrlərinin saxlanması',
    'სესია': 'Sessiya',
    'უსაფრთხო ნავიგაცია': 'Təhlükəsiz naviqasiya',
    'პრეფერენცია': 'Seçim',
    'პრეფერენციები': 'Seçimlər',
    'თემის (დღე/ღამე) დამახსოვრება': 'Mövzunun (gündüz/gecə) yadda saxlanması',
    'ანონიმური განმეორებითი ვიზიტები': 'Anonim təkrar ziyarətlər',
    'პარამეტრების მორგება': 'Parametrləri fərdiləşdir',
    'პარამეტრების შეკუმშვა': 'Parametrləri yığ',
    'მხოლოდ აუცილებელი': 'Yalnız zəruri',
    'არჩევანის შენახვა': 'Seçimi yadda saxla',
    'ყველას მიღება': 'Hamısını qəbul et',
    'ქუქი-ფაილები': 'Kukilər',
    'არჩევანი მოლოდინშია': 'Seçim gözlənilir',
    'საიტი მუშაობს Zero-Cookie რეჟიმში': 'Sayt kukisiz rejimdə işləyir',
    'აქტიური კატეგორიები:': 'Aktiv kateqoriyalar:',
    'მარკეტინგი': 'Marketinq',

    /* Initial public content */
    'მთავარი ჰაბი — ქ. გარდაბანი': 'Əsas mərkəz — Qardabani şəhəri',
    'ქ. გარდაბანი': 'Qardabani şəhəri',
    'ლოკაცია 1: სოფ. კესალო': 'Məkan 1: Kesalo kəndi',
    'ლოკაცია 2: სოფ. ნაზარლო': 'Məkan 2: Nazarlo kəndi',
    'ლოკაცია 3: სოფ. სართიჭალა': 'Məkan 3: Sartiçala kəndi',
    'ლოკაცია 4: სოფ. კუმისი': 'Məkan 4: Kumisi kəndi',
    'ლოკაცია 5: სოფ. ყარაჯალარი': 'Məkan 5: Qaracalar kəndi',
    'ლოკაცია 6: სოფ. ვახტანგისი': 'Məkan 6: Vaxtangisi kəndi',
    'სოფ. კესალო': 'Kesalo kəndi',
    'სოფ. ნაზარლო': 'Nazarlo kəndi',
    'სოფ. სართიჭალა': 'Sartiçala kəndi',
    'სოფ. კუმისი': 'Kumisi kəndi',
    'სოფ. ყარაჯალარი': 'Qaracalar kəndi',
    'სოფ. ვახტანგისი': 'Vaxtangisi kəndi',
    'კესალო': 'Kesalo',
    'ნაზარლო': 'Nazarlo',
    'სართიჭალა': 'Sartiçala',
    'კუმისი': 'Kumisi',
    'ყარაჯალარი': 'Qaracalar',
    'ვახტანგისი': 'Vaxtangisi',
    'ცენტრალური საგანმანათლებლო პროგრამა და კოორდინაცია': 'Mərkəzi təhsil proqramı və koordinasiya',
    'მობილური ვორქშოფი: შემოქმედებითი უნარები და გუნდურობა': 'Mobil seminar: yaradıcılıq bacarıqları və komanda işi',
    'მობილური ვორქშოფი: სამოქალაქო ჩართულობა და მედიაწიგნიერება': 'Mobil seminar: vətəndaş iştirakı və media savadlılığı',
    'მობილური ვორქშოფი: ტექნოლოგიები და კარიერული ორიენტაცია': 'Mobil seminar: texnologiyalar və karyera istiqaməti',
    'მობილური ვორქშოფი: ეკოლოგია და გარემოსდაცვითი ინიციატივები': 'Mobil seminar: ekologiya və ətraf mühit təşəbbüsləri',
    'მობილური ვორქშოფი: ქართულ-აზერბაიჯანული ენობრივი კლუბი': 'Mobil seminar: gürcü-azərbaycan dil klubu',
    'მობილური ვორქშოფი: სოციალური მეწარმეობა და იდეების ბანკი': 'Mobil seminar: sosial sahibkarlıq və ideyalar bankı',
    'პროგრამის ძირითადი შტაბი და ცენტრალური შეხვედრების სივრცე. ქართველ და აზერბაიჯანელ ახალგაზრდებს შორის კულტურული დიალოგი, ენობრივი გაცვლა და ტექნოლოგიური ვორქშოფები.': 'Proqramın əsas qərargahı və mərkəzi görüş məkanı. Gürcü və azərbaycanlı gənclər arasında mədəni dialoq, dil mübadiləsi və texnologiya seminarları.',
    'ახალგაზრდული გუნდური პროექტები, ხელოვნების თერაპია, დებატები და ერთობლივი ინიციატივების დაგეგმვა ადგილობრივი თემის მონაწილეობით.': 'Gənclərin komanda layihələri, art-terapiya, debatlar və yerli icmanın iştirakı ilə birgə təşəbbüslərin planlaşdırılması.',
    'ტრენინგები კრიტიკულ აზროვნებაში, ციფრული უსაფრთხოება, ადგილობრივი საჭიროებების ადვოკატირება და სამოქალაქო აქტივიზმი.': 'Tənqidi düşüncə təlimləri, rəqəmsal təhlükəsizlik, yerli ehtiyacların müdafiəsi və vətəndaş fəallığı.',
    'ციფრული უნარების განვითარება, თანამედროვე პროფესიების გაცნობა, CV-ის შედგენა და პროფესიული განათლების შესაძლებლობები.': 'Rəqəmsal bacarıqların inkişafı, müasir peşələrlə tanışlıq, CV hazırlığı və peşə təhsili imkanları.',
    'ერთობლივი ეკო-აქტივობები, კუმისის ტბის მიმდებარე ტერიტორიის დასუფთავების აქცია და გარემოსდაცვითი ცნობიერების ამაღლება.': 'Birgə eko-fəaliyyətlər, Kumisi gölü ətrafında təmizlik aksiyası və ekoloji maarifləndirmə.',
    'ინტერაქტიული ენობრივი თამაშები, ორმხრივი ენის პრაქტიკა, კულტურათაშორისი დიალოგი და ახალგაზრდების დამეგობრების კლუბი.': 'İnteraktiv dil oyunları, qarşılıqlı dil təcrübəsi, mədəniyyətlərarası dialoq və gənclərin dostluq klubu.',
    'სასაზღვრო რეგიონის ახალგაზრდებისთვის მცირე სოციალური ბიზნეს-იდეების გენერირება და სათემო პროექტების დაფინანსების შესაძლებლობები.': 'Sərhəd bölgəsi gəncləri üçün kiçik sosial biznes ideyalarının hazırlanması və icma layihələrinin maliyyələşdirilməsi imkanları.',

    /* Mentor names, roles and primary descriptions */
    'დაკო კეჟერაშვილი': 'Dako Kejeraşvili',
    'ნია ჩინტლაძე': 'Nia Çintlaze',
    'მიხეილ გოგიაშვილი': 'Mixeil Qogiaşvili',
    'დავით მაკარიანი': 'Davit Makariani',
    'ანდრია საჯაია': 'Andria Sacaia',
    'მენტორი / არაფორმალური განათლების ექსპერტი': 'Mentor / qeyri-formal təhsil eksperti',
    'მენტორი / სათემო განვითარების კოორდინატორი': 'Mentor / icma inkişafı koordinatoru',
    'მენტორი / გუნდური ლიდერობის ტრენერი': 'Mentor / komanda liderliyi təlimçisi',
    'მენტორი / ციფრული ტექნოლოგიების სპეციალისტი': 'Mentor / rəqəmsal texnologiyalar mütəxəssisi',
    'მენტორი / სოციალური მეწარმეობის მკვლევარი': 'Mentor / sosial sahibkarlıq tədqiqatçısı',
    'არაფორმალური განათლება, კულტურათაშორისი დიალოგი და შემოქმედებითი უნარების განვითარება ახალგაზრდებში.': 'Qeyri-formal təhsil, mədəniyyətlərarası dialoq və gənclərdə yaradıcılıq bacarıqlarının inkişafı.',
    'ახალგაზრდული ინიციატივები, სამოქალაქო აქტივიზმი და სათემო პროექტების დაგეგმვა.': 'Gənclər təşəbbüsləri, vətəndaş fəallığı və icma layihələrinin planlaşdırılması.',
    'კომუნიკაცია, გუნდური ლიდერობა და ახალგაზრდების ჩართულობის პროგრამების კოორდინაცია.': 'Kommunikasiya, komanda liderliyi və gənclərin iştirak proqramlarının koordinasiyası.',
    'ტექნოლოგიები, ციფრული წიგნიერება და რეგიონული ახალგაზრდების ინოვაციური პროექტები.': 'Texnologiyalar, rəqəmsal savadlılıq və region gənclərinin innovativ layihələri.',
    'სოციალური მეწარმეობა, კვლევა და საგანმანათლებლო მოდულების განვითარება.': 'Sosial sahibkarlıq, tədqiqat və təhsil modullarının hazırlanması.',
    'ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი (თსუ) — სოციალურ და პოლიტიკურ მეცნიერებათა ბაკალავრი': 'İvane Cavaxişvili adına Tbilisi Dövlət Universiteti — sosial və siyasi elmlər üzrə bakalavr',
    'Erasmus+ Youth in Action — საერთაშორისო ტრენერთა სასერტიფიკატო პროგრამა არაფორმალურ განათლებასა და ფასილიტაციაში': 'Erasmus+ Youth in Action — qeyri-formal təhsil və fasilitasiya üzrə beynəlxalq təlimçi sertifikat proqramı',
    '5+ წლიანი გამოცდილება ახალგაზრდულ სექტორში ტრენერისა და ფასილიტატორის პოზიციაზე': 'Gənclər sektorunda təlimçi və fasilitator kimi 5 ildən çox təcrübə',
    'კულტურათაშორისი დიალოგისა და მშვიდობის მშენებლობის პროექტების კოორდინატორი ქვემო ქართლის რეგიონში': 'Kvemo Kartli regionunda mədəniyyətlərarası dialoq və sülh quruculuğu layihələrinin koordinatoru',
    'გარდაბნის მუნიციპალიტეტში ქართულ-აზერბაიჯანული ახალგაზრდული ინიციატივების წამყვანი მენტორი': 'Qardabani bələdiyyəsində gürcü-azərbaycanlı gənclər təşəbbüslərinin aparıcı mentoru',
    '30-ზე მეტი სათემო ვორქშოფისა და საგანმანათლებლო ბანაკის წარმატებული ორგანიზება': '30-dan çox icma seminarının və təhsil düşərgəsinin uğurlu təşkili',
    'ქვემო ქართლის ახალგაზრდული ჩართულობის პროგრამის თანაავტორი': 'Kvemo Kartli gənclərinin iştirak proqramının həmmüəllifi',
    'ახალგაზრდული ინიციატივების ევროპული ფორუმის მონაწილე და დელეგატი': 'Avropa Gənclər Təşəbbüsləri Forumunun iştirakçısı və nümayəndəsi',
    'ილიას სახელმწიფო უნივერსიტეტი — საზოგადოებასთან ურთიერთობისა და კომუნიკაციის ბაკალავრი': 'İlia Dövlət Universiteti — ictimaiyyətlə əlaqələr və kommunikasiya üzrə bakalavr',
    'სათემო ლიდერობისა და სამოქალაქო ადვოკატირების აკადემიის კურსდამთავრებული': 'İcma liderliyi və vətəndaş müdafiəsi akademiyasının məzunu',
    '4 წლიანი გამოცდილება რეგიონული არასამთავრობო ორგანიზაციების სათემო პროექტების მართვაში': 'Regional qeyri-hökumət təşkilatlarında icma layihələrinin idarəsi üzrə 4 illik təcrübə',
    'ახალგაზრდული საინიციატივო ჯგუფების მენტორინგი სოფლად მცხოვრები გოგონების გაძლიერების მიმართულებით': 'Kənd yerlərində yaşayan qızların gücləndirilməsi üzrə gənclər təşəbbüs qruplarının mentorluğu',
    'ადგილობრივი საჭიროებების კვლევისა და ადვოკატირების კამპანიების ხელმძღვანელი': 'Yerli ehtiyacların araşdırılması və müdafiə kampaniyalarının rəhbəri',
    '15-ზე მეტი ადგილობრივი მცირე გრანტისა და სათემო ინიციატივის წარმატებული იმპლემენტაცია': '15-dən çox yerli kiçik qrant və icma təşəbbüsünün uğurlu icrası',
    'გარემოსდაცვითი და ეკო-აქტივიზმის რეგიონული კამპანიების ავტორი': 'Ətraf mühit və eko-fəallıq üzrə regional kampaniyaların müəllifi',
    'ახალგაზრდა ქალთა ლიდერობის რეგიონული პლატფორმის თანადამფუძნებელი': 'Gənc qadın liderliyi regional platformasının həmtəsisçisi',
    'საქართველოს საზოგადოებრივ საქმეთა ინსტიტუტი (GIPA) — მართვა და საჯარო პოლიტიკა': 'Gürcüstan İctimai İşlər İnstitutu (GIPA) — idarəetmə və dövlət siyasəti',
    'გუნდური ქოუჩინგის, საჯარო გამოსვლებისა და მოლაპარაკებების მართვის ინტენსიური კურსი': 'Komanda kouçinqi, ictimai çıxış və danışıqların idarəsi üzrə intensiv kurs',
    'რეგიონული ახალგაზრდული ფორუმებისა და დებატ-კლუბების მთავარი მოდერატორი': 'Regional gənclər forumlarının və debat klublarının əsas moderatoru',
    'გუნდური შეჭიდულობის (Team Building) და ლიდერული უნარების მენტორი 100+ მონაწილისთვის': '100-dən çox iştirakçı üçün komanda quruculuğu və liderlik bacarıqları mentoru',
    'ახალგაზრდული გაცვლითი პროგრამების კოორდინატორი': 'Gənclər mübadilə proqramlarının koordinatoru',
    'რეგიონული ახალგაზრდული დებატ-ტურნირის დამფუძნებელი ქვემო ქართლში': 'Kvemo Kartlidə regional gənclər debat turnirinin təsisçisi',
    'ახალგაზრდული მედიაციისა და კონფლიქტების მშვიდობიანი მოგვარების პლატფორმის თანაშემქმნელი': 'Gənclər mediasiyası və münaqişələrin sülh yolu ilə həlli platformasının həmyaradıcısı',
    '500-ზე მეტი ახალგაზრდის გადამზადება ეფექტურ კომუნიკაციასა და ლიდერობაში': '500-dən çox gəncin effektiv kommunikasiya və liderlik üzrə hazırlanması',
    'თბილისის სახელმწიფო უნივერსიტეტი (თსუ) — კომპიუტერული მეცნიერებები და ინფორმაციული ტექნოლოგიები': 'Tbilisi Dövlət Universiteti — kompüter elmləri və informasiya texnologiyaları',
    'Google Developers & UI/UX დიზაინის სასერტიფიკატო პროგრამა': 'Google Developers və UI/UX dizayn sertifikat proqramı',
    '4+ წელი ვებ-დეველოპმენტისა და ტექნოლოგიური პროექტების მართვაში': 'Veb proqramlaşdırma və texnoloji layihələrin idarəsində 4 ildən çox təcrübə',
    'რეგიონულ სკოლებში ციფრული წიგნიერებისა და ვებ-ტექნოლოგიების ვორქშოფების ხელმძღვანელი': 'Regional məktəblərdə rəqəmsal savadlılıq və veb texnologiyaları seminarlarının rəhbəri',
    'მედიაწიგნიერებისა და კიბერუსაფრთხოების ტრენერი': 'Media savadlılığı və kibertəhlükəsizlik təlimçisi',
    'გარდაბნის მობილური აკადემიის ციფრული პლატფორმის და ინტერაქტიული რუკის თანაავტორი': 'Qardabani Mobil Akademiyasının rəqəmsal platforması və interaktiv xəritəsinin həmmüəllifi',
    'ახალგაზრდული ტექ-ჰაკათონების მენტორი და ჟიურის წევრი': 'Gənclər texnoloji hakatonlarının mentoru və münsiflər heyətinin üzvü',
    'ადგილობრივი სოციალური პროექტებისთვის 10-ზე მეტი ციფრული ხელსაწყოს შემქმნელი': 'Yerli sosial layihələr üçün 10-dan çox rəqəmsal alətin yaradıcısı',
    'თავისუფალი უნივერსიტეტი — ბიზნესის ადმინისტრირება და ეკონომიკა (ESM)': 'Azad Universitet — biznesin idarə edilməsi və iqtisadiyyat (ESM)',
    'სოციალური ინოვაციებისა და მდგრადი განვითარების საერთაშორისო საგანმანათლებლო პროგრამა': 'Sosial innovasiya və davamlı inkişaf üzrə beynəlxalq təhsil proqramı',
    'სოციალური საწარმოების კონსულტანტი და ბიზნეს-გეგმების მენტორი': 'Sosial müəssisələr üzrə məsləhətçi və biznes plan mentoru',
    'რეგიონული საჭიროებების კვლევისა და საგანმანათლებლო მოდულების შემმუშავებელი': 'Regional ehtiyacların tədqiqi və təhsil modullarının hazırlanması üzrə mütəxəssis',
    'ახალგაზრდული სტარტაპ-აქსელერატორის მენტორი': 'Gənclər startap akseleratorunun mentoru',
    '10-ზე მეტი სოციალური სტარტაპის ინკუბაციისა და დაფინანსების მენტორინგი': '10-dan çox sosial startapın inkubasiyası və maliyyələşdirilməsi üzrə mentorluq',
    'ახალგაზრდული მეწარმეობის საგანმანათლებლო სახელმძღვანელოს თანაავტორი': 'Gənclər sahibkarlığı üzrə təhsil vəsaitinin həmmüəllifi',
    'რეგიონული ეკონომიკური გაძლიერების პროექტების კოორდინატორი': 'Regional iqtisadi gücləndirmə layihələrinin koordinatoru',
    'არაფორმალური განათლება': 'Qeyri-formal təhsil',
    'კულტურათაშორისი დიალოგი': 'Mədəniyyətlərarası dialoq',
    'ფასილიტაცია': 'Fasilitasiya',
    'ახალგაზრდული პოლიტიკა': 'Gənclər siyasəti',
    'ახალგაზრდული პროექტები': 'Gənclər layihələri',
    'სამოქალაქო აქტივიზმი': 'Vətəndaş fəallığı',
    'სათემო განვითარება': 'İcma inkişafı',
    'იდეების გენერირება': 'İdeyaların yaradılması',
    'გუნდური ლიდერობა': 'Komanda liderliyi',
    'კომუნიკაცია': 'Kommunikasiya',
    'დებატები': 'Debatlar',
    'კონფლიქტების მართვა': 'Münaqişələrin idarəsi',
    'ციფრული უნარები': 'Rəqəmsal bacarıqlar',
    'ინოვაციები': 'İnnovasiyalar',
    'ვებ-ტექნოლოგიები': 'Veb texnologiyaları',
    'მედიაწიგნიერება': 'Media savadlılığı',
    'სოციალური მეწარმეობა': 'Sosial sahibkarlıq',
    'საგანმანათლებლო მოდულები': 'Təhsil modulları',
    'კვლევა': 'Tədqiqat',
    'ბიზნეს-მოდელირება': 'Biznes modelləşdirməsi',

    /* Common statuses */
    'წარმატებით': 'uğurla',
    'სატესტო მონაცემები წარმატებით დაგენერირდა!': 'Test məlumatları uğurla yaradıldı!',
    'ლოკალური ჟურნალი გასუფთავდა': 'Lokal jurnal təmizləndi',
    'გარდაბნის საზღვარი ჩაირთო': 'Qardabani sərhədi aktivləşdirildi',
    'გარდაბნის საზღვარი გაითიშა': 'Qardabani sərhədi söndürüldü',
    'ნამდვილად გსურთ ლოკალური ჟურნალის გასუფთავება?': 'Lokal jurnalı təmizləmək istədiyinizə əminsiniz?',
    'ნამდვილად გსურთ ყველა პარამეტრისა და ლოკაციების საწყის მნიშვნელობებზე დაბრუნება?': 'Bütün parametrləri və məkanları ilkin vəziyyətə qaytarmaq istədiyinizə əminsiniz?'
  };
  const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
  const textStates = new WeakMap();
  const attributeStates = new WeakMap();
  const localizableAttributes = ['title', 'aria-label', 'placeholder', 'alt'];
  const georgianCharacters = /[\u10A0-\u10FF]/g;
  const transliteration = {
    'ა':'a','ბ':'b','გ':'g','დ':'d','ე':'e','ვ':'v','ზ':'z','თ':'t','ი':'i','კ':'k',
    'ლ':'l','მ':'m','ნ':'n','ო':'o','პ':'p','ჟ':'j','რ':'r','ს':'s','ტ':'t','უ':'u',
    'ფ':'f','ქ':'q','ღ':'ğ','ყ':'q','შ':'ş','ჩ':'ç','ც':'ts','ძ':'dz','წ':'ts','ჭ':'ç',
    'ხ':'x','ჯ':'c','ჰ':'h'
  };
  let activeLanguage = 'ka';

  function translateValue(source, contextId) {
    if (activeLanguage === 'ka') return source;
    if (contextId === 'theme-text' && source.trim() === 'დღე') {
      return source.replace('დღე', 'Gündüz');
    }
    let value = source;
    sortedKeys.forEach(key => { value = value.split(key).join(translations[key]); });
    return value.replace(georgianCharacters, character => transliteration[character] || character);
  }

  function translateNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim()) return;
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return;
    if (parent.closest('.language-switcher')) return;
    const current = node.nodeValue;
    let state = textStates.get(node);
    if (!state || current !== state.rendered) state = { source: current, rendered: current };
    const translated = translateValue(state.source, parent.id);
    state.rendered = translated;
    textStates.set(node, state);
    if (current !== translated) node.nodeValue = translated;
  }

  function translateAttributes(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE || element.closest('.language-switcher')) return;
    let states = attributeStates.get(element);
    if (!states) { states = {}; attributeStates.set(element, states); }
    localizableAttributes.forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      const current = element.getAttribute(attribute);
      let state = states[attribute];
      if (!state || current !== state.rendered) state = { source: current, rendered: current };
      const translated = translateValue(state.source, element.id);
      state.rendered = translated;
      states[attribute] = state;
      if (current !== translated) element.setAttribute(attribute, translated);
    });
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) { translateNode(root); return; }
    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(translateNode);
    if (root.querySelectorAll) root.querySelectorAll('*').forEach(translateAttributes);
  }

  function setLanguage(language, persist) {
    activeLanguage = language === 'az' ? 'az' : 'ka';
    document.documentElement.lang = activeLanguage;
    document.documentElement.setAttribute('data-language', activeLanguage);
    if (persist) localStorage.setItem('gardabani_language', activeLanguage);
    document.querySelectorAll('#language-switcher button[data-language]').forEach(button => {
      const selected = button.dataset.language === activeLanguage;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    translateTree(document.documentElement);
    window.dispatchEvent(new CustomEvent('gardabani_language_changed', { detail: { language: activeLanguage } }));
  }

  function initLocalization() {
    const saved = localStorage.getItem('gardabani_language');
    const requested = new URLSearchParams(window.location.search).get('lang');
    document.querySelectorAll('#language-switcher button[data-language]').forEach(button => {
      button.addEventListener('click', () => setLanguage(button.dataset.language, true));
    });
    const initialLanguage = requested === 'az' || requested === 'ka' ? requested : (saved === 'az' ? 'az' : 'ka');
    setLanguage(initialLanguage, requested === 'az' || requested === 'ka');
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === 'childList') record.addedNodes.forEach(translateTree);
        if (record.type === 'characterData') translateNode(record.target);
        if (record.type === 'attributes') translateAttributes(record.target);
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: localizableAttributes,
      subtree: true
    });
  }

  window.GARDABANI_TRANSLATIONS = translations;
  window.setGardabaniLanguage = setLanguage;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLocalization);
  else initLocalization();
})();
`;

module.exports = { LANGUAGE_SWITCHER_CSS, LANGUAGE_SWITCHER_HTML, LOCALIZATION_JS };
