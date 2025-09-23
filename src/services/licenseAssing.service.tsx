import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/hr/license/assing/');
};

const create = (data: any) => {
  return api.post('/api/hr/license/assing/', data);
};

export const licenseAssingService = {
  getAll,
  create,
};
