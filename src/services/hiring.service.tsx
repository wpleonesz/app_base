import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/hr/hiring');
};

const getById = (id: any) => {
  return api.get(`/api/hr/hiring/${id}`);
};

const getByCount = () => {
  return api.get(`/api/hr/hiring/count/`);
};

export const hiringService = {
  getAll,
  getById,
  getByCount,
};
