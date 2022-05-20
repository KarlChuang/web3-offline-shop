const db = require('../models');

class ContractsController {
  static async getAllContracts(req, res) {
    // TODO: List All contracts in DB
    try {
      const contracts = await db.Contract.findAll();
      res.status(200).json({ data: contracts });
    } catch (err) {
      res.status(500);
    }
  }

  static async getOneContract(req, res) {
    // TODO: Get one specific contract according to address
    try {
      const { address } = req.params;
      const contract = await db.Contract.findOne({
        where: {
          address,
        },
      });
      res.status(200).json({ data: contract });
    } catch (err) {
      res.status(500);
    }
  }

  static async addContract(req, res) {
    // TODO: Add new deployed contract in DB
    try {
      const { address, name, symbol } = req.body;
      await db.Contract.create({
        address,
        name,
        symbol,
      });
      res.status(200);
    } catch (err) {
      res.status(500);
    }
  }
}
module.exports = ContractsController;
