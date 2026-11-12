<script setup lang="ts">
type FramePosition = "left" | "center" | "right";

interface FrameVariant {
  top?: FramePosition;
  bottom?: FramePosition;
  side?: "left" | "right";
}

interface LeadershipExecutive {
  name: string;
  title: string;
  biography: string;
  portrait: string;
  portraitAlt: string;
  frame: FrameVariant;
}

const leadership: LeadershipExecutive[] = [
  {
    name: "Lucien de Vaucelles",
    title: "Chief Executive Officer",
    biography:
      "Guides Kryos's long-term corporate strategy, international partnerships, and global expansion. His leadership combines decades of institutional experience with an uncompromising vision for autonomous defense technology.",
    portrait: "/assets/images/organization/lucien-de-vaucelles-ceo.png",
    portraitAlt: "Pixel-art portrait of Lucien de Vaucelles, Chief Executive Officer.",
    frame: { top: "right", side: "left" },
  },
  {
    name: "Isabelle Van Aelst",
    title: "Chief Financial Officer",
    biography:
      "Oversees corporate finance, investment strategy, and capital allocation across Kryos's international operations. Her disciplined approach supports the corporation's acquisitions and long-term technological investments.",
    portrait: "/assets/images/organization/isabelle-van-aelst-cfo.png",
    portraitAlt: "Pixel-art portrait of Isabelle Van Aelst, Chief Financial Officer.",
    frame: { top: "center", side: "right" },
  },
  {
    name: "Dr. Elena Kade",
    title: "Chief Technology Officer",
    biography:
      "Directs technological strategy across autonomous systems, software architecture, and fleet intelligence. Her engineering leadership connects advanced research with operational capability.",
    portrait: "/assets/images/organization/dr-elena-kade-cto.png",
    portraitAlt: "Pixel-art portrait of Dr. Elena Kade, Chief Technology Officer.",
    frame: { top: "left", bottom: "right" },
  },
  {
    name: "Daniel Mercer",
    title: "Chief Operating Officer",
    biography:
      "Oversees global manufacturing, logistics, infrastructure, and operational execution. He is responsible for translating Kryos's strategic objectives into reliable industrial capability.",
    portrait: "/assets/images/organization/daniel-mercer-coo.png",
    portraitAlt: "Pixel-art portrait of Daniel Mercer, Chief Operating Officer.",
    frame: { top: "right", bottom: "left" },
  },
  {
    name: "General Marcus Rourke (Ret.)",
    title: "Senior Strategic Defense Advisor",
    biography:
      "Provides strategic guidance informed by decades of military leadership and operational experience. His expertise supports the development and deployment of next-generation defense systems.",
    portrait: "/assets/images/organization/marcus-rourke-defense-advisor.png",
    portraitAlt: "Pixel-art portrait of General Marcus Rourke, Senior Strategic Defense Advisor.",
    frame: { bottom: "center", side: "left" },
  },
  {
    name: "Dr. Viktor Soren",
    title: "Director of Advanced Research",
    biography:
      "Leads experimental robotics, emerging autonomous technologies, and advanced engineering initiatives. His research division explores the boundaries of current technological capability.",
    portrait: "/assets/images/organization/viktor-soren-rnd-director.png",
    portraitAlt: "Pixel-art portrait of Dr. Viktor Soren, Director of Advanced Research.",
    frame: { top: "center", bottom: "right" },
  },
  {
    name: "Director Nyx",
    title: "Director of Special Programs",
    biography:
      "Oversees selected advanced programs and strategic initiatives requiring specialized coordination. Additional professional information is not publicly disclosed.",
    portrait: "/assets/images/organization/director-nyx-special-programs.png",
    portraitAlt: "Pixel-art portrait of Director Nyx, Director of Special Programs.",
    frame: { top: "left", side: "right" },
  },
  {
    name: "Commander Elias Ward",
    title: "Chief Security Officer",
    biography:
      "Directs corporate security, intelligence protection, and facility security operations. He oversees the protection of Kryos personnel, infrastructure, and sensitive programs.",
    portrait: "/assets/images/organization/elias-ward-chief-security-officer.png",
    portraitAlt: "Pixel-art portrait of Commander Elias Ward, Chief Security Officer.",
    frame: { top: "right", bottom: "center" },
  },
  {
    name: "Anika Rao",
    title: "Chief Legal & Compliance Officer",
    biography:
      "Leads corporate governance, regulatory compliance, and international legal affairs. She advises Kryos on the complex legal frameworks governing emerging technologies and defense partnerships.",
    portrait: "/assets/images/organization/anika-rao-chief-legal-compliance-officer.png",
    portraitAlt: "Pixel-art portrait of Anika Rao, Chief Legal and Compliance Officer.",
    frame: { top: "center", bottom: "left" },
  },
  {
    name: "Rafael Montenegro",
    title: "Chief Strategy Officer",
    biography:
      "Oversees strategic development, international expansion, acquisitions, and institutional partnerships. His work supports Kryos's long-term competitive position.",
    portrait: "/assets/images/organization/rafael-montenegro-chief-strategy-officer.png",
    portraitAlt: "Pixel-art portrait of Rafael Montenegro, Chief Strategy Officer.",
    frame: { top: "left", bottom: "right" },
  },
];

useHead({
  title: "Kryos Defense Solutions | Corporate Overview",
  meta: [
    {
      name: "description",
      content:
        "Kryos Defense Solutions engineers autonomous systems, strategic intelligence, and defense technology.",
    },
    { property: "og:title", content: "Kryos Defense Solutions" },
    {
      property: "og:description",
      content:
        "Engineering the next generation of autonomous systems, strategic intelligence, and defense technology.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <section aria-labelledby="about-title"
    class="relative isolate flex min-h-[82svh] overflow-hidden bg-kryos-2077-page bg-[url('/assets/images/headquarters.png')] bg-position-[68%_center] bg-cover bg-no-repeat text-kryos-2077-text md:min-h-[88svh] md:bg-position-[72%_center]">
    <div aria-hidden="true"
      class="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,9,0.88)_0%,rgba(5,7,9,0.72)_38%,rgba(5,7,9,0.32)_68%,rgba(5,7,9,0.12)_100%)]" />
    <div aria-hidden="true"
      class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,9,0.06)_0%,rgba(5,7,9,0.42)_100%)]" />

    <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-20 md:px-10 lg:py-24">
      <p
        class="mb-7 max-w-88 font-kryos-2077-display text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.28em] text-kryos-2077-accent sm:max-w-none sm:text-xs">
        KRYOS DEFENSE SOLUTIONS / CORPORATE OVERVIEW
      </p>
      <div aria-hidden="true" class="hero-diagonal-stripes mb-5" />
      <h1 id="about-title"
        class="hero-headline max-w-5xl text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.06em] text-kryos-2077-text">
        The Future Does Not Wait.
      </h1>
      <p
        class="mt-10 max-w-xl border-l border-kryos-2077-accent pl-5 text-base leading-relaxed text-kryos-2077-text sm:mt-12 sm:pl-6 md:text-lg">
        Engineering the next generation of autonomous systems, strategic intelligence, and defense technology.
      </p>
    </div>
  </section>

  <section aria-labelledby="strategic-operations-title"
    class="bg-kryos-2077-page px-6 py-24 text-kryos-2077-text md:px-10 md:py-32 lg:py-40">
    <div
      class="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24">
      <div>
        <p
          class="mb-7 max-w-88 font-kryos-2077-display text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.28em] text-kryos-2077-accent sm:max-w-none sm:text-xs">
          INSIDE KRYOS / STRATEGIC OPERATIONS
        </p>
        <div aria-hidden="true" class="hero-diagonal-stripes mb-5" />
        <h2 id="strategic-operations-title"
          class="hero-headline max-w-xl text-[clamp(2.75rem,5.5vw,6.25rem)] font-bold leading-[0.86] tracking-[-0.06em] text-kryos-2077-text">
          Power Is Directed, Not Displayed.
        </h2>
        <p
          class="mt-8 max-w-lg border-l border-kryos-2077-accent pl-5 text-base leading-relaxed text-kryos-2077-muted sm:pl-6 md:text-lg">
          Kryos operates at the convergence of autonomous systems, intelligence infrastructure, and strategic command.
          Behind every platform is a network of engineers, analysts, and decision-makers working to shape the next
          generation of operational capability.
        </p>
      </div>

      <figure
        class="relative isolate overflow-visible border border-kryos-2077-border bg-kryos-2077-surface before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:translate-x-3 before:translate-y-3 before:border before:border-kryos-2077-border before:bg-[linear-gradient(135deg,var(--kryos-2077-elevated-surface),var(--kryos-2077-surface-background))]">
        <img src="/assets/images/meeting-room.png"
          alt="Shadowed Kryos analysts and executives gathered around a tactical table beneath a red holographic world map."
          width="1774" height="887" loading="lazy" decoding="async" class="block h-auto w-full">
      </figure>
    </div>
  </section>

  <section aria-labelledby="leadership-title"
    class="bg-kryos-2077-page px-6 py-24 text-kryos-2077-text md:px-10 md:py-32 lg:py-40">
    <div class="mx-auto w-full max-w-7xl">
      <header class="max-w-3xl">
        <p
          class="mb-7 max-w-88 font-kryos-2077-display text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.28em] text-kryos-2077-accent sm:max-w-none sm:text-xs">
          KRYOS / CORPORATE LEADERSHIP
        </p>
        <div aria-hidden="true" class="hero-diagonal-stripes mb-5" />
        <h2 id="leadership-title"
          class="hero-headline max-w-3xl text-[clamp(2.75rem,5.5vw,6.25rem)] font-bold leading-[0.86] tracking-[-0.06em] text-kryos-2077-text">
          The People Behind the Vision.
        </h2>
        <p
          class="mt-8 max-w-2xl border-l border-kryos-2077-accent pl-5 text-base leading-relaxed text-kryos-2077-muted sm:pl-6 md:text-lg">
          Leadership across strategy, engineering, operations, and advanced defense programs.
        </p>
      </header>

      <div class="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <MarketingLeadershipCard v-for="executive in leadership" :key="executive.name" v-bind="executive" />
      </div>
    </div>
  </section>
</template>
