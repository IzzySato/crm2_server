const ENV = {
  TEST: { NAME: 'test', PATH: '.env' },
  PRODUCTION: { NAME: 'production', PATH: '.env' },
  CI: { NAME: 'ci', PATH: '.env.ci' },
  DEV: { NAME: 'dev', PATH: '.env' },
  DEFAULT: { NAME: 'default', PATH: '.env' }
};

module.exports = {
  ENV,
};
