import { api } from 'lib/api';

const getById = (id: any) => {
  return api.get(`/api/hr/timer/${id}`);
};

export const timerService = {
  getById,
};
