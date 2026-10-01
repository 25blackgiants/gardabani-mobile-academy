# გარდაბნის მობილური აკადემია (ვერსია 11.0 — ღრუბლოვანი სერვერული უსაფრთხოება & Supabase RLS)

პროექტის მიზანია გარდაბნის მუნიციპალიტეტში ქართველ და აზერბაიჯანელ ახალგაზრდებს შორის ურთიერთობის, თანამშრომლობისა და არაფორმალური განათლების გაძლიერება მობილური აკადემიის მეშვეობით.

---

## 🛡️ ვერსია 11.0 — ღრუბლოვანი უსაფრთხოება და მონაცემთა ბაზა (Supabase)

სისტემაში დაინერგა სრულფასოვანი სერვერული დაცვის არქიტექტურა **0 ლარის (სრულიად უფასო)** ხარჯით და **ვებ-ჰოსტინგის გარეშე** (ფაილები ჩვეულებრივად იხსნება თქვენი კომპიუტერიდან `file:///...` ფორმატში).

### 1. 🔑 Backend Authentication (სერვერული ავტორიზაცია)
* ადმინისტრატორის იდენტიფიცირება ხდება Supabase GoTrue სერვერზე დაცული JWT ტოკენებით.
* სისტემა მხარს უჭერს როგორც ღრუბლოვან ავტორიზაციას (ელ-ფოსტა + პაროლი), ისე ოფლაინ/ლოკალურ კრიპტოგრაფიულ რეზერვს (SHA-256).

### 2. 🛡️ Row-Level Security (RLS) — ბაზის დონის დაცვა
* PostgreSQL დონეზე ჩართულია `ROW LEVEL SECURITY`.
* **საჯარო ვიზიტორები (Public)**: აქვთ მხოლოდ წაკითხვის უფლება (`SELECT`). ბრაუზერის კონსოლიდან ან კოდიდანაც რომ სცადოს ვინმემ ჩაწერა, ბაზა ავტომატურად უარყოფს მოთხოვნას (`403 Forbidden`).
* **ადმინისტრატორი (Authenticated)**: მხოლოდ ავტორიზებულ ადმინისტრატორს აქვს ლოკაციების დამატების (`INSERT`), რედაქტირების (`UPDATE`) და წაშლის (`DELETE`) უფლება.

### 3. ⚡ სერვერული Rate Limiting & IP Lockout
* Supabase Auth ავტომატურად იცავს სისტემას სერვერის მხარეს პაროლების გამოცნობისგან (Brute-Force Attack) და ბლოკავს საეჭვო IP მისამართებს.
* პარალელურად მუშაობს კლიენტის 3-დონიანი Lockout ტაიმერი (5, 10, 15 წუთი).

### 4. 🔄 უწყვეტი ოფლაინ და ლოკალური რეჟიმი (Graceful Fallback)
* თუ ინტერნეტი გაითიშება ან Supabase-ის გასაღებები ჯერ შეყვანილი არ არის, საიტი არ ფუჭდება — მომენტალურად მუშაობს ლოკალურ რეჟიმში (`localStorage` და SHA-256).

---

## 📋 როგორ ჩავრთოთ Supabase ღრუბლოვანი ბაზა (3 მარტივი ნაბიჯი)

არანაირი პროგრამირების ცოდნა არ არის საჭირო:

### ნაბიჯი 1: უფასო რეგისტრაცია Supabase-ზე
1. შედით საიტზე: [supabase.com](https://supabase.com)
2. დააჭირეთ **"Start your project"** და გაიარეთ უფასო რეგისტრაცია (მაგ. GitHub-ით ან მეილით).
3. შექმენით ახალი პროექტი: **"New Project"**, დაარქვით სახელი (მაგ: `gardabani-academy`) და მოიფიქრეთ მონაცემთა ბაზის პაროლი.

### ნაბიჯი 2: ბაზის შექმნა (SQL Editor)
1. მარცხენა მენიუში დააჭირეთ **SQL Editor** (ხატულა: `>_`).
2. გახსენით ფაილი `supabase_setup.sql` (მოყვება პროექტს), დააკოპირეთ მთლიანი ტექსტი.
3. ჩასვით SQL Editor-ში და დააჭირეთ მწვანე ღილაკს **"Run"**.
   *(ეს ბრძანება ერთ წამში შექმნის ცხრილს, ჩართავს RLS დაცვას და ჩაწერს ოქტომბრის 7 ლოკაციას)*.

### ნაბიჯი 3: ადმინის შექმნა და გასაღებების ჩასმა
1. მარცხენა მენიუში **Authentication -> Users** -> დააჭირეთ **"Add User"** -> **"Create User"** (შეიყვანეთ თქვენი მეილი და პაროლი).
2. მარცხენა მენიუში დააჭირეთ **Settings (ხრახნი) -> API**.
3. დააკოპირეთ:
   * **Project URL**
   * **Project API Keys -> anon public**
4. გახსენით თქვენს საქაღალდეში არსებული ფაილი **`supabase_config.js`** და ჩასვით ეს ორი მნიშვნელობა:
```javascript
const SUPABASE_CONFIG = {
  url: 'https://თქვენი-პროექტი.supabase.co',
  anonKey: 'თქვენი-გრძელი-anon-key-აქ',
  adminEmail: 'admin@gardabani.ge'
};
```
მორჩა! თქვენი საიტი მყისიერად დაუკავშირდება ღრუბლოვან ბაზას.

---

## 🚪 ადმინისტრატორის ფარული წვდომა (Stealth Admin Access)

საიტზე ჩვეულებრივი ვიზიტორისთვის ადმინისტრატორის შესასვლელი არ ჩანს. გასახსნელად:
1. **კლავიატურის კომბინაცია**: დააჭირეთ **`Ctrl + Shift + A + L`** ნებისმიერ გვერდზე.
2. **საიდუმლო კარი ლოგოზე**: ზედა მარცხენა კუთხეში 🚐 ლოგოზე დააწკაპუნეთ **5-ჯერ სწრაფად**.
3. გამოსულ დაცულ ფანჯარაში შეიყვანეთ მეილი და პაროლი.

---

## 🌟 გვერდები და სტრუქტურა

* **`index.html` / `gardabani_map.html`** — ინტერაქტიული რუკა, 5კმ არეალი, გარდაბნის საზღვარი, გამოსაწევი აქტივობების პანელი, ადმინ რედაქტორი.
* **`calendar.html`** — ოფიციალური კალენდარი და განრიგი, ღრუბლიდან სინქრონიზებული ღონისძიებები, გადასვლა რუკაზე (`?loc={id}`).
* **`mentors.html`** — პროგრამის მენტორების წარდგენა.
* **`settings.html`** — პარამეტრები (Lever გადამრთველები, Supabase კავშირის ცოცხალი სტატუსი, True Pitch Black ღამის რეჟიმი).
* **`supabase_setup.sql`** — PostgreSQL ბაზის გამზადებული სკრიპტი.
* **`supabase_config.js`** — პროექტის ღრუბლოვანი კონფიგურაცია.
* **`verify.js`** — ავტომატური ტესტების პაკეტი (22/22 ტესტი).

---

## 🧪 ავტომატური ტესტირება და ვალიდაცია (`verify.js`)

გაშვებულია გაფართოებული 22-პუნქტიანი ტესტების პაკეტი:
```text
================ HIGH-SECURITY & SUPABASE SUITE ================
[PASS] 1. Tab Navigation includes 4 tabs on all pages
[PASS] 2. Settings tab linked on all pages
[PASS] 3. Calendar tab linked on all pages
[PASS] 4. Drawer trigger button renamed to აქტივობები and floating in top-left
[PASS] 5. Sidebar drawer auto-closes on clicking location and has isolated scroll
[PASS] 6. Date input exists in Add/Edit modal on Map
[PASS] 7. Popups display formatted activity date
[PASS] 8. Deep-link from Calendar to Map supported (?loc=id)
[PASS] 9. Calendar hero section removed and timeline renamed
[PASS] 10. Initial October 2026 dates assigned to all 7 locations
[PASS] 11. Settings has Lever switches for Gardabani boundary and 5km radius
[PASS] 12. Plaintext passcode gardabani2026 completely removed from all files
[PASS] 13. Cryptographic SHA-256 hash implemented across platform
[PASS] 14. Brute-Force lockout with live timer & lockout tiers (5-15 min)
[PASS] 15. SessionStorage-based admin mode with 15-min inactivity auto-logout
[PASS] 16. Stealth admin access (hidden form, Ctrl+Shift+A+L & 5 logo clicks)
[PASS] 17. Pure Black (#000000) Dark Mode across all pages
[PASS] 18. Zero references to prohibited word "სავარაუდო"
[PASS] 19. index.html and gardabani_map.html are identical in size and structure
[PASS] 20. Supabase JS Client & Config linked across all pages with background sync
[PASS] 21. Supabase SQL Setup script includes RLS and Admin-only write policies
[PASS] 22. supabase_config.js present with graceful offline / local prototype fallback
==================================================================
Overall Status: ALL 22 TESTS PASSED PERFECTLY
```
