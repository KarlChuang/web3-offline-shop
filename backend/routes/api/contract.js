import ContractsController from '../../controllers/ContractsController';

const express = require('express');

const contractRouter = express.Router();
export default contractRouter;

contractRouter.get('/', ContractsController.getAllContracts);
contractRouter.get('/:id', ContractsController.getOneContract);

contractRouter.post('/', ContractsController.addContract);
