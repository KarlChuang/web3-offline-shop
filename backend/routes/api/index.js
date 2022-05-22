const express = require('express');
const contractRouter = require('./contract');
const signatureRouter = require('./signature');

const apiRouter = express.Router();
module.exports = apiRouter;

apiRouter.use('/contracts', contractRouter);
apiRouter.use('/signatures', signatureRouter);
