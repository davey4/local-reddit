"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sub_Reddit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sub_Reddit.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Sub_Reddit.hasMany(models.Thread, {
        foreignKey: "sub_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Sub_Reddit.init(
    {
      user_id: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Sub_Reddit",
      tableName: "sub_reddits",
    }
  );
  return Sub_Reddit;
};
