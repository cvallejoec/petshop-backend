const express = require('express');
const config = require('../config');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// Router
app.use('/api/services', require('./service/network'));

const errorHandler = require('../handler/errorHandler');
app.use(errorHandler.notFound);
config.server.mode === 'development'
  ? app.use(errorHandler.developmentErrors)
  : app.use(errorHandler.productionErrors);

module.exports = app;
