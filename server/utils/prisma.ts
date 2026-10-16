import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import { resolveDatabaseEnvironment } from "./database-environment.js";

let prisma: PrismaClient | undefined;

/** Create the server-only client using the explicitly selected DB_ENV URL. */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    const { databaseUrl } = resolveDatabaseEnvironment();
    prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: databaseUrl }),
    });
  }

  return prisma;
}
