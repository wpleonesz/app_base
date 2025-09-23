import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/hr/license');
};

const serial = () => {
  return api.get('/api/hr/license/methods/code/');
};

const vacationSumById = (id: any) => {
  return api.get(`/api/hr/license/methods/vacation/${id}`);
};

const create = (data: any) => {
  return api.post('/api/hr/license', data);
};

export const licenseService = {
  getAll,
  serial,
  vacationSumById,
  create,
};
