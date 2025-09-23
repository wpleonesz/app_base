import store from 'storage/store';

const KEY = 'institutions';

const get = async () => {
  const data = await store.get(KEY);
  return data || [];
};

const set = async (data: any) => {
  await store.set(KEY, data || []);
};

const clear = async () => {
  await store.remove(KEY);
};

export const institutionData = {
  get,
  set,
  clear,
};
