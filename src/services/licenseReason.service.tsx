import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/hr/license/reason');
};

const getById = (id: any) => {
  return api.get(`/api/hr/license/reason/${id}`);
};

export const licenseReasonService = {
  getAll,
  getById,
};
