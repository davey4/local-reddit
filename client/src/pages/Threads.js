import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {
  __GetAllThreads,
  __UpVoteThread,
  __DownVoteThread,
} from "../services/ThreadServices";

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

  const upVote = async (id) => {
    try {
      await __UpVoteThread(id);
      getThreads();
    } catch (error) {
      throw error;
    }
  };

  const downVote = async (id) => {
    try {
      await __DownVoteThread(id);
      getThreads();
    } catch (error) {
      throw error;
    }
  };

  const onClick = (id) => {
    // console.log(id);
    let location = {
      pathname: "/forum",
      state: id,
    };
    props.history.push(location);
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
            <Typography>{el.points}</Typography>
            {props.currentUser ? (
              <div>
                <Button size="small" onClick={() => upVote(el.id)}>
                  <ArrowDropUpIcon />
                </Button>
                <Button size="small" onClick={() => downVote(el.id)}>
                  <ArrowDropDownIcon />
                </Button>
              </div>
            ) : null}
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
