import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import {
  __DownVoteComment,
  __UpVoteComment,
  __DeleteComment,
  __UpdateComment,
} from "../services/CommentServices";

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

const Comments = (props) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);

  const upVote = async (id) => {
    try {
      await __UpVoteComment(id);
      props.getThread();
    } catch (error) {
      throw error;
    }
  };

  const downVote = async (id) => {
    try {
      await __DownVoteComment(id);
      props.getThread();
    } catch (error) {
      throw error;
    }
  };

  const onChange = ({ target }) => {
    setContent(target.value);
  };

  const setUpdate = (data) => {
    setEdit(!edit);
    setContent(data);
  };

  const updateComment = async (e) => {
    e.preventDefault();
    if (content) {
      try {
        const data = {
          content: `edited: ${content}`,
        };
        await __UpdateComment(props.id, data);
        props.getThread();
        setContent("");
        setEdit(false);
      } catch (error) {
        throw error;
      }
    }
  };

  const deleteComment = async (id) => {
    try {
      await __DeleteComment(id);
      props.getThread();
    } catch (error) {
      throw error;
    }
  };

  const onClick = (id) => {
    console.log(id);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" component="p">
          {props.userName}
        </Typography>
        {edit ? (
          <form onSubmit={updateComment}>
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
                Update
              </Button>
            </CardActions>
          </form>
        ) : (
          <Typography variant="h5" component="h2">
            {props.content}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Typography>{props.points}</Typography>
        {props.currentUser ? (
          <div>
            <Button size="small" onClick={() => upVote(props.id)}>
              <ArrowDropUpIcon />
            </Button>
            <Button size="small" onClick={() => downVote(props.id)}>
              <ArrowDropDownIcon />
            </Button>
          </div>
        ) : null}
        {props.currentUser === props.userId ? (
          <div>
            <Button size="small" onClick={() => setUpdate(props.content)}>
              <EditIcon />
            </Button>
            <Button size="small" onClick={() => deleteComment(props.id)}>
              <DeleteIcon />
            </Button>
          </div>
        ) : (
          <Button size="small" onClick={() => onClick(props.id)}>
            Reply
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Comments;
