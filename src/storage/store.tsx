import { Storage } from '@ionic/storage';

const store = new Storage();

const create = async () => {
  await store.create();
};

create();

export default store;
