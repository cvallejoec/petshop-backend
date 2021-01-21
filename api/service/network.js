const express = require('express');
const { catchErrors } = require('../../handler/errorHandler');
const serviceController = require('./controller');

const router = express.Router();

// Routes
router.get('/', catchErrors(serviceController.list));
router.get('/:slug', catchErrors(serviceController.get));
router.post('/', catchErrors(serviceController.create));

module.exports = router;
