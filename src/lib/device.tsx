import { Device, DeviceInfo } from '@capacitor/device';

const onPlatform: Function = async (platform: String) => {
  const info: DeviceInfo = await Device.getInfo();
  return info.platform === platform;
};

const onWeb: Function = async () => await onPlatform('web');
const info: Function = async () => await Device.getInfo();
const id: Function = async () => await Device.getId();

export const device = {
  info,
  onWeb,
  id,
};
