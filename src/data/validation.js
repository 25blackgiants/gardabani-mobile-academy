// Build-time validation for source-controlled public content.
// Keep this module dependency-free so `node build_map.js` remains the only build command.

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;

function assert(condition, message) {
  if (!condition) throw new Error(`Content validation failed: ${message}`);
}

function assertText(value, field, maxLength) {
  assert(typeof value === 'string', `${field} must be a string`);
  assert(value.trim().length > 0, `${field} must not be empty`);
  assert(value.length <= maxLength, `${field} exceeds ${maxLength} characters`);
}

function assertOptionalText(value, field, maxLength) {
  assert(value == null || typeof value === 'string', `${field} must be a string when provided`);
  if (typeof value === 'string') {
    assert(value.length <= maxLength, `${field} exceeds ${maxLength} characters`);
  }
}

function assertValidDate(value, field) {
  assert(typeof value === 'string' && ISO_DATE_RE.test(value), `${field} must use YYYY-MM-DD`);
  const parsed = new Date(`${value}T00:00:00Z`);
  assert(!Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value, `${field} is not a valid date`);
}

function assertHttpsUrl(value, field) {
  if (!value) return;
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`Content validation failed: ${field} is not a valid URL`);
  }
  assert(parsed.protocol === 'https:', `${field} must use HTTPS`);
}

function assertImageSource(value, field) {
  if (!value) return;
  assert(typeof value === 'string', `${field} must be a string when provided`);
  if (/^https:\/\//i.test(value)) {
    assertHttpsUrl(value, field);
    return;
  }
  assert(!value.includes('..') && !/[<>"'\\]/.test(value), `${field} contains an unsafe path`);
  assert(/^(?:assets|images)\/[a-z0-9_\-./ %]+\.(?:avif|webp|png|jpe?g)$/i.test(value), `${field} must be an HTTPS URL or an image under assets/ or images/`);
}

function validateLocations(locations) {
  assert(Array.isArray(locations) && locations.length > 0, 'locations must be a non-empty array');
  const ids = new Set();

  locations.forEach((location, index) => {
    const prefix = `locations[${index}]`;
    assert(location && typeof location === 'object' && !Array.isArray(location), `${prefix} must be an object`);
    assert(Number.isInteger(location.id) && location.id > 0, `${prefix}.id must be a positive integer`);
    assert(!ids.has(location.id), `${prefix}.id duplicates ${location.id}`);
    ids.add(location.id);
    assertText(location.name, `${prefix}.name`, 160);
    assertText(location.shortName, `${prefix}.shortName`, 100);
    assert(['hub', 'village'].includes(location.type), `${prefix}.type must be hub or village`);
    assertValidDate(location.date, `${prefix}.date`);
    assert(Number.isFinite(location.latitude) && location.latitude >= -90 && location.latitude <= 90, `${prefix}.latitude is out of range`);
    assert(Number.isFinite(location.longitude) && location.longitude >= -180 && location.longitude <= 180, `${prefix}.longitude is out of range`);
    assertText(location.activityTitle, `${prefix}.activityTitle`, 240);
    assertText(location.activityDescription, `${prefix}.activityDescription`, 5000);
  });
}

function validateMentors(mentors) {
  assert(Array.isArray(mentors) && mentors.length > 0, 'mentors must be a non-empty array');
  const ids = new Set();

  mentors.forEach((mentor, index) => {
    const prefix = `mentors[${index}]`;
    assert(mentor && typeof mentor === 'object' && !Array.isArray(mentor), `${prefix} must be an object`);
    assert(Number.isInteger(mentor.id) && mentor.id > 0, `${prefix}.id must be a positive integer`);
    assert(!ids.has(mentor.id), `${prefix}.id duplicates ${mentor.id}`);
    ids.add(mentor.id);
    assertText(mentor.name, `${prefix}.name`, 160);
    assertText(mentor.role, `${prefix}.role`, 200);
    assertText(mentor.description, `${prefix}.description`, 2000);
    assertOptionalText(mentor.education, `${prefix}.education`, 8000);
    assertOptionalText(mentor.experience, `${prefix}.experience`, 8000);
    assertOptionalText(mentor.achievements, `${prefix}.achievements`, 8000);
    assertImageSource(mentor.photo, `${prefix}.photo`);
    assert(Array.isArray(mentor.tags), `${prefix}.tags must be an array`);
    assert(mentor.tags.length <= 20, `${prefix}.tags contains too many values`);
    mentor.tags.forEach((tag, tagIndex) => assertText(tag, `${prefix}.tags[${tagIndex}]`, 80));
    assert(typeof mentor.avatar_color === 'string' && HEX_COLOR_RE.test(mentor.avatar_color), `${prefix}.avatar_color must be a six-digit hex color`);

    if (mentor.socials != null) {
      assert(typeof mentor.socials === 'object' && !Array.isArray(mentor.socials), `${prefix}.socials must be an object`);
      assertHttpsUrl(mentor.socials.linkedin, `${prefix}.socials.linkedin`);
      assertHttpsUrl(mentor.socials.facebook, `${prefix}.socials.facebook`);
      if (mentor.socials.email) {
        assert(typeof mentor.socials.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mentor.socials.email), `${prefix}.socials.email is invalid`);
      }
    }
  });
}

function validateLocalizedContent(translations, locations, mentors) {
  assert(translations && typeof translations === 'object', 'localized content must be an object');
  const collections = [
    ['locations', locations, ['name', 'shortName', 'activityTitle', 'activityDescription']],
    ['mentors', mentors, ['name', 'role', 'description', 'education', 'experience', 'achievements', 'tags']]
  ];
  collections.forEach(([collection, records, fields]) => {
    const translationsForCollection = translations[collection];
    assert(translationsForCollection && typeof translationsForCollection === 'object', `${collection} translations are required`);
    records.forEach((record) => {
      const translated = translationsForCollection[record.id] && translationsForCollection[record.id].az;
      assert(translated && typeof translated === 'object', `${collection}.${record.id}.az is required`);
      fields.forEach((field) => {
        if (field === 'tags') {
          assert(Array.isArray(translated.tags) && translated.tags.length > 0, `${collection}.${record.id}.az.tags must be a non-empty array`);
          translated.tags.forEach((tag, index) => assertText(tag, `${collection}.${record.id}.az.tags[${index}]`, 80));
        } else {
          assertText(translated[field], `${collection}.${record.id}.az.${field}`, field === 'description' ? 5000 : 8000);
        }
      });
    });
  });
}

module.exports = { validateLocations, validateMentors, validateLocalizedContent };
