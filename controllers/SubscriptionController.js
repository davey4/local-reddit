const { Subscription, Sub_Reddit, User } = require("../models");

const CreateSub = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    let subId = parseInt(req.params.sub_id);
    console.log(subId);
    const sub = await Subscription.create({
      user_id: userId,
      sub_id: subId,
    });
    res.send(sub);
  } catch (error) {
    throw error;
  }
};

const UnSub = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    let subId = parseInt(req.params.sub_id);
    await Subscription.destroy({
      where: { user_id: userId, sub_id: subId },
    });
    res.send({ msg: `userid # ${userId} unsubbed from sub # ${subId}` });
  } catch (error) {
    throw error;
  }
};

const GetSubs = async (req, res) => {
  try {
    let id = parseInt(req.params.user_id);
    const subs = await Subscription.findAll({
      where: { user_id: id },
      include: [
        {
          model: Sub_Reddit,
          include: [{ model: User, attributes: ["id", "user_name"] }],
        },
      ],
    });
    res.send(subs);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateSub,
  UnSub,
  GetSubs,
};
