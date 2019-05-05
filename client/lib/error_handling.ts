import Sentry from '@sentry/node';

Sentry.init({
  attachStacktrace: true,
  dsn: process.env.SENTRY_DSN,
  maxBreadcrumbs: 50,
  release: process.env.SENTRY_RELEASE
});

export const trackErrorSentry = (err: Error) => {
  Sentry.configureScope(scope => {
    scope.setTag('env', 'client');
    if (err.message) {
      // De-duplication currently doesn't work correctly for SSR / browser errors
      // so we force deduplication by error message if it is present
      scope.setFingerprint([err.message]);
    }

    const { search, pathname, hostname } = window.location;
    scope.setTag('environment', 'client');
    scope.setExtra('query', search);
    scope.setExtra('hostname', hostname);
    scope.setExtra('pathname', pathname);
  });
  return Sentry.captureException(err);
};
