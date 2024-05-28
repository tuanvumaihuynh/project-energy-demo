<template>
  <div class="flex flex-col flex-1 gap-3">
    <div v-if="pending" class="flex flex-1 justify-center items-center">
      <LoaderCircle
        class="w-12 h-12 animate-spin text-primary"
        aria-label="Loading..."
      />
    </div>
    <div v-else class="grid gap-4 grid-cols-1 md:gap-8 sm:grid-cols-3">
      <DeviceCard
        class="cursor-pointer"
        @click="() => onDeviceClick(device)"
        v-for="device in data!.items"
        :key="device.id"
        :device="device"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";

const router = useRouter();

const { data, pending, error } = await useAPI<ItemPagination<Device>>(
  "/devices",
  {
    params: {
      page: 1,
      tags: "Demo",
      page_size: 100,
    },
    lazy: true,
  }
);

function onDeviceClick(device: Device) {
  if (device.tags.includes("ESP")) {
    router.push(`/esp/${device.id}`);
    return;
  }
  router.push(`/energy/${device.id}`);
}
</script>
