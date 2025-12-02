<template>
  <section
    class="flex flex-col items-center gap-2 bg-(--kryos-bg-alt) p-4 relative min-h-screen"
  >
    <Absolute
      extra-class="z-0 top-1/2 left-1/2 -translate-x-1/2 w-200 rotate-90"
    >
      <KryosPanel :option="13" />
    </Absolute>

    <h2 class="section-title">Capabilities & Operating Modes</h2>
    <div class="flex flex-col gap-4">
      <h3 class="text-6xl">Platform Capabilities</h3>
      <ul class="flex flex-col gap-6">
        <li>
          <span class="font-bold text-5xl">Autonomous Patrol</span>
          <p class="max-w-4xl text-4xl">
            - Configurable patrol routes with adaptive pathfinding around new
            obstacles and environmental changes.
          </p>
        </li>
        <li>
          <span class="font-bold text-5xl"
            >Threat Detection & Classification</span
          >
          <p class="max-w-4xl text-4xl">
            - Real-time analysis of motion, thermal signatures, and anomalous
            patterns within defined perimeters.
          </p>
        </li>
        <li>
          <span class="font-bold text-5xl">Zone Enforcement</span>
          <p class="max-w-4xl text-4xl">
            - Configurable soft and hard boundaries, with escalating response
            ladders based on client policy.
          </p>
        </li>
        <li>
          <span class="font-bold text-5xl">Data Capture & Forensics</span>
          <p class="max-w-4xl text-4xl">
            - Continuous logging of visual, positional, and environmental data
            for post-incident review.
          </p>
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="text-6xl">Operating Modes</h3>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Recon Modes</h3>
        <p class="max-w-4xl text-4xl">
          Low-profile traversal with reduced visible signature and emphasis on
          mapping, observation, and silent tracking.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Interdiction Mode</h3>
        <p class="max-w-4xl text-4xl">
          Aggressive posture with priority on deterrence, boundary enforcement,
          and response escalation under operator-defined rules of engagement.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Guard Mode</h3>
        <p class="max-w-4xl text-4xl">
          Fixed or bounded operation around a constrained perimeter, ideal for
          static high-value assets and chokepoints.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Transit Mode</h3>
        <p class="max-w-4xl text-4xl">
          Optimized for movement between sectors, with reduced sensor footprint
          and energy-efficient path planning.
        </p>
      </div>
    </div>
  </section>
</template>
