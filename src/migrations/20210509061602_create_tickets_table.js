
exports.up = function (knex) {

    return knex.schema.hasTable('tickets').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('tickets', table => {
                table.increments('id').primary()
                table.integer('user_id').references('id').inTable('users');
                table.string('ticket_no')
                table.text('ticket_desc')
                table.timestamp('created_at').defaultTo(knex.fn.now())
                table.timestamp('updated_at').defaultTo(knex.fn.now())
                table.timestamp('deleted_at')
            })
        } else {
            return
        }
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tickets')
};
