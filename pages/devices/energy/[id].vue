<template>
  <div v-if="pending" class="flex items-center justify-center flex-1">
    <LoaderCircle
      class="w-12 h-12 animate-spin text-primary"
      aria-label="Loading..."
    />
  </div>
  <div v-else-if="!device">Something went wrong</div>
  <div v-else class="flex flex-col gap-8">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex">
        <Cpu
          class="w-24 h-24 px-4 mr-2 border-2 border-dashed rounded-lg text-primary"
        />
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold line-clamp-2">
              {{ device.name }}
            </h2>
            <span
              class="inline-block w-2 h-2 mr-1 rounded-full sm:hidden"
              :class="{
                'bg-green-500': device.connected,
                'bg-red-500': !device.connected,
              }"
            ></span>
            <div class="sr-only sm:not-sr-only">
              <Badge :variant="device.connected ? 'default' : 'destructive'">
                {{ device.connected ? "Connected" : "Disconnected" }}
              </Badge>
            </div>
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
    </div>
    <Separator />

    <h1 class="text-2xl font-bold sm:text-3xl">01/05/2024 - 31/05/2024</h1>
    <Separator />
    <EnergyDetailsCardContainer :k-wh-usage-by-month="kWhUsageByMonth" />

    <Card>
      <CardHeader>
        <CardTitle>KWh Usaged Per Day</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <!-- <div class="h-8 -rotate-90 whitespace-nowrap">kWh per day</div> -->
          <BarChart
            :data="kWhUsageByDay"
            index="ts"
            :categories="['usage']"
            :show-legend="false"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Cpu, LoaderCircle } from "lucide-vue-next";

const route = useRoute();
const deviceId = computed(() => route.params.id as string);

const {
  data: device,
  pending,
  error,
} = useAPI<Device>(`/devices/${deviceId.value}`, {
  lazy: true,
});

const startDate = "2024-04-30T00:00:00+07:00";
const endDate = "2024-05-31T23:59:59+07:00";
const { data: metrics } = await useAPI<MetricResponse[]>(
  "/telemetry/metrics/values",
  {
    query: {
      device_id: deviceId.value,
      key: "Total kWh",
      start: startDate,
      end: endDate,
      interval_type: "DAY",
      interval: 1,
      agg_type: "MAX",
      limit: 32,
    },
    lazy: true,
  }
);
const kWhUsageByDay = computed(() => {
  return metrics
    .value!.sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime())
    .map((item, index) => {
      if (index === 0) {
        return { ts: item.ts, usage: 0 };
      }
      const usage = parseFloat(
        (item.value - metrics.value![index - 1].value).toFixed(2)
      );
      return { ts: item.ts.split("T")[0], usage };
    })
    .slice(1);
});
const kWhUsageByMonth = computed(() => {
  return (
    metrics.value![metrics.value!.length - 1].value - metrics.value![0].value
  );
});
</script>
