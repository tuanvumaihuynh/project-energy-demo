<template>
  <div class="flex flex-col flex-1 gap-3">
    <LoaderCircle
      v-if="pending"
      class="w-12 h-12 animate-spin text-primary"
      aria-label="Loading..."
    />
    <div v-else class="grid grid-cols-3">
      <DeviceCard
        v-for="device in data!.items"
        :key="device.id"
        :device="device"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";

const { data, pending, error } = await useAPI<ItemPagination<Device>>(
  "/devices",
  {
    params: {
      tags: ["ESP"],
    },
    lazy: true,
  }
);
</script>
