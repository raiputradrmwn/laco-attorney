import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({
    // Use DIRECT_URL (port 5432, no ?pgbouncer=true) because pg.Pool
    // manages its own pooling — the pgbouncer param is only for Prisma's
    // built-in query engine and would cause PostgreSQL to reject the connection.
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    max: 10,
  });
}

const adapter = new PrismaPg(globalForPrisma.pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
