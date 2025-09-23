import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/base/country/parroquia');
};

export const parroquiaService = {
  getAll,
};
