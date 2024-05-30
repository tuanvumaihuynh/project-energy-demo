<template>
  <div>
    <div v-if="pending" class="flex flex-1 justify-center items-center">
      <LoaderCircle
        class="w-12 h-12 animate-spin text-primary"
        aria-label="Loading..."
      />
    </div>
    <div v-else-if="!device">Something went wrong</div>
    <div v-else clas="flex flex-col gap-3">
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

      <Card>
        <CardHeader>
          <CardTitle>Device Status</CardTitle>
        </CardHeader>
        <CardContent>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="ledStatus" class="sr-only peer" />
            <div
              class="relative w-24 h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-11 after:w-11 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
          </label>
        </CardContent>
      </Card>

      <LineChartEsp :device-id="deviceId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, LoaderCircle } from "lucide-vue-next";

const route = useRoute();

const deviceId = computed(() => route.params.id as string);
const date = new Date().toISOString();
const ledStatus = ref(false);

const {
  data: device,
  pending,
  error,
} = useAPI<Device>(`/devices/${deviceId.value}`, {
  lazy: true,
});
</script>
