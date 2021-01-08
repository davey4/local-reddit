import { useEffect, useState } from "react";
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
import Avatar from "@material-ui/core/Avatar";

import { MentionsInput, Mention } from "react-mentions";
import defaultStyle from "./DefaultMentionsStyle";
import mentionsStyle from "../components/defaultStyle";

import {
  __DownVoteComment,
  __UpVoteComment,
  __DeleteComment,
  __UpdateComment,
  __CommentOnComment,
} from "../services/CommentServices";

import { __CreateNotification } from "../services/NotificationServices";
import { __GetAll } from "../services/UserServices";

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
  backgroundColor: {
    backgroundColor: "#daf4fa",
  },
}));

const Comments = (props) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const users = await __GetAll();
      setData(users);
    } catch (error) {
      throw error;
    }
  };

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let newComment = content;
      newComment = newComment.split("@@@__").join(`<span style='color:blue'>`);
      newComment = newComment.split("@@@^^^").join("</span>");
      if (content != newComment) {
        let tagged = content.split(" ");
        tagged = tagged.find((el) => el.includes("@@@__"));
        tagged = tagged.replace(/[^a-zA-Z0-9 ]/g, "");
        tagged = data.find((el) => el.display === tagged);
        taggedNotif(tagged.id);
      }
      const msg = {
        content: newComment,
      };
      await __CommentOnComment(props.currentUser, props.id, msg);
      createNotif();
      props.getThread();
      setContent("");
      setAddComment(false);
    } catch (error) {
      throw error;
    }
  };

  const taggedNotif = async (id) => {
    try {
      let message = `${props.currentUserName} mentioned you in a comment`;
      const data = {
        message: message,
      };
      await __CreateNotification(id, props.threadId, data);
    } catch (error) {
      throw error;
    }
  };

  const createNotif = async () => {
    try {
      let message = `${props.currentUserName} replied to your comment`;
      const data = {
        message: message,
      };
      await __CreateNotification(props.userId, props.threadId, data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.inline} variant="body1" component="p">
          <Avatar
            alt={props.Userid}
            src={props.avatar}
            className={classes.small}
          />
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
            <p
              dangerouslySetInnerHTML={{
                __html: props.content.replace(/\n\r?/g, "<br />"),
              }}
            />
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
        ) : addComment ? (
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <MentionsInput
              style={defaultStyle}
              value={content}
              onChange={onChange}
              placeholder="Reply"
            >
              <Mention
                trigger="@"
                style={mentionsStyle}
                markup={"@@@____display__@@@^^^"}
                data={data}
              />
            </MentionsInput>
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
      </CardActions>
    </Card>
  );
};

export default Comments;
