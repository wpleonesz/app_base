import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/job/');
};

export const jobService = {
  getAll,
};
