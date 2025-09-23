import store from 'storage/store';

const KEY = 'profile';

const get = async (key: any = false) => {
  const data = await store.get(KEY);
  if (key) return data[key];
  return data;
};

const add = async (id: string, data: Object) => {
  const storage = await get();
  storage[id] = data;
  await set(storage);
};

const set = async (data: any) => {
  await store.set(KEY, data);
};

const clear = async () => {
  await store.remove(KEY);
};

export const profileData = {
  add,
  get,
  set,
  clear,
};
