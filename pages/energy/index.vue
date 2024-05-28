<template>
  <div>
    hello
    <pre>
      <code>{{ data }}</code>
        <Card v-for="device in data?.items" :key="device.id" class="col-md-4">
          <CardHeader>
            <Package class="w-8 h-8" />
            <CardTitle>{{ device.name.split("|")[1] || device.name }}</CardTitle>
            <Badge :class="device.connected == true ? 'bg-green-400' : 'bg-red-500'" variant="outline">{{ device.connected == true ? 'Connected':'Disconnected' }}</Badge>
            <CardDescription>{{ device.description }}</CardDescription>
          </CardHeader>
          <Badge v-for="tags in device.tags" variant="outline" class="mr-1">{{ tags }}</Badge>
          <CardContent>
          </CardContent>
          </Card>
      </pre>
  </div>
</template>

<script setup lang="ts">
import { Package  } from 'lucide-vue-next';
const { data } = await useAPI<ItemPagination<Device>>("/devices");
</script>
