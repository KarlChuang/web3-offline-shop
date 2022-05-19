import contractRouter from './contract';
import signatureRouter from './signature';

const express = require('express');

const apiRouter = express.Router();
export default apiRouter;

apiRouter.use('/contract', contractRouter);
apiRouter.use('/signature', signatureRouter);
