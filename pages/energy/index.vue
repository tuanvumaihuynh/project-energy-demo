<template>
  <div>
    <pre>
        <code>{{ data }}</code>
      </pre>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { data, pending, error } = await useFetch(
  config.public.apiBase + "/devices",
  {
    headers: {
      "X-Api-Key": config.public.apiKey,
    },
  }
);
</script>
