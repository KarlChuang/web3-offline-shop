const signatures = (instance) => ({
  verify(body) {
    return instance.post('/signatures', body);
  },
});

export default signatures;
