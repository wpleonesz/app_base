import { api } from 'lib/api';

export interface GeoDescription {
  name: string;
  weekday: string;
  city: string;
  date: string;
  time: string;
  dateFull: string;
}

export const DEFAULT_GEO_DESCRIPTION = {
  name: '',
  weekday: '',
  city: '',
  date: '',
  time: '',
  dateFull: '',
};

const getPosition = (latitude: number, longitude: number) => {
  return api.get(`/api/gps/reverse/${latitude}/${longitude}`);
};

export const geoService = {
  getPosition,
};
