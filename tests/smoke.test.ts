import { describe, expect, it } from "vitest";

describe("CI smoke test", () => {
    it("runs a basic assertion", () => {
        expect(1 + 1).toBe(2);
    });
});
