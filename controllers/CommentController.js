const { Comments, Sub_Comment, User } = require("../models");

const CreateComment = async (req, res) => {
  try {
    let id = parseInt(req.params.user_id);
    const { threadId, content } = req.body;
    const comment = await Comments.create({
      user_id: id,
      thread_id: threadId,
      content: content,
    });
    res.send(comment);
  } catch (error) {
    throw error;
  }
};

const CommentOnComment = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    const { content } = req.body;
    const comment = await Comments.create({
      user_id: userId,
      content: content,
    });

    let parentId = parseInt(req.params.parent_id);
    const subComment = await Sub_Comment.create({
      sub_comment_id: comment.id,
      comment_id: parentId,
    });

    res.send({ comment, subComment });
  } catch (error) {
    throw error;
  }
};

const UpdateComment = async (req, res) => {
  try {
    let id = parseInt(req.params.comment_id);
    const updatedComment = await Comments.update(
      { content: req.body.content },

      {
        where: { id: id },
        returning: true,
      }
    );
    res.send(updatedComment);
  } catch (error) {
    throw error;
  }
};

const DeleteComment = async (req, res) => {
  try {
    let id = parseInt(req.params.comment_id);
    await Comments.destroy({ where: { id: id } });
    res.send({ msg: `Deleted comment with id # ${id}` });
  } catch (error) {
    throw error;
  }
};

const LikeComment = async (req, res) => {
  try {
    let id = parseInt(req.params.comment_id);
    const comment = await Comments.increment(
      { points: 1 },
      { where: { id: id } }
    );
    res.send(comment);
  } catch (error) {
    throw error;
  }
};

const UnlikeComment = async (req, res) => {
  try {
    let id = parseInt(req.params.comment_id);
    const comment = await Comments.increment(
      { points: -1 },
      { where: { id: id } }
    );
    res.send(comment);
  } catch (error) {
    throw error;
  }
};

const GetMoreComments = async (req, res) => {
  try {
    let commentId = parseInt(req.params.comment_id);
    const comments = await Sub_Comment.findAll({
      where: { sub_comment_id: commentId },
      include: [
        {
          model: Comments,
          include: [
            { model: User, attributes: ["id", "user_name", "avatar"] },
            {
              model: Comments,
              as: "subComments",
              include: [
                { model: User, attributes: ["id", "user_name", "avatar"] },
                {
                  model: Comments,
                  as: "subComments",
                  include: [
                    { model: User, attributes: ["id", "user_name", "avatar"] },
                  ],
                },
                {
                  model: Comments,
                  as: "subComments",
                  include: [
                    { model: User, attributes: ["id", "user_name", "avatar"] },
                  ],
                },
                {
                  model: Comments,
                  as: "subComments",
                  include: [
                    { model: User, attributes: ["id", "user_name", "avatar"] },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [[{ model: Comments }, "points", "DESC"]],
    });
    res.send(comments);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateComment,
  CommentOnComment,
  UpdateComment,
  DeleteComment,
  LikeComment,
  UnlikeComment,
  GetMoreComments,
};
