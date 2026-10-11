const environments = new Set(["dev", "staging", "production"]);

function readPostgresUrl(environment, variableName) {
  const value = process.env[variableName];
  if (!value) {
    throw new Error(`${variableName} is required when DB_ENV=${environment}.`);
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${variableName} must be a valid PostgreSQL URL.`);
  }

  if (
    (url.protocol !== "postgres:" && url.protocol !== "postgresql:") ||
    !url.hostname ||
    !url.pathname ||
    url.pathname === "/"
  ) {
    throw new Error(`${variableName} must be a valid PostgreSQL URL with a database name.`);
  }

  return value;
}

/** Resolve the selected environment's pooled runtime and direct Prisma CLI URLs. */
export function resolveDatabaseEnvironment() {
  const environment = process.env.DB_ENV;
  if (!environments.has(environment)) {
    throw new Error("DB_ENV must be set to exactly one of: dev, staging, production.");
  }

  const suffix = environment.toUpperCase();
  return {
    environment,
    databaseUrl: readPostgresUrl(environment, `DATABASE_URL_${suffix}`),
    directUrl: readPostgresUrl(environment, `DIRECT_URL_${suffix}`),
  };
}
