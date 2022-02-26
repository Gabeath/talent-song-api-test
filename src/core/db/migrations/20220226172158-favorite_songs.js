module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favorite_songs', {
      favorite_id: { type: Sequelize.UUID, primaryKey: true },

      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },

      song_name: { type: Sequelize.STRING },
      artist: { type: Sequelize.STRING },
      album: { type: Sequelize.STRING },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('favorite_songs');
  },
};
