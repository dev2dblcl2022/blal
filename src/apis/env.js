export function getSilverapiURL(path) {
  return `${
    process.env.BLAL_SILVER_API_URL || 'https://silverapi.blallab.com'
  }${path}`;
}

export function getProductionReportURL(path) {
  return `${
    // process.env.BLAL_PRODUCTION_API_URL || 'https://lims.blallab.com/blal'
    process.env.BLAL_STAGING_API_URL || 'http://limsreport.blallab.com/S3'
  }${path}`;
}
