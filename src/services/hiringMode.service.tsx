import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/hr/hiring/mode');
};

const getById = (id: any) => {
  return api.get(`/api/hr/hiring/mode/${id}`);
};

export const hiringModeService = {
  getAll,
  getById,
};
