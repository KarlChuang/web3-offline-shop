const express = require('express');
const ContractsController = require('../../controllers/ContractsController');

const contractRouter = express.Router();
module.exports = contractRouter;

contractRouter.get('/', ContractsController.getAllContracts);
contractRouter.get('/:address', ContractsController.getOneContract);

contractRouter.post('/', ContractsController.addContract);
