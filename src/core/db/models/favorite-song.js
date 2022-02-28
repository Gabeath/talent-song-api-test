export default (sequelize, type) => {
  const FavoriteSong = sequelize.define(
    'FavoriteSong',
    {
      favoriteId: {
        type: type.UUID, primaryKey: true, field: 'favorite_id', defaultValue: type.UUIDV4,
      },

      userId: { type: type.UUID, field: 'user_id' },

      songName: { type: type.STRING, field: 'song_name' },
      artist: { type: type.STRING, field: 'artist' },
      album: { type: type.STRING, field: 'album' },
    },
    {
      tableName: 'favorite_songs',
      freezeTableName: true,
      timestamps: false,
    },
  );

  FavoriteSong.associate = (models) => {
    FavoriteSong.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return FavoriteSong;
};
