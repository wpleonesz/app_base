import { api } from 'lib/api';

export interface PasswordChange {
  current: string;
  password: string;
  confirm?: string;
}

export interface RecoverPassword {
  email: string;
}

const changePassword = (id: number, params: PasswordChange) => {
  return api.put(`/api/user/password/change/${id}`, params);
};

const recoverPasswordByEmail = (email: string) => {
  return api.post(`/api/user/recover/${email}`, {});
};

const recoverPassword = (email: string) => {
  return api.post(`/api/user/recover/${email}`, {});
};

const getTodayAttendances = (id: number, date: string) => {
  return api.get(`/api/user/${id}/attendances/${date}/${date}`);
};

const getAttendancesByDate = (
  id: number,
  initDate?: string,
  endDate?: string,
) => {
  let url = `/api/user/${id}/attendances`;
  if (initDate && endDate) {
    url = `${url}/${initDate}/${endDate}`;
  }
  return api.get(url);
};
const getAttendancesByStatesCount = (
  id: number,
  initDate: string,
  endDate: string,
  state: string,
) => {
  let url = `/api/user/attendance/states/${id}/attendances`;
  if (initDate && endDate) {
    url = `${url}/${initDate}/${endDate}/${state}`;
  }
  return api.get(url);
};

const getAttendancesByMilliseconds = (
  id: number,
  initDate: string,
  endDate: string,
  state: string,
) => {
  let url = `/api/user/attendance/milliseconds/${id}/attendances`;
  if (initDate && endDate) {
    url = `${url}/${initDate}/${endDate}/${state}`;
  }
  return api.get(url);
};

const getAccess = (entityCode?: string) => {
  let url = `/api/user/access`;
  if (entityCode) url = `${url}/${entityCode}`;
  return api.get(url);
};

const getPhoto = (id: string) => {
  return api.get(`/api/user/photo/${id}`);
};

const getAll = () => {
  return api.get('/api/user/');
};

const getById = (id: number) => {
  return api.get(`/api/user/${id}`);
};

const rolesBooleans = () => {
  return api.get('/api/user/roles/admin/');
};

const getDisabledPersonByDni = (dni: string, mail: string) => {
  return api.get(`/api/user/disabled/${dni}/${mail}`);
};

const updatePhoto = (id: number, photo: string) => {
  return api.put(`/api/person/photo/${id}`, { photo });
};

const getEpsonPrintAdminByMail = (email: string) => {
  return api.get(`/api/user/epson/print/codes/${email}`);
};

export const userService = {
  changePassword,
  recoverPasswordByEmail,
  getTodayAttendances,
  getAttendancesByDate,
  getAccess,
  getPhoto,
  recoverPassword,
  getAttendancesByStatesCount,
  getAttendancesByMilliseconds,
  getAll,
  rolesBooleans,
  getDisabledPersonByDni,
  getById,
  updatePhoto,
  getEpsonPrintAdminByMail,
};
