import { pool } from "../../config/db.js";
import type {
  CreateSessionInput,
  registeredUser,
  UpdatedSession,
} from "../../shared/types/auth.type.js";

export const registerUserRepository = async (
  email: string,
  passwordHash: string,
): Promise<registeredUser> => {
  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash) 
    VALUES($1, $2)
    RETURNING id, email, created_at
    `,
    [email, passwordHash],
  );
  return result.rows[0] ?? null;
};

export const findByEmail = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id, email, password_hash, role
    FROM users 
    WHERE email= $1
    `,
    [email],
  );
  return result.rows[0] ?? null;
};

export const createSession = async (session: CreateSessionInput) => {
  const result = await pool.query(
    `
     INSERT INTO sessions (user_id, token_hash, ip, user_agent, expires_at) 
    VALUES($1, $2, $3, $4, $5)
    RETURNING id, created_at, expires_at
    `,
    [
      session.userId,
      session.tokenHash,
      session.ip,
      session.userAgent,
      session.expiresAt,
    ],
  );
  return result.rows[0] ?? null;
};

export const updatesession = async (
  oldTokenHash: string,
  newtokenHash: string,
  newExpiresAt: Date,
): Promise<UpdatedSession | null> => {
  const result = await pool.query<UpdatedSession>(
    `
        UPDATE sessions AS s
        SET token_hash = $2,
            expires_at = $3
        FROM users AS u
        WHERE s.token_hash = $1
        AND s.user_id = u.id
        AND s.revoked_at IS NULL
        AND s.expires_at > NOW()
        RETURNING s.id AS session_id,
         s.user_id,
         u.role,
         s.expires_at ;
        `,
    [oldTokenHash, newtokenHash, newExpiresAt],
  );

  return result.rows[0] ?? null;
};


export const revokeSessionByToken = async(tokenHash: string) =>{
    const result = await pool.query(`
      UPDATE sessions 
      SET revoked_at = NOW() 
      WHERE token_hash = $1
      RETURNING id ;
      `,[tokenHash]) ;
      return result.rows[0] ?? null ;
}

export const getUserById = async(userId: string) =>{
  const result = await pool.query(`
      SELECT * FROM users 
      WHERE id = $1
      `,[userId]) ;
      return result.rows[0] ?? null ;
}