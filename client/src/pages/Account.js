import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";

import {
  __GetUser,
  __GetAvatars,
  __UpdateUser,
} from "../services/UserServices";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  left: {
    marginLeft: 10,
  },
  selected: {
    border: 2,
    backgroundColor: "red",
  },
}));

const Account = (props) => {
  const classes = useStyles();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  // const [currPassword, setCurrPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirm, setConfirm] = useState("");
  const [update, setUpdate] = useState(false);
  const [avatars, setAvatars] = useState([]);

  const [newLastName, setNewLastName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  useEffect(() => {
    getUser();
    getAvatars();
  }, []);

  const getUser = async () => {
    try {
      const data = await __GetUser(props.currentUser);
      setLastName(data.last_name);
      setFirstName(data.first_name);
      setUserName(data.user_name);
      setEmail(data.email);
      setAvatar(data.avatar);
    } catch (error) {
      throw error;
    }
  };

  const getAvatars = async () => {
    try {
      const data = await __GetAvatars();
      setAvatars(data);
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const body = {
        lastName: newLastName ? newLastName : lastName,
        firstName: newFirstName ? newFirstName : firstName,
        userName: newUserName ? newUserName : userName,
        email: newEmail ? newEmail : email,
        avatar: avatar,
      };
      await __UpdateUser(props.currentUser, body);
      getUser();
      setUpdate(false);
      setLastName("");
      setNewFirstName("");
      setNewUserName("");
      setNewEmail("");
    } catch (error) {
      throw error;
    }
  };

  const onChange = ({ target }) => {
    switch (target.name) {
      case "lastName":
        return setNewLastName(target.value);
      case "firstName":
        return setNewFirstName(target.value);
      case "userName":
        return setNewUserName(target.value);
      case "email":
        return setNewEmail(target.value);
      default:
        return;
    }
  };

  const selectAvatar = (img) => {
    setAvatar(img);
  };

  return (
    <section>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography gutterBottom>
            <Avatar alt={userName} src={avatar} className={classes.large} />
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Last Name:
          </Typography>
          <Typography variant="h5" component="h2">
            {lastName}
            {update ? (
              <TextField
                autoComplete="lname"
                name="lastName"
                variant="outlined"
                required
                id="lastName"
                label="Last Name"
                autoFocus
                className={classes.left}
                value={newLastName}
                onChange={onChange}
              />
            ) : null}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            First Name:
          </Typography>
          <Typography variant="h5" component="h2">
            {firstName}
            {update ? (
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                id="firstName"
                label="First Name"
                autoFocus
                className={classes.left}
                value={newFirstName}
                onChange={onChange}
              />
            ) : null}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            User Name:
          </Typography>
          <Typography variant="h5" component="h2">
            {userName}
            {update ? (
              <TextField
                autoComplete="userName"
                name="userName"
                variant="outlined"
                required
                id="userName"
                label="User Name"
                autoFocus
                className={classes.left}
                value={newUserName}
                onChange={onChange}
              />
            ) : null}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            Email:
          </Typography>
          <Typography variant="h5" component="h2">
            {email}
            {update ? (
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                id="email"
                label="Email"
                autoFocus
                className={classes.left}
                value={newEmail}
                onChange={onChange}
              />
            ) : null}
          </Typography>
        </CardContent>
        <CardActions>
          {update ? (
            <div>
              <h4>Select Avatar</h4>
              {avatars.map((el) => (
                <Button
                  key={el.id}
                  onClick={() => selectAvatar(el.avatar)}
                  className={avatar === el.avatar ? classes.selected : null}
                >
                  <Avatar alt={el.id} src={el.avatar} />
                </Button>
              ))}
              <Button onClick={updateUser} size="small">
                Update
              </Button>
            </div>
          ) : (
            <Button onClick={() => setUpdate(!update)} size="small">
              Edit Info
            </Button>
          )}
        </CardActions>
      </Card>
    </section>
  );
};

export default Account;
