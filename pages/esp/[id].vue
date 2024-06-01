<template>
  <div v-if="pending" class="flex flex-1 justify-center items-center">
    <LoaderCircle
      class="w-12 h-12 animate-spin text-primary"
      aria-label="Loading..."
    />
  </div>
  <div v-else-if="!device">Something went wrong</div>
  <div v-else class="flex flex-col gap-3">
    <div class="flex gap-3 items-center">
      <Cpu
        class="h-24 w-24 px-4 border-2 rounded-lg border-dashed text-primary"
      />
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-bold line-clamp-2">
            {{ device.name.split("|")[1] || device.name }}
          </h2>
          <Badge :variant="device.connected ? 'default' : 'destructive'">
            {{ device.connected ? "Connected" : "Disconnected" }}
          </Badge>
        </div>

        <span>
          {{ device.created_at.replace("T", " ") }}
        </span>
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
    <Separator class="my-4" />
    <LedContainer />
    <LineChartEsp />
  </div>
</template>

<script setup lang="ts">
import { Cpu, LoaderCircle } from "lucide-vue-next";

const STATUS_INTERVAL = 1000;

const route = useRoute();

const deviceId = computed(() => route.params.id as string);

const {
  data: device,
  pending,
  error,
} = useAPI<Device>(`/devices/${deviceId.value}`, {
  lazy: true,
});

async function fetchDeviceStatus() {
  try {
    const connected = await useClientAPI<boolean>(
      `/devices/${deviceId.value}/connected`,
      {
        method: "GET",
      }
    );
    device.value!.connected = connected;
  } catch (error) {}
}

const { syncPolling } = useSyncPolling();
syncPolling(fetchDeviceStatus, STATUS_INTERVAL);
</script>
