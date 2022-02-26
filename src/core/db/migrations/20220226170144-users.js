module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: { type: Sequelize.UUID, primaryKey: true },

      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
