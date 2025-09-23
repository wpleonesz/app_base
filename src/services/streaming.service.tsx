import { api } from 'lib/api';

const getView = (name: any) => {
  return api.get(`/api/streaming/view/${name}`);
};

const getAll = () => {
  return api.get('/api/streaming/config/');
};

export const streamingService = {
  getView,
  getAll,
};
