export default function useDeviceType(device: Device): DeviceType {
  if (device.is_gateway) {
    return "Gateway";
  } else if (device.is_subdevice) {
    return "Subdevice";
  } else {
    return "Normal device";
  }
}
