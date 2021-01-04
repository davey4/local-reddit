const { Thread, User } = require("../models");

const CreateThread = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    const { subId, content } = req.body;
    const thread = await Thread.create({
      sub_id: subId,
      user_id: userId,
      content: content,
    });
    res.send(thread);
  } catch (error) {
    throw error;
  }
};

const UpdateThread = async (req, res) => {
  try {
    const id = parseInt(req.params.thread_id);
    const updatedThread = await Thread.update(req.body.content, {
      where: { id: id },
      returning: true,
    });
    res.send(updatedThread);
  } catch (error) {
    throw error;
  }
};

const DeleteThread = async (req, res) => {
  try {
    let id = parseInt(req.params.thread_id);
    await Thread.destroy({ where: { id: id } });
    res.send({ msg: `Deleted thread with id # ${id}` });
  } catch (error) {
    throw error;
  }
};

const GetAllThreads = async (req, res) => {
  try {
    let id = parseInt(req.params.sub_id);
    const threads = await Thread.findAll({
      where: { sub_id: id },
      order: [["points", "DESC"]],
      include: [{ model: User, attributes: ["id", "user_name"] }],
    });
    res.send(threads);
  } catch (error) {
    throw error;
  }
};

const GetThread = async (req, res) => {
  try {
    let id = parseInt(req.params.thread_id);
    const thread = await Thread.findOne({
      where: { id: id },
      include: [
        { model: User, attrbutes: ["id", "user_name"] },
        // {
        // model: Comments,
        // include: [{ model: User, attributes: ["id", "user_name"] }],
        // order: [["createdAt", "DESC"]],
        // },
      ],
    });
    res.send(thread);
  } catch (error) {
    throw error;
  }
};

const LikeThread = async (req, res) => {
  try {
    let id = parseInt(req.params.thread_id);
    const thread = await Thread.increment({ points: 1 }, { where: { id: id } });
    res.send(thread);
  } catch (error) {
    throw error;
  }
};

const UnlikeThread = async (req, res) => {
  try {
    let id = parseInt(req.params.thread_id);
    const thread = await Thread.increment(
      { points: -1 },
      { where: { id: id } }
    );
    res.send(thread);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateThread,
  UpdateThread,
  DeleteThread,
  GetAllThreads,
  GetThread,
  LikeThread,
  UnlikeThread,
};
