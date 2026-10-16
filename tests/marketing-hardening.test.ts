import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

const marketingRoutes = [
  "app/pages/index.vue",
  "app/pages/platform.vue",
  "app/pages/products/index.vue",
  "app/pages/products/kryos-multirotor.vue",
  "app/pages/about.vue",
];

const activeMarketingSource = marketingRoutes.map(read).join("\n");

const retiredMarketingComponents = [
  "app/components/Hero.vue",
  "app/components/Highlights.vue",
  "app/components/CoreCapabilities.vue",
  "app/components/KryosHighlightMKI.vue",
  "app/components/Products/DeploymentProfiles.vue",
  "app/components/Products/DeploymentProductPanel.vue",
  "app/components/Products/FullViewProduct.vue",
  "app/components/Products/SummaryProduct.vue",
  "app/components/Products/ProcurementIntegration.vue",
  "app/components/Products/ProductCTA.vue",
  "app/components/Products/ImageGallery.vue",
  "app/components/Products/Roadmap.vue",
];

describe("marketing hardening", () => {
  it("keeps the approved marketing routes and CTA destinations present", () => {
    for (const route of [
      "app/pages/index.vue",
      "app/pages/platform.vue",
      "app/pages/products/index.vue",
      "app/pages/products/kryos-multirotor.vue",
      "app/pages/about.vue",
      "app/pages/app/index.vue",
    ]) {
      expect(existsSync(resolve(root, route))).toBe(true);
    }

    expect(read("app/pages/index.vue")).toContain('to="/platform"');
    expect(read("app/pages/index.vue")).toContain('to="/products/kryos-multirotor"');
    expect(read("app/pages/index.vue")).toContain('to="/about"');
    expect(read("app/pages/platform.vue")).toContain('to="/app"');
    expect(read("app/pages/platform.vue")).toContain('to="/products"');
    expect(read("app/pages/products/index.vue")).toContain('to="/platform"');
    expect(read("app/pages/products/index.vue")).toContain('to="/products/kryos-multirotor"');
    expect(read("app/pages/products/kryos-multirotor.vue")).toContain('to="/platform"');
    expect(read("app/pages/products/kryos-multirotor.vue")).toContain('to="/products"');
    expect(read("app/pages/about.vue")).toContain('to="/platform"');
    expect(read("app/pages/about.vue")).toContain('to="/products"');
    expect(activeMarketingSource).not.toContain('to="#"');
  });

  it("keeps active marketing copy within the approved content truth table", () => {
    expect(activeMarketingSource).toContain("Kryos Multirotor");
    expect(activeMarketingSource).toContain("Software prototype");
    expect(activeMarketingSource).toContain("sample data");
    expect(activeMarketingSource).toContain("MK-I");
    expect(activeMarketingSource).toContain("EX-1 is deferred");
    expect(activeMarketingSource).toContain("integration planned, not implemented");

    for (const prohibitedClaim of [
      "Tier-1 Defense Contractor",
      "limited deployment",
      "government entity",
      "controlled procurement",
      "technical dossier",
      "Autonomous Tactical Drone",
      "encrypted command and control",
      "real-time analysis",
      "Zone Enforcement",
    ]) {
      expect(activeMarketingSource).not.toContain(prohibitedClaim);
    }

    expect(read("app/pages/products/index.vue")).toContain(
      "Kryos Multirotor is the approved working label."
    );
    expect(read("app/pages/products/index.vue")).not.toContain(
      "final product name remain subject to approval"
    );
  });

  it("retires orphaned marketing components with unsupported claims", () => {
    for (const component of retiredMarketingComponents) {
      expect(existsSync(resolve(root, component))).toBe(false);
    }

    const activeShell = read("app/layouts/default.vue") + read("app/components/Nav.vue");
    expect(activeShell).not.toMatch(
      /Hero|Highlights|CoreCapabilities|KryosHighlightMKI|DeploymentProfiles|FullViewProduct|SummaryProduct|ProcurementIntegration/
    );
  });

  it("connects the mobile menu trigger to its panel and keyboard behavior", () => {
    const nav = read("app/components/Nav.vue");
    const toggle = read("app/components/Buttons/KryosToggleMenu.vue");
    const panel = read("app/components/Panels/KryosSidePanel.vue");

    expect(toggle).toContain(":aria-expanded=\"expanded\"");
    expect(toggle).toContain(":aria-controls=\"controls\"");
    expect(nav).toContain('const mobileMenuId = "kryos-mobile-menu"');
    expect(nav).toContain(":controls=\"mobileMenuId\"");
    expect(nav).toContain('event.key === "Escape"');
    expect(nav).toContain("menuTrigger.value?.focus()");
    expect(panel).toContain(":id=\"props.id\"");
  });

  it("uses only the approved Multirotor master in active marketing routes", () => {
    const approvedMaster =
      "~/assets/img/products/kryos-multirotor/kryos-multirotor-hero-master.png";

    expect(read("app/pages/index.vue")).toContain(approvedMaster);
    expect(read("app/pages/products/index.vue")).toContain(approvedMaster);
    expect(read("app/pages/products/kryos-multirotor.vue")).toContain(approvedMaster);
  });
});
