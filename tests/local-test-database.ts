type TestEnvironment = Record<string, string | undefined>;

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const TEST_DATABASE_NAME = /^kryos_test$/i;

/**
 * Return a test database URL only after an explicit local opt-in and strict
 * identity checks. Missing configuration skips integration tests; unsafe
 * configuration fails before any database operation can run.
 */
export function resolvePermittedLocalTestDatabaseUrl(env: TestEnvironment = process.env): string | null {
  const rawUrl = env.TEST_DATABASE_URL;
  if (!rawUrl) return null;
  if (env.KRYOS_ALLOW_LOCAL_TEST_DATABASE !== "true") {
    throw new Error("Set KRYOS_ALLOW_LOCAL_TEST_DATABASE=true for an explicitly permitted local test database.");
  }

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("TEST_DATABASE_URL must be a valid PostgreSQL URL.");
  }

  if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
    throw new Error("TEST_DATABASE_URL must use a PostgreSQL protocol.");
  }
  if (!LOCAL_HOSTS.has(url.hostname)) {
    throw new Error("TEST_DATABASE_URL must target localhost for integration tests.");
  }

  const databaseName = decodeURIComponent(url.pathname.replace(/^\//, ""));
  if (!TEST_DATABASE_NAME.test(databaseName)) {
    throw new Error("TEST_DATABASE_URL must target the kryos_test database.");
  }

  return rawUrl;
}
