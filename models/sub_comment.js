'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sub_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sub_Comment.init({
    user_id: DataTypes.INTEGER,
    sub_comment_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sub_Comment',
  });
  return Sub_Comment;
};