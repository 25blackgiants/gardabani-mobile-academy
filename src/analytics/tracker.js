// ============================================================================
// LIGHTWEIGHT PRIVACY-FIRST ANALYTICS TRACKER
// Anonymous, Non-invasive, Client-side session and visit logger
// Works with Supabase and has automatic LocalStorage offline resilience
// ============================================================================

(function() {
  try {
    // 1. Ephemeral & Anonymous Session Token (SessionStorage)
    let sessionId = sessionStorage.getItem('gma_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem('gma_session_id', sessionId);
    }

    // 2. Identify Page
    const pagePath = window.location.pathname.split('/').pop() || 'index.html';
    const pageTitle = document.title || 'გარდაბნის მობილური აკადემია';

    // 3. User Agent & Device Type
    const ua = navigator.userAgent || '';
    let deviceType = 'Desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      deviceType = 'Tablet';
    } else if (/Mobile|iPhone|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) {
      deviceType = 'Mobile';
    }

    // OS Detection
    let os = 'Desktop OS';
    if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
    else if (/Linux/i.test(ua)) os = 'Linux';

    // Browser Detection
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

    const screenRes = (window.screen.width || 0) + 'x' + (window.screen.height || 0);
    const lang = navigator.language || 'ka';

    const visitRecord = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      session_id: sessionId,
      page_path: pagePath,
      page_title: pageTitle,
      referrer: referrer,
      device_type: deviceType,
      os: os,
      browser: browser,
      screen_resolution: screenRes,
      language: lang,
      duration_seconds: 5,
      created_at: new Date().toISOString()
    };

    // 4. Save to Local Storage Log (Offline Fallback & Instant Access)
    try {
      let localLogs = JSON.parse(localStorage.getItem('gardabani_analytics_log') || '[]');
      localLogs.unshift(visitRecord);
      if (localLogs.length > 200) localLogs = localLogs.slice(0, 200);
      localStorage.setItem('gardabani_analytics_log', JSON.stringify(localLogs));
    } catch (e) {}

    // 5. Cloud Sync with Supabase (if client is initialized)
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
            page_path: pagePath,
            page_title: pageTitle,
            referrer: referrer,
            device_type: deviceType,
            os: os,
            browser: browser,
            screen_resolution: screenRes,
            language: lang,
            duration_seconds: 5
          }])
          .select('id')
          .single();

        if (!error && data && data.id) {
          cloudRecordId = data.id;
        }
      } catch (err) {
        // Silent catch: Analytics must never break main UX
      }
    }

    // 6. Active Session Duration Heartbeat
    let duration = 5;
    const heartbeatTimer = setInterval(() => {
      duration += 10;
      flushDuration(duration);
    }, 10000);

    async function flushDuration(dur) {
      // Local update
      try {
        let localLogs = JSON.parse(localStorage.getItem('gardabani_analytics_log') || '[]');
        if (localLogs.length > 0 && localLogs[0].session_id === sessionId && localLogs[0].page_path === pagePath) {
          localLogs[0].duration_seconds = dur;
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
              updated_at: new Date().toISOString()
            }).eq('id', cloudRecordId);
          } catch (e) {}
        }
      }
    }

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushDuration(duration);
    });

    window.addEventListener('beforeunload', () => {
      clearInterval(heartbeatTimer);
      flushDuration(duration);
    });

    // Send after brief delay to prioritize rendering of main components
    setTimeout(syncVisitToSupabase, 800);

  } catch (err) {
    // Total silence for analytics errors
  }
})();
