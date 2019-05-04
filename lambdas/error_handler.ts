import Sentry from '@sentry/node';

export const initSentry = (lambdaName: string, method: string = '') => {
  Sentry.configureScope(scope => {
    scope.setTag('lambda', lambdaName);
    scope.setTag('method', method);
    scope.setTag('env', 'lambda');
  });

  Sentry.init({
    attachStacktrace: true,
    dsn: process.env.SENTRY_DSN,
    maxBreadcrumbs: 50,
    release: process.env.SENTRY_RELEASE
  });
};

export const captureError = async (err: Error) => {
  Sentry.captureException(err);
  await Sentry.flush(2000);
};
