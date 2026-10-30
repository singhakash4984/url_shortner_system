import { pool } from "../config/db.js";
export const startPostgresPoolMonitor = () => {
    const monitor = setInterval(() => {
        console.log('[PostgreSQL Pool]', {
            total: pool.totalCount,
            idle: pool.idleCount,
            waiting: pool.waitingCount
        });
    }, 5000);
    monitor.unref;
};
//# sourceMappingURL=postgres-pool-monitor.js.map