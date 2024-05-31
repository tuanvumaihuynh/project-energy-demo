<template>
  <LineChart
    :data="props.data"
    index="ts"
    :categories="['value']"
    :x-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? new Date(tick).toLocaleDateString()
          : '';
      }
    "
    :y-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? `${new Intl.NumberFormat('us').format(tick).toString()} A`
          : '';
      }
    "
  />
</template>

<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";

interface CurrentData {
  ts: string;
  value: number;
}
const props = defineProps<{
  data: CurrentData[];
}>();
</script>
