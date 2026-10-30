import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { connectRedis } from "./infrastructure/redis/redisClient.js";
import { startPostgresPoolMonitor } from "./monitoring/postgres-pool-monitor.js";
await connectDB();
await connectRedis();
app.get("/instance", (_req, res) => {
    res.json({
        instance: process.env.PORT ?? "3000",
    });
});
app.listen(env.app.port, "0.0.0.0", () => {
    console.log(`server is running on port ${env.app.port}`);
    startPostgresPoolMonitor();
});
//# sourceMappingURL=server.js.map