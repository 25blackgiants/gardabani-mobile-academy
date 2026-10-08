-- ============================================================================
-- გარდაბნის მობილური აკადემია — SUPABASE SQL SETUP SCRIPT
-- ============================================================================
-- ეს სკრიპტი ქმნის ლოკაციების ცხრილს, რთავს Row-Level Security-ს (RLS)
-- და ავსებს ბაზას 2026 წლის ოქტომბრის 7 დადასტურებული ლოკაციით.
--
-- გამოყენების ინსტრუქცია:
-- 1. შედით Supabase Dashboard-ში: https://supabase.com/dashboard
-- 2. გახსენით "SQL Editor" მარცხენა მენიუდან
-- 3. ჩასვით ეს კოდი და დააჭირეთ "Run" (მწვანე ღილაკს)
-- ============================================================================

-- 1. ლოკაციების ცხრილის შექმნა
CREATE TABLE IF NOT EXISTS locations (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'village',
  date DATE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  activity_title TEXT NOT NULL,
  activity_description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row-Level Security-ს (RLS) გააქტიურება
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- 3. საჯარო წაკითხვის წესი (Public Read):
-- საიტის ნებისმიერ ვიზიტორს შეუძლია ლოკაციებისა და კალენდრის ნახვა
DROP POLICY IF EXISTS "Public Read Access" ON locations;
CREATE POLICY "Public Read Access"
ON locations
FOR SELECT
TO public
USING (true);

-- 4. ადმინისტრატორის ჩაწერის წესები (Admin Only Write):
-- მხოლოდ ავტორიზებულ მომხმარებელს (Admin-ს) შეუძლია დამატება, ჩასწორება და წაშლა
DROP POLICY IF EXISTS "Admin Insert Access" ON locations;
CREATE POLICY "Admin Insert Access"
ON locations
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Update Access" ON locations;
CREATE POLICY "Admin Update Access"
ON locations
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Delete Access" ON locations;
CREATE POLICY "Admin Delete Access"
ON locations
FOR DELETE
TO authenticated
USING (true);

-- 5. საწყისი 7 დადასტურებული ლოკაციის შეყვანა (ოქტომბერი 2026)
INSERT INTO locations (id, name, short_name, type, date, latitude, longitude, activity_title, activity_description)
VALUES
(1, 'მთავარი ჰაბი — ქ. გარდაბანი', 'ქ. გარდაბანი', 'hub', '2026-10-03', 41.4589, 45.0928, 'ცენტრალური საგანმანათლებლო პროგრამა და კოორდინაცია', 'პროგრამის ძირითადი შტაბი და ცენტრალური შეხვედრების სივრცე. ქართველ და აზერბაიჯანელ ახალგაზრდებს შორის კულტურული დიალოგი, ენობრივი გაცვლა და ტექნოლოგიური ვორქშოფები.'),
(2, 'ლოკაცია 1: სოფ. კესალო', 'კესალო', 'village', '2026-10-07', 41.4360, 45.0315, 'მობილური ვორქშოფი: შემოქმედებითი უნარები და გუნდურობა', 'ახალგაზრდული გუნდური პროექტები, ხელოვნების თერაპია, დებატები და ერთობლივი ინიციატივების დაგეგმვა ადგილობრივი თემის მონაწილეობით.'),
(3, 'ლოკაცია 2: სოფ. ნაზარლო', 'ნაზარლო', 'village', '2026-10-12', 41.4085, 45.0740, 'მობილური ვორქშოფი: სამოქალაქო ჩართულობა და მედიაწიგნიერება', 'ტრენინგები კრიტიკულ აზროვნებაში, ციფრული უსაფრთხოება, ადგილობრივი საჭიროებების ადვოკატირება და სამოქალაქო აქტივიზმი.'),
(4, 'ლოკაცია 3: სოფ. სართიჭალა', 'სართიჭალა', 'village', '2026-10-16', 41.7145, 45.1820, 'მობილური ვორქშოფი: ტექნოლოგიები და კარიერული ორიენტაცია', 'ციფრული უნარების განვითარება, თანამედროვე პროფესიების გაცნობა, CV-ის შედგენა და პროფესიული განათლების შესაძლებლობები.'),
(5, 'ლოკაცია 4: სოფ. კუმისი', 'კუმისი', 'village', '2026-10-21', 41.5860, 44.8380, 'მობილური ვორქშოფი: ეკოლოგია და გარემოსდაცვითი ინიციატივები', 'ერთობლივი ეკო-აქტივობები, კუმისის ტბის მიმდებარე ტერიტორიის დასუფთავების აქცია და გარემოსდაცვითი ცნობიერების ამაღლება.'),
(6, 'ლოკაცია 5: სოფ. ყარაჯალარი', 'ყარაჯალარი', 'village', '2026-10-25', 41.5650, 45.0220, 'მობილური ვორქშოფი: ქართულ-აზერბაიჯანული ენობრივი კლუბი', 'ინტერაქტიული ენობრივი თამაშები, ორმხრივი ენის პრაქტიკა, კულტურათაშორისი დიალოგი და ახალგაზრდების დამეგობრების კლუბი.'),
(7, 'ლოკაცია 6: სოფ. ვახტანგისი', 'ვახტანგისი', 'village', '2026-10-29', 41.3480, 45.1050, 'მობილური ვორქშოფი: სოციალური მეწარმეობა და იდეების ბანკი', 'სასაზღვრო რეგიონის ახალგაზრდებისთვის მცირე სოციალური ბიზნეს-იდეების გენერირება და სათემო პროექტების დაფინანსების შესაძლებლობები.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  type = EXCLUDED.type,
  date = EXCLUDED.date,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  activity_title = EXCLUDED.activity_title,
  activity_description = EXCLUDED.activity_description;

-- ============================================================================
-- 6. მენტორების ცხრილის შექმნა (MENTORS TABLE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'მენტორი',
  description TEXT NOT NULL,
  education TEXT DEFAULT '',
  experience TEXT DEFAULT '',
  achievements TEXT DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  avatar_color TEXT DEFAULT '#8b5cf6',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- სვეტების დამატება არსებულ ცხრილში (თუ უკვე შექმნილია)
ALTER TABLE mentors ADD COLUMN IF NOT EXISTS education TEXT DEFAULT '';
ALTER TABLE mentors ADD COLUMN IF NOT EXISTS experience TEXT DEFAULT '';
ALTER TABLE mentors ADD COLUMN IF NOT EXISTS achievements TEXT DEFAULT '';

-- 7. Row-Level Security მენტორების ცხრილისთვის
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Mentors" ON mentors;
CREATE POLICY "Public Read Mentors"
ON mentors
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Admin Insert Mentors" ON mentors;
CREATE POLICY "Admin Insert Mentors"
ON mentors
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Update Mentors" ON mentors;
CREATE POLICY "Admin Update Mentors"
ON mentors
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Delete Mentors" ON mentors;
CREATE POLICY "Admin Delete Mentors"
ON mentors
FOR DELETE
TO authenticated
USING (true);

-- 8. საწყისი 5 მენტორის შეყვანა (CV, განათლება, გამოცდილება, მიღწევები)
INSERT INTO mentors (id, name, role, description, education, experience, achievements, tags, avatar_color)
VALUES
(1, 'დაკო კეჟერაშვილი', 'მენტორი / არაფორმალური განათლების ექსპერტი', 'არაფორმალური განათლება, კულტურათაშორისი დიალოგი და შემოქმედებითი უნარების განვითარება ახალგაზრდებში.', '• ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი (თსუ) — სოციალურ და პოლიტიკურ მეცნიერებათა ბაკალავრი\n• Erasmus+ Youth in Action — საერთაშორისო ტრენერთა სასერტიფიკატო პროგრამა არაფორმალურ განათლებასა და ფასილიტაციაში', '• 5+ წლიანი გამოცდილება ახალგაზრდულ სექტორში ტრენერისა და ფასილიტატორის პოზიციაზე\n• კულტურათაშორისი დიალოგისა და მშვიდობის მშენებლობის პროექტების კოორდინატორი ქვემო ქართლის რეგიონში\n• გარდაბნის მუნიციპალიტეტში ქართულ-აზერბაიჯანული ახალგაზრდული ინიციატივების წამყვანი მენტორი', '• 30-ზე მეტი სათემო ვორქშოფისა და საგანმანათლებლო ბანაკის წარმატებული ორგანიზება\n• ქვემო ქართლის ახალგაზრდული ჩართულობის პროგრამის თანაავტორი\n• ახალგაზრდული ინიციატივების ევროპული ფორუმის მონაწილე და დელეგატი', ARRAY['არაფორმალური განათლება', 'კულტურათაშორისი დიალოგი', 'ფასილიტაცია', 'ახალგაზრდული პოლიტიკა'], '#8b5cf6'),
(2, 'ნია ჩინტლაძე', 'მენტორი / სათემო განვითარების კოორდინატორი', 'ახალგაზრდული ინიციატივები, სამოქალაქო აქტივიზმი და სათემო პროექტების დაგეგმვა.', '• ილიას სახელმწიფო უნივერსიტეტი — საზოგადოებასთან ურთიერთობისა და კომუნიკაციის ბაკალავრი\n• სათემო ლიდერობისა და სამოქალაქო ადვოკატირების აკადემიის კურსდამთავრებული', '• 4 წლიანი გამოცდილება რეგიონული არასამთავრობო ორგანიზაციების სათემო პროექტების მართვაში\n• ახალგაზრდული საინიციატივო ჯგუფების მენტორინგი სოფლად მცხოვრები გოგონების გაძლიერების მიმართულებით\n• ადგილობრივი საჭიროებების კვლევისა და ადვოკატირების კამპანიების ხელმძღვანელი', '• 15-ზე მეტი ადგილობრივი მცირე გრანტისა და სათემო ინიციატივის წარმატებული იმპლემენტაცია\n• გარემოსდაცვითი და ეკო-აქტივიზმის რეგიონული კამპანიების ავტორი\n• ახალგაზრდა ქალთა ლიდერობის რეგიონული პლატფორმის თანადამფუძნებელი', ARRAY['ახალგაზრდული პროექტები', 'სამოქალაქო აქტივიზმი', 'სათემო განვითარება', 'იდეების გენერირება'], '#ec4899'),
(3, 'მიშო გოგიაშვილი', 'მენტორი / გუნდური ლიდერობის ტრენერი', 'კომუნიკაცია, გუნდური ლიდერობა და ახალგაზრდების ჩართულობის პროგრამების კოორდინაცია.', '• საქართველოს საზოგადოებრივ საქმეთა ინსტიტუტი (GIPA) — მართვა და საჯარო პოლიტიკა\n• გუნდური ქოუჩინგის, საჯარო გამოსვლებისა და მოლაპარაკებების მართვის ინტენსიური კურსი', '• რეგიონული ახალგაზრდული ფორუმებისა და დებატ-კლუბების მთავარი მოდერატორი\n• გუნდური შეჭიდულობის (Team Building) და ლიდერული უნარების მენტორი 100+ მონაწილისთვის\n• ახალგაზრდული გაცვლითი პროგრამების კოორდინატორი', '• რეგიონული ახალგაზრდული დებატ-ტურნირის დამფუძნებელი ქვემო ქართლში\n• ახალგაზრდული მედიაციისა და კონფლიქტების მშვიდობიანი მოგვარების პლატფორმის თანაშემქმნელი\n• 500-ზე მეტი ახალგაზრდის გადამზადება ეფექტურ კომუნიკაციასა და ლიდერობაში', ARRAY['გუნდური ლიდერობა', 'კომუნიკაცია', 'დებატები', 'კონფლიქტების მართვა'], '#3b82f6'),
(4, 'დავით მაკარიანი', 'მენტორი / ციფრული ტექნოლოგიების სპეციალისტი', 'ტექნოლოგიები, ციფრული წიგნიერება და რეგიონული ახალგაზრდების ინოვაციური პროექტები.', '• თბილისის სახელმწიფო უნივერსიტეტი (თსუ) — კომპიუტერული მეცნიერებები და ინფორმაციული ტექნოლოგიები\n• Google Developers & UI/UX დიზაინის სასერტიფიკატო პროგრამა', '• 4+ წელი ვებ-დეველოპმენტისა და ტექნოლოგიური პროექტების მართვაში\n• რეგიონულ სკოლებში ციფრული წიგნიერებისა და ვებ-ტექნოლოგიების ვორქშოფების ხელმძღვანელი\n• მედიაწიგნიერებისა და კიბერუსაფრთხოების ტრენერი', '• გარდაბნის მობილური აკადემიის ციფრული პლატფორმის და ინტერაქტიული რუკის თანაავტორი\n• ახალგაზრდული ტექ-ჰაკათონების მენტორი და ჟიურის წევრი\n• ადგილობრივი სოციალური პროექტებისთვის 10-ზე მეტი ციფრული ხელსაწყოს შემქმნელი', ARRAY['ციფრული უნარები', 'ინოვაციები', 'ვებ-ტექნოლოგიები', 'მედიაწიგნიერება'], '#10b981'),
(5, 'ანდრია საჯაია', 'მენტორი / სოციალური მეწარმეობის მკვლევარი', 'სოციალური მეწარმეობა, კვლევა და საგანმანათლებლო მოდულების განვითარება.', '• თავისუფალი უნივერსიტეტი — ბიზნესის ადმინისტრირება და ეკონომიკა (ESM)\n• სოციალური ინოვაციებისა და მდგრადი განვითარების საერთაშორისო საგანმანათლებლო პროგრამა', '• სოციალური საწარმოების კონსულტანტი და ბიზნეს-გეგმების მენტორი\n• რეგიონული საჭიროებების კვლევისა და საგანმანათლებლო მოდულების შემმუშავებელი\n• ახალგაზრდული სტარტაპ-აქსელერატორის მენტორი', '• 10-ზე მეტი სოციალური სტარტაპის ინკუბაციისა და დაფინანსების მენტორინგი\n• ახალგაზრდული მეწარმეობის საგანმანათლებლო სახელმძღვანელოს თანაავტორი\n• რეგიონული ეკონომიკური გაძლიერების პროექტების კოორდინატორი', ARRAY['სოციალური მეწარმეობა', 'საგანმანათლებლო მოდულები', 'კვლევა', 'ბიზნეს-მოდელირება'], '#0d9488')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  description = EXCLUDED.description,
  education = EXCLUDED.education,
  experience = EXCLUDED.experience,
  achievements = EXCLUDED.achievements,
  tags = EXCLUDED.tags,
  avatar_color = EXCLUDED.avatar_color;

-- ============================================================================
-- 9. ვიზიტების ანალიტიკის ცხრილი (SITE ANALYTICS TABLE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_analytics (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT DEFAULT '',
  consent_status TEXT DEFAULT 'pending',
  is_returning BOOLEAN DEFAULT false,
  visit_count INT DEFAULT 1,
  network_type TEXT DEFAULT '',
  scroll_depth INT DEFAULT 0,
  page_path TEXT NOT NULL,
  page_title TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  device_type TEXT DEFAULT 'Desktop',
  os TEXT DEFAULT '',
  browser TEXT DEFAULT 'Unknown',
  screen_resolution TEXT DEFAULT '',
  language TEXT DEFAULT '',
  duration_seconds INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- მიგრაცია არსებული ცხრილისთვის (თუ უკვე შექმნილია)
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS visitor_id TEXT DEFAULT '';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS consent_status TEXT DEFAULT 'pending';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS is_returning BOOLEAN DEFAULT false;
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS visit_count INT DEFAULT 1;
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS network_type TEXT DEFAULT '';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS scroll_depth INT DEFAULT 0;
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS browser_lang TEXT DEFAULT 'ka';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS load_time_seconds DOUBLE PRECISION DEFAULT 0;

-- 10. Row-Level Security ანალიტიკისთვის
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- საჯარო ჩაწერა (ანონიმური ვიზიტორებისთვის)
DROP POLICY IF EXISTS "Public Insert Analytics" ON site_analytics;
CREATE POLICY "Public Insert Analytics"
ON site_analytics
FOR INSERT
TO public
WITH CHECK (true);

-- საჯარო განახლება (სესიის ხანგრძლივობის გასაზრდელად)
DROP POLICY IF EXISTS "Public Update Analytics" ON site_analytics;
CREATE POLICY "Public Update Analytics"
ON site_analytics
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- წაკითხვა მხოლოდ ავტორიზებული ადმინისტრატორისთვის
DROP POLICY IF EXISTS "Admin Read Analytics" ON site_analytics;
CREATE POLICY "Admin Read Analytics"
ON site_analytics
FOR SELECT
TO authenticated
USING (true);

-- ============================================================================
-- 11. ანალიტიკის ივენთების ცხრილი (სოფლების ნახვები & ნავიგაცია)
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_analytics_events (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  target_name TEXT DEFAULT '',
  page_path TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Insert Events" ON site_analytics_events;
CREATE POLICY "Public Insert Events"
ON site_analytics_events
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Read Events" ON site_analytics_events;
CREATE POLICY "Admin Read Events"
ON site_analytics_events
FOR SELECT
TO authenticated
USING (true);

-- საწყისი სადემონსტრაციო ვიზიტები
INSERT INTO site_analytics (session_id, visitor_id, consent_status, is_returning, visit_count, network_type, scroll_depth, page_path, page_title, referrer, device_type, os, browser, screen_resolution, language, browser_lang, load_time_seconds, duration_seconds, created_at)
VALUES
('sess_demo_1', 'usr_demo_1', 'accepted', true, 3, '4G', 85, 'index.html', 'გარდაბნის მობილური აკადემია', 'Facebook', 'Mobile', 'iOS', 'Safari', '390x844', 'ka-GE', 'ka', 0.9, 145, NOW() - INTERVAL '15 minutes'),
('sess_demo_2', 'usr_demo_2', 'accepted', false, 1, '4G', 100, 'calendar.html', 'კალენდარი — გარდაბნის მობილური აკადემია', 'პირდაპირი (Direct)', 'Mobile', 'Android', 'Chrome', '412x915', 'az', 'az', 1.2, 230, NOW() - INTERVAL '40 minutes'),
('sess_demo_3', 'usr_demo_3', 'accepted', true, 2, 'WIFI', 60, 'mentors.html', 'მენტორები — გარდაბნის მობილური აკადემია', 'Google', 'Desktop', 'Windows', 'Chrome', '1920x1080', 'ka-GE', 'ka', 0.7, 180, NOW() - INTERVAL '1 hour'),
('sess_demo_4', '', 'rejected', false, 1, '3G', 40, 'index.html', 'გარდაბნის მობილური აკადემია', 'Facebook', 'Mobile', 'Android', 'Samsung Internet', '384x854', 'ka-GE', 'ka', 2.1, 95, NOW() - INTERVAL '2 hours'),
('sess_demo_5', 'usr_demo_5', 'accepted', true, 5, 'WIFI', 90, 'settings.html', 'პარამეტრები — გარდაბნის მობილური აკადემია', 'პირდაპირი (Direct)', 'Desktop', 'macOS', 'Safari', '1440x900', 'en-US', 'en', 1.0, 310, NOW() - INTERVAL '3 hours')
ON CONFLICT DO NOTHING;


