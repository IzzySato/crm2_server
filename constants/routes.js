module.exports = {
  ROUTES: {
    ADDRESS: { BASE: '/address' },
    AUTH: { BASE: '/auth' },
    CUSTOMER: { BASE: '/customer' },
    USER: { BASE: '/user' },
    PRODUCT: { BASE: '/product' },
    JOB: { BASE: '/job' },
    UPLOAD: { BASE: '/upload', PRODUCT: '/product' },
    JWT: { BASE: '/jwt', GENERATE_TOKEN: '/generate-token' },
  },
};
