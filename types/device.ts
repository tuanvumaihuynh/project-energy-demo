interface Device {
  id: string;
  name: string;
  description: string;
  is_gateway: boolean;
  is_subdevice: boolean;
  connected: boolean;
  tags: string[];
  created_at: string;
}
