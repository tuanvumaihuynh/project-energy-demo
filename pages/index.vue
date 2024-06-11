<template>
  <div class="flex flex-col gap-3 max-w-[800px] mx-auto p-5">
    <div class="flex flex-col gap-3">
      <h2 class="text-2xl font-bold"></h2>
    </div>
    <Card>
      <CardHeader class="flex flex-col items-center">
        <h3 class="text-lg font-bold">MQTT Broker Info</h3>
      </CardHeader>
      <CardContent class="flex flex-col items-center">
        <div class="flex flex-col gap-3">
          <div class="grid grid-cols-2 gap-3">
            <span class="font-bold text-right">Broker status:</span>
            <div class="flex items-center gap-1">
              <div class="h-3 w-3 rounded-full bg-green-600 blinking" />
              <span>Available</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <span class="font-bold text-right">Broker:</span>
            <span
              class="cursor-pointer"
              @click="
                () => {
                  copy('broker.projectenergy.cloud');
                  toast({ title: 'Copied to clipboard' });
                }
              "
              >broker.projectenergy.cloud</span
            >
          </div>
          <div class="grid grid-cols-2 gap-3">
            <span class="font-bold text-right">TCP Port:</span>
            <span>1883</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <span class="font-bold text-right">WebSocket Port:</span>
            <span>8083</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
await navigateTo("/devices");
import { useToast } from "@/components/ui/toast/use-toast";

import { useClipboard } from "@vueuse/core";

const { copy } = useClipboard();
const { toast } = useToast();
</script>

<style scoped>
@keyframes pulse-expand {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
}

.blinking {
  animation: pulse-expand 1.5s infinite;
}
</style>
