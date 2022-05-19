import SignatureController from '../../controllers/SignatureController';

const express = require('express');

const signatureRouter = express.Router();
export default signatureRouter;

signatureRouter.post('/', SignatureController.verify);
