import apiRouter from './api';

const express = require('express');

const router = express.Router();
export default router;
router.use('/api/v1', apiRouter);
