import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { __GetUser } from "../services/UserServices";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Account = (props) => {
  const classes = useStyles();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const data = await __GetUser(props.currentUser);
      setLastName(data.last_name);
      setFirstName(data.first_name);
      setUserName(data.user_name);
      setEmail(data.email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Last Name:
          </Typography>
          <Typography variant="h5" component="h2">
            {lastName}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            First Name:
          </Typography>
          <Typography variant="h5" component="h2">
            {firstName}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            User Name:
          </Typography>
          <Typography variant="h5" component="h2">
            {userName}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            Email:
          </Typography>
          <Typography variant="h5" component="h2">
            {email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
        </CardActions>
      </Card>
    </section>
  );
};

export default Account;
