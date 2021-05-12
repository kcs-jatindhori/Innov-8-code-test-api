# Innov-8-code-test-api

Follow below steps to configure node.js API
 1. Run command "npm install"
 2. Create database in PG Sql
 3. Set DB_NAME, DB_USERNAME, DB_PASSWORD, HOST, PG_PORT in .env file
 4. Run command "npm run db:migrate" for runing migration to create tables in Database.
 5. Run command "knex seed:run" to create some testing users and use this users to test functionality.
 6. Run command "npm run dev" to run API

Above steps will start API on respective port.
