import { describe, expect, it } from "vitest";
import { getFleetFeedback } from "../app/utils/fleetFeedback";

describe("fleet feedback", () => {
  it("shows loading feedback while the request is pending", () => {
    expect(
      getFleetFeedback({ isLoading: true, isError: false, hasCriteria: true }),
    ).toEqual({ kind: "loading", message: "Loading fleet…" });
  });

  it("shows an actionable error message when the request fails", () => {
    expect(
      getFleetFeedback({ isLoading: false, isError: true, hasCriteria: false }),
    ).toEqual({
      kind: "error",
      message: "Fleet data is temporarily unavailable. Check the connection and retry.",
    });
  });

  it("shows filtered empty feedback only when active criteria have no matches", () => {
    expect(
      getFleetFeedback({
        isLoading: false,
        isError: false,
        total: 0,
        hasCriteria: true,
      }),
    ).toEqual({
      kind: "empty-filtered",
      message: "No units match this search and filter combination.",
    });
    expect(
      getFleetFeedback({
        isLoading: false,
        isError: false,
        total: 0,
        hasCriteria: false,
      }),
    ).toBeNull();
  });
});
