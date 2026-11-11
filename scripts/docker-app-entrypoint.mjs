import { spawn, spawnSync } from "node:child_process";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for the local Docker database.`);
  }

  return value;
}

function localDatabaseUrl() {
  const url = new URL("postgresql://db:5432/");
  url.username = required("POSTGRES_USER");
  url.password = required("POSTGRES_PASSWORD");
  url.pathname = `/${required("POSTGRES_DB")}`;
  return url.toString();
}

process.env.DB_ENV = "dev";
process.env.DATABASE_URL_DEV = localDatabaseUrl();
process.env.DIRECT_URL_DEV = localDatabaseUrl();

// Regenerate before every app-container command so the bind-mounted checkout
// cannot retain a client older than the checked-out Prisma schema and migrations.
const generated = spawnSync("npm", ["run", "db:generate"], {
  env: process.env,
  stdio: "inherit",
});
if (generated.error) {
  throw generated.error;
}
if (generated.status !== 0) {
  process.exit(generated.status ?? 1);
}

const [command, ...args] = process.argv.slice(2);
if (!command) {
  throw new Error("A container command is required.");
}

const child = spawn(command, args, {
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(`Unable to start container command: ${error.message}`);
  process.exit(1);
});
