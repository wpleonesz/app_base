import { api } from 'lib/api';

const getAllPublic = () => {
  return api.get('/api/public/ldap/domain');
};

export const ldapService = {
  getAllPublic,
};
