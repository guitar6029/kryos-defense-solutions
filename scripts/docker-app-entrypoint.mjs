import { spawn } from "node:child_process";

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
