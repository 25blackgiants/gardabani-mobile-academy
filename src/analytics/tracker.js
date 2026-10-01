// ============================================================================
// LIGHTWEIGHT PRIVACY-FIRST ANALYTICS TRACKER (WITH COOKIE CONSENT AWARENESS)
// Anonymous, Non-invasive, Client-side session and visit logger
// Works with Supabase and has automatic LocalStorage offline resilience
// ============================================================================

(function() {
  try {
    // 1. Consent State
    function getConsentStatus() {
      return localStorage.getItem('gardabani_cookie_consent') || 'pending';
    }

    let consentStatus = getConsentStatus();

    // 2. Ephemeral & Anonymous Session Token (SessionStorage - strictly necessary for page transitions)
    let sessionId = sessionStorage.getItem('gma_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem('gma_session_id', sessionId);
    }

    // 3. Persistent Visitor ID & Retention (Enabled only if consent is accepted)
    let visitorId = '';
    let visitCount = 1;
    let isReturning = false;

    function evaluateVisitorIdentity() {
      consentStatus = getConsentStatus();
      if (consentStatus === 'accepted') {
        visitorId = localStorage.getItem('gma_visitor_id');
        if (!visitorId) {
          visitorId = 'usr_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
          localStorage.setItem('gma_visitor_id', visitorId);
          document.cookie = 'gma_vid=' + visitorId + '; path=/; max-age=31536000; SameSite=Lax';
        }

        // Increment visit count once per unique session
        const sessionCounted = sessionStorage.getItem('gma_session_counted');
        visitCount = parseInt(localStorage.getItem('gma_visit_count') || '0', 10);
        if (!sessionCounted) {
          visitCount += 1;
          localStorage.setItem('gma_visit_count', visitCount.toString());
          sessionStorage.setItem('gma_session_counted', 'true');
        }
        isReturning = visitCount > 1;
      } else {
        // If rejected, remove any persistent ID
        visitorId = '';
        visitCount = 1;
        isReturning = false;
        if (consentStatus === 'rejected') {
          localStorage.removeItem('gma_visitor_id');
          localStorage.removeItem('gma_visit_count');
          document.cookie = 'gma_vid=; path=/; max-age=0; SameSite=Lax';
        }
      }
    }

    evaluateVisitorIdentity();

    // 4. Page Metadata
    const pagePath = window.location.pathname.split('/').pop() || 'index.html';
    const pageTitle = document.title || 'გარდაბნის მობილური აკადემია';

    // 5. Device, OS, Browser
    const ua = navigator.userAgent || '';
    let deviceType = 'Desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      deviceType = 'Tablet';
    } else if (/Mobile|iPhone|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) {
      deviceType = 'Mobile';
    }

    let os = 'Desktop OS';
    if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
    else if (/Linux/i.test(ua)) os = 'Linux';

    let browser = 'ბრაუზერი';
    if (/Edg\//i.test(ua)) browser = 'Edge';
    else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua) && !/OPR\//i.test(ua)) browser = 'Chrome';
    else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';
    else if (/Firefox\//i.test(ua)) browser = 'Firefox';
    else if (/OPR\//i.test(ua) || /Opera\//i.test(ua)) browser = 'Opera';
    else if (/SamsungBrowser/i.test(ua)) browser = 'Samsung Internet';

    // Referrer Traffic Source
    let referrer = 'პირდაპირი (Direct)';
    if (document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        if (refUrl.hostname.includes('facebook') || refUrl.hostname.includes('fb.')) referrer = 'Facebook';
        else if (refUrl.hostname.includes('instagram')) referrer = 'Instagram';
        else if (refUrl.hostname.includes('google')) referrer = 'Google';
        else if (refUrl.hostname.includes('t.me') || refUrl.hostname.includes('telegram')) referrer = 'Telegram';
        else if (refUrl.hostname.includes('linkedin')) referrer = 'LinkedIn';
        else if (refUrl.hostname !== window.location.hostname) referrer = refUrl.hostname;
      } catch (e) {
        referrer = 'სხვა წყარო';
      }
    }

    // 6. Network Quality (Only if consent is accepted or for technical diagnosis)
    let networkType = 'wifi/broadband';
    try {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn && conn.effectiveType) {
        networkType = conn.effectiveType.toUpperCase();
      }
    } catch (e) {}

    // 7. Scroll Depth Tracking
    let maxScrollDepth = 0;
    function calculateScrollDepth() {
      try {
        const docElem = document.documentElement;
        const totalHeight = (docElem.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        if (totalHeight > 0) {
          const currentScroll = window.scrollY || window.pageYOffset;
          const pct = Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100)));
          if (pct > maxScrollDepth) maxScrollDepth = pct;
        } else {
          maxScrollDepth = 100;
        }
      } catch (e) {}
    }

    window.addEventListener('scroll', calculateScrollDepth, { passive: true });
    setTimeout(calculateScrollDepth, 1500);

    const screenRes = (window.screen.width || 0) + 'x' + (window.screen.height || 0);
    const rawLang = (navigator.language || (navigator.languages && navigator.languages[0]) || 'ka').toLowerCase();
    let normalizedLang = 'other';
    if (rawLang.startsWith('ka')) normalizedLang = 'ka';
    else if (rawLang.startsWith('az')) normalizedLang = 'az';
    else if (rawLang.startsWith('en')) normalizedLang = 'en';
    else if (rawLang.startsWith('ru')) normalizedLang = 'ru';

    // Measure page load time in seconds
    let loadTimeSec = 0;
    function measureLoadTime() {
      try {
        const perf = window.performance;
        if (perf) {
          const navEntries = (typeof perf.getEntriesByType === 'function') && perf.getEntriesByType('navigation');
          if (navEntries && navEntries.length > 0 && navEntries[0].duration > 0) {
            loadTimeSec = Math.round((navEntries[0].duration / 1000) * 10) / 10;
          } else if (perf.timing && perf.timing.loadEventEnd > 0) {
            loadTimeSec = Math.round(((perf.timing.loadEventEnd - perf.timing.navigationStart) / 1000) * 10) / 10;
          }
        }
      } catch (e) {}
    }

    window.addEventListener('load', () => {
      setTimeout(() => {
        measureLoadTime();
        if (loadTimeSec > 0) flushAnalyticsUpdate(duration);
      }, 250);
    });

    const visitRecord = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      session_id: sessionId,
      visitor_id: visitorId,
      consent_status: consentStatus,
      is_returning: isReturning,
      visit_count: visitCount,
      network_type: networkType,
      scroll_depth: maxScrollDepth,
      page_path: pagePath,
      page_title: pageTitle,
      referrer: referrer,
      device_type: deviceType,
      os: os,
      browser: browser,
      screen_resolution: screenRes,
      language: rawLang,
      browser_lang: normalizedLang,
      load_time_seconds: loadTimeSec,
      duration_seconds: 5,
      created_at: new Date().toISOString()
    };

    // 8. Save to Local Storage Log (Offline Fallback & Instant Access)
    try {
      let localLogs = JSON.parse(localStorage.getItem('gardabani_analytics_log') || '[]');
      localLogs.unshift(visitRecord);
      if (localLogs.length > 250) localLogs = localLogs.slice(0, 250);
      localStorage.setItem('gardabani_analytics_log', JSON.stringify(localLogs));
    } catch (e) {}

    // 9. Cloud Sync with Supabase (if configured)
    let cloudRecordId = null;
    async function syncVisitToSupabase() {
      if (typeof initSupabase !== 'function') return;
      const client = initSupabase();
      if (!client) return;
      try {
        const { data, error } = await client
          .from('site_analytics')
          .insert([{
            session_id: sessionId,
            visitor_id: visitorId,
            consent_status: consentStatus,
            is_returning: isReturning,
            visit_count: visitCount,
            network_type: networkType,
            scroll_depth: maxScrollDepth,
            page_path: pagePath,
            page_title: pageTitle,
            referrer: referrer,
            device_type: deviceType,
            os: os,
            browser: browser,
            screen_resolution: screenRes,
            language: rawLang,
            browser_lang: normalizedLang,
            load_time_seconds: loadTimeSec,
            duration_seconds: 5
          }])
          .select('id')
          .single();

        if (!error && data && data.id) {
          cloudRecordId = data.id;
        }
      } catch (err) {
        // Total silence for analytics errors
      }
    }

    // 10. Active Session Duration & Scroll Heartbeat
    let duration = 5;
    const heartbeatTimer = setInterval(() => {
      duration += 10;
      flushAnalyticsUpdate(duration);
    }, 10000);

    async function flushAnalyticsUpdate(dur) {
      calculateScrollDepth();
      if (loadTimeSec === 0) measureLoadTime();

      // Local update
      try {
        let localLogs = JSON.parse(localStorage.getItem('gardabani_analytics_log') || '[]');
        if (localLogs.length > 0 && localLogs[0].session_id === sessionId && localLogs[0].page_path === pagePath) {
          localLogs[0].duration_seconds = dur;
          localLogs[0].scroll_depth = maxScrollDepth;
          localLogs[0].consent_status = getConsentStatus();
          if (visitorId) localLogs[0].visitor_id = visitorId;
          localLogs[0].is_returning = isReturning;
          localLogs[0].visit_count = visitCount;
          if (loadTimeSec > 0) localLogs[0].load_time_seconds = loadTimeSec;
          localStorage.setItem('gardabani_analytics_log', JSON.stringify(localLogs));
        }
      } catch (e) {}

      // Supabase update
      if (cloudRecordId && typeof initSupabase === 'function') {
        const client = initSupabase();
        if (client) {
          try {
            await client.from('site_analytics').update({
              duration_seconds: dur,
              scroll_depth: maxScrollDepth,
              consent_status: getConsentStatus(),
              visitor_id: visitorId,
              is_returning: isReturning,
              visit_count: visitCount,
              load_time_seconds: loadTimeSec,
              updated_at: new Date().toISOString()
            }).eq('id', cloudRecordId);
          } catch (e) {}
        }
      }
    }

    // Global Event Tracking Helper for Villages and Navigation Clicks
    window.gmaTrackEvent = function(eventType, details) {
      try {
        const events = JSON.parse(localStorage.getItem('gardabani_analytics_events') || '[]');
        const targetName = (details && (details.village_name || details.name || details.target)) || '';
        const evtRecord = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          session_id: sessionId,
          event_type: eventType,
          target_name: targetName,
          page_path: pagePath,
          created_at: new Date().toISOString()
        };
        events.unshift(evtRecord);
        if (events.length > 300) events.length = 300;
        localStorage.setItem('gardabani_analytics_events', JSON.stringify(events));

        // Sync with Supabase events table if configured
        if (typeof initSupabase === 'function') {
          const client = initSupabase();
          if (client) {
            client.from('site_analytics_events').insert([{
              session_id: sessionId,
              event_type: eventType,
              target_name: targetName,
              page_path: pagePath
            }]).then(() => {}).catch(() => {});
          }
        }
      } catch (e) {}
    };

    // Listen for cookie consent changes in real-time
    window.addEventListener('cookie_consent_changed', (e) => {
      evaluateVisitorIdentity();
      flushAnalyticsUpdate(duration);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushAnalyticsUpdate(duration);
    });

    window.addEventListener('beforeunload', () => {
      clearInterval(heartbeatTimer);
      flushAnalyticsUpdate(duration);
    });

    // Send after brief delay
    setTimeout(syncVisitToSupabase, 800);

  } catch (err) {
    // Total silence for analytics errors
  }
})();
