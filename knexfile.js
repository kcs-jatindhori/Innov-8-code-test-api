// Update with your config settings.
"use strict";

require('dotenv').config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, HOST, PG_PORT } = process.env
module.exports = {
        client: 'pg',
        connection: {
            database: DB_NAME,
            user: DB_USERNAME,
            password: DB_PASSWORD,
            host: HOST,
            port: PG_PORT,
        },
        migrations: {
            directory: "src/migrations",
        },
        seeds: { directory: 'src/data/seeds' },
        useNullAsDefault: true,
        pool: {
            min: 0,
            max: 7,
            afterCreate: (conn, done) => {
                conn.query('SET timezone="UTC";', (err) => {
                    if (err) {
                        console.log('Database Connection Error :', err);
                    }
                    done(err, conn)
                })
            }
        }
};
