exports.up = function (knex) {

    return knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', table => {
                table.increments('id').primary()
                table.string('first_name')
                table.string('last_name')
                table.string('username')
                table.string('password')
                table.timestamp('created_at').defaultTo(knex.fn.now())
            })
        } else {
            return
        }
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};