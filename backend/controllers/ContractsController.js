class ContractsController {
  static async getAllContracts(req, res) {
    // TODO: List All contracts in DB
    res.JSON(200);
  }

  static async getOneContract(req, res) {
    // TODO: Get one specific contract
    res.JSON(200);
  }

  static async addContract(req, res) {
    // TODO: Add new deployed contract in DB
    res.JSON(200);
  }
}

export default ContractsController;
