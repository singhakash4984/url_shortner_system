/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createExtension("pgcrypto",{
        ifNotExists:true
    });
    pgm.createTable("url",{
        id: {
            type: "uuid",
            primaryKey: true,
            notNull: true,
            default: pgm.func("gen_random_uuid()")
        },
        user_id:{
            type: "uuid",
            notNull: true,
            references:"users(id)",
            onDelete:"CASCADE"
        },
        original_url:{
            type: "text",
            notNull: true
        },
        alias:{
            type: "varchar(20)",
            notNull: true,
            unique: true
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
        },
    })
   pgm.createIndex("url","user_id") ;
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("url") ;
};
