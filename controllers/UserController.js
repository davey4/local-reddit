const { User, Notifications } = require("../models");

const {
  hashPassword,
  passwordValid,
  createToken,
} = require("../middleware/index");
const notifications = require("../models/notifications");

const CreateUser = async (req, res) => {
  try {
    const { lastName, firstName, email, userName, password } = req.body;
    const password_digest = await hashPassword(password);
    const user = await User.create({
      last_name: lastName,
      first_name: firstName,
      email: email,
      user_name: userName,
      password_digest: password_digest,
    });
    res.send(user);
  } catch (error) {
    throw error;
  }
};

const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    if (
      user &&
      (await passwordValid(req.body.password, user.password_digest))
    ) {
      let payload = {
        id: user.id,
      };
      let token = createToken(payload);
      return res.send({ user, token });
    }
  } catch (error) {
    throw error;
  }
};

const RefreshSession = async (req, res) => {
  try {
    const { token } = res.locals;
    const user = await User.findByPk(token.id, {
      attributes: ["id"],
    });
    res.send({ user, status: "OK" });
  } catch (error) {
    throw error;
  }
};

const GetUser = async (req, res) => {
  try {
    let id = parseInt(req.params.user_id);
    const user = await User.findByPk(id, {
      attributes: ["first_name", "last_name", "user_name", "email"],
      include: [{ model: Notifications }],
    });
    res.send(user);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  RefreshSession,
  GetUser,
};
