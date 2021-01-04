import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { __GetAllSubs } from "../services/SubServices";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Sub = (props) => {
  const classes = useStyles();
  const [sub, setSub] = useState([]);

  useEffect(() => {
    getSubs();
  }, []);

  const getSubs = async () => {
    try {
      const data = await __GetAllSubs();
      setSub(data);
    } catch (error) {
      throw error;
    }
  };

  const onClick = (i) => {
    let location = {
      pathname: "/threads",
      state: {
        id: sub[i].id,
        area: sub[i].name,
      },
    };
    props.history.push(location);
  };

  return (
    <section>
      {sub.map((el, i) => (
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
              {el.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Created By:
            </Typography>
            <Typography variant="body2" component="p">
              {el.User.user_name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => onClick(i)}>
              Find discussions
            </Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
};

export default Sub;
