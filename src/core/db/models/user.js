export default (sequelize, type) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: type.UUID, primaryKey: true, field: 'user_id', defaultValue: type.UUIDV4,
      },

      email: { type: type.STRING, field: 'email' },
      password: { type: type.STRING, field: 'password' },
    },
    {
      tableName: 'users',
      freezeTableName: true,
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.FavoriteSong, {
      as: 'favorites',
      foreignKey: 'userId',
    });
  };

  return User;
};
