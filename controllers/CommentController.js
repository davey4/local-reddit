const { Comments } = require("../models");

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

const UpdateComment = async (req, res) => {
  try {
    let id = parseInt(req.params.comment_id);
    const updatedComment = await Comments.update(req.body.content, {
      where: { id: id },
      returning: true,
    });
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

module.exports = {
  CreateComment,
  UpdateComment,
  DeleteComment,
  LikeComment,
  UnlikeComment,
};
