const releaseName = 'prod';
// const releaseName = 'staging';

export function getRelease(path) {
  if (releaseName === 'prod') {
    let reportUrl = '';
    if (path) {
      reportUrl = `${
        process.env.BLAL_PRODUCTION_API_URL || 'https://lims.blallab.com/blal'
      }${path}`;
    }
    return {
      reportUrl: reportUrl,
      DOMAIN: 'https://api.blallab.com',
      Api_Local_Url: 'https://gold-ca-api.blallab.com/v1',
      Api_Live_Url: 'https://gold-ca-api.blallab.com/v1',
    };
  } else {
    let reportUrl = '';
    if (path) {
      reportUrl = `${
        process.env.BLAL_STAGING_API_URL || 'http://limsreport.blallab.com/S3'
      }${path}`;
    }
    return {
      reportUrl: reportUrl,
      DOMAIN: 'https://silverapi.blallab.com',
      Api_Local_Url: 'https://sapi.blal.hl1.in/v1',
      Api_Live_Url: 'https://sapi.blal.hl1.in/v1',
    };
  }
}
