import { api } from 'lib/api';

export interface Credentials {
  username: string;
  password: string;
  institutionId?: number;
}

const signin = (params: Credentials) => {
  return api.post('/api/auth/signin/', params);
};

const signout = () => {
  return api.get(`/api/auth/signout`);
};

const user = () => {
  return api.get('/api/auth/user');
};

const publicUser = () => {
  return api.get('/api/public/auth/user');
};

export const authService = {
  public: {
    user: publicUser,
  },
  signin,
  signout,
  user,
};
