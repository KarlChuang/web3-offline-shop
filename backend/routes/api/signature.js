const express = require('express');
const SignatureController = require('../../controllers/SignatureController');

const signatureRouter = express.Router();
module.exports = signatureRouter;

signatureRouter.post('/', SignatureController.verify);
