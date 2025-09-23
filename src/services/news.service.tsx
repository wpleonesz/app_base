import { api } from 'lib/api';

const getById = (page: any, per_page: any) => {
  return api.get(`/api/base/newswp/board/${page}/${per_page}`);
};

export const newsService = {
  getById,
};
