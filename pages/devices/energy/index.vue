<template>
  <div>
    hello
    <pre>
      <code>{{ data }}</code>
        
      </pre>

    <Card v-if="pending">
      <CardHeader>
        <Package class="w-8 h-8" />
        <CardTitle>Loading...</CardTitle>
      </CardHeader>
    </Card>
    <div class="grid grid-cols-4 gap-2">
      <Card v-for="device in data?.items" :key="device.id">
        <div class="flex">
          <Package class="flex h-24 w-24 text-primary" />
          <CardTitle class="flex">{{
            device.name.split("|")[1] || device.name
          }}</CardTitle>
          <Badge v-for="tags in device.tags" variant="outline" class="mr-1">{{
            tags
          }}</Badge>
        </div>
        <Badge
          :class="device.connected == true ? 'bg-green-400' : 'bg-red-500'"
          variant="outline"
          class="w-auto"
          >{{ device.connected == true ? "Connected" : "Disconnected" }}</Badge
        >
        <CardDescription>{{ device.description }}</CardDescription>
        <CardContent> </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, LoaderCircle } from "lucide-vue-next";
import LineChartDevice from "~/components/energy/LineChartDevice.vue";

const { data, pending } = await useAPI<ItemPagination<Device>>("/devices", {
  lazy: true,
});
</script>
