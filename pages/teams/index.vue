<template>
  <div class="flex flex-col gap-1 flex-1 items-center">
    <span class="font-semibold text-sm border rounded-md px-3 py-1">Team</span>
    <h1 class="text-3xl font-bold mt-2">Our team</h1>
    <div class="pt-12 grid gap-4 grid-cols-1 md:gap-16 sm:grid-cols-2">
      <ProfileCard
        v-for="(profile, i) in profiles"
        :key="i"
        :name="profile.name"
        :role="profile.role"
        :github="profile.github"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "PE Demo | Our team",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});

const profiles = [
  {
    name: "Le Tan Kien",
    role: "20139026",
    github: "lekien2k2",
  },
  {
    name: "Mai Huynh Tuan Vu",
    role: "20139098",
    github: "tuanvumaihuynh",
  },
];
</script>
