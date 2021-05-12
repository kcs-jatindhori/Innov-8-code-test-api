'use strict'
const crypto = require('crypto');
const hashingSecret = process.env.ENCRYPTION_KEY;

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'John', last_name: 'Doe', username: 'johndoe@example.com', password: crypto.createHmac('sha256', hashingSecret)
            .update('johndoe@1234567')
            .digest('hex')
        },
        {
          first_name: 'Moi', last_name: 'Alen', username: 'moialen@example.com', password: crypto.createHmac('sha256', hashingSecret)
            .update('moialen@1234567')
            .digest('hex')
        },
        {
          first_name: 'Ruby', last_name: 'John', username: 'rubyJohn@example.com', password: crypto.createHmac('sha256', hashingSecret)
            .update('rubyJohn1234567')
            .digest('hex')
        }
      ]);
    });
};
