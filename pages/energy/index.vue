<template>
  <div>
    hello
    <pre>
        <code>{{ data }}</code>
      </pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAPI<ItemPagination<Device>>("/devices");
</script>
