import { CapacitorHttp } from '@capacitor/core';
import store from 'storage/store';
import { device } from 'lib/device';
import { Device } from '@capacitor/device';

export const clearCookies = async () => {
  await store.remove('cookie'); // Elimina la cookie almacenada manualmente
};

const deviceId = async () => {
  return (await device.id()).uuid;
};

const setCookie = async (headers: Record<string, any>) => {
  await store.create(); // Asegurar que store está listo
  const cookie = await store.get('cookie'); // Obtener cookie almacenada

  if (cookie) {
    headers['Cookie'] = cookie;
    // console.log('✅ Cookie enviada en headers:', cookie);
  } else {
    console.warn('⚠️ No se encontró cookie almacenada en store');
  }
};

const commonHeader = async () => {
  const headers: Record<string, any> = {
    'device-uuid': await deviceId(),
    'should-expire': 'never',
  };
  await setCookie(headers);
  return headers;
};

const baseUrl = async (url: string) => {
  let base = process.env.REACT_APP_API_URL || '';

  try {
    const info = await Device.getInfo();
    // En emulador Android, localhost debe mapearse a 10.0.2.2
    if (info.platform === 'android') {
      base = base
        .replace('localhost', '10.0.2.2')
        .replace('127.0.0.1', '10.0.2.2');
    }
  } catch (e) {
    // Si falla Device.getInfo, no bloquear la petición — usar base tal cual
    console.warn(
      'No se pudo obtener info del dispositivo para ajustar baseUrl',
      e,
    );
  }

  return `${base}${url}`;
};

/**
 * Request genérico (GET, POST o PUT).
 */
const request = async (
  method: 'GET' | 'POST' | 'PUT',
  url: string,
  body?: any,
  extraHeaders?: Record<string, any>,
) => {
  const headers = {
    ...(await commonHeader()),
    ...(extraHeaders || {}),
    'Content-Type': 'application/json',
  };

  const response = await CapacitorHttp.request({
    method,
    url: await baseUrl(url),
    headers,
    data: body,
    webFetchExtra: {
      credentials: 'include', // Permite enviar cookies en navegadores compatibles
    },
  });

  return handleResponse(response, method, url, body, headers);
};

const get = async (url: string) => request('GET', url);
const post = async (url: string, body: any, headers?: any) =>
  request('POST', url, body, headers);
const put = async (url: string, body: any) => request('PUT', url, body);

/**
 * Manejo de redirecciones (similar a handleRedirectResponse de tu código viejo).
 * Se asume que el backend responde con un 3XX, un header "Location" y
 * requiere volver a disparar un POST a la nueva URL para completarse.
 */
const handleRedirectResponse = async (
  response: any,
  originalMethod: 'GET' | 'POST' | 'PUT',
  originalUrl: string,
  originalBody: any,
  originalHeaders: Record<string, any> = {}, // <--- Valor por defecto
): Promise<any> => {
  // <-- Añadir ": Promise<any>"
  let redirectPath =
    response.headers?.['Location'] || response.headers?.['location'];

  if (!redirectPath) {
    throw new Error(`No se encontró 'Location' en la respuesta de redirección`);
  }
  // Ajustar espacios, etc.
  redirectPath = redirectPath.replace(/\s/g, '%20');
  const redirectUrl = await baseUrl(redirectPath);

  // Suponiendo que el backend requiere un POST a la nueva URL:
  const redirectResponse = await CapacitorHttp.request({
    method: 'POST',
    url: redirectUrl,
    headers: {
      ...(await commonHeader()),
      ...originalHeaders,
      'Content-Type': 'application/json',
    },
    data: originalBody,
    webFetchExtra: {
      credentials: 'include',
    },
  });

  return handleResponse(
    redirectResponse,
    'POST',
    redirectUrl,
    originalBody,
    originalHeaders,
  );
};

/**
 * Manejo principal de la respuesta de la API.
 */
const handleResponse = async (
  response: any,
  method: 'GET' | 'POST' | 'PUT',
  url: string,
  body?: any,
  headers?: Record<string, any>,
): Promise<any> => {
  // <-- Añadir ": Promise<any>"
  if (response.status === 200) {
    const rawSetCookie =
      response.headers?.['Set-Cookie'] || response.headers?.['set-cookie'];
    if (rawSetCookie) {
      await store.set('cookie', rawSetCookie);
    }
    return response.data;
  }

  if (response.status >= 300 && response.status < 400) {
    return handleRedirectResponse(response, method, url, body, headers ?? {});
  }

  if (response.status === 403) {
    console.warn('❌ No autorizado, posible sesión caducada');
    await store.remove('cookie');
  } else if (response.status === 404) {
    console.error('❌ Endpoint no encontrado:', url);
    throw new Error('API Endpoint not found');
  }

  const errorMessage =
    response.data?.message ||
    response.statusText ||
    `Error desconocido (HTTP ${response.status})`;

  console.error('🚨 Error en la API:', errorMessage);
  throw new Error(errorMessage);
};

export const api = {
  get,
  post,
  put,
};
