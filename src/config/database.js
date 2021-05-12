const configuration = require('../../knexfile')
const db = require("knex")(configuration);
db.select().from('users')
    .then(() => {
        console.log('Database Connected successfully');
    });

module.exports = db;