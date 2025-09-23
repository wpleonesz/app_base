import { api } from 'lib/api';

const getAll = () => {
  return api.get('/api/notice/');
};

export const noticeService = {
  getAll,
};
