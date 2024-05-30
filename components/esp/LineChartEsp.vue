<template>
  <div class="grid xl:grid-cols-2 gap-3 grid-cols-1">
    <Card>
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          :data="dataX"
          index="name"
          :categories="['total', 'predicted']"
        />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Humidity</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          :data="dataX"
          index="name"
          :categories="['total', 'predicted']"
        />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  deviceId: string;
}>();

const dataX = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>
