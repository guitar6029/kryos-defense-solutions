<!-- <main>
  [1] Page Title + Intro
  [2] Product Families Overview
  [3] Kryos MK-I – Flagship Spotlight
  [4] Capabilities & Operating Modes
  [5] Deployment Profiles
  [6] Roadmap / Future Platforms
  [7] Procurement & Integration CTA
</main> -->

<template>
  <div class="flex flex-col gap-2">
    <h1>Kryos Platform Catalog</h1>
    <p>
      Kryos Defense Solutions develops autonomous platforms engineered for
      long-duration deployment in high-risk, high-value environments. Each
      system is built on a shared core architecture, with configurations
      tailored to specific operational demands.
    </p>
    <p>
      This catalog summarizes the platforms currently available for procurement,
      starting with our flagship ground unit.
    </p>
    <!-- Product Families Overview -->
    <section class="flex flex-col gap-2">
      <h2>Platform Families</h2>
      <div class="flex flex-col gap-2">
        <h3>Ground Platforms (Active)</h3>
        <p>
          Autonomous, multi-terrain units for patrol, interdiction, and close
          asset protection.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Aerial Recon Platforms (In Development)</h3>
        <p>
          Lightweight, persistent-surveillance drones designed for layered
          situational awareness.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Infrastructure Integration Systems (In Development)</h3>
        <p>
          Embedded systems for transit networks, industrial facilities, and
          critical infrastructure nodes.
        </p>
      </div>
      <p>
        Note: Certain platform configurations are restricted and available only
        under classified procurement channels.
      </p>
    </section>
    <!-- END Product Families Overview -->

    <!-- Kryos MK-I Flagship Spotlight -->
    <section class="flex flex-col gap-2">
      <h2>Kryos MK-I Autonomous Tactical Drone</h2>
      <p>
        The Kryos MK-I is a multi-terrain ground platform designed for dense
        urban, industrial, and subterranean environments. Six-degree mobility,
        redundant sensor arrays, and modular payload interfaces allow MK-I units
        to operate continuously under adverse conditions.
      </p>

      <!-- blocks -->
      <div class="flex flex-col gap-2">
        <h3>Core Specifications</h3>
        <ul>
          <li>Configuration: Six-legged autonomous ground platform</li>
          <li>
            Mobility Envelope: Floor, wall, and overhead structural traversal
          </li>
          <li>
            Endurance: 18-26 hours continuous operation (environment dependent)
          </li>
          <li>Sensor Suite: Thermal, LIDAR, acoustic, and inertial mapping</li>
          <li>
            Communications: Encrypted, multi-channel command and telemetry link
          </li>
          <li>Payload: Two modular hardpoints, configurable per deployment</li>
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <h3>System Architecture</h3>
        <p>
          MK-I units are built on a hardened core chassis with isolated compute,
          power, and mobility subsystems. Critical functions are distributed
          across redundant modules, ensuring continued operation under partial
          damage or signal disruption.
        </p>

        <p>
          Decision pipelines are designed to preserve operator intent while
          allowing low-latency autonomous adjustments to terrain, threat
          posture, and local conditions.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <!-- internal anchor -->
        <p>View deployment modes and profiles</p>
        <NuxtLink to="/contact">Request detailed technical brief</NuxtLink>
      </div>
    </section>
    <!-- END Kryos MK-I Flagship Spotlight -->

    <!-- Capabilities & Operating Modes -->
    <section class="flex flex-col gap-2">
      <h2>Capabilities & Operating Modes</h2>
      <div class="flex flex-col gap-2">
        <h3>Platform Capabilities</h3>
        <ul>
          <li>
            <span>Autonomous Patrol</span>
            <p>
              - Configurable patrol routes with adaptive pathfinding around new
              obstacles and environmental changes.
            </p>
          </li>
          <li>
            <span>Threat Detection & Classification</span>
            <p>
              - Real-time analysis of motion, thermal signatures, and anomalous
              patterns within defined perimeters.
            </p>
          </li>
          <li>
            <span>Zone Enforcement</span>
            <p>
              - Configurable soft and hard boundaries, with escalating response
              ladders based on client policy.
            </p>
          </li>
          <li>
            <span>Data Capture & Forensics</span>
            <p>
              - Continuous logging of visual, positional, and environmental data
              for post-incident review.
            </p>
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Operating Modes</h3>
        <div class="flex flex-col gap-2">
          <h3>Recon Modes</h3>
          <p>
            Low-profile traversal with reduced visible signature and emphasis on
            mapping, observation, and silent tracking.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Interdiction Mode</h3>
          <p>
            Aggressive posture with priority on deterrence, boundary
            enforcement, and response escalation under operator-defined rules of
            engagement.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Guard Mode</h3>
          <p>
            Fixed or bounded operation around a constrained perimeter, ideal for
            static high-value assets and chokepoints.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Transit Mode</h3>
          <p>
            Optimized for movement between sectors, with reduced sensor
            footprint and energy-efficient path planning.
          </p>
        </div>
      </div>
    </section>
    <!-- END Capabilities & Operating Modes -->

    <!-- Deployment Profiles-->
    <section class="flex flex-col gap-2">
      <h2>Deployment Profiles</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-2">
          <h3>Tier-1 Corporate Campus Security</h3>
          <p>
            MK-I units dynamically patrol access corridors, loading bays, and
            server infrastructure while coordinating with fixed surveillance
            assets.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Transit & Subterranean Infrastructure</h3>
          <p>
            Deployed within tunnels, service passages, and maintenance corridors
            to monitor structural integrity and detect unauthorized presence.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Energy & Industrial Facilities</h3>
          <p>
            Equipped with specialized payloads for gas detection, heat mapping,
            and operational anomaly detection in refineries and
            heavy-manufacturing plants.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3>Restricted Black-Site Operations</h3>
          <p>
            Certain deployments operate under full classification, with modified
            firmware and non-disclosed payload configurations.
          </p>
        </div>
      </div>
    </section>
    <!-- END Deployment Profiles -->

    <!-- Roadmap / Future Platforms -->
    <section class="flex flex-col gap-2">
      <h2>Upcoming Platforms</h2>
      <div class="flex flex-col gap-2">
        <h3>Kryos MK-II (Concept Stage)</h3>
        <p>
          A heavier, armor-enhanced variant designed for contested environments
          and direct interface with mechanized units.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Kryos Aerial Recon Node (ARN-Series)</h3>
        <p>
          Lightweight aerial platforms focused on persistent overhead
          surveillance and integrated targeting support.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h3>Kryos Swarm Coordination Package</h3>
        <p>
          Software layer enabling multi-unit coordination for coverage,
          redundancy, and complex perimeter management.
        </p>
      </div>
    </section>
    <!-- END Roadmap / Future Platforms -->

    <!-- Procurement & Integration CTA -->
    <section class="flex flex-col gap-2">
      <h2>Procurement & Systems Integration</h2>
      <p>
        Kryos platforms are available under controlled procurement channels for
        qualified defense, security, and critical infrastructure clients. Each
        deployment is preceded by a joint assessment phase to align platform
        capabilities with operational requirements and regulatory frameworks.
      </p>
      <p>
        For procurement inquiries, integration planning, or technical briefings,
        contact the Kryos deployment team.
      </p>
      <NuxtLink to="/contact">Contact Kryos Deployment Team</NuxtLink>
    </section>
    <!-- end Procurement & Integration CTA -->
  </div>
</template>
