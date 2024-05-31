<template>
  <div class="flex flex-col min-h-screen w-full bg-background">
    <NavBar />
    <div class="container flex flex-1 flex-col gap-4 py-4">
      <slot />
    </div>
    <span class="text-center text-xs text-gray-500 py-4">
      Powered by Nuxt
    </span>
  </div>
</template>
