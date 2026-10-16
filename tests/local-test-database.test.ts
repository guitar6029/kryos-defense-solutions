import { describe, expect, it } from "vitest";
import { resolvePermittedLocalTestDatabaseUrl } from "./local-test-database";

describe("local integration database guard", () => {
  const base = {
    TEST_DATABASE_URL: "postgresql://test:test@127.0.0.1:55432/kryos_test",
    KRYOS_ALLOW_LOCAL_TEST_DATABASE: "true",
  };

  it("permits only explicitly opted-in localhost kryos_test URLs", () => {
    expect(resolvePermittedLocalTestDatabaseUrl(base)).toBe(base.TEST_DATABASE_URL);
    expect(resolvePermittedLocalTestDatabaseUrl({})).toBeNull();
  });

  it("fails closed for missing opt-in, non-local hosts, and unsafe database names", () => {
    expect(() => resolvePermittedLocalTestDatabaseUrl({ TEST_DATABASE_URL: base.TEST_DATABASE_URL })).toThrow(/explicitly permitted/);
    expect(() => resolvePermittedLocalTestDatabaseUrl({ ...base, TEST_DATABASE_URL: "postgresql://test:test@example.com:5432/kryos_test" })).toThrow(/localhost/);
    expect(() => resolvePermittedLocalTestDatabaseUrl({ ...base, TEST_DATABASE_URL: "postgresql://test:test@127.0.0.1:5432/production" })).toThrow(/kryos_test/);
  });
});
