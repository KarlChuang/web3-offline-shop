const signatures = (instance) => ({
  verify(body) {
    return instance.post('/signatures', body);
  },
  getAddrSig(addr) {
    return instance.get(`/signatures/${addr}`);
  },
});

export default signatures;
