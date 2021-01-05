import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Comments from "../components/Comments";

import { __GetThread } from "../services/ThreadServices";
import { __CreateComment } from "../services/CommentServices";

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

const Forum = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    getThread();
  }, []);

  const getThread = async () => {
    try {
      const data = await __GetThread(props.location.state);
      setTitle(data.content);
      setComments(data.Comments);
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
      alert("please login");
    }
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
          />
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
    </section>
  );
};

export default Forum;