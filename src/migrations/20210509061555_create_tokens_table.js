
exports.up = function (knex) {

    return knex.schema.hasTable('tokens').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('tokens', table => {
                table.increments('id').primary()
                table.integer('user_id').references('id').inTable('users');
                table.text('token')
                table.timestamp('created_at').defaultTo(knex.fn.now())
            })
        } else {
            return
        }
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tokens')
};

