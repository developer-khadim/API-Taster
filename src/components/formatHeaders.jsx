export const formatHeaders = (headers) => {
    if (typeof headers !== 'object' || headers === null) return '';
    return Object.entries(headers).map(([key, value]) => `${key}: ${value}`).join('\n');
  };