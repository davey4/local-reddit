const { Notifications } = require("../models");

const CreateNotification = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    let threadId = parseInt(req.params.thread_id);
    const notif = await Notifications.create({
      user_id: userId,
      message: req.body.message,
      thread_id: threadId,
    });
    res.send(notif);
  } catch (error) {
    throw error;
  }
};

const DeleteNotification = async (req, res) => {
  try {
    let id = parseInt(req.params.notif_id);
    await Notifications.destroy({ where: { id: id } });
    res.send({ msg: `Deleted notification with id # ${id}` });
  } catch (error) {
    throw error;
  }
};

const GetNotification = async (req, res) => {
  try {
    let id = parseInt(req.params.user_id);
    const notifs = await Notifications.findAll({
      where: { user_id: id },
    });
    res.send(notifs);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateNotification,
  DeleteNotification,
  GetNotification,
};
