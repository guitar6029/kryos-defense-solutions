<template>
  <div>
    <Nav />
    <main class="flex justify-center min-h-screen overflow-x-hidden">
      <div class="w-full max-w-8xl flex flex-col gap-2 cursor-default">
        <slot />
      </div>
    </main>
    <KryosFooter />
  </div>
</template>
