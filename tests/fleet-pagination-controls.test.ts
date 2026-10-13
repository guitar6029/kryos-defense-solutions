import { describe, expect, it } from "vitest";
import {
  DEFAULT_FLEET_PAGE_SIZE,
  FLEET_PAGE_SIZES,
} from "../app/constants/fleet";
import {
  getFleetTotalPages,
  getPageSizeChange,
  shouldDisableNext,
  shouldDisablePrevious,
} from "../app/components/Table/fleetPagination";

describe("fleet pagination controls", () => {
  it("offers only the supported fleet page sizes", () => {
    expect(FLEET_PAGE_SIZES).toEqual([5, 25, 50, 100]);
    expect(DEFAULT_FLEET_PAGE_SIZE).toBe(25);
  });

  it("calculates pages from the total and selected page size", () => {
    expect(getFleetTotalPages(0, 25)).toBe(0);
    expect(getFleetTotalPages(25, 25)).toBe(1);
    expect(getFleetTotalPages(26, 25)).toBe(2);
  });

  it("enforces zero-based first and last page boundaries", () => {
    expect(shouldDisablePrevious(0)).toBe(true);
    expect(shouldDisablePrevious(1)).toBe(false);
    expect(shouldDisableNext(0, 0)).toBe(true);
    expect(shouldDisableNext(0, 2)).toBe(false);
    expect(shouldDisableNext(1, 2)).toBe(true);
  });

  it("requests a page-zero reset before changing size from a later page", () => {
    expect(getPageSizeChange(0, 50)).toEqual({ resetPage: false, pageSize: 50 });
    expect(getPageSizeChange(3, 5)).toEqual({ resetPage: true, pageSize: 5 });
  });
});
