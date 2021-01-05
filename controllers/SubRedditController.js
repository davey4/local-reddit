const { Sub_Reddit, User, Subscription } = require("../models");

const CreateSub = async (req, res) => {
  try {
    let user_id = parseInt(req.params.user_id);
    let name = req.body.name;
    const sub = await Sub_Reddit.create({
      user_id: user_id,
      name: name,
    });
    res.send(sub);
  } catch (error) {
    throw error;
  }
};

const UpdateSub = async (req, res) => {
  try {
    let subId = parseInt(req.params.sub_id);
    const updatedSub = await Sub_Reddit.update(req.body.name, {
      where: { id: subId },
      returning: true,
    });
    res.send(updatedSub);
  } catch (error) {
    throw error;
  }
};

const DeleteSub = async (req, res) => {
  try {
    let subId = parseInt(req.params.sub_id);
    await Sub_Reddit.destroy({ where: { id: subId } });
    res.send({ msg: `deleted sub id # ${subId}` });
  } catch (error) {
    throw error;
  }
};

const GetAllSubs = async (req, res) => {
  try {
    const subs = await Sub_Reddit.findAll({
      include: [
        { model: User, attributes: ["user_name", "avatar"] },
        {
          model: Subscription,
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
  UpdateSub,
  DeleteSub,
  GetAllSubs,
};
