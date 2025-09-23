import { api } from 'lib/api';

const getAllPublic = () => {
  return api.get('/api/public/institution');
};

export const institutionService = {
  public: { getAll: getAllPublic },
};
