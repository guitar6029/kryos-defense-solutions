<template>
  <NuxtLayout>
    <Nav />
    <main class="flex justify-center min-h-screen overflow-x-hidden">
      <div class="w-full max-w-[3000px] flex flex-col gap-2">
        <NuxtPage />
      </div>
    </main>
    <KryosFooter />
  </NuxtLayout>
</template>
