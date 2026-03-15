import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // During build, DATABASE_URL is not available
    // Return a proxy that throws clear errors if actually used
    return new Proxy({} as pg.Pool, {
      get(_, prop) {
        if (prop === "query" || prop === "connect") {
          return () => {
            throw new Error("DATABASE_URL not configured — is this running during build?");
          };
        }
        return undefined;
      },
    });
  }
  return new pg.Pool({ connectionString });
}

export const db = drizzle(createPool(), { schema });
