const contracts = (instance) => ({
  getAll() {
    return instance.get('/contracts');
  },
  getOne({ id }) {
    return instance.get(`/contracts/${id}`);
  },
  addContract({ address, name, symbol }) {
    return instance.post('/contracts', { address, name, symbol });
  },
});
export default contracts;
