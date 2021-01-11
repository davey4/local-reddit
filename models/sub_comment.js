"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sub_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sub_Comment.belongsTo(models.Comments, {
        foreignKey: "sub_comment_id",
      });
    }
  }
  Sub_Comment.init(
    {
      sub_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "comments",
          key: "id",
        },
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "comments",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Sub_Comment",
      tableName: "sub_comments",
    }
  );
  return Sub_Comment;
};
