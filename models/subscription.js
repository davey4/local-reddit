"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Subscription.belongsTo(models.Sub_Reddit, {
        foreignKey: "sub_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Subscription.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      sub_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sub_reddits",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Subscription",
      tableName: "subscriptions",
    }
  );
  return Subscription;
};
