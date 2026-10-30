export declare const hashPassword: (password: string) => Promise<string>;
export declare const verifyPassword: (passwordHash: string, password: string) => Promise<true>;
export declare const generateRefreshToken: () => string;
export declare const tokenHash: (token: string) => string;
export declare const FAKE_HASH = "$argon2id$v=19$m=32768,p=1,t=3$c1AO+5gcjrX+2mM22wuDwQ$8FDhRhTaaKS9330fiki88zujZovDoSMs7TBUu/UMPeM";
//# sourceMappingURL=crypto.d.ts.map