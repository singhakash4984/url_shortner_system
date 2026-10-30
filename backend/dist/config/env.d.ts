import "dotenv/config";
export declare const port: string | number;
export declare const env: Readonly<{
    app: {
        port: number;
        nodeEnv: "development" | "production" | "test";
    };
    database: {
        databaseUrl: string;
    };
    auth: {
        accessSecret: string;
        refreshSecret: string;
    };
    urlShortner: {
        baseUrl: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
}>;
//# sourceMappingURL=env.d.ts.map