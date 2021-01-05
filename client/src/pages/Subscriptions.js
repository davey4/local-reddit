import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import { __GetSubs, __UnSub } from "../services/SubscriptionServices";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  inline: {
    display: "flex",
  },
  small: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Subscriptions = (props) => {
  const classes = useStyles();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getSubs();
  }, []);

  const getSubs = async () => {
    try {
      const data = await __GetSubs(props.currentUser);
      setSubs(data);
    } catch (error) {
      throw error;
    }
  };

  const unSubscribe = async (id) => {
    try {
      await __UnSub(props.currentUser, id);
      getSubs();
    } catch (error) {
      throw error;
    }
  };

  const onClick = (i) => {
    let location = {
      pathname: "/threads",
      state: {
        id: subs[i].Sub_Reddit.id,
        area: subs[i].Sub_Reddit.name,
      },
    };
    props.history.push(location);
  };

  return (
    <section>
      {subs.length > 0 ? (
        subs.map((el, i) => (
          <Card className={classes.root} key={el.id}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Area
              </Typography>
              <Typography variant="h5" component="h2">
                {el.Sub_Reddit.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Created By:
              </Typography>
              <Typography
                className={classes.inline}
                variant="body1"
                component="p"
              >
                <Avatar
                  alt={el.Sub_Reddit.User.id}
                  src={el.Sub_Reddit.User.avatar}
                  className={classes.small}
                />
                {el.Sub_Reddit.User.user_name}
              </Typography>
            </CardContent>

            <CardActions>
              <Button onClick={() => unSubscribe(el.Sub_Reddit.id)}>
                UnSubscribe
              </Button>
            </CardActions>

            <CardActions>
              <Button size="small" onClick={() => onClick(i)}>
                Find discussions
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <h4>No Subscriptions</h4>
      )}
    </section>
  );
};

export default Subscriptions;
