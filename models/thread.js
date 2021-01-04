"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Thread.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Thread.belongsTo(models.Sub_Reddit, {
        foreignKey: "sub_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Thread.hasMany(models.Comments, {
        foreignKey: "thread_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Thread.init(
    {
      sub_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sub_reddits",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Thread",
      tableName: "threads",
    }
  );
  return Thread;
};
