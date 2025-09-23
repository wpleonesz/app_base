import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/wp-ueaep/cupones/');
};

export const couponService = {
  getAll,
};
