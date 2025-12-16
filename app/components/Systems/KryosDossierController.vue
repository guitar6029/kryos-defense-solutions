<script lang="ts" setup>
import Absolute from "../Wrapper/Absolute.vue";
</script>

<template>
  <div
    class="flex flex-col gap-6 p-4 h-screen bg-linear-180 from-bg-(--kryos-bg) to-gray-700 relative"
  >
    <Absolute
      extra-class="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
    >
      <div class="flex flex-col items-center justify-center relative">
        <div class="w-100 absolute -left-100 bottom-100 z-10">
          <div class="relative w-full h-full">
            <svg
              class="w-full h-full inset-0 absolute"
              viewBox="0 0 1272 530"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M554.5 488H709.5H1197L1245 407V174L1271 133.5V0.5H1160L1097.5 19H225.5L192.5 0.5H0.5V133.5L22.5 174V362.5H0.5V488L44.5 529H499L554.5 488Z"
                stroke="var(--kryos-text-high)"
              />
            </svg>
            <div class="relative z-10 p-4 flex flex-col gap-1">
              <span class="kryos-text text-(--kryos-warn)"
                >[Hardened Core Chassis]</span
              >
              <span>Isolated compute, power, and mobility subsystems</span>
            </div>
          </div>
        </div>

        <div class="w-100 absolute left-200 top-10 z-10">
          <div class="relative w-full h-full">
            <svg
              class="w-full h-full inset-0 absolute"
              viewBox="0 0 1272 530"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M554.5 488H709.5H1197L1245 407V174L1271 133.5V0.5H1160L1097.5 19H225.5L192.5 0.5H0.5V133.5L22.5 174V362.5H0.5V488L44.5 529H499L554.5 488Z"
                stroke="var(--kryos-text-high)"
              />
            </svg>
            <div class="relative z-10 p-4 flex flex-col gap-1">
              <span class="kryos-text text-(--kryos-warn)"
                >[Mobility Envelope]</span
              >
              <span>Floor, wall, and overhead traversal</span>
            </div>
          </div>
        </div>

        <div class="w-100 absolute -left-50 top-120 z-10">
          <div class="relative w-full h-full">
            <svg
              class="w-full h-full inset-0 absolute"
              viewBox="0 0 1272 530"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M554.5 488H709.5H1197L1245 407V174L1271 133.5V0.5H1160L1097.5 19H225.5L192.5 0.5H0.5V133.5L22.5 174V362.5H0.5V488L44.5 529H499L554.5 488Z"
                stroke="var(--kryos-text-high)"
              />
            </svg>
            <div class="relative z-10 p-4 flex flex-col gap-1">
              <span class="kryos-text text-(--kryos-warn)">[Sensor Suite]</span>
              <span>Thermal, LIDAR, acoustic, inertial mapping</span>
            </div>
          </div>
        </div>

        <div class="w-100 absolute -left-50 top-20 z-10">
          <div class="relative w-full h-full">
            <svg
              class="w-full h-full inset-0 absolute"
              viewBox="0 0 1272 530"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M554.5 488H709.5H1197L1245 407V174L1271 133.5V0.5H1160L1097.5 19H225.5L192.5 0.5H0.5V133.5L22.5 174V362.5H0.5V488L44.5 529H499L554.5 488Z"
                stroke="var(--kryos-text-high)"
              />
            </svg>
            <div class="relative z-10 p-4 flex flex-col gap-1">
              <span class="kryos-text text-(--kryos-warn)"
                >[Modular Payload Hardpoints]</span
              >
              <span>Dual configurable mission modules</span>
            </div>
          </div>
        </div>

        <div class="w-100 absolute -left-20 top-0 z-10">
          <div class="relative w-full h-full">
            <svg
              class="w-full h-full inset-0 absolute"
              viewBox="0 0 1272 530"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M554.5 488H709.5H1197L1245 407V174L1271 133.5V0.5H1160L1097.5 19H225.5L192.5 0.5H0.5V133.5L22.5 174V362.5H0.5V488L44.5 529H499L554.5 488Z"
                stroke="var(--kryos-text-high)"
              />
            </svg>
            <div class="relative z-10 p-4 flex flex-col gap-1">
              <span class="kryos-text text-(--kryos-warn)"
                >[Autonomous Control Core]</span
              >
              <span>Low-latency adaptive decision pipelines</span>
            </div>
          </div>
        </div>

        <img
          src="~/assets/img/mk-i-side-a-trns.png"
          alt="MK-1"
          class="w-[min(60rem,70vw)]"
        />
      </div>
    </Absolute>

    <div
      class="absolute right-[clamp(1rem,4vw,10rem)] bottom-20 flex flex-col w-50"
    >
      <svg
        class="w-full h-auto rotate"
        viewBox="0 0 701 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M700.001 350.001C700.001 327.011 701.613 323.792 693.328 281.981C688.002 255.1 672.727 213.682 651.236 175.001C639.3 153.518 625.446 132.878 610.316 116.043C552.574 51.7965 473.114 11.1721 387.222 1.98565C301.331 -7.20077 215.077 15.6998 145.054 66.2815C75.0308 116.863 26.1863 191.552 7.91764 275.98C-10.351 360.407 3.24674 448.608 46.0948 523.613C88.9428 598.618 158.014 655.128 240.02 682.272C322.025 709.416 411.172 705.275 490.309 670.647C569.445 636.018 632.981 573.348 668.692 494.694L662.616 491.936C627.586 569.09 565.262 630.566 487.634 664.534C410.006 698.502 322.559 702.564 242.116 675.938C161.674 649.312 93.9196 593.878 51.8884 520.303C9.85716 446.728 -3.48137 360.209 14.439 277.391C32.3594 194.573 80.2727 121.308 148.961 71.6902C217.649 22.0728 302.259 -0.391177 386.513 8.62012C470.767 17.6314 548.712 57.4814 605.353 120.503C661.994 183.525 693.328 265.266 693.328 350.001H700.001Z"
          fill="var(--kryos-accent)"
        />
        <path
          d="M640.001 350.001C640.001 415.393 616.699 478.645 574.275 528.409C531.852 578.172 473.084 611.189 408.515 621.536C343.947 631.884 277.804 618.884 221.955 584.869C166.106 550.854 124.206 498.051 103.772 435.933C83.3378 373.816 85.708 306.45 110.457 245.922C135.206 185.394 180.714 135.666 238.815 105.66C296.917 75.6549 363.81 67.3356 427.491 82.1952C491.173 97.0547 547.475 134.121 586.296 186.742L574.97 195.098C538.136 145.169 484.715 110 424.293 95.9013C363.871 81.8022 300.402 89.6957 245.274 118.166C190.145 146.636 146.967 193.818 123.484 251.248C100.002 308.679 97.7531 372.597 117.141 431.536C136.529 490.474 176.285 540.575 229.276 572.849C282.267 605.123 345.024 617.457 406.288 607.639C467.552 597.822 523.312 566.494 563.565 519.278C603.817 472.061 625.926 412.046 625.926 350.001H640.001Z"
          fill="var(--kryos-accent)"
        />
        <path
          d="M547.418 432C526.75 477.978 489.482 514.456 443.071 534.134C396.661 553.812 344.531 555.238 297.114 538.127C249.697 521.016 210.49 486.63 187.339 441.851C164.188 397.071 158.801 345.201 172.256 296.62C185.711 248.038 217.015 206.33 259.904 179.84C302.793 153.351 354.104 144.034 403.567 153.755C453.031 163.475 497 191.516 526.675 232.266C556.35 273.017 569.542 323.47 563.612 373.53L548.832 371.779C554.321 325.444 542.11 278.746 514.644 241.028C487.177 203.311 446.48 177.356 400.697 168.359C354.915 159.362 307.423 167.985 267.725 192.503C228.028 217.021 199.053 255.626 186.6 300.592C174.146 345.558 179.132 393.568 200.56 435.015C221.988 476.463 258.277 508.289 302.166 524.127C346.054 539.965 394.305 538.645 437.262 520.431C480.219 502.218 514.713 468.455 533.843 425.898L547.418 432Z"
          fill="var(--kryos-accent)"
        />
        <path
          d="M465.001 350.001C465.001 330.223 459.136 310.889 448.148 294.444C437.16 277.999 421.542 265.182 403.269 257.613C384.996 250.044 364.89 248.064 345.492 251.922C326.094 255.781 308.275 265.305 294.29 279.29C280.305 293.276 270.781 311.094 266.922 330.492C263.064 349.89 265.044 369.997 272.613 388.269C280.182 406.542 292.999 422.16 309.444 433.148C325.889 444.136 345.223 450.001 365.001 450.001L365.001 438.018C347.593 438.018 330.575 432.856 316.101 423.185C301.627 413.513 290.345 399.767 283.683 383.684C277.021 367.601 275.278 349.903 278.675 332.83C282.071 315.756 290.454 300.073 302.763 287.763C315.073 275.454 330.756 267.071 347.829 263.675C364.903 260.279 382.6 262.022 398.684 268.684C414.767 275.345 428.513 286.627 438.184 301.101C447.856 315.576 453.018 332.593 453.018 350.001H465.001Z"
          fill="var(--kryos-accent)"
        />
      </svg>
    </div>
    <!-- 
    <Absolute
      extra-class="top-10 left-[clamp(1rem,4vw,10rem)] flex flex-col gap-2 w-200 h-50 items-center justify-center"
    >
      <div class="absolute inset-0">
        <svg
          class="w-full h-auto"
          viewBox="0 0 1490 567"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M128.407 25.5L29.6961 92.5V336L0.5 348.5V480.5L128.407 541.5H361.975L443.307 566.5H1201.01L1227.43 541.5H1463.78V296L1489.5 222.5V55L1410.95 25.5H1227.43L1034.88 0.5H402.294L361.975 25.5H128.407Z"
            stroke="var(--kryos-accent)"
            stroke-width="6"
          />
        </svg>
      </div>
      <div class="relative flex flex-col gap-1 z-1 max-w-2xl top-10">
        <h2 class="model-title">KRYOS MK-I Tactical Platform</h2>
        <p>
          Autonomous six-legged ground platform engineered for dense urban,
          industrial, and subterranean environments.
        </p>
      </div>
    </Absolute> -->
  </div>
</template>

<style scoped>
.model-title {
  font-family: "Orbitron", sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  border-bottom: 4px solid;
}
</style>
