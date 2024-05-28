<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
      <Toaster />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "ProjectEnergy",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});
</script>
