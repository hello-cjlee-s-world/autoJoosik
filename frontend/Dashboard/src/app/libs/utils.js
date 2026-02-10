const buildUrl = (url, params) => {
  return url.replace(/\{(\w+)\}/g, (_, key) => {
    if (params[key] === undefined) {
      throw new Error(`Missing URL parameter: ${key}`);
    }
    return encodeURIComponent(params[key]);
  });
}


export const utils = {
  buildUrl,
};