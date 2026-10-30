import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { connectRedis } from "./infrastructure/redis/redisClient.js";
import { startPostgresPoolMonitor } from "./monitoring/postgres-pool-monitor.js";

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    // Import app only after Redis is connected.
    const { default: app } = await import("./app.js");

    app.get("/instance", (_req, res) => {
      res.json({
        instance: process.env.HOSTNAME,
      });
    });

    app.listen(env.app.port, "0.0.0.0", () => {
      console.log(`Server is running on port ${env.app.port}`);
      startPostgresPoolMonitor();
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

await startServer();
