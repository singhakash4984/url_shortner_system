import { Pool } from "pg";
import { env } from "./env.js";
export const pool = new Pool({
    connectionString: env.database.databaseUrl,
    max: 10,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 5000
});
pool.on("error", (error) => {
    console.error("Unexpected idle postgresql client error", error);
});
export const connectDB = async () => {
    await pool.query(`SELECT 1`);
    console.info("database connection verified");
};
//# sourceMappingURL=db.js.map