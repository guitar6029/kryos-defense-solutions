<!-- <main>
  [1] Page Title + Intro
  [2] Division Overview (what ASD is)
  [3] Research Pillars
  [4] Key Programs & Initiatives
  [5] Facilities & Test Environments
  [6] Containment / Safety / Oversight
  [7] Classified / Redacted Projects Teaser
  [8] Links to Products & Contact
</main> -->

<template>
  <div class="flex flex-col gap-2">
    <h1>Kryos Advanced Systems Division</h1>
    <p>
      The Advanced Systems Division (ASD) is the research and development core
      of Kryos Defense Solutions. ASD engineers, prototypes, and validates the
      next generation of autonomous platforms, decision frameworks, and mobility
      architectures that underpin all Kryos deployments.
    </p>
    <p>
      Operating across highly controlled environments, ASD maintains a closed
      feedback loop between laboratory research, simulated trials, and
      live-environment evaluations.
    </p>
    <!-- Division overview / mandate -->
    <section class="flex flex-col gap-2">
      <h2>Mandate & Scope</h2>
      <p>
        The Advanced Systems Division is responsible for exploratory research,
        prototype development, and high-risk systems integration. Most projects
        never leave the division. Those that do form the basis of new Kryos
        platforms or critical firmware updates to existing deployments.
      </p>
      <p>
        Work inside ASD spans from low-level control systems to high-level
        autonomous coordination, with a strict emphasis on reliability under
        uncertain and adversarial conditions.
      </p>
    </section>
    <!-- End Division overview / mandate -->

    <!-- Research pillars -->
    <section class="flex flex-col gap-2">
      <h2>Research Pillars</h2>
      <div class="flex flex-col gap-2">
        <h3>Autonomous Coordination & Control</h3>
        <p>
          Algorithms for pathfinding, multi-agent coordination, and
          decision-making under partial information, with hard real-time
          constraints.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Mobility & Structural Adaptation</h3>
        <p>
          Locomotion systems, chassis design, and adaptive contact mechanics
          tailored to industrial, urban, and subterranean environments.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Sensing, Perception & Fusion</h3>
        <p>
          Integration of thermal, LIDAR, acoustic, and inertial signals into a
          coherent operational model that remains robust under noise and
          interference.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Security & Resilience</h3>
        <p>
          Hardening of command channels, tamper detection, and safe-degradation
          behavior in the presence of faults or hostile inputs.
        </p>
      </div>
    </section>
    <!-- End Research pillars -->

    <!-- Key programs & initiatives -->
    <section class="flex flex-col gap-2">
      <h2>Current Programs & Initiatives</h2>
      <div class="flex flex-col gap-2">
        <h3>Project GLACIER - Adverse Environment Mobility</h3>
        <p>
          Focused on sustained operation in low-visibility, debris-heavy, and
          structurally unstable environments. GLACIER prototypes inform the
          Kryos MK-I's ability to navigate collapsed infrastructure and confined
          spaces.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Project VECTOR NET - Coordinated Unit Framework</h3>
        <p>
          Development of a software layer for multi-unit coordination, enabling
          Kryos platforms to share mapping data, threat indicators, and resource
          utilization in real time.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Project LUMEN WARD - Sensor Fusion & Anomaly Detection</h3>
        <p>
          Research into advanced anomaly detection across heterogeneous signals,
          allowing deployed units to identify subtle deviations in patterns that
          precede security events or structural failures.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Project SILENT PROTOCOL - Degraded-Channel Autonomy</h3>
        <p>
          Design of autonomy profiles that preserve mission integrity when
          communication channels are intermittent, degraded, or fully denied.
        </p>
      </div>
    </section>
    <!-- End Key programs & initiatives -->

    <!-- Facilities & test environments -->
    <section class="flex flex-col gap-2">
      <h2>Test Environments & Simulation Frameworks</h2>
      <p>
        ASD operates a combination of physical test facilities and high-fidelity
        simulation frameworks to validate platform behavior before live
        deployment.
      </p>
      <div class="flex flex-col gap-2">
        <h3>Urban Conflict Lab</h3>
        <p>
          A configurable mock-urban environment with dynamic lighting, movable
          structures, and multi-level access routes for evaluating navigation
          and threat response.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Subterranean Systems Range</h3>
        <p>
          Tunnel networks, maintenance corridors, and multi-layered transit
          spaces designed to stress-test mobility, sensing, and communication
          under occlusion.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Industrial Hazard Zone</h3>
        <p>
          Simulated refineries and heavy-manufacturing environments with heat,
          particulate matter, and electromagnetic noise to validate resilience
          and endurance.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Virtual Deployment Grid</h3>
        <p>
          Large-scale simulation environment that models hundreds of concurrent
          units under variable conditions, used to test coordination frameworks
          and update strategies.
        </p>
      </div>
    </section>
    <!-- end Facilities & test environments -->

    <!-- Containment / safety / oversight -->
    <section class="flex flex-col gap-2">
      <h2>Safety, Containment & Oversight</h2>
      <p>
        All ASD activities operate under strict containment, safety, and audit
        frameworks. Experimental firmware, payload configurations, and
        coordination strategies are isolated from production environments until
        they meet internal and external validation thresholds.
      </p>
      <p>
        Test scenarios are progressively escalated from controlled simulations
        to constrained live trials, with continuous monitoring for undesirable
        or emergent behaviors.
      </p>
      <ul>
        <li>Segmented research networks and data environments</li>
        <li>Multi-layer review of experimental autonomy features</li>
        <li>Formal rollback and lockdown procedures for test units</li>
      </ul>
      <p>
        Certain test regimes and evaluation metrics are classified and are not
        disclosed outside ASD leadership and designated oversight bodies.
      </p>
    </section>
    <!-- end Containment / safety / oversight -->

    <!-- Classified / redacted content teaser -->
    <section class="flex flex-col gap-2">
      <h2>Classified Programs</h2>
      <p>
        Some ASD initiatives operate under full classification in coordination
        with select clients and oversight entities. Public documentation for
        these programs is intentionally limited.
      </p>
      <p>
        <span>[REDACTED]</span> - Tier-0 program. Access limited to ASD
        executive leadership and designated client representatives.
      </p>
      <p>
        <span>[REDACTED]</span> - Experimental deployment of non-standard
        payload configurations under highly constrained operational rules.
      </p>
    </section>
    <!-- end Classified / redacted content teaser -->

    <!-- Links back to Products & Contact -->
    <section class="flex flex-col gap-2">
      <h2>From Lab to Deployment</h2>
      <p>
        Only a subset of ASD research transitions into active platforms. When it
        does, those capabilities surface in deployed units such as the Kryos
        MK-I.
      </p>
      <div class="flex flex-col gap-2">
        <h3>Kryos MK-I Platform</h3>
        <NuxtLink to="/products"
          >View deployment profiles, capabilities and operating modes.</NuxtLink
        >
      </div>
      <div class="flex flex-col gap-2">
        <h3>Engage with ASD</h3>
        <NuxtLink to="/contact"
          >For joint research initiatives or evaluation programs, contact the
          Kryos deployment and integration team.</NuxtLink
        >
      </div>
    </section>
    <!-- end Links back to Products & Contact -->
  </div>
</template>
