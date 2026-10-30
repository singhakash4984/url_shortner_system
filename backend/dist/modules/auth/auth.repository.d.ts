import type { CreateSessionInput, registeredUser, UpdatedSession } from "../../shared/types/auth.type.js";
export declare const registerUserRepository: (email: string, passwordHash: string) => Promise<registeredUser>;
export declare const findByEmail: (email: string) => Promise<any>;
export declare const createSession: (session: CreateSessionInput) => Promise<any>;
export declare const updatesession: (oldTokenHash: string, newtokenHash: string, newExpiresAt: Date) => Promise<UpdatedSession | null>;
export declare const revokeSessionByToken: (tokenHash: string) => Promise<any>;
export declare const getUserById: (userId: string) => Promise<any>;
//# sourceMappingURL=auth.repository.d.ts.map