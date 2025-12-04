<script lang="ts" setup>
import Absolute from "~/components/Wrapper/Absolute.vue";
import KryosBld from "~/assets/img/kryos-building.jpg";
import KryosMission from "~/assets/img/our_mission.jpg"
</script>

<template>
  <div class="flex flex-col gap-2 relative">
    <div class="grid sm:grid-cols-1 lg:grid-cols-2">
      <div class="relative flex flex-col items-center gap-12 flex-1">
        <h1 class="section-title">Kryos Defense Solutions</h1>
        <p class="max-w-4xl text-4xl">
          Kryos Defense Solutions is a privately held defense technology
          contractor specializing in autonomous tactical robotics, sensor fusion
          systems, and secure infrastructure protection. We operate at the
          intersection of advanced research, industrial engineering, and
          field-proven deployment.
        </p>
        <h2 class="section-title">Our Mission</h2>
        <p class="max-w-4xl text-4xl">
          To deliver autonomous systems that extend human reach into
          environments where presence is too costly, too complex, or too
          dangerous.
        </p>
        <p class="max-w-4xl text-4xl">
          Every platform we build is designed to reduce risk, increase
          stability, and maintain operational continuity under pressure.
        </p>
        <img :src="KryosMission" alt="Lab office">
      </div>
        <div class="flex-1">
            <img
      :src="KryosBld"
      alt="Kryos Defense Solutions Building, day time"
      class="w-300 h-500 object-cover"
    />
        </div>
    </div>
    
    
    <!-- Corporate Snapshot -->
    <section class="flex flex-col gap-2 text-4xl">
      <h2 class="section-title">Kryos at a Glance</h2>
      <span>Founded: 2041</span>
      <span>Headquarters: New Zurich Autonomous Zone</span>
      <span
        >Primary Sectors: Defense, Critical Infrastructure, Corporate
        Security</span
      >
      <span>Active Deployments: 72+ global sites</span>
      <span>Flagship Platform: Kryos MK-I Autonomous Tactical Drone</span>
    </section>
    <!-- End Corporate Snapshot -->
    <!-- History / Timeline -->
    <section class="flex flex-col gap-2">
      <h2>From Research Cell to Global Contractor</h2>
      <span
        >2041 - Kryos Defense Solutions is formed as a small research collective
        focused on autonomous mobility systems for hazardous industrial
        sites.</span
      >
      <span
        >2045 - First-generation Kryos ground platforms enter closed trials with
        infrastructure partners in mining and energy.</span
      >
      <span
        >2048 - Kryos secures its first Tier-1 defense contract, expanding into
        urban security and perimeter defense solutions.</span
      >
      <span
        >2051 - Advanced Systems Division (ASD) is established to consolidate
        black-box research and high-risk prototyping.</span
      >
      <span
        >2053 - Kryos MK-I enters limited deployment under classified agreements
        with selected government and corporate clients.</span
      >
    </section>
    <!-- End History / Timeline -->
    <!-- Leadership Team -->
    <section class="flex flex-col gap-2 text-4xl">
      <h2>Executive Leadership</h2>
      <div class="flex flex-col gap-2">
        <h3>Helena Voss — Chief Executive Officer</h3>
        <p>
          Oversees global strategy, corporate partnerships, and high-level
          procurement initiatives, with a background in defense logistics and
          predictive risk modeling.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Dr. Rowan Ilyan — Chief Technology Officer</h3>
        <p>
          Leads platform architecture, AI decision frameworks, and long-horizon
          research programs within the Advanced Systems Division.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Col. Marcus Hale (Ret.) — Chief Security Operations Officer</h3>
        <p>
          Coordinates deployment doctrine, field testing, and operational
          integration with defense and security entities worldwide.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Yara Chen — Director of Infrastructure & Compliance</h3>
        <p>
          Manages regulatory alignment, export controls, and infrastructure
          security standards across all Kryos facilities.
        </p>
      </div>
    </section>
    <!-- End Leadership Team -->

    <!-- Facilities & Global Presence -->
    <section class="flex flex-col gap-2 text-4xl">
      <h2 class="section-title">Facilities & Deployment Footprint</h2>
      <p class="max-4-xl">
        Kryos maintains research, testing, and manufacturing facilities across
        multiple regions to ensure continuity, redundancy, and rapid deployment
        capability.
      </p>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Core Facilities</h3>
        <span
          >New Zurich Autonomous Zone — Corporate headquarters & primary R&D
          campus</span
        >
        <span
          >Northern Commonwealth Range — Live-environment testing and evaluation
          grounds</span
        >
      </div>
      <div class="flex flex-col gap-2 text-4xl">
        <h3 class="text-5xl">Manufacturing & Integration</h3>
        <p>
          Baltic Assembly Complex — Platform fabrication and final integration
        </p>
        <p>
          Pan-Asian Logistics Hub — Distribution, maintenance, and retrofit
          operations
        </p>
      </div>
      <div class="flex flex-col gap-2 text-4xl">
        <h3 class="text-5xl">Controlled Testing Environments</h3>
        <p>
          Subterranean Infrastructure Lab — Tunnels, transit systems, and
          confined-space trials
        </p>
        <p>Offshore Platform Array — Harsh-environment endurance testing</p>
      </div>
    </section>
    <!-- End Facilities & Global Presence -->

    <!-- Ethics, Compliance & Corporate Language -->
    <section class="flex flex-col gap-2">
      <h2 class="section-title">Ethics, Compliance & Oversight</h2>
      <p class="max-w-4xl text-4xl">
        Kryos Defense Solutions operates under strict compliance with applicable
        export regulations, security frameworks, and oversight requirements in
        all jurisdictions where we do business.
      </p>
      <p class="max-w-4xl text-4xl">
        Our platforms are designed to operate within clearly defined rules of
        engagement, with configurable constraints tailored to each client's
        legal and operational standards.
      </p>
      <ul class="flex flex-col gap-4 text-4xl">
        <li>Formal risk and impact assessments for every deployment</li>
        <li>Secure audit trails for command and control channels</li>
        <li>Third-party testing for platform safety and reliability</li>
      </ul>
      <p class="max-w-4xl text-4xl">
        Certain programs and deployments are subject to additional classified
        oversight and are not disclosed publicly.
      </p>
    </section>
    <!-- End Ethics, Compliance & Corporate Language -->

    <!-- Cross-Links Back into the Rest of the Site -->
    <section
      class="flex flex-col items-center justify-center gap-2 max-w-4xl mx-auto"
    >
      <h2 class="section-title">Explore Kryos Systems</h2>
      <div class="flex flex-col gap-2">
        <h3 class="text-5xl">Kryos MK-I Platform</h3>
        <NuxtLink to="/products" class="link"
          >View capabilities, specifications, and deployment
          scenarios.</NuxtLink
        >
      </div>
      <div class="flex flex-col gap-2">
        <h3>Advanced Sytems Division</h3>
        <NuxtLink to="/rdivision" class="link"
          >Learn more about the research programs that power next-generation
          Kryos platforms.</NuxtLink
        >
      </div>
    </section>
    <!-- End Cross-Links Back into the Rest of the Site -->
  </div>
</template>
