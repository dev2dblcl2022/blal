export function getSilverapiURL(path) {
  return `${
    process.env.BLAL_SILVER_API_URL || 'https://silverapi.blallab.com'
  }${path}`;
}
