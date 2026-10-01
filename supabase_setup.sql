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
  tags TEXT[] NOT NULL DEFAULT '{}',
  avatar_color TEXT DEFAULT '#8b5cf6',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- 8. საწყისი 5 მენტორის შეყვანა
INSERT INTO mentors (id, name, role, description, tags, avatar_color)
VALUES
(1, 'დაკო კეჟერაშვილი', 'მენტორი', 'არაფორმალური განათლება, კულტურათაშორისი დიალოგი და შემოქმედებითი უნარების განვითარება ახალგაზრდებში.', ARRAY['არაფორმალური განათლება', 'კულტურათაშორისი დიალოგი'], '#8b5cf6'),
(2, 'ნია ჩინტლაძე', 'მენტორი', 'ახალგაზრდული ინიციატივები, სამოქალაქო აქტივიზმი და სათემო პროექტების დაგეგმვა.', ARRAY['ახალგაზრდული პროექტები', 'სამოქალაქო აქტივიზმი'], '#ec4899'),
(3, 'მიშო გოგიაშვილი', 'მენტორი', 'კომუნიკაცია, გუნდური ლიდერობა და ახალგაზრდების ჩართულობის პროგრამების კოორდინაცია.', ARRAY['გუნდური ლიდერობა', 'კომუნიკაცია'], '#3b82f6'),
(4, 'დავით მაკარიანი', 'მენტორი', 'ტექნოლოგიები, ციფრული წიგნიერება და რეგიონული ახალგაზრდების ინოვაციური პროექტები.', ARRAY['ციფრული უნარები', 'ინოვაციები'], '#10b981'),
(5, 'ანდრია საჯაია', 'მენტორი', 'სოციალური მეწარმეობა, კვლევა და საგანმანათლებლო მოდულების განვითარება.', ARRAY['სოციალური მეწარმეობა', 'საგანმანათლებლო მოდულები'], '#0d9488')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags,
  avatar_color = EXCLUDED.avatar_color;

