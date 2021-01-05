"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notifications.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Notifications.belongsTo(models.Thread, {
        foreignKey: "thread_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Notifications.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thread_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "threads",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Notifications",
      tableName: "notifications",
    }
  );
  return Notifications;
};
