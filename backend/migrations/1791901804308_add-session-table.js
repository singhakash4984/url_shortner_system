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
    pgm.createTable("sessions",{
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()")
        },
        user_id: {
            type: "uuid",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE"
        },
        token_hash:{
            type: "char(64)",
            notNull: true,
            unique: true
        },
        revoked_at:{
            type: "timestamptz"
        },
        created_at:{
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()")
        },
        expires_at:{
            type: "timestamptz",
            notNull: true,
            
        },
        user_agent:{
            type: "varchar(512)"
        },
        ip:{
            type:"inet"
        },



    })

    pgm.addConstraint("sessions","sessions_expiry_check",{
        check: "expires_at > created_at",
    }) ;
    pgm.addConstraint("sessions","sessions_revoked_at_check",{
        check: "revoked_at is NULL OR revoked_at >= created_at",
    }) ;

    pgm.createIndex("sessions",["user_id"],{
        name: "sessions_user_id_idx"
    }) ;
    pgm.createIndex("sessions",["expires_at"],{
        name: "sessions_expires_at_idx"
    }) ;
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = async(pgm) => {
    pgm.dropTable("sessions")
};
