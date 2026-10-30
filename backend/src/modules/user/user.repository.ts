import { pool } from "../../config/db.js"

export const  getUserRepository = async(userId: string) =>{
const Result = await pool.query(`
     SELECT * FROM users WHERE id= $1
    `,[userId]) ;

    return Result.rows[0] ?? null ;
}

export const  deleteUserById = async(userId: string) =>{
const Result = await pool.query(`
    DELETE  FROM users WHERE id= $1
    RETURNING id ;
    `,[userId]) ;

    return Result.rows[0] ?? null ;
}