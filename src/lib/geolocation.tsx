import { Geolocation, Position } from '@capacitor/geolocation';
import { device } from 'lib/device';

export interface GeoPosition {
  latitude: number;
  longitude: number;
}

export const DEFAULT_GEO_POSITION = {
  latitude: 0,
  longitude: 0,
};

const geoPositionMock: GeoPosition = {
  latitude: -1.500786,
  longitude: -78.066513,
};

export const getPosition: Function = async () => {
  if (await device.onWeb()) return geoPositionMock;
  const coordinates: Position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
  const geoPosition: GeoPosition = {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };
  return geoPosition;
};
