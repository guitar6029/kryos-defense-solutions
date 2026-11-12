<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

useHead({
  title: "KRYOS 2077 | Global Defense Network",
  meta: [
    {
      name: "description",
      content:
        "KRYOS is a global defense network shaping autonomous systems for a world that moves before warning arrives.",
    },
    { property: "og:title", content: "KRYOS 2077" },
    {
      property: "og:description",
      content:
        "KRYOS // Global Defense Network.",
    },
    { property: "og:type", content: "website" },
  ],
});

const typedWeKnow = ref("WE KNOW");
const typedBeforeYou = ref("BEFORE YOU");
const showDo = ref(true);
const isTyping = ref(false);
let typingTimers: ReturnType<typeof setTimeout>[] = [];

const wait = (callback: () => void, delay: number) => {
  const timer = setTimeout(callback, delay);
  typingTimers.push(timer);
};

const typeLine = (text: string, update: (value: string) => void, done: () => void) => {
  let index = 0;
  const typeNextCharacter = () => {
    index += 1;
    update(text.slice(0, index));
    if (index < text.length) {
      wait(typeNextCharacter, 74);
      return;
    }
    done();
  };
  typeNextCharacter();
};

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  isTyping.value = true;
  typedWeKnow.value = "";
  typedBeforeYou.value = "";
  showDo.value = false;

  wait(() => {
    typeLine("WE KNOW", (value) => (typedWeKnow.value = value), () => {
      wait(() => {
        typeLine("BEFORE YOU", (value) => (typedBeforeYou.value = value), () => {
          wait(() => (showDo.value = true), 500);
        });
      }, 200);
    });
  }, 550);
});

onBeforeUnmount(() => {
  typingTimers.forEach(clearTimeout);
  typingTimers = [];
});

</script>

<template>
  <div class="flex flex-col">
    <section aria-labelledby="home-platform-title" class="hero-megastructure relative isolate flex min-h-[100svh] overflow-hidden bg-kryos-2077-page text-kryos-2077-text md:min-h-screen">
      <div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,9,0.97)_0%,rgba(5,7,9,0.85)_38%,rgba(5,7,9,0.42)_67%,rgba(5,7,9,0.20)_100%)]" />
      <div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,9,0.18),rgba(5,7,9,0.76)_100%)]" />
      <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-20 md:px-10 lg:py-24">
        <p class="mb-7 max-w-[22rem] font-kryos-2077-display text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.28em] text-kryos-2077-text-supporting sm:max-w-none sm:text-xs">
          KRYOS // EST. 2049 // GLOBAL DEFENSE NETWORK
        </p>
        <div aria-hidden="true" class="hero-diagonal-stripes mb-5" />
        <h1 id="home-platform-title" class="hero-headline max-w-5xl text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.06em] text-kryos-2077-text">
          <span class="block min-h-[0.88em]">{{ typedWeKnow }}</span>
          <span class="block min-h-[0.88em]">{{ typedBeforeYou }}</span>
          <span class="block min-h-[0.88em] text-kryos-2077-accent" :class="{ 'opacity-0': isTyping && !showDo }">DO.</span>
        </h1>
        <div class="mt-10 flex max-w-xl flex-col gap-6 border-l border-kryos-2077-text-supporting pl-5 sm:mt-12 sm:pl-6">
          <p class="text-base leading-relaxed text-kryos-2077-text md:text-lg">
            For over three decades, we've defined the limits of autonomous defense. Then we eliminated them.
          </p>
          <div>
            <NuxtLink
              to="/platform"
              class="font-kryos-2077-ui inline-flex min-h-12 items-center border-b-2 border-kryos-2077-text-supporting pb-2 text-kryos-2077-text transition-colors hover:border-kryos-2077-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kryos-2077-focus"
            >
              EXPLORE OUR SYSTEMS <span aria-hidden="true" class="ml-3">↗</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <MarketingKryosAutonomousSystems />
  </div>
</template>
