const contracts = (instance) => ({
  getAll() {
    return instance.get('/contracts');
  },
  getOne({ id }) {
    return instance.get(`/contracts/${id}`);
  },
  addContract(contractData) {
    return instance.post('/contracts', contractData);
  },
});
export default contracts;
