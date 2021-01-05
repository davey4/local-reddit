const { User, Avatar } = require("../models");

const {
  hashPassword,
  passwordValid,
  createToken,
} = require("../middleware/index");

const CreateUser = async (req, res) => {
  try {
    const { lastName, firstName, email, userName, password } = req.body;
    const password_digest = await hashPassword(password);
    const user = await User.create({
      last_name: lastName,
      first_name: firstName,
      email: email,
      user_name: userName,
      avatar:
        "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png",
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
        userName: user.user_name,
        avatar: user.avatar,
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
      attributes: ["id", "user_name", "avatar"],
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
      attributes: ["first_name", "last_name", "user_name", "email", "avatar"],
    });
    res.send(user);
  } catch (error) {
    throw error;
  }
};

const UpdateUser = async (req, res) => {
  try {
    let id = parseInt(req.params.user_id);
    const { lastName, firstName, email, userName, avatar, password } = req.body;
    if (password) {
      const password_digest = await hashPassword(password);
      const updated = User.update(
        {
          last_name: lastName,
          first_name: firstName,
          email: email,
          user_name: userName,
          avatar: avatar,
          password_digest: password_digest,
        },
        { where: { id: id }, returning: true }
      );
      res.send(updated);
    } else {
      const updated = User.update(
        {
          last_name: lastName,
          first_name: firstName,
          email: email,
          user_name: userName,
          avatar: avatar,
        },
        { where: { id: id }, returning: true }
      );
      res.send(updated);
    }
  } catch (error) {
    throw error;
  }
};

const GetAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.findAll();
    res.send(avatars);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  RefreshSession,
  GetUser,
  UpdateUser,
  GetAvatars,
};
