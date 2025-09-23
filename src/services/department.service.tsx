import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/department');
};

export const departmentService = {
  getAll,
};
