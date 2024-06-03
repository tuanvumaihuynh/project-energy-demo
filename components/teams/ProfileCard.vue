<template>
  <div class="flex flex-col gap-1 items-center">
    <NuxtImg
      :src="data!.avatar_url"
      alt="Profile Picture"
      :loading="'lazy'"
      height="240"
      width="240"
      class="rounded-sm"
    />
    <h2 class="text-lg font-semibold">{{ name }}</h2>
    <p class="text-sm text-muted-foreground">{{ role }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  role: string;
  github: string;
}

const props = defineProps<Props>();

const { data, pending } = await useFetch<{ avatar_url: string }>(
  `https://api.github.com/users/${props.github}`
);
</script>
