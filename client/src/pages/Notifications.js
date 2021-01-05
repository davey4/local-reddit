import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  __GetNotifications,
  __DeleteNotification,
} from "../services/NotificationServices";

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

const Notifications = (props) => {
  const classes = useStyles();
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    getNotif();
  }, []);

  const getNotif = async () => {
    try {
      const data = await __GetNotifications(props.currentUser);
      setNotif(data);
    } catch (error) {
      throw error;
    }
  };

  const goToThread = (id) => {
    let location = {
      pathname: "/forum",
      state: id,
    };
    props.history.push(location);
  };

  const deleteNotif = async (id) => {
    try {
      await __DeleteNotification(id);
      getNotif();
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      {notif.length > 0 ? (
        notif.map((el) => (
          <div key={el.id}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Button onClick={() => goToThread(el.thread_id)}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  ></Typography>
                  <Typography variant="h5" component="h2">
                    {el.message}
                  </Typography>
                </Button>
              </CardContent>
              <CardActions>
                <Button onClick={() => deleteNotif(el.id)} size="small">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        ))
      ) : (
        <h4>No Notifications</h4>
      )}
    </section>
  );
};

export default Notifications;
