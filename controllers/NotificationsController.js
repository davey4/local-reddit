const { Notifications } = require("../models");

const CreateNotification = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    let threadId = parseInt(reg.params.thread_id);
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

module.exports = {
  CreateNotification,
  DeleteNotification,
};
