const db = require('../models');

class ContractsController {
  static async getAllContracts(req, res) {
    try {
      const contracts = await db.Contract.findAll();
      res.status(200).json(contracts);
    } catch (err) {
      res.status(500);
    }
  }

  static async getOneContract(req, res) {
    try {
      const { address } = req.params;
      const contract = await db.Contract.findOne({
        where: {
          address,
        },
      });
      res.status(200).json(contract);
    } catch (err) {
      res.status(500);
    }
  }

  static async addContract(req, res) {
    try {
      const {
        address, name, symbol, uri,
      } = req.body;
      await db.Contract.create({
        address,
        name,
        symbol,
        uri,
      });
      res.status(200).json('success');
    } catch (err) {
      res.status(500).json('success');
    }
  }
}
module.exports = ContractsController;
