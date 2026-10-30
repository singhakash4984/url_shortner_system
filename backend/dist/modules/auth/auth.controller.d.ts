import type { RequestHandler } from "express";
import type { loginInput, registerInput } from "./auth.schema.js";
import type { loginResponse, registerResponse } from "../../shared/types/auth.type.js";
export declare const registerController: RequestHandler<{}, registerResponse, registerInput>;
export declare const loginController: RequestHandler<{}, loginResponse, loginInput>;
export declare const refreshController: RequestHandler;
export declare const logoutController: RequestHandler;
export declare const getMeController: RequestHandler;
//# sourceMappingURL=auth.controller.d.ts.map