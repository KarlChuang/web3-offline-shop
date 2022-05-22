const signatures = (instance) => ({
  verify({ address, message, signature }) {
    return instance.post('/signatures', { address, message, signature });
  },
});

export default signatures;
