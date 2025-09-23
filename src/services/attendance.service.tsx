import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/attendance');
};

const create = (data: any) => {
  return api.post('/api/attendance', data);
};

export const attendanceService = {
  getAll,
  create,
};
