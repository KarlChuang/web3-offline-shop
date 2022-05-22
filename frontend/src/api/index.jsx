import axios from 'axios';
import contracts from './contract';
import signatures from './signature';

const services = {};
const instance = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});
services.signatures = signatures(instance);
services.contracts = contracts(instance);

export default services;
