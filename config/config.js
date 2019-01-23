let config = {
  CARDBOARDS_PER_PAGE: 154,
  // SOCKET_PRODUCTION_URL: 'http://104.192.4.252:3000',
  SOCKET_PRODUCTION_URL: 'http://74.208.217.139:5003',
  SOCKET_DEV_URL: 'http://localhost:5003',
  // APP_PORT: 3000,
  APP_PORT: 5003,
  CARDBOARDS_NUMCODE_LENGTH: 4,
  // API_URL: 'http://104.192.4.252:3002/loteriabingo/api',
  API_URL: 'http://74.208.217.139:5002/loteriabingo/api',
  SOCKET_TIMEOUT: 100000,
  COUNTDOWN_START_TIME: 180,
  CARDBOARDS_URL: 'http://104.192.4.252:3001/#/',
  // CARDBOARDS_URL: 'http://104.192.4.252:3001/#/'
}

console.log('NODE_ENV: ', process.env.NODE_ENV)
switch ( process.env.NODE_ENV ) {
  case 'pruebasMID2':
    config.SOCKET_PRODUCTION_URL = 'http://104.192.4.252:3000'
    config.APP_PORT = 3000
    break;

  case 'sldevs':
    config.SOCKET_PRODUCTION_URL = 'http://74.208.217.139:5003'
    break

  default:
    break;
}

module.exports = config