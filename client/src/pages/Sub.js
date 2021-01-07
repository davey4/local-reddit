import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";

import { __GetAllSubs, __CreateSub } from "../services/SubServices";
import { __CreateSubscrip, __UnSub } from "../services/SubscriptionServices";

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

const Sub = (props) => {
  const classes = useStyles();
  const [sub, setSub] = useState([]);
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");

  const [search, setSearch] = useState("");
  const [filteredSubs, setFilteredSubs] = useState([]);

  useEffect(() => {
    getSubs();
  }, []);

  const getSubs = async () => {
    try {
      const data = await __GetAllSubs();
      setSub(data);
      setFilteredSubs(data);
    } catch (error) {
      throw error;
    }
  };

  const addSub = async (e) => {
    e.preventDefault();
    if (name) {
      try {
        const data = {
          name: name,
        };
        await __CreateSub(props.currentUser, data);
        getSubs();
        setName("");
        setAdd(false);
      } catch (error) {
        throw error;
      }
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

  const onChange = ({ target }) => {
    switch (target.name) {
      case "name":
        return setName(target.value);
      case "search":
        return setSearch(target.value);
      default:
        return;
    }
  };

  const subscribe = async (id) => {
    try {
      await __CreateSubscrip(props.currentUser, id);
      getSubs();
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

  const filter = (e) => {
    e.preventDefault();
    let filtered = sub.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSubs(filtered);
    setSearch("");
  };

  return (
    <section>
      <form className={classes.inline} onSubmit={filter}>
        <TextField
          id="searchBar"
          label="Search"
          name="search"
          style={{ margin: 10 }}
          placeholder="Search"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={search}
          onChange={onChange}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
      {props.currentUser ? (
        <Card>
          <CardActions>
            <Button size="large" onClick={() => setAdd(!add)}>
              <AddBoxIcon /> Add Area
            </Button>
          </CardActions>
          {add ? (
            <form onSubmit={addSub}>
              <TextField
                id="outlined-full-width"
                style={{ margin: 10 }}
                name="name"
                placeholder="Area"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={name}
                onChange={onChange}
              />
              <Button type="submit">Add</Button>
            </form>
          ) : null}
        </Card>
      ) : null}

      {filteredSubs.length > 0 ? (
        filteredSubs.map((el, i) => (
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
            {props.currentUser ? (
              el.Subscriptions.find(
                (el) => el.user_id === props.currentUser
              ) ? (
                <CardActions>
                  <Button onClick={() => unSubscribe(el.id)}>
                    UnSubscribe
                  </Button>
                </CardActions>
              ) : (
                <CardActions>
                  <Button onClick={() => subscribe(el.id)}>Subscribe</Button>
                </CardActions>
              )
            ) : null}
            <CardActions>
              <Button size="small" onClick={() => onClick(i)}>
                Find discussions
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <h4>No matching Results</h4>
      )}
    </section>
  );
};

export default Sub;
