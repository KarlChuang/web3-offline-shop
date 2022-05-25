const express = require('express');
const SignatureController = require('../../controllers/SignatureController');

const signatureRouter = express.Router();
module.exports = signatureRouter;

signatureRouter.get('/', SignatureController.getAll);
signatureRouter.get('/:address', SignatureController.getUserSignatures);
signatureRouter.post('/', SignatureController.verify);
