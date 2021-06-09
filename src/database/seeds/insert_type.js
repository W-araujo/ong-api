exports.seed = function (knex) {
  return knex('type').del()
    .then(function () {
      return knex('type').insert([
        { name: 'Cancer' },
        { name: 'Direitos dos animais' },
        { name: 'Meio Ambiente' },
      ]);
    });
};
