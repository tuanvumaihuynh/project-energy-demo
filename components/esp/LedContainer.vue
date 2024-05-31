<template>
  <div class="flex gap-3">
    <Card v-for="led in leds" :key="led.key">
      <CardHeader>
        <CardTitle>{{ led.name }}</CardTitle>
      </CardHeader>
      <CardContent>
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="led.status"
            @change="onLedChange(led)"
            class="sr-only peer"
          />
          <div
            class="relative w-24 h-12 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-11 after:w-11 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";

const LED_INTERVAL = 1000;

const route = useRoute();
const deviceId = computed(() => route.params.id as string);
const { toast } = useToast();

const {
  data: initVal,
  pending,
  error,
} = await useAPI<AttributeResponse[]>("/telemetry/attributes/values", {
  query: { device_id: deviceId.value, keys: "led1,led2,led3" },
  lazy: true,
});

const leds = ref<Led[]>([
  {
    key: "led1",
    name: "Led 1",
    status: initVal.value?.find((v) => v.key === "led1")?.value ?? false,
  },
  {
    key: "led2",
    name: "Led 2",
    status: initVal.value?.find((v) => v.key === "led2")?.value ?? false,
  },
  {
    key: "led3",
    name: "Led 3",
    status: initVal.value?.find((v) => v.key === "led3")?.value ?? false,
  },
]);

async function onLedChange(led: Led) {
  try {
    const res = await useClientAPI("/telemetry/attributes", {
      method: "POST",
      query: { device_id: deviceId.value },
      body: {
        [led.key]: led.status,
      },
    });
    toast({
      title: "Success",
      description: "Led status updated successfully",
    });
  } catch (error) {
    led.status = !led.status;
    toast({
      title: "Error",
      description: "Failed to update led status",
    });
  }
}

async function fetchLedStatus() {
  try {
    const data = await useClientAPI<AttributeResponse[]>(
      "/telemetry/attributes/values",
      {
        query: { device_id: deviceId.value, keys: "led1,led2,led3" },
      }
    );

    leds.value.forEach((led) => {
      led.status = data?.find((v) => v.key === led.key)?.value ?? false;
    });
  } catch (error) {}
}

const { syncPolling } = useSyncPolling();

syncPolling(fetchLedStatus, LED_INTERVAL);
</script>
