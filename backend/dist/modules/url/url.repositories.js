import { randomUUID } from "node:crypto";
import { pool } from "../../config/db.js";
import { performance } from 'node:perf_hooks';
export const createUrlRpository = async (originalUrl, alias, userId) => {
    const result = await pool.query(`
    INSERT INTO url (original_url, alias, user_id) VALUES ($1, $2, $3)
    RETURNING id, original_url, alias
    `, [originalUrl, alias, userId]);
    return result.rows[0] ?? null;
};
export const deleteUrlRpository = async (alias) => {
    const result = await pool.query(`
    DELETE FROM url WHERE alias = $1 
    RETURNING id ;
    `, [alias]);
    return result.rows[0] ?? null;
};
export const getUrlRepository = async (alias) => {
    const requestId = randomUUID();
    const totalStartedAt = performance.now();
    let connectionAcquiredAt = 0;
    try {
        const clientStartedAt = performance.now();
        const client = await pool.connect();
        connectionAcquiredAt = performance.now();
        try {
            const result = await client.query("SELECT * FROM url WHERE alias = $1 LIMIT 1", [alias]);
            const queryFinishedAt = performance.now();
            console.info("[URL Repository Timing]", {
                requestId,
                alias,
                poolAcquisitionMs: Number((connectionAcquiredAt - clientStartedAt).toFixed(2)),
                queryAndNetworkMs: Number((queryFinishedAt - connectionAcquiredAt).toFixed(2)),
                totalMs: Number((queryFinishedAt - totalStartedAt).toFixed(2)),
            });
            return result.rows[0] ?? null;
        }
        finally {
            client.release();
        }
    }
    catch (error) {
        console.error("[URL Repository] Query failed", {
            requestId,
            alias,
            error,
        });
        throw error;
    }
};
//# sourceMappingURL=url.repositories.js.map