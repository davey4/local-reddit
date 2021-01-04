import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { __GetAllThreads } from "../services/ThreadServices";

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

const Threads = (props) => {
  const classes = useStyles();
  console.log(props);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    try {
      const data = await __GetAllThreads(props.location.state.id);
      setThreads(data);
    } catch (error) {
      throw error;
    }
  };

  const onClick = (id) => {
    // e.preventDefault();
    console.log(id);
  };

  return (
    <section>
      <h1>{props.location.state.area}</h1>
      {threads.map((el) => (
        <Card className={classes.root} key={el.id}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Conversation
            </Typography>
            <Typography variant="h5" component="h2">
              {el.content}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Created By:
            </Typography>
            <Typography variant="body2" component="p">
              {el.User.user_name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => onClick(el.id)}>
              See replies
            </Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
};

export default Threads;
