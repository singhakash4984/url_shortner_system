/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = async(pgm) => {
    pgm.createExtension('pgcrypto',{
        ifNotExists: true
    }) ;
    pgm.createExtension('citext',{
        ifNotExists: true
    }) ;

    pgm.createType("user_role",["client","admin"])

    pgm.createTable("users",{
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()")
        },
        email: {
            type: "citext",
            unique: true,
            notNull: true
        },
        password_hash: {
            type: "text",
            notNull: true,
        },
        role: {
            type: "user_role",
            notNull: true,
            default: "client"
        },
        is_active: {
            type: "boolean",
            notNull: true ,
            default: true
        },
        email_verified_at: {
            type: "timestamptz",
            default: null 
        },
        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()")
        },
        updated_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()")
        }

    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = async(pgm) => {
    pgm.dropTable("users")
    pgm.dropType("user_role")
};
