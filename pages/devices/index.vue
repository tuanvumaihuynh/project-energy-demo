<template>
  <div v-if="pending" class="flex flex-1 justify-center items-center">
    <LoaderCircle
      class="w-12 h-12 animate-spin text-primary"
      aria-label="Loading..."
    />
  </div>
  <div
    v-else-if="error"
    class="flex flex-col flex-1 justify-center items-center"
  >
    <h3 class="mt-4 text-lg font-semibold">Something went wrong!</h3>
    <p class="mb-4 mt-2 text-sm text-muted-foreground">
      {{ error }}
    </p>
  </div>
  <div v-else class="grid gap-4 grid-cols-1 md:gap-8 sm:grid-cols-2">
    <DeviceCard
      v-for="device in data!.items"
      @click="() => onDeviceClick(device)"
      :key="device.id"
      :device="device"
      class="cursor-pointer hover:bg-slate-100 dark:hover:bg-muted/30 transition-colors duration-300 ease-in-out"
    />
  </div>
</template>

<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";

useHead({
  title: "PE Demo | Devices",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});

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
    router.push(`devices/esp/${device.id}`);
    return;
  }
  router.push(`devices/energy/${device.id}`);
}
</script>
