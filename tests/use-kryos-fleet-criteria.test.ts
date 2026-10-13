import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope, nextTick, ref, type EffectScope, type Ref } from "vue";
import { useKryosFleetCriteria } from "../app/composables/useKryosFleetCriteria";

describe("useKryosFleetCriteria", () => {
  let scopes: EffectScope[];

  beforeEach(() => {
    scopes = [];
    vi.useFakeTimers();
  });

  afterEach(() => {
    scopes.forEach((scope) => scope.stop());
    vi.useRealTimers();
  });

  function createCriteria(page: Ref<number>) {
    const scope = effectScope();
    const state = scope.run(() => useKryosFleetCriteria(page));
    if (!state) throw new Error("Could not create fleet criteria scope.");
    scopes.push(scope);
    return { ...state, scope };
  }

  it("resets pagination for effective search and immediate dropdown changes", async () => {
    const page = ref(4);
    const { criteria, effectiveCriteria } = createCriteria(page);

    criteria.status = "ONLINE";
    await nextTick();
    expect(effectiveCriteria.value).toEqual({ status: "ONLINE" });
    expect(page.value).toBe(0);

    page.value = 2;
    criteria.search = " mk-1 ";
    expect(page.value).toBe(2);
    vi.advanceTimersByTime(300);
    await nextTick();

    expect(effectiveCriteria.value).toEqual({
      search: "mk-1",
      status: "ONLINE",
    });
    expect(page.value).toBe(0);
  });

  it("debounces rapid typing and normalizes only the final search", async () => {
    const { criteria, effectiveCriteria } = createCriteria(ref(0));

    criteria.search = "M";
    vi.advanceTimersByTime(100);
    criteria.search = "MK";
    vi.advanceTimersByTime(100);
    criteria.search = " MK-1 ";
    vi.advanceTimersByTime(299);
    await nextTick();
    expect(effectiveCriteria.value).toEqual({});

    vi.advanceTimersByTime(1);
    await nextTick();
    expect(effectiveCriteria.value).toEqual({ search: "MK-1" });
  });

  it("applies dropdown filters immediately while text search is pending", async () => {
    const { criteria, effectiveCriteria } = createCriteria(ref(0));

    criteria.search = "MK-7";
    vi.advanceTimersByTime(100);
    criteria.zone = "BRAVO";
    await nextTick();

    expect(effectiveCriteria.value).toEqual({ zone: "BRAVO" });
    vi.advanceTimersByTime(200);
    await nextTick();
    expect(effectiveCriteria.value).toEqual({
      search: "MK-7",
      zone: "BRAVO",
    });
  });

  it("clearing search cancels its pending debounced update", async () => {
    const { criteria, effectiveCriteria } = createCriteria(ref(0));

    criteria.search = "MK-9";
    vi.advanceTimersByTime(150);
    criteria.search = "";
    await nextTick();
    expect(effectiveCriteria.value).toEqual({});

    vi.advanceTimersByTime(300);
    await nextTick();
    expect(effectiveCriteria.value).toEqual({});
  });

  it("clear resets every criterion and returns to the unfiltered fleet", async () => {
    const page = ref(3);
    const { criteria, effectiveCriteria, hasCriteria, clearCriteria } =
      createCriteria(page);
    criteria.search = "MK-9";
    criteria.status = "ONLINE";
    criteria.platform = "MK";
    criteria.zone = "BRAVO";
    criteria.role = "SCOUT";
    criteria.linkStatus = "STABLE";
    await nextTick();

    page.value = 2;
    clearCriteria();
    await nextTick();
    vi.advanceTimersByTime(300);

    expect(criteria.search).toBe("");
    expect(criteria.status).toBeUndefined();
    expect(criteria.platform).toBeUndefined();
    expect(criteria.zone).toBeUndefined();
    expect(criteria.role).toBeUndefined();
    expect(criteria.linkStatus).toBeUndefined();
    expect(effectiveCriteria.value).toEqual({});
    expect(hasCriteria.value).toBe(false);
    expect(page.value).toBe(0);
  });

  it("clearing search on a later page resets to the unfiltered criteria", async () => {
    const page = ref(0);
    const { criteria, effectiveCriteria } = createCriteria(page);
    criteria.search = "MK-4";
    vi.advanceTimersByTime(300);
    await nextTick();
    expect(effectiveCriteria.value).toEqual({ search: "MK-4" });

    page.value = 5;
    criteria.search = "";
    await nextTick();

    expect(effectiveCriteria.value).toEqual({});
    expect(page.value).toBe(0);
  });

  it("cleans up the pending timer when the composable scope is disposed", () => {
    const { criteria, effectiveCriteria, scope } = createCriteria(ref(0));
    criteria.search = "MK-5";
    expect(vi.getTimerCount()).toBe(1);

    scope.stop();
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(300);
    expect(effectiveCriteria.value).toEqual({});
  });
});
