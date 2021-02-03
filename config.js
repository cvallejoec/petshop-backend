require('dotenv').config();

module.exports = {
  server: {
    mode: process.env.ENV || 'production',
  },
  servers: {
    client: process.env.SERVER_CLIENT,
    service: process.env.SERVER_SERVICE,
  },
};
