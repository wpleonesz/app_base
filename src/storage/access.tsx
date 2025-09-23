import store from 'storage/store';

const KEY = 'access';

const get = async (id: any = false) => {
  const data = await store.get(KEY);
  if (id) return data[id];
  return data || {};
};

const add = async (id: string, data: Object) => {
  const storage = await get();
  storage[id] = data;
  await set(storage);
};

const set = async (data: Object) => {
  await store.set(KEY, data || {});
};

export const accessData = {
  get,
  add,
  set,
};
