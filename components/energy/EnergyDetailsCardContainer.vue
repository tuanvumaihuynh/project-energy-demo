<template>
  <div class="grid grid-cols-1 gap-3 xl:grid-cols-3 md:gap-8">
    <div class="flex flex-col gap-3 md:gap-8">
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between pb-2 space-y-0"
        >
          <CardTitle class="text-sm font-medium">Total kWh Usage</CardTitle>
          <Leaf class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ kWhUsageByMonth.toFixed(2) }} kWh
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between pb-2 space-y-0"
        >
          <CardTitle class="text-sm font-medium">Total Cost</CardTitle>
          <Wallet class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{
              (kWhUsageByMonth * PRICE).toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })
            }}
          </div>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Current</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          class="h-36"
          :data="formatCurrent ?? []"
          index="ts"
          :categories="['current']"
          :colors="['red']"
          :show-legend="false"
          :show-y-axis="false"
          :show-x-axis="false"
        />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Voltage</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          class="h-36"
          :data="formatVoltage ?? []"
          index="ts"
          :categories="['voltage']"
          :show-legend="false"
          :show-y-axis="false"
          :show-x-axis="false"
        />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Wallet, Leaf } from "lucide-vue-next";

const PRICE = 3900;

const route = useRoute();
const deviceId = computed(() => route.params.id as string);

const startDate = "2024-04-30T00:00:00+07:00";
const endDate = "2024-05-31T23:59:59+07:00";
const {
  data: metrics,
  pending,
  error,
} = await useAsyncData(
  "chart-data",
  async () => {
    const [voltage, current] = await Promise.all([
      useClientAPI<MetricResponse[]>("/telemetry/metrics/values", {
        query: {
          device_id: deviceId.value,
          key: "Voltage",
          start: startDate,
          end: endDate,
          interval_type: "DAY",
          interval: 1,
          agg_type: "AVG",
          limit: 30,
        },
      }),
      useClientAPI<MetricResponse[]>("/telemetry/metrics/values", {
        query: {
          device_id: deviceId.value,
          key: "Current",
          start: startDate,
          end: endDate,
          interval_type: "DAY",
          interval: 1,
          agg_type: "AVG",
          limit: 30,
        },
      }),
    ]);
    return { voltage, current };
  },
  {
    lazy: true,
  }
);
const formatVoltage = computed(() => {
  return metrics.value?.voltage
    .sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime())
    .map((v) => ({
      ts: v.ts.replace("T", " "),
      voltage: v.value ?? 0,
    }));
});
const formatCurrent = computed(() => {
  return metrics.value?.current
    .sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime())
    .map((v) => ({
      ts: v.ts.replace("T", " "),
      current: v.value ?? 0,
    }));
});
defineProps<{
  kWhUsageByMonth: number;
}>();
</script>
