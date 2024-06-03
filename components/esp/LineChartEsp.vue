<template>
  <div class="grid xl:grid-cols-2 gap-3 grid-cols-1">
    <Card>
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <div
            v-if="pending"
            class="h-96 flex flex-1 justify-center items-center"
          >
            <LoaderCircle
              class="w-12 h-12 animate-spin text-primary"
              aria-label="Loading..."
            />
          </div>
          <LineChart
            class="h-96"
            v-else
            :data="formatTemperature ?? []"
            index="ts"
            :categories="['temp']"
            :colors="['red']"
            :show-legend="false"
            :y-formatter="
              (tick, i) => {
                return typeof tick === 'number' ? `${tick.toFixed(2)}°C` : '';
              }
            "
          />
        </ClientOnly>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Humidity</CardTitle>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <div
            v-if="pending"
            class="h-96 flex flex-1 justify-center items-center"
          >
            <LoaderCircle
              class="w-12 h-12 animate-spin text-primary"
              aria-label="Loading..."
            />
          </div>
          <LineChart
            class="h-96"
            v-else
            :data="formatHumidity ?? []"
            index="ts"
            :categories="['humid']"
            :color="['blue']"
            :show-legend="false"
            :y-formatter="
              (tick, i) => {
                return typeof tick === 'number' ? `${tick.toFixed(2)}%` : '';
              }
            "
          />
        </ClientOnly>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import { fromDate, getLocalTimeZone } from "@internationalized/date";

const CHART_DATA_INTERVAL = 1000 * 30;

const route = useRoute();
const deviceId = computed(() => route.params.id as string);

const currentDate = new Date();
const startDate = fromDate(
  new Date(currentDate.getTime() - 1000 * 60 * 60),
  getLocalTimeZone()
)
  .toString()
  .replace("[Asia/Saigon]", "");
const endDate = fromDate(currentDate, getLocalTimeZone())
  .toString()
  .replace("[Asia/Saigon]", "");
const {
  data: metrics,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "chart-data",
  async () => {
    const [temperature, humidity] = await Promise.all([
      useClientAPI<MetricResponse[]>("/telemetry/metrics/values", {
        query: {
          device_id: deviceId.value,
          key: "temperature",
          start: startDate,
          end: endDate,
          // interval_type: "MINUTE",
          // interval: 1,
          // agg_type: "AVG",
          limit: 30,
        },
      }),
      useClientAPI<MetricResponse[]>("/telemetry/metrics/values", {
        query: {
          device_id: deviceId.value,
          key: "humidity",
          start: startDate,
          end: endDate,
          // interval_type: "MINUTE",
          // interval: 1,
          // agg_type: "AVG",
          limit: 30,
        },
      }),
    ]);
    return { temperature, humidity };
  },
  {
    lazy: true,
  }
);
const formatTemperature = computed(() => {
  return metrics.value?.temperature.map((v) => ({
    ts: v.ts.replace("T", " "),
    temp: v.value ?? 0,
  }));
});
const formatHumidity = computed(() => {
  return metrics.value?.humidity.map((v) => ({
    ts: v.ts.replace("T", " "),
    humid: v.value ?? 0,
  }));
});

const { syncPolling } = useSyncPolling();
syncPolling(refresh, CHART_DATA_INTERVAL);
</script>
