const PWA_HEAD_TAG = `
  <link rel="manifest" href="manifest.webmanifest">
  <meta name="application-name" content="Gardabani Mobile Academy">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="Gardabani Academy">
`;

const PWA_REGISTER_JS = `
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').catch((error) => {
          console.info('Offline mode is unavailable:', error);
        });
      });
    }
  </script>
`;

module.exports = { PWA_HEAD_TAG, PWA_REGISTER_JS };
