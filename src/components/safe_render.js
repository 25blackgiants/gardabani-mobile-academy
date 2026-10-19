// Shared browser-side helpers embedded into generated pages.
// Dynamic content must be escaped before it enters an HTML template.

const SAFE_RENDER_JS = `
    function escapeHtml(value) {
      return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function safeHexColor(value, fallback) {
      return /^#[0-9a-f]{6}$/i.test(String(value || '')) ? String(value) : (fallback || '#8b5cf6');
    }

    function safeHttpsUrl(value) {
      if (!value) return '';
      try {
        const parsed = new URL(String(value));
        return parsed.protocol === 'https:' ? parsed.href : '';
      } catch (e) {
        return '';
      }
    }

    function safeEmail(value) {
      const normalized = String(value || '').trim();
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(normalized) ? normalized : '';
    }

    function safeImageSource(value) {
      const normalized = String(value || '').trim();
      if (!normalized) return '';
      if (safeHttpsUrl(normalized)) return safeHttpsUrl(normalized);
      if (normalized.includes('..') || /[<>"'\\\\]/.test(normalized)) return '';
      return /^(?:assets|images)\\/[a-z0-9_./% -]+\\.(?:avif|webp|png|jpe?g)$/i.test(normalized) ? normalized : '';
    }

    function validateLocationRecord(record) {
      if (!record || typeof record !== 'object' || Array.isArray(record)) return false;
      const id = Number(record.id);
      const latitude = Number(record.latitude);
      const longitude = Number(record.longitude);
      return Number.isInteger(id) && id > 0 &&
        typeof record.name === 'string' && record.name.trim().length > 0 && record.name.length <= 160 &&
        typeof record.shortName === 'string' && record.shortName.trim().length > 0 && record.shortName.length <= 100 &&
        (record.type === 'hub' || record.type === 'village') &&
        /^\\d{4}-\\d{2}-\\d{2}$/.test(String(record.date || '')) &&
        Number.isFinite(latitude) && latitude >= -90 && latitude <= 90 &&
        Number.isFinite(longitude) && longitude >= -180 && longitude <= 180 &&
        typeof record.activityTitle === 'string' && record.activityTitle.trim().length > 0 && record.activityTitle.length <= 240 &&
        typeof record.activityDescription === 'string' && record.activityDescription.length <= 5000;
    }

    function normalizeLocationRecord(record) {
      return {
        id: Number(record.id),
        name: String(record.name || '').trim(),
        shortName: String(record.shortName || '').trim(),
        type: record.type === 'hub' ? 'hub' : 'village',
        date: String(record.date || ''),
        latitude: Number(record.latitude),
        longitude: Number(record.longitude),
        activityTitle: String(record.activityTitle || '').trim(),
        activityDescription: String(record.activityDescription || '').trim()
      };
    }

    function validateLocationCollection(records) {
      if (!Array.isArray(records) || records.length === 0) return false;
      const ids = new Set();
      return records.every(record => {
        if (!validateLocationRecord(record) || ids.has(Number(record.id))) return false;
        ids.add(Number(record.id));
        return true;
      });
    }

    function normalizeTags(value) {
      const tags = Array.isArray(value) ? value : (typeof value === 'string' ? value.replace(/[{}\"]/g, '').split(',') : []);
      return tags.map(tag => String(tag).trim()).filter(Boolean).slice(0, 20);
    }

    function validateMentorRecord(record) {
      if (!record || typeof record !== 'object' || Array.isArray(record)) return false;
      const tags = normalizeTags(record.tags);
      const socials = record.socials == null ? {} : record.socials;
      return Number.isInteger(Number(record.id)) && Number(record.id) > 0 &&
        typeof record.name === 'string' && record.name.trim().length > 0 && record.name.length <= 160 &&
        typeof record.role === 'string' && record.role.trim().length > 0 && record.role.length <= 200 &&
        typeof record.description === 'string' && record.description.trim().length > 0 && record.description.length <= 2000 &&
        (record.education == null || (typeof record.education === 'string' && record.education.length <= 8000)) &&
        (record.experience == null || (typeof record.experience === 'string' && record.experience.length <= 8000)) &&
        (record.achievements == null || (typeof record.achievements === 'string' && record.achievements.length <= 8000)) &&
        tags.length <= 20 && tags.every(tag => tag.length <= 80) &&
        /^#[0-9a-f]{6}$/i.test(String(record.avatar_color || '')) &&
        (!record.photo || !!safeImageSource(record.photo)) &&
        typeof socials === 'object' && !Array.isArray(socials) &&
        (!socials.linkedin || !!safeHttpsUrl(socials.linkedin)) &&
        (!socials.facebook || !!safeHttpsUrl(socials.facebook)) &&
        (!socials.email || !!safeEmail(socials.email));
    }
`;

module.exports = { SAFE_RENDER_JS };
