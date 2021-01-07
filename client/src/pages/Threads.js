import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";

import {
  __GetAllThreads,
  __UpVoteThread,
  __DownVoteThread,
  __CreateThread,
} from "../services/ThreadServices";

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

const Threads = (props) => {
  const classes = useStyles();
  const [threads, setThreads] = useState([]);
  const [content, setContent] = useState("");
  const [add, setAdd] = useState(false);

  useEffect(() => {
    getThreads();
  }, []);

  const createThread = async (e) => {
    e.preventDefault();
    try {
      const data = {
        subId: props.location.state.id,
        content: content,
      };
      await __CreateThread(props.currentUser, data);
      getThreads();
      setContent("");
      setAdd(false);
    } catch (error) {
      throw error;
    }
  };

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
    let location = {
      pathname: "/forum",
      state: id,
    };
    props.history.push(location);
  };

  const onChange = ({ target }) => {
    setContent(target.value);
  };

  return (
    <section>
      <h1>{props.location.state.area}</h1>
      {props.currentUser ? (
        <Card>
          <CardActions>
            <Button size="large" onClick={() => setAdd(!add)}>
              <AddBoxIcon /> Add Thread
            </Button>
          </CardActions>
          {add ? (
            <form onSubmit={createThread}>
              <TextField
                id="outlined-full-width"
                style={{ margin: 10 }}
                placeholder="Area"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={content}
                onChange={onChange}
              />
              <Button type="submit">Add</Button>
            </form>
          ) : null}
        </Card>
      ) : null}
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
            <Typography
              className={classes.inline}
              variant="body1"
              component="p"
            >
              <Avatar
                alt={el.User.id}
                src={el.User.avatar}
                className={classes.small}
              />
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
