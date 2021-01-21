require('dotenv').config();

module.exports = {
  server: {
    mode: process.env.ENV || 'production',
  },
};
