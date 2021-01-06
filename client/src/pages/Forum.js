import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Comments from "../components/Comments";

import { __GetThread } from "../services/ThreadServices";
import { __CreateComment } from "../services/CommentServices";
import { __CreateNotification } from "../services/NotificationServices";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  indent: {
    marginLeft: 40,
  },
});

const Forum = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    getThread();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getThread = async () => {
    try {
      const data = await __GetThread(props.location.state);
      setTitle(data.content);
      setComments(data.Comments);
      setId(data.user_id);
    } catch (error) {
      throw error;
    }
  };

  const onChange = ({ target }) => {
    setContent(target.value);
  };

  const commentThread = async (e) => {
    e.preventDefault();
    if (props.currentUser) {
      if (content) {
        try {
          const data = {
            threadId: props.location.state,
            content: content,
          };
          await __CreateComment(props.currentUser, data);
          createNotif();
          getThread();
          setContent("");
          setAddComment(false);
        } catch (error) {
          throw error;
        }
      } else {
        setAddComment(false);
      }
    } else {
      setOpen(true);
      setAddComment(false);
    }
  };

  const createNotif = async () => {
    try {
      let message = `${props.currentUserName} replied to your post`;
      const data = {
        message: message,
      };
      await __CreateNotification(id, props.location.state, data);
    } catch (error) {
      throw error;
    }
  };

  const recursiveComments = (el) => {
    return el.subComments.map((sub, i) => (
      <div key={sub.id} className={classes.indent}>
        <Comments
          id={sub.id}
          userName={sub.User.user_name}
          content={sub.content}
          points={sub.points}
          currentUser={props.currentUser}
          userId={sub.user_id}
          getThread={getThread}
          avatar={sub.User.avatar}
          threadId={props.location.state}
          currentUserName={props.currentUserName}
        />
        {el.subComments.length > 0
          ? recursiveComments(el.subComments[i])
          : null}
      </div>
    ));
  };

  return (
    <section>
      <h1>{title}</h1>
      {comments.map((el) => (
        <div key={el.id}>
          <Comments
            id={el.id}
            userName={el.User.user_name}
            content={el.content}
            points={el.points}
            currentUser={props.currentUser}
            userId={el.user_id}
            getThread={getThread}
            avatar={el.User.avatar}
            threadId={props.location.state}
            currentUserName={props.currentUserName}
          />
          {el.subComments.length > 0 ? recursiveComments(el) : null}
        </div>
      ))}
      <Card>
        {addComment ? (
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={commentThread}
          >
            <TextField
              id="outlined-full-width"
              style={{ margin: 10 }}
              placeholder="Reply"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={content}
              onChange={onChange}
            />
            <CardActions>
              <Button size="small" type="submit">
                Reply
              </Button>
            </CardActions>
          </form>
        ) : (
          <CardActions>
            <Button size="small" onClick={() => setAddComment(!addComment)}>
              Reply
            </Button>
          </CardActions>
        )}
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please Login First!
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Forum;
