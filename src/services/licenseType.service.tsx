import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/hr/license/type');
};

export const licenseTypeService = {
  getAll,
};
