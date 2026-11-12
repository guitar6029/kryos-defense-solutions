<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import multirotorHero from "~/assets/img/products/kryos-multirotor/kryos-multirotor-hero-master.png";
import bottomGeometry from "../../docs/research/geometry-explorations/kryos-bottom-edge-exploration.svg?url";

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

const workflow = [
  {
    number: "01",
    label: "Input",
    title: "Sample records",
    text: "Browse paginated fleet and device records from the development data path.",
  },
  {
    number: "02",
    label: "Query",
    title: "Search and filters",
    text: "Narrow records using available text, status, platform, zone, role, and link-state filters.",
  },
  {
    number: "03",
    label: "Summary",
    title: "Status summaries",
    text: "Review sample status fields and derived summaries such as status counts and average power.",
  },
];
</script>

<template>
  <div class="flex flex-col">
    <section aria-labelledby="home-platform-title" class="hero-megastructure relative isolate flex min-h-[100svh] overflow-hidden bg-kryos-2077-page text-kryos-2077-text md:min-h-screen">
      <div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,9,0.97)_0%,rgba(5,7,9,0.85)_38%,rgba(5,7,9,0.42)_67%,rgba(5,7,9,0.20)_100%)]" />
      <div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,9,0.18),rgba(5,7,9,0.76)_100%)]" />
      <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-20 md:px-10 lg:py-24">
        <p class="mb-7 max-w-[22rem] font-kryos-2077-display text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.28em] text-kryos-2077-accent sm:max-w-none sm:text-xs">
          KRYOS // EST. 2049 // GLOBAL DEFENSE NETWORK
        </p>
        <div aria-hidden="true" class="hero-diagonal-stripes mb-5" />
        <h1 id="home-platform-title" class="hero-headline max-w-5xl text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.06em] text-kryos-2077-text">
          <span class="block min-h-[0.88em]">{{ typedWeKnow }}</span>
          <span class="block min-h-[0.88em]">{{ typedBeforeYou }}</span>
          <span class="block min-h-[0.88em] text-kryos-2077-accent" :class="{ 'opacity-0': isTyping && !showDo }">DO.</span>
        </h1>
        <div class="mt-10 flex max-w-xl flex-col gap-6 border-l border-kryos-2077-accent pl-5 sm:mt-12 sm:pl-6">
          <p class="text-base leading-relaxed text-kryos-2077-text md:text-lg">
            For over three decades, we've defined the limits of autonomous defense. Then we eliminated them.
          </p>
          <div>
            <NuxtLink
              to="/platform"
              class="font-kryos-2077-ui inline-flex min-h-12 items-center border-b-2 border-kryos-2077-accent pb-2 text-kryos-2077-text transition-colors hover:border-kryos-2077-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kryos-2077-focus"
            >
              EXPLORE OUR SYSTEMS <span aria-hidden="true" class="ml-3">↗</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <MarketingKryosAutonomousSystems />

    <section v-if="false" aria-labelledby="workflow-title" class="bg-[#0B0E10] text-[#F3F0E8]">
      <div class="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-4">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#C39A52]">
            Field note / 01
          </p>
          <h2 id="workflow-title" class="font-kryos-2077-heading mt-6 max-w-sm text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
            From sample records to a concise summary.
          </h2>
          <p class="mt-6 max-w-sm leading-relaxed text-[#AEB7BA]">
            The verified prototype workflow is intentionally modest: find a record,
            narrow the result, and review the available sample fields.
          </p>
        </div>

        <ol
          aria-label="Illustrative sample-data workflow"
          class="relative lg:col-span-7 lg:col-start-6 before:absolute before:bottom-6 before:left-[1.65rem] before:top-4 before:w-px before:bg-[#343E44] sm:before:bottom-8"
        >
          <li
            v-for="(step, index) in workflow"
            :key="step.number"
            class="grid gap-3 border-t border-[#343E44] sm:grid-cols-[5rem_1fr] sm:gap-6"
            :class="index === 1 ? 'py-10' : 'py-6 sm:py-8'"
          >
            <span class="relative z-10 w-fit bg-[#0B0E10] pr-4 font-mono text-sm text-[#C39A52]">{{ step.number }}</span>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#7B878D]">
                {{ step.label }}
              </p>
              <h3 class="font-kryos-2077-heading mt-2 text-2xl text-[#F3F0E8]">
                {{ step.title }}
              </h3>
              <p class="mt-3 max-w-xl leading-relaxed text-[#AEB7BA]">
                {{ step.text }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section v-if="false" aria-labelledby="home-multirotor-title" class="border-y border-[#343E44] bg-[#1B2125] text-[#F3F0E8]">
      <div class="mx-auto grid w-full max-w-[1440px] gap-0 lg:grid-cols-12">
        <figure
          class="relative bg-[#0B0E10] lg:col-span-8"
          style="clip-path: polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)"
        >
          <img
            :src="multirotorHero"
            alt="Illustrative concept rendering of the Kryos Multirotor, a compact aircraft shown from the front three-quarter view."
            class="block h-auto w-full object-contain"
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="border-t border-[#343E44] px-6 py-4 text-sm text-[#AEB7BA] md:px-10">
            Fig. 02 — Approved concept render · not a fielded or available aircraft
          </figcaption>
        </figure>

        <div class="flex flex-col justify-center px-6 py-14 md:px-10 md:py-20 lg:col-span-4 lg:px-12">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#C39A52]">
            Flagship hardware concept
          </p>
          <h2 id="home-multirotor-title" class="font-kryos-2077-heading mt-6 text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
            Kryos Multirotor
          </h2>
          <p class="mt-6 leading-relaxed text-[#AEB7BA]">
            A compact aircraft concept for remote observation and situational
            context in defense planning. Its design remains conceptual.
          </p>
          <p class="mt-6 border-l border-[#C39A52] pl-4 text-sm leading-relaxed text-[#F3F0E8]">
            Any Platform integration is planned and not implemented. No aircraft
            connection, telemetry feed, or control path is represented here.
          </p>
          <NuxtLink
            to="/products/kryos-multirotor"
            class="mt-10 inline-flex min-h-12 items-center self-start border-b-2 border-[#C39A52] pb-2 font-semibold hover:border-[#F3F0E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C39A52]"
          >
            View the concept <span aria-hidden="true" class="ml-3">↗</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="false" aria-labelledby="product-status-title" class="relative isolate overflow-hidden bg-[#1B2125] text-[#F3F0E8]">
      <div class="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-4">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#7B878D]">
              Portfolio status
            </p>
            <h2 id="product-status-title" class="font-kryos-2077-heading mt-5 max-w-sm text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
              One implemented product.
              <span class="block text-[#C39A52]">One flagship concept.</span>
            </h2>
            <p class="mt-8 max-w-xs text-sm leading-relaxed text-[#AEB7BA]">
              A deliberately small portfolio: one verified software prototype and
              one conceptual hardware direction.
            </p>
          </div>

          <div class="lg:col-span-7 lg:col-start-6">
            <div class="border-t border-[#7B878D]/60">
              <NuxtLink
                to="/platform"
                class="group grid gap-3 border-b border-[#7B878D]/60 py-7 hover:bg-[#343E44] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#C39A52] sm:grid-cols-[12rem_1fr] sm:gap-8"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#7B878D]">
                  Primary product
                </p>
                <div>
                  <h3 class="font-kryos-2077-heading text-2xl">Kryos Platform <span aria-hidden="true" class="text-[#C39A52] transition-transform group-hover:translate-x-1">↗</span></h3>
                  <p class="mt-3 leading-relaxed text-[#AEB7BA]">Software prototype · sample data</p>
                </div>
              </NuxtLink>
              <NuxtLink
                to="/products/kryos-multirotor"
                class="group grid gap-3 border-b border-[#7B878D]/60 py-9 hover:bg-[#343E44] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#C39A52] sm:grid-cols-[12rem_1fr] sm:gap-8"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#7B878D]">
                  Flagship hardware concept
                </p>
                <div>
                  <h3 class="font-kryos-2077-heading text-2xl">Kryos Multirotor <span aria-hidden="true" class="text-[#C39A52] transition-transform group-hover:translate-x-1">↗</span></h3>
                  <p class="mt-3 leading-relaxed text-[#AEB7BA]">Conceptual design · integration not implemented</p>
                </div>
              </NuxtLink>
            </div>
            <p class="mt-8 max-w-2xl text-sm leading-relaxed text-[#AEB7BA]">
              MK-I remains a future ground-vehicle concept under review. EX-1 is deferred.
              Kryos is a fictional portfolio project; the software uses sample data and the
              hardware shown is conceptual.
            </p>
            <NuxtLink
              to="/about"
              class="mt-6 inline-flex border-b border-[#C39A52] pb-1 text-sm font-semibold hover:border-[#F3F0E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C39A52]"
            >
              About the Kryos concept <span aria-hidden="true" class="ml-3">↗</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div aria-hidden="true" class="pointer-events-none relative z-0 h-[110px] w-full overflow-hidden bg-[#0B0E10] md:h-[180px]">
        <img
          :src="bottomGeometry"
          alt=""
          class="block h-full w-full object-cover object-bottom"
        />
      </div>
    </section>
  </div>
</template>
