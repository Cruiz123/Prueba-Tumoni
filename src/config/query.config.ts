import {QueryClient} from '@tanstack/react-query';

const RETRY_RESPONSE_STATUSES = [500, 502, 503, 504];

// eslint-disable-next-line prettier/prettier
const isError = (error: unknown): error is {status: number} => {
  return !!(typeof error === 'object' && error && 'status' in error);
};

const handleRetry = (failureCount: number, error: unknown): boolean => {
  if (isError(error)) {
    return failureCount < 2 && RETRY_RESPONSE_STATUSES.includes(error.status);
  }

  return false;
};

const QUERY_CLIENT_CONFIG = new QueryClient({
  defaultOptions: {
    queries: {
      retry: handleRetry,
    },
    mutations: {
      retry: handleRetry,
    },
  },
});

export default QUERY_CLIENT_CONFIG;
