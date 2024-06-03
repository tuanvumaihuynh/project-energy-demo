<template>
  <div
    class="flex flex-1 shrink-0 items-center justify-center rounded-lg border-dashed border-2"
  >
    <div
      class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"
    >
      <Rocket class="w-10 h-10 text-muted-foreground" />

      <h3 class="mt-4 text-lg font-semibold">Feature in development</h3>
      <p class="mb-4 mt-2 text-sm text-muted-foreground">
        This feature is currently under development and not fully functional.
      </p>

      <Button size="sm" class="relative" @click="$router.push('/')">
        Back to home
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rocket } from "lucide-vue-next";

useHead({
  title: "PE Demo | Documents",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});
</script>
