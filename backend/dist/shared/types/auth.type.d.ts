import type { loginInput } from "../../modules/auth/auth.schema.js";
export type registeredUser = {
    id: string;
    email: string;
    created_at: Date;
};
export type registerResponse = {
    message: string;
    data: registeredUser;
};
export type userRole = 'client' | 'admin';
export type authenticatedUser = {
    userId: string;
    sessionId: string;
    role: userRole;
};
export type loggedInUserData = {
    id: string;
    role: userRole;
};
export type loginResponse = {
    message: string;
    data: loggedInUserData;
    accessToken: string;
    expiresAt: Date;
};
export type LoginMetadata = {
    ip: string | null;
    userAgent: string | null;
};
export type loginServiceInput = {
    data: loginInput;
    metadata?: LoginMetadata;
};
export type CreateSessionInput = {
    userId: string;
    tokenHash: string;
    ip: string | null;
    userAgent: string | null;
    expiresAt: Date;
};
export type accessTokenPayload = {
    userId: string;
    sessionId: string;
    role: userRole;
};
export type UpdatedSession = {
    session_id: string;
    user_id: string;
    role: userRole;
    expires_at: Date;
};
//# sourceMappingURL=auth.type.d.ts.map