import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  inline: {
    display: "flex",
    marginTop: 12,
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

const Filtered = (props) => {
  const classes = useStyles();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    props.sub.Subscriptions.find((el) => {
      if (el.user_id === props.currentUser) {
        setSubscribed(true);
      }
    });
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Area
        </Typography>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Created By:
        </Typography>
        <Typography className={classes.inline} variant="body1" component="p">
          <Avatar
            alt={props.UserName}
            src={props.avatar}
            className={classes.small}
          />
          {props.userName}
        </Typography>
      </CardContent>
      {props.currentUser ? (
        subscribed ? (
          <CardActions>
            <Button
              onClick={() =>
                props.unSubscribe(props.id) && setSubscribed(false)
              }
            >
              UnSubscribe
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button
              onClick={() => props.subscribe(props.id) && setSubscribed(true)}
            >
              Subscribe
            </Button>
          </CardActions>
        )
      ) : null}
      <CardActions>
        <Button size="small" onClick={() => props.onClick(props.i)}>
          Find discussions
        </Button>
      </CardActions>
    </Card>
  );
};

export default Filtered;
