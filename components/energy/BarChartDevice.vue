<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";
interface kWhData {
  ts: string;
  value: number;
}
const props = defineProps<{
  data: kWhData[];
}>();
</script>

<template>
  <BarChart
    :data="props.data"
    index="ts"
    :categories="['value']"
    :x-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? new Date(tick).toLocaleDateString()
          : new Date(tick).toLocaleDateString();
      }
    "
    :y-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? `${new Intl.NumberFormat('us').format(tick).toString()} kWh`
          : '';
      }
    "
  />
</template>
