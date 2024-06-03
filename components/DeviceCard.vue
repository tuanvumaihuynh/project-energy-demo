<template>
  <Card>
    <CardHeader>
      <div class="flex gap-3 items-center">
        <Component
          :is="useDeviceIcon(device)"
          class="h-24 w-24 px-4 border-2 rounded-lg border-dashed text-primary"
        />
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold line-clamp-2">
              {{ device.name }}
            </h2>
            <Badge :variant="device.connected ? 'default' : 'destructive'">
              {{ device.connected ? "Connected" : "Disconnected" }}
            </Badge>
          </div>

          <span> Created at: {{ device.created_at.replace("T", " ") }} </span>
          <div class="flex gap-2">
            <Badge
              v-for="(tag, i) in device.tags"
              variant="outline"
              class="line-clamp-1"
            >
              {{ tag }}
            </Badge>
          </div>
        </div>
      </div>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import { Router, Package, Cpu } from "lucide-vue-next";
import type { Component } from "vue";

defineProps<{
  device: Device;
}>();

function useDeviceIcon(device: Device): Component {
  if (device.tags.includes("ESP")) return Cpu;
  if (device.is_gateway) return Router;
  return Package;
}
</script>
