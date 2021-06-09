exports.seed = function (knex) {
  return knex('donation').del()
    .then(function () {
      return knex('donation').insert([
        { value: 5 },
        { value: 10 },
        { value: 25 },
        { value: 50 },
        { value: 100 },
        { value: 200 },
      ]);
    });
};
