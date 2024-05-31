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
  title: "Project Energy Demo",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});
</script>
