import type { loginServiceInput, registeredUser } from "../../shared/types/auth.type.js";
import type { registerInput } from "./auth.schema.js";
export declare const register: (data: registerInput) => Promise<registeredUser>;
export declare const login: ({ data, metadata }: loginServiceInput) => Promise<{
    user: {
        id: any;
        role: any;
    };
    accessToken: string;
    refreshToken: string;
    expiresAt: any;
}>;
export declare const refresh: (refreshToken: string) => Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
}>;
export declare const logout: (refreshToken: string) => Promise<any>;
export declare const getMe: (userId: string) => Promise<any>;
//# sourceMappingURL=auth.service.d.ts.map