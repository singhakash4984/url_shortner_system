import { AppError } from "../../shared/error/AppError.js";
import type {
  accessTokenPayload,
  loginServiceInput,
  registeredUser,
} from "../../shared/types/auth.type.js";
import {
  FAKE_HASH,
  generateRefreshToken,
  hashPassword,
  tokenHash,
  verifyPassword,
} from "../../shared/utils/crypto.js";
import {
  createSession,
  findByEmail,
  getUserById,
  registerUserRepository,
  revokeSessionByToken,
  updatesession,
} from "./auth.repository.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

import type { registerInput } from "./auth.schema.js";

export const register = async (data: registerInput) => {
  const normalizedEmail = data.email.trim().toLowerCase();

  try {
    const passwordHash = await hashPassword(data.password);

    const user: registeredUser = await registerUserRepository(
      normalizedEmail,
      passwordHash,
    );

    return user;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505" &&
      "contraint" in error &&
      error.contraint === "users_email_unique"
    ) {
      throw new AppError("Email already exist", 409, true);
    }
    throw error;
  }
};

export const login = async ({ data, metadata }: loginServiceInput) => {
  const normalizeEmail = data.email.trim().toLowerCase();
  const user = await findByEmail(normalizeEmail);
  const password_hash = user?.password_hash ?? FAKE_HASH;
  const isValid = await verifyPassword(password_hash, data.password);
  if (!user || !isValid) {
    throw new AppError("User not found", 404, true);
  }

  const ip = metadata?.ip ?? null;
  const userAgent = metadata?.userAgent ?? null;

  const refreshToken = generateRefreshToken();
  const refreshTokenHash = tokenHash(refreshToken);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await createSession({
    userId: user.id,
    tokenHash: refreshTokenHash,
    ip: ip,
    userAgent: userAgent,
    expiresAt: expiresAt,
  });

  const payload = {
    userId: user.id,
    role: user.role,
    sessionId: session.id,
  } as accessTokenPayload;

  const accessToken = jwt.sign(payload, env.auth.accessSecret, {
    expiresIn: "15m",
  });
  console.log(session);

  return {
    user: {
      id: user.id,
      role: user.role,
    },
    accessToken,
    refreshToken,
    expiresAt: session.expires_at,
  };
};

export const refresh = async (refreshToken: string) => {
 const hashedToken = tokenHash(refreshToken) ;
 const newRefreshToken = generateRefreshToken() ;
 const newTokenHash = tokenHash(newRefreshToken) ;
 const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ;

 const session = await updatesession(hashedToken,newTokenHash, newExpiresAt) ;
 if(!session){
  throw new AppError("Invalid refresh token",401,true)
 }
 const payload: accessTokenPayload = {
  userId:session.user_id,
  sessionId: session.session_id,
  role: session.role
 }  
 const newAccesstoken = jwt.sign(payload,env.auth.accessSecret,{
  expiresIn: "15m"
 }) ;
    return {
      accessToken: newAccesstoken,
      refreshToken: newRefreshToken,
      expiresAt: newExpiresAt
    }
};

export const logout = async(refreshToken: string) =>{
    const token_hash = tokenHash(refreshToken) ;
    const id = await revokeSessionByToken(token_hash) ;
    if(!id){
    throw new AppError("Invalid refreshToken",401,true)
  }
  return id ;
}


export const getMe = async(userId: string) =>{
  const user = await getUserById(userId) ;
  if(!user){
    throw new AppError("User not found",401,true)
  }
  return user ;
}