import "dotenv/config";
import { defineConfig } from "prisma/config";
import { resolveDatabaseEnvironment } from "./server/utils/database-environment.mjs";

const { directUrl } = resolveDatabaseEnvironment();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: directUrl,
  },
});
